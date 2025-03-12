<script lang="ts">
   import type { LogRecord } from '$lib';
   import { openDb } from '$lib/db';
   import Icon from '$lib/Icon.svelte';

   let { count, metricKey, onRecentClick }: {
      count: number,
      metricKey: string,
      onRecentClick(v: LogRecord): void
   } = $props();

   async function listRecent() {
      const db = await openDb();
      return await db.listRecentLogs(count, metricKey);
   }
</script>

{#await listRecent()}
   <p>Loading</p>
{:then logs}
   <ul class="list rounded-box shadow-md my-4">
      {#each logs as log}
         <li class="list-row">
            <button class="list-col-grow text-left cursor-pointer"
               onclick={() => onRecentClick(log)}>

               <span>{log.value}</span>
               <div class="flex flex-wrap gap-2">
                  {#each log.tags as tag}
                     <span class="badge badge-sm badge-soft badge-primary">{tag}</span>
                  {/each}
               </div>
            </button>
         </li>
      {:else}
         <div role="alert" class="alert">
            <Icon name="exclamation" />
            <span>Nothing here</span>
         </div>
      {/each}
   </ul>
{/await}
