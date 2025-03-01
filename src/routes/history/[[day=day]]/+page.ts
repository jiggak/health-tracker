import { openDb } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import dayjs from 'dayjs';
import { Log } from '../../log/models.svelte';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
   if (!params.day) {
      redirect(307, 'history/' + dayjs().format('YYYY-MM-DD'));
   }

   const start = dayjs(params.day, 'YYYY-MM-DD');
   const end = start.add(1, 'day');

   const db = await openDb();
   const metrics = await db.listMetrics();
   const logs = await db.listLogs(start.unix(), end.unix());

   return {
      logs: Log.fromDb(logs, metrics)
   }
}
