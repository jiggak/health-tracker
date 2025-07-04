import { openDb, type DataStore } from '$lib/db';
import dayjs from 'dayjs';
import type { PageLoad } from './$types';
import type { KeyedValue, LogRecord } from '$lib';

export const load: PageLoad = async () => {
   const db = await openDb();

   const tiles: Tile[] = [
      {
         type: TileType.LineChart,
         defaultDays: 7,
         dateFormat: 'ddd D',
         dataSources: [
            {
               metric: 'stool',
               valueKey: 'volume',
               label: 'Stool Volume',
               scale: 3
            },
            {
               metric: 'sleep',
               label: 'Hours Slept'
            }
         ]
      }
   ];

   return {
      tiles: tiles.map((t) => {
         if (t.type == TileType.LineChart) {
            return {
               type: TileType.LineChart,
               days: t.defaultDays,
               load: (days: number) => loadLineChart(db, t, days)
            };
         } else {
            throw `Unhandled tile type: ${t.type}`;
         }
      })
   }
}

async function loadLineChart(db: DataStore, tile: LineChartTile, days: number): Promise<LineChartOpts> {
   const labels = daysRange(days, tile.dateFormat);

   const end = dayjs().endOf('day');
   const start = end.add(-days, 'day');

   const logs = await db.listLogs(start.unix(), end.unix());

   const datasets = tile.dataSources.map((ds) => {
      const filteredLogs = logs.filter((l) => l.metricKey == ds.metric);
      const data = groupByDate(filteredLogs, tile.dateFormat, ds.valueKey, ds.scale);

      return {
         label: ds.label,
         data: labels.map((d) => data[d] || 0)
      };
   });

   return {
      labels: labels,
      datasets: datasets
   };
}

function groupByDate(logs: LogRecord[], dateFormat: string, valueKey?: string, scale?: number) {
   const result: {[key:string]: number} = {};

   for (const log of logs) {
      const d = dayjs.unix(log.timestamp)
         .format(dateFormat);

      let logValue: number;
      if (valueKey) {
         logValue = (log.value as KeyedValue)[valueKey] as number;
      } else {
         logValue = log.value as number;
      }

      if (logValue === undefined) {
         logValue = 0;
      }

      if (scale) {
         logValue *= scale;
      }

      result[d] = (result[d] || 0) + logValue;
   }

   return result;
}

function range(n: number): number[] {
   return [...Array(n).keys()];
}

function daysRange(days: number, dateFormat: string): string[] {
   const now = dayjs();
   return range(days)
      .map((i) => now.add(-i, 'day').format(dateFormat))
      .reverse();
}

enum TileType {
   LineChart = 'line-chart'
}

type Tile = LineChartTile;

interface TileCommon {
   type: TileType;
}

interface LineChartTile extends TileCommon {
   type: TileType.LineChart;
   defaultDays: number;
   dateFormat: string;
   dataSources: DataSource[];
}

export interface LineChartOpts {
   labels: string[];
   datasets: {
      label: string,
      data: number[]
   }[];
}

interface DataSource {
   metric: string;
   label: string;
   valueKey?: string;
   scale?: number;
}