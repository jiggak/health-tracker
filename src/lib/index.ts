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
