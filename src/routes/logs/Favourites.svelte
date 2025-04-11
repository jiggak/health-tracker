<script lang="ts">
   import type { Favourite } from '$lib';
   import Confirm from '$lib/Confirm.svelte';
   import Icon from '$lib/Icon.svelte';

   let { favourites, onFavouritesChanged, onFavouriteClick }: {
      favourites:Favourite[],
      onFavouritesChanged(v:Favourite[]): void,
      onFavouriteClick(v:Favourite): void
   } = $props();

   let confirm: Confirm;

   function onDelete(fav:Favourite) {
      confirm.open().then(() => {
         onFavouritesChanged(favourites.filter((f) => f != fav));
      });
   }
</script>

<ul class="list rounded-box shadow-md">
   {#each favourites as fav}
      <li class="list-row">
         <button class="list-col-grow text-left cursor-pointer"
            onclick={() => onFavouriteClick(fav)}>

            <span>{fav.value}</span>
            <div class="flex flex-wrap gap-2">
               {#each fav.tags as tag}
                  <span class="badge badge-sm badge-soft badge-primary">{tag}</span>
               {/each}
            </div>
         </button>
         <button class="btn btn-square btn-neutral btn-sm"
            onclick={() => onDelete(fav)}>

            <Icon name="trash" svgClass="size-4" />
         </button>
      </li>
   {/each}
</ul>

<Confirm bind:this={confirm} />