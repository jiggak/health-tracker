<script lang="ts">
   import { page } from '$app/state';
   import { fade } from 'svelte/transition';
   import '../app.css';

   let { children } = $props();

   function routeKey(url: string) {
      // disable animations when navigating through log history
      if (url.match(/\d\d\d\d-\d\d-\d\d/)) {
         return '/logs/history';
      }

      return url;
   }
</script>

<!-- https://joshcollinsworth.com/blog/sveltekit-page-transitions -->
{#key routeKey(page.url.pathname)}

   <div class="flex flex-col h-dvh"
      in:fade={{ duration: 100, delay: 100 }}
      out:fade={{ duration: 100 }}>

      {@render children()}
   </div>

{/key}