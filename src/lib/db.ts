import type { Favourite, Metric } from '$lib';
export { openDb } from './db-static';

export interface DataStore {
   listMetrics():Promise<Metric[]>;
}
