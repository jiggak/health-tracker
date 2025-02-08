import type { Favourite, Metric } from '$lib';
import type { DataStore } from './db';

class WebDatabase implements DataStore {
   constructor(private db:IDBDatabase) { }

   listMetrics():Promise<Metric[]> {
      return new Promise((resolve, reject) => {
         const request = this.db.transaction('metrics')
            .objectStore('metrics')
            .getAll();

         request.onsuccess = () => resolve(request.result);
         request.onerror = () => reject(request.error);
      });
   }

   listFavourites(metric: Metric): Promise<Favourite[]> {
      return Promise.resolve([]);
   }
}

export function openDb():Promise<WebDatabase> {
   const request = indexedDB.open('health-tracker', 1);

   request.onupgradeneeded = () => {
      request.result.createObjectStore("metrics");
      console.log('createObjectStore');
   }

   return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(new WebDatabase(request.result));
      request.onerror = () => reject(request.error);
   });
}
