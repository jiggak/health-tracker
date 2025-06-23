<script lang="ts">
   import Icon from "./Icon.svelte";

   let { value, valueChanged }: {
      value: number,
      valueChanged(v: number): void
   } = $props();

   function setValue(v: number) {
      value = v;
      valueChanged(value);
   }
</script>

<div class="join">
   <button class="btn btn-sm join-item"
      onclick={() => setValue(value! - 1)}>
      <Icon name="minus" />
   </button>
   <input class="input input-sm w-16 join-item"
      onchange={(e) => setValue(e.currentTarget.valueAsNumber)}
      value={value}
      type="number">
   <button class="btn btn-sm join-item"
      onclick={() => setValue(value! + 1)}>
      <Icon name="plus" />
   </button>
</div>

<style>
   /* Chrome, Safari, Edge, Opera */
   input::-webkit-outer-spin-button,
   input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
   }

   /* Firefox */
   input[type=number] {
      appearance: textfield;
      -moz-appearance: textfield;
   }
</style>