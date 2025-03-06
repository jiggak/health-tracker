<script lang="ts">
   import '../app.css';

   import { page } from '$app/state';
   import Icon from '$lib/Icon.svelte';
   import { fade } from 'svelte/transition';

   let { children } = $props();
</script>

<!-- https://joshcollinsworth.com/blog/sveltekit-page-transitions -->
{#key page.url}
   <div in:fade={{ duration: 100, delay: 100 }} out:fade={{ duration: 100 }}>
      {@render children()}
   </div>
{/key}

<div class="dock" class:hidden={page.data.hideDock}>
   <a href="/" class:dock-active={page.url.pathname == '/'}>
      <Icon name="home" />
      <span class="dock-label">Home</span>
   </a>

   <a href="/log/add">
      <Icon name="plus" />
      <span class="dock-label">Add</span>
   </a>

   <a href="/history" class:dock-active={page.url.pathname.startsWith('/history')}>
      <Icon name="calendar" />
      <span class="dock-label">History</span>
   </a>
</div>