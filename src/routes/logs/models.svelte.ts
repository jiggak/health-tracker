import { findOption, MetricType, type Favourite, type KeyedValue, type LogEntryValue, type LogRecord, type LogValue, type Metric, type QuantityValue } from '$lib';
import dayjs from 'dayjs';

export class LogEntry {
   metric: Metric = $state()!;
   value?: LogEntryValue = $state();
   tags: string[] = $state([]);
   dirty: boolean = $derived.by(() => {
      return this.value !== null
         && this.value !== undefined
         && this.value !== '';
   });

   constructor(metric: Metric, record: LogRecord|undefined = undefined) {
      this.metric = metric;
      if (record) {
         this.value = record.value;
         this.tags = record.tags;
      }
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

export class NewLogs {
   timestamp: number = $state(dayjs().unix());
   entries: LogEntry[] = $state()!;
   index: number = $state(0);
   selected: LogEntry = $derived(this.entries[this.index]);

   constructor(metrics: Metric[]) {
      this.entries = metrics
         .map((m) => new LogEntry(m))
         .toSorted((a, b) => a.metric.order - b.metric.order);
   }

   toRecords(): LogRecord[] {
      return this.entries
         .filter((e) => e.dirty)
         .map((e) => {
            return {
               metricKey: e.metric.key,
               timestamp: $state.snapshot(this.timestamp),
               tags: $state.snapshot(e.tags),
               value: $state.snapshot(e.value!)
            };
         });
   }
}

export class Log {
   id: number;
   timestamp: number = $state()!;
   time: TimeDetail;
   entry: LogEntry;

   constructor(metric: Metric, record: LogRecord) {
      this.id = record.id!;
      this.timestamp = record.timestamp;
      this.time = new TimeDetail(this.timestamp);
      this.entry = new LogEntry(metric, record);
   }

   toRecord(): LogRecord {
      return {
         id: this.id,
         metricKey: this.entry.metric.key,
         timestamp: $state.snapshot(this.timestamp),
         tags: $state.snapshot(this.entry.tags),
         value: $state.snapshot(this.entry.value!)
      };
   }

   static fromDb(logs: LogRecord[], metrics: Metric[]) {
      return logs.map((l) => {
         const metric = metrics.find((m) => m.key == l.metricKey);
         if (!metric) {
            throw `Metric key ${l.metricKey} not found`;
         }
         return new Log(metric, l);
      });
   }

   valueToString() {
      if (this.entry.metric.metricType == MetricType.Grouped) {
         const value = this.entry.value as KeyedValue;
         const metric = this.entry.metric;

         return Object.entries(value)
            .map(([k, v]) => findOption(metric.metrics[k].options, v)!.label)
            .join(', ');
      } else if (this.entry.metric.metricType == MetricType.NamedQuantity) {
         const value = this.entry.value as QuantityValue;

         return `${value.name} ${value.amount} ${value.unit}`;
      }

      return this.entry.value!.toString();
   }
}

class TimeDetail {
   full: string;
   hour: string;
   minute: string;
   meridiem: string;

   constructor(ts: number) {
      const d = dayjs.unix(ts);

      this.full = d.format('hh:mm A');
      this.hour = d.format('hh');
      this.minute = d.format('mm');
      this.meridiem = d.format('A');
   }
}
