<script lang="ts">
   import { goto } from '$app/navigation';
   import Confirm from '$lib/Confirm.svelte';
   import { openDb } from '$lib/db';
   import dayjs from 'dayjs';
   import DateTime from '../DateTime.svelte';
   import LogForm from '../LogForm.svelte';
   import type { PageProps } from './$types';
   import Shell from '../../Shell.svelte';

   const { data }: PageProps = $props();
   const { log } = data;

   let confirm: Confirm;

   function goBack() {
      const date = dayjs.unix(log.timestamp)
         .format('YYYY-MM-DD');
      goto(`/logs/${date}`);
   }

   function onCancel() {
      goBack();
   }

   async function onSave() {
      const db = await openDb();
      await db.updateLog(log.toRecord());
      goBack();
   }

   function onDelete() {
      confirm.open().then(async () => {
         const db = await openDb();
         await db.deleteLog(log.id);
         goBack();
      });
   }
</script>

<Shell>
   {#snippet navbar()}
      <div class="navbar-start">
         <button class="btn" onclick={onCancel}>Cancel</button>
      </div>

      <div class="navbar-center">
         <DateTime bind:timestamp={log.timestamp} />
      </div>

      <div class="navbar-end">
         <button class="btn btn-primary" onclick={onSave}>Save</button>
      </div>
   {/snippet}

   <LogForm entry={log.entry} />

   {#snippet dock()}
      <button class="btn btn-secondary" onclick={onDelete}>Delete</button>
   {/snippet}
</Shell>

<Confirm bind:this={confirm} />
