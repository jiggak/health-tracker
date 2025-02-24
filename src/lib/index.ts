// place files you want to import through the `$lib` alias in this folder.

interface MetricCommon {
   key: string;
   label: string;
   order: number;
   metricType: MetricType;
   tags?: string[];
   favourites?: Favourite[];
}

export enum MetricType {
   Text = 'text',
   Note = 'note',
   SingleOption = 'option',
   NamedQuantity = 'quantity',
   Grouped = 'grouped'
}

interface TextMetric {
   metricType: MetricType.Text
}

interface NoteMetric {
   metricType: MetricType.Note
}

interface SingleOptionMetric {
   metricType: MetricType.SingleOption;
   options: MetricOption[];
}

interface NamedQuantityMetric {
   metricType: MetricType.NamedQuantity;
   units: string[];
}

interface GroupedMetric {
   metricType: MetricType.Grouped;
   metrics: {
      [key: string]: SingleOptionMetric
   }
}

export type Metric = MetricCommon & (
   | TextMetric
   | NoteMetric
   | SingleOptionMetric
   | NamedQuantityMetric
   | GroupedMetric
)

export interface MetricOption {
   label: string;
   value: number|string|undefined;
}

export interface QuantityValue {
   name: string;
   amount: number;
   unit: string;
}

export interface KeyedValue {
   [key: string]: LogValue
}

export type LogValue = string | number | QuantityValue;

export interface Favourite {
   value: LogValue;
   tags: string[];
}

export interface LogEntry {
   id?: number,
   metricKey: string;
   timestamp: number;
   value: LogValue | LogValue[] | KeyedValue;
   tags: string[];
}
