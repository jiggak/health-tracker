<script lang="ts">
   import Icon from '$lib/Icon.svelte';
   import type { PageProps } from './$types';
   import { page } from '$app/state';
   import { goto } from '$app/navigation';
   import dayjs from 'dayjs';
   import Shell from '../../Shell.svelte';

   const { data }: PageProps = $props();

   function onNavDay(val: number) {
      const date = dayjs(page.params.day)
         .add(val, 'day')
         .format('YYYY-MM-DD');

      onSetDate(date);
   }

   function onSetDate(date: string) {
      goto(date, { replaceState: true });
   }

   function onEdit(id: number) {
      goto(`/logs/${id}`);
   }
</script>

<Shell>
   {#snippet navbar()}
      <div class="navbar-start">
         <button class="btn btn-neutral" onclick={() => onNavDay(-1)}>
            <Icon name="arrow-left" />
         </button>
      </div>

      <div class="navbar-center">
         <input type="date"
            class="input input-ghost"
            value={page.params.day}
            onchange={(e) => onSetDate(e.currentTarget.value)}/>
      </div>

      <div class="navbar-end">
         <button class="btn btn-neutral" onclick={() => onNavDay(1)}>
            <Icon name="arrow-right" />
         </button>
      </div>
   {/snippet}

   <ul class="list rounded-box shadow-md">
      {#each data.logs as log}
         <li class="list-row">
            <div class="self-center text-lg text-center font-thin tabular-nums rounded-box bg-base-200 p-2">
               <div>{log.time.hour}:{log.time.minute}</div>
               <div class="text-2xl leading-6">{log.time.meridiem}</div>
            </div>
            <!--
            <div class="flex items-center text-lg font-thin tabular-nums rounded-box bg-base-200 p-2">
               <div>
                  <div>{log.time.hour}</div>
                  <div class="text-5xl leading-1">··</div>
                  <div>{log.time.minute}</div>
               </div>
               <div class="ml-2">{log.time.meridiem}</div>
            </div>
            -->
            <div class="list-col-grow">
               <div class="font-semibold">{log.entry.metric.label}</div>
               <div>{log.valueToString()}</div>
               <div class="flex flex-wrap gap-2">
                  {#each log.entry.tags as tag}
                     <span class="badge badge-sm badge-primary">{tag}</span>
                  {/each}
               </div>
            </div>
            <button class="self-center btn btn-neutral btn-square" onclick={() => onEdit(log.id)}>
               <Icon name="pencil" />
            </button>
         </li>
      {/each}
   </ul>
</Shell>
