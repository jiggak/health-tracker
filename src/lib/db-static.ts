import { MetricType, type LogRecord, type Metric } from '$lib';
import type { DataStore } from './db';

class StaticDatabase implements DataStore {
   listMetrics() {
      return Promise.resolve(metrics);
   }

   putMetric(metric: Metric) {
      const i = metrics.findIndex((m) => m.key == metric.key);

      if (i >= 0) {
         metrics[i] = metric;
      } else {
         metrics.push(metric);
      }

      return Promise.resolve();
   }

   addLog(entry: LogRecord) {
      records.push(entry);
      return Promise.resolve();
   }

   updateLog(log: LogRecord) {
      const index = records.findIndex((l) => l.id == log.id);
      if (index < 0) {
         return Promise.reject();
      } else {
         records[index] = log;
         return Promise.resolve();
      }
   }

   deleteLog(id: number) {
      const index = records.findIndex((l) => l.id == id);
      if (index < 0) {
         return Promise.reject();
      } else {
         records.splice(index, 1);
         return Promise.resolve();
      }
   }

   listLogs(startTs: number, endTs: number) {
      const results = records
         .filter((x) => x.timestamp >= startTs && x.timestamp <= endTs);
      return Promise.resolve(results);
   }

   getLog(id: number) {
      const result = records.find((x) => x.id == id);
      if (result) {
         return Promise.resolve(result);
      } else {
         return Promise.reject();
      }
   }
}

export function openDb():Promise<DataStore> {
   return Promise.resolve(new StaticDatabase());
}

const records: LogRecord[] = [];

export const metrics: Metric[] = [
   {
      key: 'stool',
      label: 'Stool',
      icon: 'poop',
      order: 3,
      metricType: MetricType.Grouped,
      metrics: {
         type: {
            metricType: MetricType.SingleOption,
            options: [
               { label: 'Select stool type', value: undefined },
               { label: 'None', value: 0, },
               { label: 'Separate hard lumps', value: 1 },
               { label: 'Sausage shaped with cracks', value: 2 },
               { label: 'Smooth sausage shaped', value: 3 },
               { label: 'Soft blobs clear cut edges', value: 4 },
               { label: 'Mushy with ragged edges', value: 5 },
               { label: 'Liquid with no solids', value: 6 },
            ]
         },
         volume: {
            metricType: MetricType.SingleOption,
            options: [
               { label: 'Select volume', value: undefined },
               { label: 'Tiny', value: 0.1 },
               { label: 'Tiny Low', value: 0.5 },
               { label: 'Low', value: 1.0 },
               { label: 'Low Medium', value: 1.5 },
               { label: 'Medium', value: 2.0 },
               { label: 'Medium High', value: 2.5 },
               { label: 'High', value: 3.0 },
            ]
         }
      },
      tags: ['Mucus', 'Thin']
   },
   {
      key: 'sleep',
      label: 'Sleep',
      icon: 'moon',
      order: 2,
      metricType: MetricType.SingleOption,
      options: [
         { label: 'Select hours slept', value: undefined },
         { label: 'Hour or less', value: 1 },
         { label: '2 hours', value: 2 },
         { label: '3 hours', value: 3 },
         { label: '4 hours', value: 4 },
         { label: '5 hours', value: 5 },
         { label: '6 hours', value: 6 },
         { label: '7 hours', value: 7 },
         { label: '8 hours', value: 8 },
         { label: '9 hours', value: 9 },
         { label: 'More than 9 hours', value: 10 },
      ],
      tags: [
         'difficulty falling asleep',
         'waking during sleep',
         'toss & turn'
      ]
   },
   {
      key: 'food',
      label: 'Food',
      icon: 'carrot',
      order: 1,
      metricType: MetricType.Text,
      tags: ['brown bread', 'orange', 'peanut butter', 'granola', 'yogurt', 'oat milk', 'banana'],
      favourites: [
         { value: 'Toast and orange', tags: ['brown bread', 'orange', 'peanut butter']},
         { value: 'Cereal and fruit', tags: ['granola', 'yogurt', 'oat milk', 'banana']}
      ]
   },
   {
      key: 'medication',
      label: 'Medication',
      icon: 'medicine',
      order: 4,
      metricType: MetricType.NamedQuantity,
      units: [
         'capsule',
         'drop',
         'ml',
         'oz',
         'mg',
         'mcg',
         'pc',
         'pill',
         'scoop',
         'tsp',
         'tbsp'
      ],
      favourites: []
   },
   {
      key: 'notes',
      label: 'Notes',
      icon: 'book',
      order: 5,
      metricType: MetricType.Note
   }
];