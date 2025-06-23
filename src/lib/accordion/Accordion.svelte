<script lang="ts">
   import { getContext, type Snippet } from "svelte";
   import type { AccordionContext } from "./ctx";

   let { name, children }: {
      name: string,
      children: Snippet
   } = $props();

   let ctx: AccordionContext = getContext('accordion');

   function onAccordionClick() {
      // active array will be empty when collapsing accordion
      if (ctx.active.length > 0) {
         ctx.active = [name];
      }
   }
</script>

<div class="collapse collapse-arrow border border-base-300">
   <input type="checkbox"
      value={name}
      bind:group={ctx.active}
      onchange={onAccordionClick}
   />

   <div class="collapse-title font-semibold">{name}</div>
   <div class="collapse-content">
      {@render children?.()}
   </div>
</div>