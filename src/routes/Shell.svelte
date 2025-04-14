<script lang="ts">
   import { page } from "$app/state";
   import Icon from "$lib/Icon.svelte";
   import type { Snippet } from "svelte";

   let { children, dock, navbar }: {
      children: Snippet,
      dock?: Snippet,
      navbar?: Snippet
   } = $props();
</script>

{#if navbar}
   <div class="navbar shadow-md">
      {@render navbar()}
   </div>
{/if}

<div class="flex-1 overflow-scroll">
   {@render children()}
</div>

<div class="dock bg-base-300" style="position: unset">
   {#if dock}
      {@render dock()}
   {:else}
      <a href="/" class:dock-active={page.url.pathname == '/'}>
         <Icon name="home" />
         <span class="dock-label">Home</span>
      </a>

      <a href="/logs/add">
         <Icon name="plus" />
         <span class="dock-label">Add</span>
      </a>

      <a href="/logs" class:dock-active={page.url.pathname.startsWith('/logs')}>
         <Icon name="calendar" />
         <span class="dock-label">History</span>
      </a>
   {/if}
</div>
