import type { LogRecord, Metric } from '$lib';
import { init, type DataStore } from './db';
import Database from '@tauri-apps/plugin-sql';

interface SqlMetric {
   metric_key: string,
   label: string,
   position: number,
   metric_type: string,
   properties?: string
}

interface SqlLogRecord {
   id: number,
   metric_key: string,
   timestamp: number,
   value: string,
   tags?: string
}

class SqlDatabase implements DataStore {
   constructor(private db: Database) { }

   async listMetrics(): Promise<Metric[]> {
      const records = await this.db.select<SqlMetric[]>('SELECT * FROM metrics');

      return records.map((r) => ({
         key: r.metric_key,
         label: r.label,
         order: r.position,
         metricType: r.metric_type,
         ...JSON.parse(r.properties ?? '{}')
      }));
   }

   async putMetric(metric: Metric): Promise<void> {
      const { key, label, order, metricType, ...properties } = metric;

      const exists = await this.db.select<boolean>(
         'SELECT EXISTS (' +
         '   SELECT 1 FROM metrics WHERE metric_key = $1' +
         ')', [key]
      );

      if (exists) {
         await this.db.execute(
            'UPDATE metrics SET' +
            ' label = $2,' +
            ' position = $3,' +
            ' metric_type = $4,' +
            ' properties = $5' +
            ' WHERE metric_key = $1',
            [key, label, order, metricType, JSON.stringify(properties)]
         );
      } else {
         await this.db.execute(
            'INSERT INTO metrics (metric_key, label, position, metric_type, properties)' +
            ' VALUES ($1, $2, $3, $4, $5)',
            [key, label, order, metricType, JSON.stringify(properties)]
         );
      }
   }

   async addLog(log: LogRecord): Promise<void> {
      await this.db.execute(
         'INSERT INTO logs (metric_key, timestamp, value, tags)' +
         ' VALUES ($1, $2, $3, $4)',
         [log.metricKey, log.timestamp, JSON.stringify(log.value), JSON.stringify(log.tags)]
      );
   }

   async updateLog(log: LogRecord): Promise<void> {
      await this.db.execute(
         'UPDATE logs SET' +
         ' metric_key = $1,' +
         ' timestamp = $2,' +
         ' value = $3,' +
         ' tags = $4' +
         ' WHERE id = $5',
         [log.metricKey, log.timestamp, JSON.stringify(log.value), JSON.stringify(log.tags), log.id]
      );
   }

   async deleteLog(id: number): Promise<void> {
      await this.db.execute(
         'DELETE FROM logs WHERE id = $1', [id]
      );
   }

   async listLogs(startTs: number, endTs: number): Promise<LogRecord[]> {
      const records = await this.db.select<SqlLogRecord[]>(
         'SELECT * FROM logs WHERE timestamp BETWEEN $1 AND $2',
         [startTs, endTs]
      );

      return records.map((r) => sqlToLogRecord(r));
   }

   async listRecentLogs(count: number, metricKey: string): Promise<LogRecord[]> {
      const records = await this.db.select<SqlLogRecord[]>(
         'SELECT * FROM logs WHERE metric_key = $1' +
         ' order by timestamp desc' +
         ' LIMIT $2',
         [metricKey, count]
      );

      return records.map((r) => sqlToLogRecord(r));
   }

   async getLog(id: number): Promise<LogRecord> {
      const records = await this.db.select<SqlLogRecord[]>(
         'SELECT * FROM logs WHERE id = $1', [id]
      );

      return sqlToLogRecord(records[0]);
   }
}

function sqlToLogRecord(r: SqlLogRecord) {
   return {
      id: r.id,
      metricKey: r.metric_key,
      timestamp: r.timestamp,
      value: JSON.parse(r.value),
      tags: r.tags ? JSON.parse(r.tags) : null
   };
}

export async function _openDb(): Promise<SqlDatabase> {
   const db = await Database.load('sqlite:logs.db');

   // enable foreign key constraints
   await db.execute('PRAGMA foreign_keys = ON;');

   return init(new SqlDatabase(db));
}