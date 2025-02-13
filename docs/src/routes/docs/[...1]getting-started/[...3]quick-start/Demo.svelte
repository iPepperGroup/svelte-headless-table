<script>
  import { readable } from 'svelte/store';
  import { createTable, Subscribe, Render } from 'svelte-headless-table';

  const data = readable([
    { name: 'Ada Lovelace', age: 21 },
    { name: 'Barbara Liskov', age: 52 },
    { name: 'Richard Hamming', age: 38 },
  ]);

  const table = createTable(data);

  const columns = table.createColumns([
    table.column({
      header: 'Name',
      accessor: 'name',
    }),
    table.column({
      header: 'Age',
      accessor: 'age',
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
