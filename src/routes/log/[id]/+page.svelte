<script lang="ts">
   import { goto } from '$app/navigation';
   import { openDb } from '$lib/db';
   import DateTime from '../DateTime.svelte';
   import LogForm from '../LogForm.svelte';
   import type { PageProps } from './$types';

   const { data }: PageProps = $props();
   const { log } = data;

   function onCancel() {
      goto('/');
   }

   async function onSave() {
      const db = await openDb();
      await db.updateLog(log.toRecord());
      goto('/');
   }

   async function onDelete() {
      const db = await openDb();
      await db.deleteLog(log.id);
      goto('/');
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