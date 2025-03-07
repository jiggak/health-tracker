<script lang="ts">
   import {
      faArrowLeft,
      faArrowRight,
      faBook,
      faCalendarDays,
      faCarrot,
      faHouse,
      faMoon,
      faPlus,
      faPrescriptionBottleMedical,
      faTrashCan,
      faPencil,
      faPoop,
      faTriangleExclamation,
      type IconDefinition
   } from '@fortawesome/free-solid-svg-icons';
   import { type IconName } from '$lib';

   interface Props {
      name: IconName,
      svgClass?: string
   }

   function pathDataString(d: string|string[]) {
      if (typeof d == 'string') {
         return d;
      } else {
         return d.join(' ');
      }
   }

   const icons: {[k in IconName]: IconDefinition} = {
      'arrow-left': faArrowLeft,
      'arrow-right': faArrowRight,
      'book': faBook,
      'calendar': faCalendarDays,
      'home': faHouse,
      'plus': faPlus,
      'trash': faTrashCan,
      'pencil': faPencil,
      'exclamation': faTriangleExclamation,
      'poop': faPoop,
      'carrot': faCarrot,
      'medicine': faPrescriptionBottleMedical,
      'moon': faMoon
   };

   const {
      name,
      svgClass = 'size-6'
   }: Props = $props();

   const icon = icons[name];
   const width = icon.icon[0];
   const height = icon.icon[1];
   const data = pathDataString(icon.icon[4]);
</script>

<svg xmlns="http://www.w3.org/2000/svg"
   viewBox="0 0 {width} {height}"
   fill="currentColor"
   class={svgClass}>

   <path d={data} />
</svg>
