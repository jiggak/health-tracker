import type { Metric } from '$lib';
export { openDb } from './db-static';

export interface DataStore {
   listMetrics():Promise<Metric[]>;

   putMetric(metric: Metric):void;
}
