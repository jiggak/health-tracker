<script lang="ts">
   import {
      CategoryScale,
      Chart,
      Legend,
      LinearScale,
      LineController,
      LineElement,
      PointElement,
      type ChartConfiguration
   } from 'chart.js';
   import type { LineChartOpts } from './+page';

   Chart.register(
      // Line chart
      LineController,
      LineElement,
      PointElement,
      CategoryScale, // x-axis
      LinearScale, // y-axis
      Legend
   );

   let { options }: {
      options: LineChartOpts
   } = $props();

   let canvas: HTMLCanvasElement;

   const style = window.getComputedStyle(document.body);
   const lineColors = [
      style.getPropertyValue('--color-primary'),
      style.getPropertyValue('--color-secondary'),
      style.getPropertyValue('--color-accent'),
      style.getPropertyValue('--color-info')
   ];

   const config: ChartConfiguration = {
      type: 'line',
      data: {
         labels: options.labels,
         datasets: options.datasets.map((ds, i) => {
            return {
               label: ds.label,
               data: ds.data,
               fill: false,
               borderColor: lineColors[i],
               tension: 0.25
            }
         })
      },
      options: {
         responsive: true,
         plugins: {
            legend: {
               position: 'top'
            }
         }
      }
   };

   $effect(() => {
      new Chart(canvas, config);
   });
</script>

<canvas bind:this={canvas}>
</canvas>