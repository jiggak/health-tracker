import { openDb } from '$lib/db';
import { Log } from '../models.svelte';
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
   const id = parseInt(params.id);

   const db = await openDb();
   const metrics = await db.listMetrics();
   const record = await db.getLog(id);
   const metric = metrics.find((m) => m.key == record.metricKey)!;

   return {
      log: new Log(metric, record),
      hideDock: true
   };
}