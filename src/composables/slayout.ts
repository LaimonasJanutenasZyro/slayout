const getUniqueSortedPositions = positions => [...new Set(positions)].sort((a, b) => a - b)

const getPositionDifferences = positions => positions.map((position, index, array) => (
  index === 0 ? position : position - array[index - 1]
))

export const getGridBlocks = (initialData) => {
  const {
    blocks,
    components,
  } = initialData

  return Object.fromEntries(Object.entries(blocks).map(([blockId, block]) => {
    const blockComponentsWithIds = block.components.map(componentId => ({ ...components[componentId], componentId }))

    const rowPositions = [
      0,
      ...blockComponentsWithIds.flatMap(({ position }) => [position.top, position.top + position.height]),
    ]
    const uniqueSortedRowPositions = getUniqueSortedPositions(rowPositions)
    const gridRows = getPositionDifferences(uniqueSortedRowPositions)

    const columnPositions = [
      0,
      ...blockComponentsWithIds.flatMap(({ position }) => [position.left, position.left + position.width]),
      block.width,
    ]
    const uniqueSortedColumnPositions = getUniqueSortedPositions(columnPositions)
    const gridColumns = getPositionDifferences(uniqueSortedColumnPositions)

    const blockComponents = blockComponentsWithIds.map((component) => {
      const {
        top,
        left,
        height,
        width,
      } = component.position

      const gridRowFrom = uniqueSortedRowPositions.indexOf(top) + 1
      const gridRowTo = uniqueSortedRowPositions.indexOf(top + height) + 1
      const gridRow = `${gridRowFrom}/${gridRowTo}`

      const gridColumnFrom = uniqueSortedColumnPositions.indexOf(left) + 1
      const gridColumnTo = uniqueSortedColumnPositions.indexOf(left + width) + 1
      const gridColumn = `${gridColumnFrom}/${gridColumnTo}`

      return {
        ...component,
        gridRow,
        gridColumn,
      }
    })

    const gridTemplateRows = gridRows.filter(row => row !== 0).map(row => `minmax(${row}px, auto)`).join(' ')
    const gridTemplateColumns = gridColumns.filter(column => column !== 0).map(column => `${column / block.width}fr`).join(' ')

    return [
      blockId,
      {
        ...block,
        blockId,
        gridRows,
        gridColumns,
        gridTemplateRows,
        gridTemplateColumns,
        components: blockComponents,
      },
    ]
  }))
}
