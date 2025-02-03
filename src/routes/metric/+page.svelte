<script lang="ts">
   import { MetricType } from '$lib';
</script>

<fieldset class="fieldset">
   <legend class="fieldset-legend">Metric Name</legend>
   <input type="text" class="input" placeholder="Food, Sleep, Exercise" />
</fieldset>

<fieldset class="fieldset">
   <legend class="fieldset-legend">Metric Type</legend>
   <select class="select">
      <!-- <option disabled selected>Pick metric type</option> -->
      {#each Object.keys(MetricType) as metric}
         <option value={metric}>{metric}</option>
      {/each}
   </select>
</fieldset>

<fieldset class="fieldset">
   <legend class="fieldset-legend">Include Tags</legend>
   <input type="checkbox" class="toggle" />
</fieldset>