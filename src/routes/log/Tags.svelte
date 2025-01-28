<script lang="ts">
   let { tags, values, onValuesChanged }: {
      tags: string[],
      values: string[],
      onValuesChanged(tags:string[]):void
   } = $props();

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

{#each tags as tag}
   <button
      class="btn badge badge-primary"
      class:badge-outline={!tagSelected(tag)}
      onclick={() => toggleTag(tag)}>

      {tag}
   </button>
{/each}

<button class="btn badge badge-primary badge-dash">Add/Edit Tags</button>