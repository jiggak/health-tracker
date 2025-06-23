<script lang="ts">
   import Chart from './Chart.svelte';
   import type { PageProps } from './$types';
   import Shell from './Shell.svelte';
   import Number from '$lib/Number.svelte';

   const { data }: PageProps = $props();
   const { tiles } = $state(data);
</script>

<Shell>
   {#each tiles as tile}
      {#if tile.type == 'line-chart'}
         {#await tile.load(tile.days)}
            <p>Loading chart</p>
         {:then chartOptions}
            <Chart options={chartOptions} />
         {/await}
         <Number value={tile.days} valueChanged={(v) => tile.days = v} />
      {/if}
   {/each}
</Shell>