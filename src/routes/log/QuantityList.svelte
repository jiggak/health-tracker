<script lang="ts">
   import type { LogValue, Metric, QuantityValue } from '$lib';
   import Icon from '$lib/Icon.svelte';
   import Quantity from './Quantity.svelte';

   let { metric, values, onValuesChanged }: {
      metric: Metric,
      values: LogValue[],
      onValuesChanged(values:LogValue[]): void
   } = $props();

   let newValue:LogValue | undefined = $state();

   function addValue() {
      if (newValue) {
         onValuesChanged([...values, newValue]);
         newValue = undefined;
      }
   }

   function removeValue(val:LogValue) {
      onValuesChanged(values.filter((v) => v !== val));
   }

   function value(v:QuantityValue) {
      return `${v.name} ${v.amount} ${v.unit}`
   }
</script>

<ul class="list bg-base-100 rounded-box shadow-md">
   {#each values as val}
      <li class="list-row">
         <div class="list-col-grow flex flex-col justify-center">
            <span>{value(val as QuantityValue)}</span>
         </div>
         <button
            class="btn btn-square btn-neutral btn-xs"
            onclick={() => removeValue(val)}>

            <Icon name="trash" svgClass="size-5" />
         </button>
      </li>
   {:else}
      <div role="alert" class="alert">
         <Icon name="exclamation" />
         <span>Nothing here</span>
      </div>
   {/each}
</ul>

<div class="flex mt-4">
   <Quantity
      units={metric.units!}
      value={newValue as QuantityValue}
      onValueChange={(v) => newValue = v}
   />

   <button class="btn btn-circle ml-2" onclick={addValue}>
      <Icon name="plus" />
   </button>
</div>
