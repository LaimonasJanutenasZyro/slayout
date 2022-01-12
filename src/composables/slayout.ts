const calculateColumns = (componentList, blockWidth) => {
  // For each component, find the start and end distance from the left
  const columnsLeft = componentList
    .flatMap(({ position }) => [position.left, position.width + position.left])

  // Sometimes the start/end distances from the left are equal, so we need to remove duplicates
  // Adding 0 and block.width as the first and last column respectively
  const columnsLeftUniqueSorted = [...new Set([0, ...columnsLeft, blockWidth])].sort((a, b) => a - b)

  // For each distance from the left, subtract the previous distance to find distances between columns
  const gridColumns = columnsLeftUniqueSorted
    .map((columnLeft, index, columnList) => index === 0 ? columnLeft : columnLeft - columnList[index - 1])

  const gridTemplateColumns = gridColumns
  // Remove 0 because CSS grid assumes 0 column by default
    .filter(column => column !== 0)
    .map(column => `${column / 1000}fr`).join(' ')

  return { columnsLeftUniqueSorted, gridColumns, gridTemplateColumns }
}

const calculateRows = (componentList) => {
  // For each component, find the start and end distance from the top
  const rowsTop = componentList
    .flatMap(({ position }) => [position.top, position.height + position.top])

  // Sometimes the start/end distances from the top are equal, so we need to remove duplicates
  // Adding 0 as the first row
  const rowsTopUniqueSorted = [...new Set([0, ...rowsTop])].sort((a, b) => a - b)

  // For each distance from the top, subtract the previous distance to find distances between rows
  const gridRows = rowsTopUniqueSorted
    .map((rowTop, index, rowList) => index === 0 ? rowTop : rowTop - rowList[index - 1])

  const gridTemplateRows = gridRows
  // Remove 0 because CSS grid assumes 0 row by default
    .filter(column => column !== 0)
    .map(row => `minmax(${row}px, auto)`).join(' ')

  return { rowsTopUniqueSorted, gridRows, gridTemplateRows }
}

export const getGridBlocks = (initialData) => {
  return Object.fromEntries(Object.entries(initialData.blocks).map(([blockId, block]) => {
    // Make an array of current block components, extend it with componentId
    const blockComponents = block.components.map(componentId => ({
      ...initialData.components[componentId],
      componentId,
    }))

    const { columnsLeftUniqueSorted, gridColumns, gridTemplateColumns } = calculateColumns(blockComponents, block.width)

    const { rowsTopUniqueSorted, gridRows, gridTemplateRows } = calculateRows(blockComponents)

    const components = blockComponents.map((component) => {
      const columnStart = columnsLeftUniqueSorted.indexOf(component.position.left) + 1
      const columnEnd = columnsLeftUniqueSorted.indexOf(component.position.left + component.position.width) + 1
      const rowStart = rowsTopUniqueSorted.indexOf(component.position.top) + 1
      const rowEnd = rowsTopUniqueSorted.indexOf(component.position.top + component.position.height) + 1
      return { ...component, gridColumn: `${columnStart}/${columnEnd}`, gridRow: `${rowStart}/${rowEnd}` }
    })
    return [blockId, { ...block, blockId, components, gridTemplateColumns, gridColumns, gridTemplateRows, gridRows }]
  }))
}
