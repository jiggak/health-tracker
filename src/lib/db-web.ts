import type { LogRecord, Metric } from '$lib';
import type { DataStore } from './db';
import { metrics } from './db-static'

class WebDatabase implements DataStore {
   constructor(private db: IDBDatabase) { }

   listMetrics(): Promise<Metric[]> {
      return this.read('metrics', (store) => store.getAll());
   }

   putMetric(metric: Metric): Promise<void> {
      return this.write('metrics', (store) => store.put(metric));
   }

   addLog(log: LogRecord): Promise<void> {
      return this.write('logs', (store) => store.add(log));
   }

   updateLog(log: LogRecord): Promise<void> {
      return this.write('logs', (store) => store.put(log));
   }

   deleteLog(id: number): Promise<void> {
      return this.write('logs', (store) => store.delete(id));
   }

   listLogs(startTs: number, endTs: number): Promise<LogRecord[]> {
      return this.cursor('logs', 'timestamp', (index) => {
         const range = IDBKeyRange.bound(startTs, endTs);
         return index.openCursor(range);
      });
   }

   listRecentLogs(count: number, metricKey: string): Promise<LogRecord[]> {
      return this.cursor('logs', 'metric_timestamp', (index) => {
         const range = IDBKeyRange.bound([metricKey, -Infinity], [metricKey, Infinity]);
         return index.openCursor(range, 'prev');
      }, count);
   }

   getLog(id: number): Promise<LogRecord> {
      return this.read('logs', (store) => store.get(id));
   }

   private read<T>(
      storeName:string,
      request: (objectStore: IDBObjectStore) => IDBRequest
   ) {
      return new Promise<T>((resolve, reject) => {
         const objectStore = this.db.transaction(storeName)
               .objectStore(storeName);

         const req = request(objectStore);

         req.onsuccess = () => resolve(req.result);
         req.onerror = () => reject(req.error);
      });
   }

   private write(
      storeName:string,
      request: (objectStore: IDBObjectStore) => IDBRequest
   ) {
      return new Promise<void>((resolve, reject) => {
         const objectStore = this.db.transaction(storeName, 'readwrite')
               .objectStore(storeName);

         const req = request(objectStore);

         req.onsuccess = () => resolve();
         req.onerror = () => reject(req.error);
      });
   }

   private cursor<T>(
      storeName: string,
      indexName: string,
      openCursor: (index: IDBIndex) => IDBRequest,
      limit?: number
   ): Promise<T[]> {
      return new Promise((resolve, reject) => {
         const store = this.db.transaction(storeName)
            .objectStore(storeName);

         const index = store.index(indexName);
         const request = openCursor(index);

         const result: T[] = [];

         request.onsuccess = (e) => {
            const cursor = request.result;
            if (cursor && (!limit || result.length < limit)) {
               result.push(cursor.value);
               cursor.continue();
            } else {
               resolve(result);
            }
         };
         request.onerror = () => reject(request.error);
      });
   }
}

function upgrade(request: IDBOpenDBRequest) {
   console.log('onUpgrade');

   const db = request.result;

   db.createObjectStore('metrics', {
      keyPath: 'key'
   });

   const store = db.createObjectStore('logs', {
      keyPath: 'id',
      autoIncrement: true
   });

   store.createIndex('timestamp', 'timestamp');
   store.createIndex('metric_timestamp', ['metricKey', 'timestamp']);
}

async function init(db: WebDatabase) {
   const existing = await db.listMetrics();
   if (existing.length == 0) {
      console.log('adding sample data');
      for (const metric of metrics) {
         await db.putMetric(metric);
      }
   }
   return db;
}

export function openDb(): Promise<WebDatabase> {
   const request = indexedDB.open('health-tracker', 1);

   request.onupgradeneeded = () => upgrade(request);

   return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(init(new WebDatabase(request.result)));
      request.onerror = () => reject(request.error);
   });
}
