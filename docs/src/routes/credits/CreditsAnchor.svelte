<script lang="ts">
  interface Props {
    label: string;
    href: string;
  }

  let { label, href }: Props = $props();
</script>

<a {href} target="_blank">{label}</a>
