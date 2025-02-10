import type { LogValue, Metric } from '$lib';

export class LogEntry {
   metric: Metric = $state()!;
   time: Date = $state(new Date());
   value?: LogValue|LogValue[] = $state();
   tags: string[] = $state([]);
   dirty: boolean = $derived.by(() => {
      if (Array.isArray(this.value)) {
         return (this.value as LogValue[]).length > 0;
      }
      return !!this.value;
   });

   constructor(metric:Metric) {
      this.metric = metric;
   }

   values(): LogValue[] {
      if (this.value == null) {
         return [];
      } else if(!Array.isArray(this.value)) {
         return [this.value];
      }

      return this.value as LogValue[];
   }
}