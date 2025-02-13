<script>
  import { readable } from 'svelte/store';
  import { createTable, Subscribe, Render } from 'svelte-headless-table';
  import { addSortBy, addColumnOrder } from 'svelte-headless-table/plugins';

  const data = readable([
    { name: 'Ada Lovelace', age: 21 },
    { name: 'Barbara Liskov', age: 52 },
    { name: 'Richard Hamming', age: 38 },
  ]);

  const table = createTable(data, {
    sort: addSortBy({ disableMultiSort: true }),
    colOrder: addColumnOrder(),
  });

  const columns = table.createColumns([
    table.column({
      header: 'Name',
      accessor: 'name',
      plugins: {
        sort: { invert: true },
      },
    }),
    table.column({
      header: 'Age',
      accessor: 'age',
    }),
  ]);

  const { headerRows, rows, tableAttrs, tableBodyAttrs, pluginStates } = table.createViewModel(columns);
  const { columnIdOrder } = pluginStates.colOrder;
  $columnIdOrder = ['age', 'name'];
</script>

<table {...$tableAttrs} class="demo">
  <thead>
    {#each $headerRows as headerRow (headerRow.id)}
      <Subscribe rowAttrs={headerRow.attrs()} >
        {#snippet children({ rowAttrs })}
                <tr {...rowAttrs}>
            {#each headerRow.cells as cell (cell.id)}
              <Subscribe
                attrs={cell.attrs()} 
                props={cell.props()} 
              >
                {#snippet children({ attrs, props })}
                            <th {...attrs} onclick={props.sort.toggle}>
                    <Render of={cell.render()} />
                    {#if props.sort.order === 'asc'}
                      ⬇️
                    {:else if props.sort.order === 'desc'}
                      ⬆️
                    {/if}
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
                <tr>
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
