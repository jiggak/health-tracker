import type { LogEntry, Metric } from '$lib';
import type { DataStore } from './db';
import { metrics } from './db-static'

class WebDatabase implements DataStore {
   constructor(private db: IDBDatabase) { }

   listMetrics(): Promise<Metric[]> {
      return new Promise((resolve, reject) => {
         const request = this.db.transaction('metrics')
            .objectStore('metrics')
            .getAll();

         request.onsuccess = () => resolve(request.result);
         request.onerror = () => reject(request.error);
      });
   }

   putMetric(metric: Metric): Promise<void> {
      return new Promise((resolve, reject) => {
         const request = this.db.transaction('metrics', 'readwrite')
               .objectStore('metrics')
               .put(metric);

         request.onsuccess = () => resolve();
         request.onerror = () => reject(request.error);
      });
   }

   addLogEntry(entry: LogEntry): Promise<void> {
      return new Promise((resolve, reject) => {
         const request = this.db.transaction('logEntries', 'readwrite')
               .objectStore('logEntries')
               .add(entry);

         request.onsuccess = () => resolve();
         request.onerror = () => reject(request.error);
      });
   }

   listLogEntries(): Promise<LogEntry[]> {
      return new Promise((resolve, reject) => {
         const request = this.db.transaction('logEntries')
            .objectStore('logEntries')
            .getAll();

         request.onsuccess = () => resolve(request.result);
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
   // metricsStore.createIndex('key', 'key', { unique: true });

   db.createObjectStore('logEntries', {
      keyPath: 'id',
      autoIncrement: true
   });
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
