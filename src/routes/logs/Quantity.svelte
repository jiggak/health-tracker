<script lang="ts">
   import { type QuantityValue } from '$lib';

   let { units, value, onValueChange }: {
      units: string[],
      value?: QuantityValue,
      onValueChange(v:QuantityValue): void
   } = $props();

   let name:HTMLInputElement;
   let amount:HTMLInputElement;
   let unit:HTMLSelectElement;

   function onFieldChange(e:Event) {
      if (name.checkValidity() && amount.checkValidity() && unit.checkValidity()) {
         onValueChange({
            name: name.value,
            amount: amount.valueAsNumber,
            unit: unit.value
         });
      }
   }

   $effect(() => {
      if (value) {
         name.value = value.name;
         amount.valueAsNumber = value.amount;
         unit.value = value.unit;
      } else {
         name.value = amount.value = unit.value = '';
      }
   })
</script>

<div class="join w-full">
   <input bind:this={name}
      onchange={onFieldChange}
      class="input validator join-item w-full"
      type="text"
      required />

   <input bind:this={amount}
      onchange={onFieldChange}
      class="input validator join-item w-20"
      type="number"
      required />

   <select bind:this={unit}
      onchange={onFieldChange}
      class="select validator join-item w-40"
      required>

      <option></option>

      {#each units as unit}
         <option>{unit}</option>
      {/each}
   </select>
</div>