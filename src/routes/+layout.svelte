<script lang="ts">
   import '../app.css';
   import Icon from '$lib/Icon.svelte';

   import { page } from '$app/state';

   let { children } = $props();
</script>

{@render children()}

<div class="dock" class:hidden={page.url.pathname == '/log'}>
   <a href="/" class:dock-active={page.url.pathname == '/'}>
      <Icon name="home" />
      <span class="dock-label">Home</span>
   </a>

   <a href="/log">
      <Icon name="plus" />
      <span class="dock-label">Add</span>
   </a>

   <a href="/history" class:dock-active={page.url.pathname == '/history'}>
      <Icon name="calendar" />
      <span class="dock-label">History</span>
   </a>
</div>