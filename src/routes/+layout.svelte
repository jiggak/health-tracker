<script lang="ts">
   import "../app.css";

   import { page } from '$app/state';
   // page.url.pathname

   let { children } = $props();
</script>

{@render children()}

<div class="dock">
   <a href="/" class="dock-active">
      <span class="dock-label">Home</span>
   </a>

   <button>
      <span class="dock-label">Add</span>
   </button>

   <button>
      <span class="dock-label">History</span>
   </button>
</div>