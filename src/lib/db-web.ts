import type { Metric } from '$lib';
import type { DataStore } from './db';

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
}

function upgrade(request: IDBOpenDBRequest) {
   request.result.createObjectStore('metrics');
   console.log('createObjectStore');
}

export function openDb(): Promise<WebDatabase> {
   const request = indexedDB.open('health-tracker', 1);

   request.onupgradeneeded = () => upgrade(request);

   return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(new WebDatabase(request.result));
      request.onerror = () => reject(request.error);
   });
}
