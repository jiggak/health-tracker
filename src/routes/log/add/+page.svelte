<script lang="ts">
   import { goto } from '$app/navigation';
   import { openDb } from '$lib/db';
   import DateTime from '../DateTime.svelte';
   import LogForm from '../LogForm.svelte';
   import type { PageProps } from './$types';

   const { data }: PageProps = $props();
   const { model } = data;

   function onCancel() {
      goto('/');
   }

   async function onSave() {
      const db = await openDb();

      for (const record of model.toRecords()) {
         await db.addLog(record);
      }

      goto('/');
   }
</script>

<div class="navbar shadow-md">
   <div class="navbar-start">
      <button class="btn" onclick={onCancel}>Cancel</button>
   </div>

   <div class="navbar-center">
      <DateTime bind:timestamp={model.timestamp} />
   </div>

   <div class="navbar-end">
      <button class="btn btn-primary" onclick={onSave}>Save All</button>
   </div>
</div>

{#if model.selected}
   <LogForm entry={model.selected} />
{/if}

<div class="dock justify-start">
   {#each model.entries as entry, i}
      <div class="indicator" class:dock-active={i == model.index}>
         <span
            class="indicator-item indicator-center status status-secondary"
            class:hidden={!entry.dirty}></span>

         <button onclick={() => model.index = i}>
            <span class="dock-label">{entry.metric.label}</span>
         </button>
      </div>
   {/each}
</div>