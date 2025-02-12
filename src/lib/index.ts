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
   value: number|string|undefined;
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

export function dateToString(d: Date): string {
   function pad(i: number): string {
      return i < 10? '0' + i : i.toString();
   }

   const year = d.getFullYear();
   const month = pad(d.getMonth()+1);
   const day = pad(d.getDate());
   const hour = pad(d.getHours());
   const minute = pad(d.getMinutes());

   return `${year}-${month}-${day}T${hour}:${minute}`;
}

export function stringToDate(s:string): Date {
   return new Date(Date.parse(s));
}
