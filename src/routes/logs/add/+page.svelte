<script lang="ts">
   import { openDb } from '$lib/db';
   import Icon from '$lib/Icon.svelte';
   import Shell from '../../Shell.svelte';
   import DateTime from '../DateTime.svelte';
   import LogForm from '../LogForm.svelte';
   import type { PageProps } from './$types';

   const { data }: PageProps = $props();
   const { model } = data;

   function goBack() {
      history.back();
   }

   async function onSave() {
      const db = await openDb();

      for (const record of model.toRecords()) {
         await db.addLog(record);
      }

      goBack()
   }
</script>

<Shell>
   {#snippet navbar()}
      <div class="navbar-start">
         <button class="btn btn-neutral" onclick={goBack}>Cancel</button>
      </div>

      <div class="navbar-center">
         <DateTime bind:timestamp={model.timestamp} />
      </div>

      <div class="navbar-end">
         <button class="btn btn-primary" onclick={onSave}>Save All</button>
      </div>
   {/snippet}

   {#if model.selected}
      <LogForm entry={model.selected} />
   {/if}

   {#snippet dock()}
      {#each model.entries as entry, i}
         <button class="indicator"
            class:dock-active={i == model.index}
            onclick={() => model.index = i}>

            <span
               class="indicator-item indicator-center status status-info"
               class:hidden={!entry.dirty}></span>

            {#if entry.metric.icon}
               <Icon name={entry.metric.icon} />
            {/if}

            <span class="dock-label">{entry.metric.label}</span>
         </button>
      {/each}
   {/snippet}
</Shell>
