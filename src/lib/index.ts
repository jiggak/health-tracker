// place files you want to import through the `$lib` alias in this folder.

export type IconName = 'home' | 'plus' | 'calendar' | 'trash' | 'pencil' |
   'exclamation' | 'arrow-left' | 'arrow-right' | 'poop' | 'carrot' |
   'medicine' | 'moon' | 'book' | 'search' | 'clear' | 'minus' | 'palette' |
   'down-arrow';

interface MetricCommon {
   key: string;
   label: string;
   order: number;
   metricType: MetricType;
   tags?: MetricTags;
   favourites?: Favourite[];
   icon?: IconName;
   recent?: number;
}

interface MetricTags {
   values: string[];
   search?: boolean;
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

export enum Quality {
   Good = 1,
   Neutral = 0,
   Bad = -1
}

export interface MetricOption {
   label: string;
   value: number|string|undefined;
   quality?: Quality
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

export type LogEntryValue = LogValue | KeyedValue;

export interface LogRecord {
   id?: number;
   metricKey: string;
   timestamp: number;
   value: LogEntryValue;
   tags: string[];
}

export function findOption(options: MetricOption[], val: LogValue) {
   return options.find((o) => o.value == val);
}
