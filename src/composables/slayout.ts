export const getGridBlocks = (initialData) => {
  const { blocks, components } = initialData
  const gridRowMap = {}
  Object.entries(blocks).forEach(([blockId, blockData]) => {
    // Sort by top so we can go top to bottom
    const blockComponentsCopy = JSON.parse(JSON.stringify(blockData.components))
    blockComponentsCopy.sort((a, b) => components[a].position.top - components[b].position.top)

    let foundRowCounter = 0
    let currentPixel = 0
    let prevMatchedPixel = 0
    const gridRowSizes = []

    // Scan all pixels downwards
    while (foundRowCounter < blockComponentsCopy.length * 2) {
      blockComponentsCopy.forEach((componentId) => {
        const { position } = components[componentId]
        const { top, height } = position
        const bottom = top + height

        if (currentPixel === top || currentPixel === bottom) {
          foundRowCounter += 1
          gridRowSizes.push(currentPixel - prevMatchedPixel)

          prevMatchedPixel = currentPixel
        }
      })
      currentPixel += 1
    }
    gridRowMap[blockId] = gridRowSizes
  })
  return {
    gridRowMap,
  }
}
