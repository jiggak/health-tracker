<script lang="ts">
   import type { LogValue, MetricOption } from '$lib';

   let { options, value, onValueChange }: {
      options: MetricOption[],
      value?: LogValue,
      onValueChange(v:LogValue): void
   } = $props();

   function selectedOption() {
      const opt = options?.find(o => o.value == value)
      return opt != null? opt.label : null;
   }
</script>

<p class="h-8 text-center">
   {selectedOption()}
</p>
<ul class="steps">
   {#each options as option}
      <li data-content="●"
         class="step"
         class:step-primary={value == option.value}
         onclick={() => onValueChange(option.value)}>
      </li>
   {/each}
</ul>