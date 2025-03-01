<script lang="ts">
   import DateTime from '../DateTime.svelte';
   import LogForm from '../LogForm.svelte';
   import type { PageProps } from './$types';

   const { data }: PageProps = $props();
   const { log } = data;
</script>

<div class="navbar shadow-md">
   <div class="navbar-start">
      <button class="btn">Cancel</button>
   </div>

   <div class="navbar-center">
      <DateTime bind:timestamp={log.timestamp} />
   </div>

   <div class="navbar-end">
      <button class="btn btn-primary">Save</button>
   </div>
</div>

<LogForm entry={log.entry} />

<div class="dock">
   <button class="btn btn-secondary">Delete</button>
</div>