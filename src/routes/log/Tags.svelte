<script lang="ts">
   import TagsEditor from "./TagsEditor.svelte";

   let { tags, values, onTagsChanged, onValuesChanged }: {
      tags: string[],
      values: string[],
      onTagsChanged(tags:string[]):void,
      onValuesChanged(tags:string[]):void
   } = $props();

   let tagsEditor:TagsEditor;

   function tagSelected(tag:string) {
      return values.indexOf(tag) >= 0;
   }

   function toggleTag(tag:string) {
      const i = values.indexOf(tag);
      if (i >= 0) {
         onValuesChanged(values.filter((v, j) => i !== j));
      } else {
         onValuesChanged([...values, tag]);
      }
   }
</script>

<div class="flex flex-wrap gap-2">
   {#each tags as tag}
      <button
         class="btn badge badge-primary"
         class:badge-outline={!tagSelected(tag)}
         onclick={() => toggleTag(tag)}>

         {tag}
      </button>
   {/each}

   <button
      class="btn badge badge-primary badge-dash"
      onclick={() => tagsEditor.open(tags)}>

      Add/Edit Tags
   </button>
</div>

<TagsEditor
   bind:this={tagsEditor}
   onSaveTags={onTagsChanged}
/>