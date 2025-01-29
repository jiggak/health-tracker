<script lang="ts">
   import { getOptionLabel, MetricType, type LogEntry } from "$lib";
   import Tags from './Tags.svelte';

   let { entry }: {
      entry: LogEntry
   } = $props();

   let value = $state(entry.value);
   let tags = $state(entry.tags);
</script>

<div class="flex flex-col gap-4 m-4">
   <h2 class="text-lg text-center">{entry.metric.label}</h2>

   <div>
      {#if entry.metric.metricType == MetricType.SingleOption}
         <p class="h-8 text-center">
            {getOptionLabel(entry.metric.options!, value)}
         </p>
         <ul class="steps">
            {#each entry.metric.options! as option}
               <li data-content="●"
                  class="step"
                  class:step-primary={value == option.value}
                  onclick={() => value = option.value}>
               </li>
            {/each}
         </ul>
      {:else if entry.metric.metricType == MetricType.Text}
         <input class="input" type="text" />
      {/if}
   </div>

   {#if entry.metric.tags}
      <Tags
         tags={entry.metric.tags}
         values={tags}
         onValuesChanged={(val) => tags = val} />
   {/if}
</div>
