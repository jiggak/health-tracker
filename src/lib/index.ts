// place files you want to import through the `$lib` alias in this folder.

export interface Metric {
   label: string;
   metricType: MetricType;
   options?: MetricOption[];
   tags?: string[];
   favourites: boolean;
   recents?: number;
   units?: string[];
}

export enum MetricType {
   Text = 'text',
   Note = 'note',
   SingleOption = 'option',
   NamedQuantity = 'quantity'
}

export interface MetricOption {
   label: string;
   value: number|string;
}

export interface QuantityValue {
   name: string;
   amount: number;
   unit: string;
}

export type LogValue = string|number|QuantityValue;

export class LogEntry {
   metric: Metric;
   time: Date;
   value?: LogValue|LogValue[];
   tags: string[];

   constructor(metric:Metric) {
      this.metric = metric;
      this.time = new Date();
      this.tags = [];
   }

   selectedOption() {
      const opt = this.metric.options?.find(o => o.value == this.value)
      return opt != null? opt.label : null;
   }

   values(): LogValue[] {
      if (this.value == null) {
         this.value = [];
      } else if(!Array.isArray(this.value)) {
         this.value = [this.value];
      }

      return this.value as LogValue[];
   }

   dirty() {
      if (Array.isArray(this.value)) {
         return (this.value as LogValue[]).length > 0;
      }
      return this.value;
   }
}

export interface Favourite {
   value: LogValue,
   tags: string[]
}

export const samples:Metric[] = [
   {
      label: 'Stool',
      metricType: MetricType.SingleOption,
      options: [
         { label: 'None', value: 0, },
         { label: 'Separate hard lumps', value: 1 },
         { label: 'Sausage shaped with cracks', value: 2 },
         { label: 'Smooth sausage shaped', value: 3 },
         { label: 'Soft blobs clear cut edges', value: 4 },
         { label: 'Mushy with ragged edges', value: 5 },
         { label: 'Liquid with no solids', value: 6 },
      ],
      tags: ['Mucus', 'Tiny', 'Low', 'Medium', 'Large', 'Thin'],
      favourites: false
   },
   {
      label: 'Sleep',
      metricType: MetricType.SingleOption,
      options: [
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
      ],
      favourites: false
   },
   {
      label: 'Food',
      metricType: MetricType.Text,
      tags: ['brown bread', 'orange', 'peanut butter', 'granola', 'yogurt', 'oat milk', 'banana'],
      favourites: true
   },
   {
      label: 'Medication',
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
      favourites: true
   },
   {
      label: 'Notes',
      metricType: MetricType.Note,
      favourites: false
   }
];