<script lang="ts">
   import { MetricType, type Favourite, type LogValue } from '$lib';
   import { LogEntry } from './LogEntry.svelte';
   import Tags from './Tags.svelte';
   import QuantityList from './QuantityList.svelte';
   import SingleOption from './SingleOption.svelte';
   import Favourites from './Favourites.svelte';

   let { entry }: {
      entry: LogEntry
   } = $props();

   let favourites:Favourite[] = $state([
      { value: 'Toast and orange', tags: ['brown bread', 'orange', 'peanut butter']},
      { value: 'Cereal and fruit', tags: ['granola', 'yogurt', 'oat milk', 'banana']}
   ]);
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

   {#if entry.metric.favourites}
      <div class="collapse collapse-arrow bg-base-100 border border-base-300">
         <input type="checkbox" checked />
         <div class="collapse-title font-semibold">Favourites</div>
         <div class="collapse-content">
            <Favourites
               favourites={favourites}
               onFavouritesChanged={(v) => favourites = v}
               onFavouriteClick={(v) => { entry.value = v.value; entry.tags = v.tags; }}/>

            <button class="btn btn-outline"
               onclick={() => favourites.push({value: entry.value as LogValue, tags: entry.tags})}>

               Add to favourites
            </button>
         </div>
      </div>
   {/if}
</div>
