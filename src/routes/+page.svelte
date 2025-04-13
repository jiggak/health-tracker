<script lang="ts">
   import Chart from './Chart.svelte';
   import type { PageProps } from './$types';
    import Shell from './Shell.svelte';

   const { data }: PageProps = $props();
   const { tiles } = data;
</script>

<Shell>
   {#each tiles as tile}
      {#if tile.type == 'line-chart'}
         {#await tile.data}
            <p>Loading chart</p>
         {:then chartOptions}
            <Chart options={chartOptions} />
         {/await}
      {/if}
   {/each}
</Shell>