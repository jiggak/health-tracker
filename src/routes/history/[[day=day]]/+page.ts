import { openDb } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import dayjs from 'dayjs';
import type { LogEntry, LogEntryValue, Metric } from '$lib';

export const load: PageLoad = async ({ params }) => {
   if (!params.day) {
      redirect(307, 'history/' + dayjs().format('YYYY-MM-DD'));
   }

   const start = dayjs(params.day, 'YYYY-MM-DD');
   const end = start.add(1, 'day');

   const db = await openDb();
   const metrics = await db.listMetrics();
   const logs = await db.listLogEntries(start.unix(), end.unix());

   return {
      logs: HistoryEntry.fromDb(logs, metrics)
   }
}

class HistoryEntry {
   id: number;
   metric: Metric;
   value: LogEntryValue;
   time: { full: string, hour: string, minute: string, meridiem: string };
   tags: string[];

   constructor(metric: Metric, logEntry: LogEntry) {
      const ts = dayjs.unix(logEntry.timestamp);

      this.id = logEntry.id!;
      this.metric = metric;
      this.value = logEntry.value;
      this.time = {
         full: ts.format('hh:mm A'),
         hour: ts.format('hh'),
         minute: ts.format('mm'),
         meridiem: ts.format('A')
      };
      this.tags = logEntry.tags;
   }

   static fromDb(logs: LogEntry[], metrics: Metric[]) {
      return logs.map((l) => {
         const metric = metrics.find((m) => m.key == l.metricKey);
         if (!metric) {
            throw `Metric key ${l.metricKey} not found`;
         }
         return new HistoryEntry(metric, l);
      });
   }
}