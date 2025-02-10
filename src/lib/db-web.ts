import type { Metric } from '$lib';
import type { DataStore } from './db';
import { metrics } from './db-static'

class WebDatabase implements DataStore {
   constructor(private db: IDBDatabase) { }

   listMetrics():Promise<Metric[]> {
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
               .put(metric, metric.key);

         request.onsuccess = () => resolve();
         request.onerror = () => reject(request.error);
      });
   }
}

function upgrade(request: IDBOpenDBRequest) {
   console.log('onUpgrade');
   const metricsStore = request.result.createObjectStore('metrics');
   metricsStore.createIndex('key', 'key', { unique: true });
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
