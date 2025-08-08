<script lang="ts">
   import Icon from "$lib/Icon.svelte";

   const themese = [
      'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate',
      'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden',
      'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black',
      'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade',
      'night', 'coffee', 'winter', 'dim', 'nord', 'sunset', 'caramellatte',
      'abyss', 'silk'
   ];

   const htmlElement = document.querySelector('html')!;

   const defaultTheme = htmlElement.getAttribute('data-theme')!
   let currentTheme = $state(defaultTheme);

   const storedTheme = localStorage.getItem('currentTheme');
   if (storedTheme) {
      setTheme(storedTheme);
   }

   function setTheme(theme: string) {
      htmlElement.setAttribute('data-theme', theme);
      localStorage.setItem('currentTheme', theme);
      currentTheme = theme;
   }

   function onThemeClick(theme: string) {
      setTheme(theme);
      location.reload();
   }
</script>

<div class="dropdown dropdown-end">
   <button class="btn btn-ghost">
      <Icon name="palette" svgClass="size-4" />
      <Icon name="down-arrow" svgClass="size-3" />
   </button>
   <ul class="dropdown-content menu flex-nowrap bg-base-300 rounded-box shadow max-h-100 overflow-y-scroll w-40">
      {#each themese as theme}
         <li>
            <button
               class:menu-active={theme == currentTheme}
               onclick={() => onThemeClick(theme)}>

               {theme}
            </button>
         </li>
      {/each}
   </ul>
</div>