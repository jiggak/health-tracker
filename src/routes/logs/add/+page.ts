import { NewLogs } from '../models.svelte';
import { openDb } from '$lib/db';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
   const db = await openDb();
   const metrics = await db.listMetrics();
   return {
      model: new NewLogs(metrics)
   };
}