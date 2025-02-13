<script lang="ts">
  import { run } from 'svelte/legacy';

  import '../app.postcss';
  import '@svelteness/kit-docs/client/polyfills/index.js';
  import '@svelteness/kit-docs/client/styles/normalize.css';
  import '@svelteness/kit-docs/client/styles/theme.css';
  import '$lib/styles/kit-docs.css';

  import SvelteHeadlessTableIcon from '$img/svelte-headless-table.svg?raw';

  import { page } from '$app/stores';

  import {
    KitDocs,
    KitDocsLayout,
    Button,
    SocialLink,
    createSidebarContext,
    type NavbarConfig,
    type LoadKitDocsResult,
  } from '@svelteness/kit-docs';

  interface Props {
    data: LoadKitDocsResult;
    children?: import('svelte').Snippet;
  }

  let { data, children }: Props = $props();
  let { meta, sidebar } = $state(data);
  run(() => {
    ({ meta, sidebar } = data);
  });

  const navbar: NavbarConfig = {
    links: [
      { title: 'Documentation', slug: '/docs', match: /\/docs/ },
      { title: 'Credits', slug: '/credits', match: /\/credits/ },
    ],
  };

  const { activeCategory } = createSidebarContext(sidebar);

  let category = $derived($activeCategory ? `${$activeCategory}: ` : '');
  let title = $derived(meta ? `${category}${meta.title} | Svelte Headless Table | Bryan Lee` : null);
  let description = $derived(meta?.description);
</script>

<svelte:head>
  {#key $page.url.pathname}
    {#if title}
      <title>{title}</title>
    {/if}
    {#if description}
      <meta name="description" content={description} />
    {/if}
  {/key}
</svelte:head>

<KitDocs {meta}>
  <KitDocsLayout {navbar} {sidebar}>
    <!-- @migration-task: migrate this slot by hand, `navbar-left` is an invalid identifier -->
  <div slot="navbar-left">
      <div class="logo p-2">
        <Button href="/">
          <div class="flex items-center gap-2 text-xl tracking-tight">
            {@html SvelteHeadlessTableIcon} Svelte Headless Table
          </div>
        </Button>
      </div>
    </div>

    <!-- @migration-task: migrate this slot by hand, `navbar-right-alt` is an invalid identifier -->
  <div class="socials" slot="navbar-right-alt">
      <SocialLink type="gitHub" href="https://github.com/bryanmylee/svelte-headless-table" />
    </div>

    {@render children?.()}
  </KitDocsLayout>
</KitDocs>

<style>
  .logo :global(a) {
    color: rgb(var(--kd-color-inverse));
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo :global(svg) {
    height: 28px;
    overflow: hidden;
  }

  .socials {
    display: flex;
    margin-left: -0.25rem;
  }
</style>
