<script lang="ts">
   import Modal from '$lib/Modal.svelte';
   import Icon from '$lib/Icon.svelte';

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
      tag = tag.trim();

      if (tag == '' || tags.includes(tag)) {
         return;
      }

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
   <div class="navbar shadow-md">
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
            class="btn btn-primary join-item"
            onclick={() => addTag(newTag.value)}>

            Add
         </button>
      </div>

      <ul class="list rounded-box shadow-md">
         {#each tags as tag}
            <li class="list-row">
               <div class="list-col-grow flex flex-col justify-center">
                  <span>{tag}</span>
               </div>
               <button
                  class="btn btn-square btn-neutral btn-sm"
                  onclick={() => deleteTag(tag)}>

                  <Icon name="trash" svgClass="size-4" />
               </button>
            </li>
         {/each}
      </ul>
   </div>
</Modal>

