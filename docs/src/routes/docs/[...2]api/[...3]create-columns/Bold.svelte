<script lang="ts">
  interface Props {
    text: string;
  }

  let { text }: Props = $props();
</script>

<span>{text}</span>

<style lang="postcss">
  span {
    @apply font-bold;
  }
</style>
