<script lang="ts">
   import type { LogValue, MetricOption } from '$lib';

   let { options, value, onValueChanged }: {
      options: MetricOption[],
      value?: LogValue,
      onValueChanged(val?: LogValue): void
   } = $props();

   let selectedOption = $derived.by(() => {
      const opt = options?.find(o => o.value == value)
      return opt != null? opt.label : null;
   });
</script>

<p class="h-10 text-center">
   {selectedOption}
</p>

<div class="flex justify-evenly">
   {#each options as option}
      <input type="radio"
         class="radio"
         onchange={(_) => onValueChanged(option.value)}
         value={option.value}
         bind:group={value} />
   {/each}
</div>
