<script lang="ts">
   import type { Favourite } from '$lib';
   import Icon from '$lib/Icon.svelte';

   let { favourites, onFavouritesChanged, onFavouriteClick }: {
      favourites:Favourite[],
      onFavouritesChanged(v:Favourite[]): void,
      onFavouriteClick(v:Favourite): void
   } = $props();

   function removeFavourite(fav:Favourite) {
      onFavouritesChanged(favourites.filter((f) => f != fav));
   }
</script>

<ul class="list bg-base-100 rounded-box shadow-md my-4">
   {#each favourites as fav}
      <li class="list-row">
         <div role="button" tabindex="0"
            class="list-col-grow flex flex-col justify-center cursor-pointer"
            onclick={() => onFavouriteClick(fav)}>
            <span>{fav.value}</span>
         </div>
         <button
            class="btn btn-square btn-neutral btn-xs"
            onclick={() => removeFavourite(fav)}>

            <Icon name="trash" svgClass="size-4" />
         </button>
      </li>
   {/each}
</ul>