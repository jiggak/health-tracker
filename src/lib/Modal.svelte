<script lang="ts">
   // Based on https://svelte.dev/playground/modal

   let { children } = $props();

   let dialog:HTMLDialogElement = $state()!

   export function open() {
      dialog.showModal();
   }

   export function close() {
      dialog.close();
   }
</script>

<dialog class="modal" bind:this={dialog}>
   <div class="modal-box w-full h-full">
      {@render children?.()}
   </div>
</dialog>

<style>
   dialog[open] {
      animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
   }
   @keyframes zoom {
      from {
         transform: scale(0.95);
      }
      to {
         transform: scale(1);
      }
   }
   dialog[open]::backdrop {
      animation: fade 0.2s ease-out;
   }
   @keyframes fade {
      from {
         opacity: 0;
      }
      to {
         opacity: 1;
      }
   }
</style>