import { MetricType, type Favourite, type Metric } from '$lib';
import type { DataStore } from './db';

class StaticDatabase implements DataStore {
   listMetrics():Promise<Metric[]> {
      return Promise.resolve(metrics);
   }

   putMetric(metric: Metric) {
      return Promise.resolve();
   }
}

export function openDb():Promise<DataStore> {
   return Promise.resolve(new StaticDatabase());
}

export const metrics:Metric[] = [
   {
      key: 'stool',
      label: 'Stool',
      order: 3,
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
      ],
      tags: ['Mucus', 'Tiny', 'Low', 'Medium', 'Large', 'Thin']
   },
   {
      key: 'sleep',
      label: 'Sleep',
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
      order: 5,
      metricType: MetricType.Note
   }
];