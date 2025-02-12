<script lang="ts">
   import Entry from './Entry.svelte';
   import { goto } from '$app/navigation';
   import type { PageProps } from './$types';
   import { dateToString, stringToDate } from '$lib';

   let { data }: PageProps = $props();

   const ordered = data.entries
      .toSorted((a, b) => a.metric.order - b.metric.order);

   let entries = $state(ordered);
   let index = $state(0);
   let selected = $derived(entries[index]);
   let dateTime = $state(new Date());

   function onCancel() {
      goto('/');
   }

   function onSave() {

   }
</script>

<div class="navbar bg-base-100 shadow-md">
   <div class="navbar-start">
      <button class="btn" onclick={onCancel}>Cancel</button>
   </div>

   <div class="navbar-center">
      <input type="datetime-local"
         class="input input-ghost"
         value={dateToString(dateTime)}
         onchange={({currentTarget}) => dateTime = stringToDate(currentTarget.value)} />
   </div>

   <div class="navbar-end">
      <button class="btn btn-primary" onclick={onSave}>Save All</button>
   </div>
</div>

{#if selected}
   <Entry entry={selected} />
{/if}

<div class="dock justify-start">
   {#each entries as entry, i}
      <div class="indicator" class:dock-active={i == index}>
         <span
            class="indicator-item indicator-center status status-secondary"
            class:hidden={!entry.dirty}></span>

         <button onclick={() => index = i}>
            <!-- <Icon name="home" /> -->
            <span class="dock-label">{entry.metric.label}</span>
         </button>
      </div>
   {/each}
</div>