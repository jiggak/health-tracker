<script lang="ts">
   import Entry from './Entry.svelte';
   import { goto } from "$app/navigation";
   import { samples, LogEntry } from "$lib";

   function onCancel() {
      goto('/');
   }

   const entries = samples.map(m => new LogEntry(m));
   let selected = 0;
</script>

<div class="navbar bg-base-100 shadow-md">
   <div class="navbar-start">
      <button class="btn" onclick={onCancel}>Cancel</button>
   </div>

   <div class="navbar-end">
      <button class="btn btn-primary">Save All</button>
   </div>
</div>

<Entry entry={entries[selected]} />

<div class="dock justify-start">
   {#each entries as entry, i}
      <button onclick={() => selected = i} class:dock-active={i == selected}>
         <!-- <Icon name="home" /> -->
         <span class="dock-label">{entry.metric.label}</span>
      </button>
   {/each}
</div>