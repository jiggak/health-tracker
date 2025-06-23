<script lang="ts">
   import Icon from '$lib/Icon.svelte';
   import TagsEditor from './TagsEditor.svelte';

   let { tags, search, values, onTagsChanged, onValuesChanged }: {
      tags: string[],
      search: boolean,
      values: string[],
      onTagsChanged(tags:string[]):void,
      onValuesChanged(tags:string[]):void
   } = $props();

   let tagsEditor:TagsEditor;

   // selected tags: empty array if null to avoid ref errors
   values = values ?? [];

   // search results
   let results: string[] = $state([]);

   // svelte-ignore non_reactive_update
   let searchField: HTMLInputElement;

   function tagSelected(tag:string) {
      return values.indexOf(tag) >= 0;
   }

   function toggleTag(tag:string) {
      const i = values.indexOf(tag);

      if (i >= 0) {
         onValuesChanged(values.filter((_, j) => i !== j));
      } else {
         onValuesChanged([...values, tag]);
      }

      if (search) {
         results = [];
         searchField.value = '';
         searchField.focus();
      }
   }

   function onSearch(term: string) {
      term = term.toLowerCase();
      if (term) {
         results = tags.filter((t) => t.toLowerCase().includes(term));
      } else {
         results = [];
      }
   }
</script>

{#if search}
   <label class="input w-full">
      <Icon name="search" />
      <input bind:this={searchField}
         type="search"
         class="grow"
         placeholder="Search tag"
         oninput={() => onSearch(searchField.value)} />
   </label>

   <detail class="dropdown" class:dropdown-open={results.length > 0}>
      <ul class="dropdown-content menu rounded-box bg-base-200 w-full">
         {#each results as tag}
            <li class="py-1">
               <button class="btn btn-neutral btn-block"
                  onclick={() => toggleTag(tag)}>
                  {tag}
               </button>
            </li>
         {/each}
      </ul>
   </detail>
{/if}

<div class="flex flex-wrap gap-2">
   {#each (search ? values : tags) as tag}
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