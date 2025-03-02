<script lang="ts">
   import { goto } from '$app/navigation';
   import Confirm from '$lib/Confirm.svelte';
   import { openDb } from '$lib/db';
   import DateTime from '../DateTime.svelte';
   import LogForm from '../LogForm.svelte';
   import type { PageProps } from './$types';

   const { data }: PageProps = $props();
   const { log } = data;

   let confirm: Confirm;

   function onCancel() {
      goto('/history');
   }

   async function onSave() {
      const db = await openDb();
      await db.updateLog(log.toRecord());
      goto('/history');
   }

   function onDelete() {
      confirm.open().then(async () => {
         const db = await openDb();
         await db.deleteLog(log.id);
         goto('/history');
      });
   }
</script>

<div class="navbar shadow-md">
   <div class="navbar-start">
      <button class="btn" onclick={onCancel}>Cancel</button>
   </div>

   <div class="navbar-center">
      <DateTime bind:timestamp={log.timestamp} />
   </div>

   <div class="navbar-end">
      <button class="btn btn-primary" onclick={onSave}>Save</button>
   </div>
</div>

<LogForm entry={log.entry} />

<div class="dock">
   <button class="btn btn-secondary" onclick={onDelete}>Delete</button>
</div>

<Confirm bind:this={confirm} />