<script lang="ts">
    import { MetricType, type LogEntry } from "$lib";

   let { entry }:{
      entry: LogEntry
   } = $props();

   let value = $state(entry.value);
</script>

<p>{entry.metric.label}</p>

{#if entry.metric.metricType == MetricType.SingleOption}
   <ul class="steps">
      {#each entry.metric.options! as option}
         <li data-content="●" class="step" class:step-primary={value == option.value}>
            <button onclick={() => value = option.value}>
               {option.label}
            </button>
         </li>
      {/each}
   </ul>
{:else if entry.metric.metricType == MetricType.Text}
   <input class="input" type="text" />
{/if}