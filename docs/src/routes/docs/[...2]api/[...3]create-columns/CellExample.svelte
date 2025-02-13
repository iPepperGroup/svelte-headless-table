<script>
  import { readable } from 'svelte/store';
  import { createTable, Render, createRender, Subscribe } from 'svelte-headless-table';
  import Bold from './Bold.svelte';

  const data = readable([
    { firstName: 'Ada', lastName: 'Lovelace', info: { age: 21 } },
    { firstName: 'Barbara', lastName: 'Liskov', info: { age: 52 } },
    { firstName: 'Richard', lastName: 'Hamming', info: { age: 38 } },
  ]);
  const table = createTable(data);
  const columns = table.createColumns([
    table.column({
      header: 'First Name',
      accessor: 'firstName',
      cell: ({ value }) => createRender(Bold, { text: value }),
    }),
    table.column({
      header: 'Last Name',
      accessor: 'lastName',
    }),
    table.column({
      header: 'Age',
      accessor: (item) => item.info.age,
      id: 'age',
      cell: ({ value }) => `${value} yo`,
    }),
  ]);
  const { headerRows, rows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<table class="demo" {...$tableAttrs}>
  <thead>
    {#each $headerRows as headerRow (headerRow.id)}
      <Subscribe rowAttrs={headerRow.attrs()} >
        {#snippet children({ rowAttrs })}
                <tr {...rowAttrs}>
            {#each headerRow.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} >
                {#snippet children({ attrs })}
                            <th {...attrs}>
                    <Render of={cell.render()} />
                  </th>
                                          {/snippet}
                        </Subscribe>
            {/each}
          </tr>
                      {/snippet}
            </Subscribe>
    {/each}
  </thead>
  <tbody {...$tableBodyAttrs}>
    {#each $rows as row (row.id)}
      <Subscribe rowAttrs={row.attrs()} >
        {#snippet children({ rowAttrs })}
                <tr {...rowAttrs}>
            {#each row.cells as cell (cell.id)}
              <Subscribe attrs={cell.attrs()} >
                {#snippet children({ attrs })}
                            <td {...attrs}>
                    <Render of={cell.render()} />
                  </td>
                                          {/snippet}
                        </Subscribe>
            {/each}
          </tr>
                      {/snippet}
            </Subscribe>
    {/each}
  </tbody>
</table>
