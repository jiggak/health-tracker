<script lang="ts">
   import type { LogValue, MetricOption } from '$lib';

   let { options, value = $bindable() }: {
      options: MetricOption[],
      value?: LogValue
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
         value={option.value}
         bind:group={value}  />
   {/each}
</div>
