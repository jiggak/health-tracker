import type { Favourite, KeyedValue, LogValue, Metric } from '$lib';

export class LogEntry {
   metric: Metric = $state()!;
   time: Date = $state(new Date());
   value?: LogValue | LogValue[] | KeyedValue = $state();
   tags: string[] = $state([]);
   dirty: boolean = $derived.by(() => {
      if (Array.isArray(this.value)) {
         return (this.value as LogValue[]).length > 0;
      }
      return this.value !== null
         && this.value !== undefined
         && this.value !== '';
   });

   constructor(metric:Metric) {
      this.metric = metric;
   }

   values(): LogValue[] {
      if (!this.value) {
         return [];
      }

      return this.value as LogValue[];
   }

   getKeyValue(key: string) {
      if (this.value) {
         return (this.value as KeyedValue)[key];
      }
   }

   setKeyValue(key: string, val?: LogValue) {
      if (!this.value && val !== undefined) {
         this.value = {
            [key]: val
         }
      } else if (typeof this.value === 'object') {
         const thisValue = this.value as KeyedValue;
         if (val !== undefined) {
            thisValue[key] = val;
         } else {
            delete thisValue[key];
            if (Object.keys(thisValue).length == 0) {
               this.value = undefined;
            }
         }
      }
   }

   favourite(): Favourite {
      return {
         value: this.value as LogValue,
         tags: this.tags
      };
   }
}