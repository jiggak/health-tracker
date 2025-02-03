<script lang="ts">
   import { MetricType, type LogEntry } from '$lib';
   import Tags from './Tags.svelte';
   import QuantityList from './QuantityList.svelte';

   let { entry = $bindable() }: {
      entry: LogEntry
   } = $props();
</script>

<div class="flex flex-col gap-4 m-4">
   <h2 class="text-lg text-center">{entry.metric.label}</h2>

   <div>
      {#if entry.metric.metricType == MetricType.SingleOption}
         <p class="h-8 text-center">
            {entry.selectedOption()}
         </p>
         <ul class="steps">
            {#each entry.metric.options! as option}
               <li data-content="●"
                  class="step"
                  class:step-primary={entry.value == option.value}
                  onclick={() => entry.value = option.value}>
               </li>
            {/each}
         </ul>
      {:else if entry.metric.metricType == MetricType.Text}
         <input class="input w-full" type="text" bind:value={entry.value} />
      {:else if entry.metric.metricType == MetricType.NamedQuantity}
         <QuantityList metric={entry.metric}
            values={entry.values()}
            onValuesChange={(v) => entry.value = v}/>
      {:else if entry.metric.metricType == MetricType.Note}
         <textarea class="textarea w-full" bind:value={entry.value}></textarea>
      {/if}
   </div>

   {#if entry.metric.tags}
      <Tags
         tags={entry.metric.tags}
         onTagsChanged={(tags) => entry.metric.tags = tags}
         values={entry.tags}
         onValuesChanged={(tags) => entry.tags = tags} />
   {/if}
</div>
