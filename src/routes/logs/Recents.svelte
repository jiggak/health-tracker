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
         <li class="list-row cursor-pointer" onclick={() => onRecentClick(log)}>
            <span>{log.value}</span>
         </li>
      {:else}
         <div role="alert" class="alert">
            <Icon name="exclamation" />
            <span>Nothing here</span>
         </div>
      {/each}
   </ul>
{/await}
