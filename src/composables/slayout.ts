export const getGridBlocks = (initialData) => {
  const blocks = Object.entries(initialData.blocks).reduce((allBlocks, [blockId, blockValue]) => {
    /**
     * GET all X and Y positions
     */
    const { XPositions, YPositions } = blockValue.components.reduce((positions, componentId) => {
      const { position } = initialData.components[componentId]
      positions.XPositions.push(position.left, position.left + position.width)
      positions.YPositions.push(position.top, position.top + position.height)
      return positions
    }, { XPositions: [], YPositions: [] })

    /**
     * GET gridTemplateColumns
     */
    const uniqueAndOrderedXPositions = new Float64Array(
      Array.from(new Set([0, ...XPositions, blockValue.width])),
    ).sort()
    const gridColumns = uniqueAndOrderedXPositions.map((XPosition, index) => {
      return index ? XPosition - uniqueAndOrderedXPositions[index - 1] : XPosition
    })
    // [0, 10, 100] -> "0.01fr 0.1fr"
    const gridTemplateColumns = `${gridColumns.slice(1).map(value => value / 1000).join('fr ')}fr`

    /**
     * GET gridTemplateRows
     */
    const uniqueAndOrderedYPositions = new Float64Array(
      Array.from(new Set([0, ...YPositions])),
    ).sort()
    const gridRows = uniqueAndOrderedYPositions.map((YPosition, index) => {
      return index ? YPosition - uniqueAndOrderedYPositions[index - 1] : YPosition
    })
    // [0, 10, 100] -> "minmax(10px, auto) minmax(100px, auto)"
    const gridTemplateRows = `minmax(${gridRows.slice(1).join('px, auto) minmax(')}px, auto)`

    /**
     * GET components
     */
    const components = blockValue.components.map((componentId) => {
      const { position, content } = initialData.components[componentId]

      const gridRowStart = uniqueAndOrderedYPositions.indexOf(position.top) + 1
      const gridRowEnd = uniqueAndOrderedYPositions.indexOf(position.top + position.height) + 1

      const gridColumnStart = uniqueAndOrderedXPositions.indexOf(position.left) + 1
      const gridColumnEnd = uniqueAndOrderedXPositions.indexOf(position.left + position.width) + 1

      return {
        position,
        content,
        componentId,
        gridRow: `${gridRowStart}/${gridRowEnd}`,
        gridColumn: `${gridColumnStart}/${gridColumnEnd}`,
      }
    })

    return {
      ...allBlocks,
      [blockId]: {
        width: blockValue.width,
        components,
        blockId,
        gridTemplateRows,
        gridTemplateColumns,
      },
    }
  }, {})

  return blocks
}
