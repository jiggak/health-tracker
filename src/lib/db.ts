import type { LogRecord, Metric } from '$lib';
import { metrics } from './db-static'
// export { _openDb as openDb } from './db-web';
export { _openDb as openDb } from './db-sql';

export interface DataStore {
   listMetrics(): Promise<Metric[]>;

   putMetric(metric: Metric): Promise<void>;

   addLog(log: LogRecord): Promise<void>;

   updateLog(log: LogRecord): Promise<void>;

   deleteLog(id: number): Promise<void>;

   listLogs(startTs: number, endTs: number): Promise<LogRecord[]>;

   listRecentLogs(count: number, metricKey: string): Promise<LogRecord[]>;

   getLog(id: number): Promise<LogRecord>;
}

export async function init<T extends DataStore>(db: T) {
   const existing = await db.listMetrics();
   if (existing.length == 0) {
      console.log('adding sample data');
      for (const metric of metrics) {
         await db.putMetric(metric);
      }
   }
   return db;
}
