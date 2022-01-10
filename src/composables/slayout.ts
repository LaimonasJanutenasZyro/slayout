const getGridPositions = (components, startPositionKey, endPositionKey, width) => {
  const sortedCoordinates = components
    .reduce((previousValue, currentValue) => {
      return [
        ...previousValue,
        currentValue.position[startPositionKey],
        currentValue.position[startPositionKey] + currentValue.position[endPositionKey],
      ]
    }, [])
    .sort((a, b) => a - b)
  const uniqueCordinates = width ? [...new Set([...sortedCoordinates, width])] : [...new Set([...sortedCoordinates])]

  return uniqueCordinates.map((coord, index) => {
    if (index === 0)
      return coord

    return coord - uniqueCordinates[index - 1]
  })
}

const getGridTemplateRows = (rows) => {
  return rows.reduce((pre, cur) => {
    if (cur > 0)
      return `${pre} minmax(${cur}px, auto)`

    return pre
  }, '').trim()
}

const getGridTemplateColumns = (columns, gridWidth) => {
  return columns.reduce((pre, cur) => {
    if (cur > 0)
      return `${pre} ${cur / gridWidth}fr`

    return pre
  }, '').trim()
}

const findGridPositionIndex = (blockPosition, gridPositions, start = 0) => {
  let index = 0
  let position = 0
  // Check if first grid position is 0 if not grid is offseted
  const offset = gridPositions[0] ? 1 : 0
  // If block initial is not 0 it's index should be increased
  const startIndex = !gridPositions[0] && start ? start + 1 : start

  for (let i = startIndex; i < gridPositions.length; i++) {
    position = position + gridPositions[i]

    if (position === blockPosition) {
      index = i
      break
    }
  }

  return index + 1 + offset
}

const getGridPosition = (startPosition, endPosition, gridPosition) => {
  const startRow = findGridPositionIndex(startPosition, gridPosition)
  const endRow = findGridPositionIndex(endPosition, gridPosition, startRow - 1)

  return `${startRow}/${endRow}`
}

export const getGridBlocks = (initialData) => {
  return Object.keys(initialData.blocks).reduce((previousValue, blockKey) => {
    const block = initialData.blocks[blockKey]
    const components = initialData.blocks[blockKey].components.map((componentId) => {
      const component = initialData.components[componentId]

      return {
        ...component,
        componentId,
      }
    })

    const gridColumns = getGridPositions(components, 'left', 'width', block.width)
    const gridRows = getGridPositions(components, 'top', 'height')
    const gridTemplateRows = getGridTemplateRows(gridRows)
    const gridTemplateColumns = getGridTemplateColumns(gridColumns, block.width)
    const componentsWithGridProps = components.map((component) => {
      const gridRow = getGridPosition(component.position.top, component.position.height, gridRows)
      const gridColumn = getGridPosition(component.position.left, component.position.width, gridColumns)

      return {
        ...component,
        gridRow,
        gridColumn,
      }
    })

    return {
      ...previousValue,
      [blockKey]: {
        ...block,
        components: componentsWithGridProps,
        blockId: blockKey,
        gridRows,
        gridColumns,
        gridTemplateRows,
        gridTemplateColumns,
      },
    }
  }, {})
}
