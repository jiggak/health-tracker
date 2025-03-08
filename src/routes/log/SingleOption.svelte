<script lang="ts">
   import { Quality, type LogValue, type MetricOption } from '$lib';
    import Quantity from './Quantity.svelte';

   let { options, value, onValueChanged }: {
      options: MetricOption[],
      value?: LogValue,
      onValueChanged(val?: LogValue): void
   } = $props();

   const index = options.findIndex((o) => o.value == value);
   let selected = $state(index < 0 ? 0 : index);

   function qualityClass(quality?: Quality) {
      switch (quality) {
         case Quality.Good: return 'good';
         case Quality.Neutral: return 'neutral';
         case Quality.Bad: return 'bad';
      }
   }
</script>

<p class="h-10 text-center">{options[selected].label}</p>

<div class="flex flex-col">
   <input type="range" min="0" max={options.length - 1} step="1"
      bind:value={selected}
      onchange={() => onValueChanged(options[selected].value)}
      class="range range-primary [--range-fill:0] w-full" />
   <div class="dots">
      {#each options as option, index}
         <span
            class={qualityClass(option.quality)}
            class:selected={index == selected}>
         </span>
      {/each}
   </div>
</div>

<style>
   .dots {
      display: flex;
      justify-content: space-between;
      padding-inline: 6px;
      pointer-events: none;
      position: relative;
      top: -17px;

      & span {
         width: 10px;
         height: 10px;
         background-color: var(--color-neutral);
         border-radius: 50%;

         &.selected {
            visibility: hidden;
         }

         &.good { background-color: var(--color-success); }
         &.neutral { background-color: var(--color-warning); }
         &.bad { background-color: var(--color-error); }
      }
   }
</style>
