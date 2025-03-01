import type { LogRecord, Metric } from '$lib';
export { openDb } from './db-web';

export interface DataStore {
   listMetrics(): Promise<Metric[]>;

   putMetric(metric: Metric): Promise<void>;

   addLog(log: LogRecord): Promise<void>;

   updateLog(log: LogRecord): Promise<void>;

   deleteLog(id: number): Promise<void>;

   listLogs(startTs: number, endTs: number): Promise<LogRecord[]>;

   getLog(id: number): Promise<LogRecord>;
}
