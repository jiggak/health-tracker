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

<ul class="list rounded-box shadow-md my-4">
   {#each favourites as fav}
      <li class="list-row">
         <div role="button" tabindex="0"
            class="list-col-grow flex flex-col justify-center cursor-pointer"
            onclick={() => onFavouriteClick(fav)}>
            <span>{fav.value}</span>
         </div>
         <button
            class="btn btn-square btn-neutral btn-sm"
            onclick={() => onDelete(fav)}>

            <Icon name="trash" svgClass="size-4" />
         </button>
      </li>
   {/each}
</ul>

<Confirm bind:this={confirm} />