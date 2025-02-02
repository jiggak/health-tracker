<script lang="ts">
   import { type QuantityValue } from '$lib';

   let { units, value = $bindable() }: {
      units: string[],
      value?: QuantityValue
   } = $props();

   let name:HTMLInputElement;
   let amount:HTMLInputElement;
   let unit:HTMLSelectElement;

   function onFieldChange(e:Event) {
      if (name.checkValidity() && amount.checkValidity() && unit.checkValidity()) {
         value = {
            name: name.value,
            amount: parseInt(amount.value),
            unit: unit.value
         };
      }
   }

   $effect(() => {
      if (value) {
         name.value = value.name;
         amount.value = value.amount.toString();
         unit.value = value.unit;
      }
   })
</script>

<div class="join w-full">
   <input bind:this={name}
      onchange={onFieldChange}
      class="input join-item w-full"
      type="text"
      required />

   <input bind:this={amount}
      onchange={onFieldChange}
      class="input join-item w-20"
      type="number"
      required />

   <select bind:this={unit}
      onchange={onFieldChange}
      class="select join-item w-40"
      required>

      {#each units! as unit}
         <option>{unit}</option>
      {/each}
   </select>
</div>