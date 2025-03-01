<script lang="ts">
   import LogForm from '../LogForm.svelte';
   import { goto } from '$app/navigation';
   import type { PageProps } from './$types';
   import { openDb } from '$lib/db';
   import dayjs from 'dayjs';

   const { data }: PageProps = $props();
   const { model } = data;

   function onCancel() {
      goto('/');
   }

   async function onSave() {
      const db = await openDb();

      for (const record of model.records()) {
         await db.addLog(record);
      }

      goto('/');
   }

   function timestampToString(ts: number): string {
      return dayjs.unix(ts).format('YYYY-MM-DD[T]HH:mm');
   }

   function stringToTimestamp(s: string): number {
      return dayjs(s, 'YYYY-MM-DD[T]HH:mm').unix();
   }
</script>

<div class="navbar shadow-md">
   <div class="navbar-start">
      <button class="btn" onclick={onCancel}>Cancel</button>
   </div>

   <div class="navbar-center">
      <input type="datetime-local"
         class="input input-ghost"
         value={timestampToString(model.timestamp)}
         onchange={({currentTarget}) => model.timestamp = stringToTimestamp(currentTarget.value)} />
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