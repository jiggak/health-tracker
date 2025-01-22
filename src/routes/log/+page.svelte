<script lang="ts">
   import { goto } from "$app/navigation";
</script>

<div class="navbar bg-base-100 shadow-sm">
   <div class="navbar-start">
      <button class="btn" onclick={() => goto('/')}>Cancel</button>
   </div>

   <div class="navbar-end">
      <button class="btn">Save</button>
   </div>
</div>