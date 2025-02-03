<script lang="ts">
   import { MetricType, type LogEntry, type LogValue } from '$lib';
   import Tags from './Tags.svelte';
   import QuantityList from './QuantityList.svelte';
   import SingleOption from './SingleOption.svelte';

   let { entry = $bindable() }: {
      entry: LogEntry
   } = $props();
</script>

<div class="flex flex-col gap-4 m-4">
   <h2 class="text-lg text-center">{entry.metric.label}</h2>

   <div>
      {#if entry.metric.metricType == MetricType.SingleOption}
         <SingleOption
            options={entry.metric.options!}
            value={entry.value as LogValue}
            onValueChanged={(v) => entry.value = v} />
      {:else if entry.metric.metricType == MetricType.Text}
         <input class="input w-full" type="text" bind:value={entry.value} />
      {:else if entry.metric.metricType == MetricType.NamedQuantity}
         <QuantityList
            metric={entry.metric}
            values={entry.values()}
            onValuesChanged={(v) => entry.value = v} />
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
