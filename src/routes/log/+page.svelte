<script lang="ts">
   import Entry from './Entry.svelte';
   import { goto } from '$app/navigation';
   import type { PageProps } from './$types';

   function onCancel() {
      goto('/');
   }

   let { data }: PageProps = $props();
   let entries = $state(data.entries);
   let index = $state(0);
   let selected = $derived(entries[index]);
</script>

<div class="navbar bg-base-100 shadow-md">
   <div class="navbar-start">
      <button class="btn" onclick={onCancel}>Cancel</button>
   </div>

   <div class="navbar-end">
      <button class="btn btn-primary">Save All</button>
   </div>
</div>

{#if selected}
   <Entry entry={selected} />
{/if}

<div class="dock justify-start">
   {#each entries as entry, i}
      <div class="indicator" class:dock-active={i == index}>
         <span
            class="indicator-item indicator-center status status-info"
            class:hidden={!entry.dirty}></span>

         <button onclick={() => index = i}>
            <!-- <Icon name="home" /> -->
            <span class="dock-label">{entry.metric.label}</span>
         </button>
      </div>
   {/each}
</div>