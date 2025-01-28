<script lang="ts">
   import { MetricType, type LogEntry } from "$lib";
   import Tags from './Tags.svelte';

   let { entry }: {
      entry: LogEntry
   } = $props();

   let value = $state(entry.value);
   let tags = $state(entry.tags);
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

{#if entry.metric.tags}
   <Tags
      tags={entry.metric.tags}
      values={tags}
      onValuesChanged={(val) => tags = val} />
{/if}