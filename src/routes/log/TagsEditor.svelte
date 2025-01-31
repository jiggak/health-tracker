<script lang="ts">
   import Modal from '$lib/Modal.svelte';
   import Icon from '../../Icon.svelte';

   let { onSaveTags }: {
      onSaveTags(tags:string[]):void
   } = $props();

   let modal:Modal;
   let newTag:HTMLInputElement;
   let tags:string[] = $state()!;

   export function open(tags_:string[]) {
      tags = tags_;
      modal.open();
   }

   function save() {
      onSaveTags(tags);
      modal.close();
   }

   function deleteTag(tag:string) {
      tags = tags.filter((v) => v !== tag);
   }

   function addTag(tag:string) {
      tags = [...tags, tag];
      newTag.value = '';
   }

   function onNewTagKeyPress(e:KeyboardEvent) {
      if (e.key === 'Enter') {
         addTag(newTag.value);
      }
   }
</script>

<Modal bind:this={modal}>
   <div class="navbar bg-base-100 shadow-md">
      <div class="navbar-start">
         <button class="btn" onclick={() => modal.close()}>Cancel</button>
      </div>

      <div class="navbar-end">
         <button class="btn btn-primary" onclick={save}>Save</button>
      </div>
   </div>

   <div class="p-4">
      <div class="join w-full">
         <input bind:this={newTag}
            onkeydown={onNewTagKeyPress}
            class="input input-bordered join-item w-full"
            placeholder="New tag" />

         <button
            class="btn btn-secondary join-item rounded-r-full"
            onclick={() => addTag(newTag.value)}>

            Add
         </button>
      </div>

      <ul class="list bg-base-100 rounded-box shadow-md">
         {#each tags as tag}
            <li class="list-row">
               <div class="list-col-grow flex flex-col justify-center">
                  <span>{tag}</span>
               </div>
               <button
                  class="btn btn-square btn-neutral btn-xs"
                  onclick={() => deleteTag(tag)}>

                  <Icon name="trash" svgClass="size-4" />
               </button>
            </li>
         {/each}
      </ul>
   </div>
</Modal>

