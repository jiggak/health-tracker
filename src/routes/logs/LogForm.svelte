<script lang="ts">
   import { MetricType, type Favourite,type LogValue, type QuantityValue } from '$lib';
   import { LogEntry } from './models.svelte';
   import Tags from './Tags.svelte';
   import Quantity from './Quantity.svelte';
   import SingleOption from './SingleOption.svelte';
   import Favourites from './Favourites.svelte';
   import { openDb } from '$lib/db';
   import Recents from './Recents.svelte';
   import { Accordion, AccordionGroup } from '$lib/accordion';

   let { entry }: {
      entry: LogEntry
   } = $props();

   async function addFavourite() {
      if (entry.dirty) {
         entry.metric.favourites!.push(entry.favourite());
      }

      await updateMetric();
   }

   async function setFavourites(favourites: Favourite[]) {
      entry.metric.favourites = favourites;
      await updateMetric();
   }

   async function setTags(tags: string[]) {
      entry.metric.tags!.values = tags;
      await updateMetric();
   }

   async function updateMetric() {
      const db = await openDb();
      await db.putMetric($state.snapshot(entry.metric));
   }

   let tab = $state(['fav']);

   function onAccordionClick(id:string) {
      if (tab.length > 0) {
         tab = [id];
      }
   }
</script>

<div class="flex flex-col gap-4 m-4">
   <h2 class="text-lg font-semibold text-center">{entry.metric.label}</h2>

   <div>
      {#if entry.metric.metricType == MetricType.SingleOption}
         <SingleOption
            options={entry.metric.options}
            value={entry.value as LogValue}
            onValueChanged={(val) => entry.value = val} />
      {:else if entry.metric.metricType == MetricType.Text}
         <input class="input w-full" type="text" bind:value={entry.value} />
      {:else if entry.metric.metricType == MetricType.NamedQuantity}
         <Quantity
            units={entry.metric.units}
            value={entry.value as QuantityValue}
            onValueChange={(v) => entry.value = v} />
      {:else if entry.metric.metricType == MetricType.Note}
         <textarea class="textarea w-full" bind:value={entry.value}></textarea>
      {:else if entry.metric.metricType == MetricType.Grouped}
         {#each Object.entries(entry.metric.metrics) as [key, metric]}
            {#if metric.metricType == MetricType.SingleOption}
               <SingleOption
                  options={metric.options}
                  value={entry.getKeyValue(key)}
                  onValueChanged={(val) => entry.setKeyValue(key, val!)} />
            {/if}
         {/each}
      {/if}
   </div>

   {#if entry.metric.tags}
      <Tags
         tags={entry.metric.tags.values}
         search={entry.metric.tags.search == true}
         onTagsChanged={async (tags) => await setTags(tags)}
         values={entry.tags}
         onValuesChanged={(tags) => entry.tags = tags} />
   {/if}

   <AccordionGroup>
      {#if entry.metric.favourites}
         <Accordion name="Favourites">
            <Favourites
               metric={entry.metric}
               favourites={entry.metric.favourites}
               onFavouritesChanged={async (v) => await setFavourites(v)}
               onFavouriteClick={(v) => { entry.value = v.value; entry.tags = v.tags; }}/>

            <button class="btn btn-neutral mt-4" onclick={addFavourite}>
               Add to favourites
            </button>
         </Accordion>
      {/if}
      {#if entry.metric.recent}
         <Accordion name="Recent">
            <Recents
               count={entry.metric.recent}
               metricKey={entry.metric.key}
               onRecentClick={(v) => { entry.value = v.value; entry.tags = v.tags; }}/>
         </Accordion>
      {/if}
   </AccordionGroup>

   <!-- {#if entry.metric.favourites}
      <div class="collapse collapse-arrow border border-base-300">
         <input type="checkbox" onchange={() => onAccordionClick('fav')} value="fav" bind:group={tab} />
         <div class="collapse-title font-semibold">Favourites</div>
         <div class="collapse-content">
            <Favourites
               metric={entry.metric}
               favourites={entry.metric.favourites}
               onFavouritesChanged={async (v) => await setFavourites(v)}
               onFavouriteClick={(v) => { entry.value = v.value; entry.tags = v.tags; }}/>

            <button class="btn btn-neutral mt-4" onclick={addFavourite}>
               Add to favourites
            </button>
         </div>
      </div>
   {/if}

   {#if entry.metric.recent}
      <div class="collapse collapse-arrow border border-base-300">
         <input type="checkbox" onchange={() => onAccordionClick('recent')} value="recent" bind:group={tab} />
         <div class="collapse-title font-semibold">Recent</div>
         <div class="collapse-content">
            <Recents
               count={entry.metric.recent}
               metricKey={entry.metric.key}
               onRecentClick={(v) => { entry.value = v.value; entry.tags = v.tags; }}/>
         </div>
      </div>
   {/if} -->
</div>
