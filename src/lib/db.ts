import type { LogRecord, Metric } from '$lib';
export { openDb } from './db-web';

export interface DataStore {
   listMetrics(): Promise<Metric[]>;

   putMetric(metric: Metric): Promise<void>;

   addLog(entry: LogRecord): Promise<void>;

   listLogs(startTs: number, endTs: number): Promise<LogRecord[]>;

   getLog(id: number): Promise<LogRecord>;
}
