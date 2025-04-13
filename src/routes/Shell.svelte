<script lang="ts">
   import { page } from "$app/state";
   import Icon from "$lib/Icon.svelte";
   import type { Snippet } from "svelte";
   import { fade } from "svelte/transition";

   let { children, dock, navbar }: {
      children: Snippet,
      dock?: Snippet,
      navbar?: Snippet
   } = $props();
</script>

<div class="flex flex-col h-dvh">
   {#if navbar}
      <div class="navbar shadow-md">
         {@render navbar()}
      </div>
   {/if}

   <!-- https://joshcollinsworth.com/blog/sveltekit-page-transitions -->
   {#key page.url}
      <div class="flex-1 overflow-scroll"
         in:fade={{ duration: 100, delay: 100 }}
         out:fade={{ duration: 100 }}>

         {@render children()}
      </div>
   {/key}

   <div class="dock" style="position: unset">
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
</div>