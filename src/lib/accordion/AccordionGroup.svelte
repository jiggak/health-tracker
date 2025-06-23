<script lang="ts">
   import { setContext, type Snippet } from "svelte";
   import type { AccordionContext } from "./ctx";

   let { open, children }: {
      open?: string,
      children: Snippet
   } = $props();

   let context: AccordionContext = $state({
      active: open? [open] : []
   });

   setContext('accordion', context);
</script>

{@render children?.()}