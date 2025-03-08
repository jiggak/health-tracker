<script lang="ts">
   let dialog: HTMLDialogElement;
   let deferred: PromiseWithResolvers<void>;

   export function open() {
      dialog.showModal();
      deferred = Promise.withResolvers<void>();
      return deferred.promise;
   }

   function onConfirm() {
      dialog.close();
      deferred.resolve();
   }

   function onCancel() {
      dialog.close();
      deferred.reject();
   }
</script>

<dialog class="modal" bind:this={dialog}>
   <div class="modal-box">
      <p>Are you sure?</p>

      <div class="modal-action">
         <button class="btn btn-secondary" onclick={onConfirm}>Delete</button>
         <button class="btn btn-neutral" onclick={onCancel}>Cancel</button>
      </div>
   </div>
</dialog>