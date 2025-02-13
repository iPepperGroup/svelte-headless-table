<script lang="ts">
  interface Props {
    text: string;
  }

  let { text }: Props = $props();
</script>

<em>{text}</em>
