export const getGridBlocks = (initialData) => {
  const slayout = {}

  Object.entries(initialData.blocks)
    .forEach(([blockId, block]) => {
      const gridRowsRaw: number[] = []
      const gridColumnsRaw: number[] = []

      slayout[blockId] = {
        blockId,
        width: block.width,
        components: block.components.map((componentId: number) => {
          const component = initialData.components[componentId]

          gridRowsRaw.push(component.position.top)
          gridRowsRaw.push(component.position.top + component.position.height)

          gridColumnsRaw.push(component.position.left)
          gridColumnsRaw.push(component.position.left + component.position.width)

          return {
            componentId,
            content: component.content,
            position: component.position,
          }
        }),
      }

      slayout[blockId].gridRows = getGridRows(gridRowsRaw)
      slayout[blockId].gridColumns = getGridColumns(block.width, gridColumnsRaw)
      slayout[blockId].gridTemplateRows = getGridTemplateRows(slayout[blockId].gridRows)
      slayout[blockId].gridTemplateColumns = getGridTemplateColumns(block.width, slayout[blockId].gridColumns)

      slayout[blockId].components = slayout[blockId].components.map((component) => {
        const { gridColumn, gridRow } = getComponentCoordinatesFromPixels(component, slayout[blockId])

        return {
          ...component,
          gridColumn,
          gridRow,
        }
      })
    })

  return slayout
}

function getComponentCoordinatesFromPixels(component, block) {
  const left = getCoordinateFromPixelsArray(component.position.left, block.gridColumns)
  const right = getCoordinateFromPixelsArray(component.position.left + component.position.width, block.gridColumns)

  const top = getCoordinateFromPixelsArray(component.position.top, block.gridRows)
  const bottom = getCoordinateFromPixelsArray(component.position.top + component.position.height, block.gridRows)

  return {
    gridRow: `${top}/${bottom}`,
    gridColumn: `${left}/${right}`,
  }
}

function getCoordinateFromPixelsArray(positionNeedle: number, positionHaystack: number[]) {
  const positionsArray = [...positionHaystack]

  if (positionsArray[0] !== 0) positionsArray.unshift(0)

  let currentCoordinate = 1
  let checkingPosition = positionsArray[0]

  while (checkingPosition !== positionNeedle) {
    checkingPosition += positionsArray[currentCoordinate]
    currentCoordinate++
  }

  return currentCoordinate
}

function getGridTemplateColumns(blockWidth: number, gridColumns: number[]) {
  return gridColumns.filter(column => column !== 0)
    .map(column => `${column / blockWidth}fr`)
    .join(' ')
}

function getGridTemplateRows(gridRows: number[]) {
  return gridRows.filter(row => row !== 0)
    .map((row) => {
      return `minmax(${row}px, auto)`
    }).join(' ')
}

function getGridRows(gridRowsRaw: number[]) {
  const gridRowsWithoutDuplicates = [...new Set(gridRowsRaw)]
  const gridRowsSorted = gridRowsWithoutDuplicates.sort((a, b) => a - b)

  return gridRowsSorted.map((position, elementIndex) => {
    return position - (gridRowsSorted[elementIndex - 1] || 0)
  })
}

function getGridColumns(blockWidth: number, gridColumnsRaw: number[]) {
  const gridColumnsWithoutDuplicates = [...new Set(gridColumnsRaw)]
  const gridColumnsSorted = gridColumnsWithoutDuplicates.sort((a, b) => a - b)

  const gridColumns = gridColumnsSorted.map((position, elementIndex) => {
    return position - (gridColumnsSorted[elementIndex - 1] || 0)
  })

  const gridColumnsSum = gridColumns.reduce((a, b) => a + b, 0)

  if (gridColumnsSum !== blockWidth) gridColumns.push(blockWidth - gridColumnsSum)

  return gridColumns
}
