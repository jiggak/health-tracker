import type { LogEntry, Metric } from '$lib';
export { openDb } from './db-web';

export interface DataStore {
   listMetrics(): Promise<Metric[]>;

   putMetric(metric: Metric): Promise<void>;

   addLogEntry(entry: LogEntry): Promise<void>;

   listLogEntries(): Promise<LogEntry[]>;
}
