<script lang="ts">
   import dayjs from 'dayjs';

   let { timestamp = $bindable() }: {
      timestamp?: number
   } = $props();

   function toString(ts?: number): string {
      if (ts) {
         return dayjs.unix(ts).format('YYYY-MM-DD[T]HH:mm');
      }
      return '';
   }

   function toTimestamp(s: string): number {
      return dayjs(s, 'YYYY-MM-DD[T]HH:mm').unix();
   }
</script>

<input type="datetime-local"
   class="input input-ghost"
   value={toString(timestamp)}
   onchange={(e) => timestamp = toTimestamp(e.currentTarget.value)} />