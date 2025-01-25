<script lang="ts">
   import { goto } from "$app/navigation";
   import { sampleMetrics, LogEntry } from "$lib";

   function onCancel() {
      goto('/');
   }

   const logs = sampleMetrics.map(m => new LogEntry(m));
   let selected = 0;
</script>

<div class="navbar bg-base-100 shadow-sm">
   <div class="navbar-start">
      <button class="btn" onclick={onCancel}>Cancel</button>
   </div>

   <div class="navbar-end">
      <button class="btn">Save All</button>
   </div>
</div>

<p>{logs[selected].metric.label}</p>

<div class="dock justify-start">
   {#each logs as log, i}
      <button onclick={() => selected = i} class:dock-active={i == selected}>
         <!-- <Icon name="home" /> -->
         <span class="dock-label">{log.metric.label}</span>
      </button>
   {/each}
</div>