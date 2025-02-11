// place files you want to import through the `$lib` alias in this folder.

export interface Metric {
   key: string;
   label: string;
   order: number;
   metricType: MetricType;
   options?: MetricOption[];
   tags?: string[];
   favourites?: Favourite[];
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

export interface Favourite {
   value: LogValue,
   tags: string[]
}
