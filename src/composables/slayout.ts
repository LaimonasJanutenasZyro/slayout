export const getGridBlocks = (initialData) => {
  const { blocks, components } = initialData
  const gridRowMap = {}
  Object.entries(blocks).forEach(([blockId, blockData]) => {
    const uniqueYLines = [...new Set(blockData.components.reduce((acc, componentId) => {
      const { top, height } = initialData.components[componentId].position
      const bottom = top + height
      acc.push(top)
      acc.push(bottom)
      return acc
    }, []))].sort((a, b) => a - b)

    const gridRows = uniqueYLines.reduce((acc, prevValue) => {
      const totalAccountedHeight = acc.reduce((a, b) => a + b, 0)
      acc.push(prevValue - totalAccountedHeight)
      return acc
    }, [])

    gridRowMap[blockId] = gridRows
  })
  // Pixel implementation:
  // Object.entries(blocks).forEach(([blockId, blockData]) => {
  //   // Sort by top so we can go top to bottom
  //   const blockComponentsCopy = JSON.parse(JSON.stringify(blockData.components))
  //   blockComponentsCopy.sort((a, b) => components[a].position.top - components[b].position.top)

  //   let foundRowCounter = 0
  //   // start from start of first element
  //   let currentPixel = initialData.components[blockComponentsCopy[0]].position.top
  //   let prevMatchedPixel = 0
  //   const gridRowSizes = []

  //   // Scan all pixels downwards
  //   while (foundRowCounter < blockComponentsCopy.length * 2) {
  //     blockComponentsCopy.forEach((componentId) => {
  //       const { position } = components[componentId]
  //       const { top, height } = position
  //       const bottom = top + height

  //       if (currentPixel === top || currentPixel === bottom) {
  //         foundRowCounter += 1
  //         gridRowSizes.push(currentPixel - prevMatchedPixel)

  //         prevMatchedPixel = currentPixel
  //       }
  //     })
  //     currentPixel += 1
  //   }
  //   gridRowMap[blockId] = gridRowSizes
  // })
  return {
    gridRowMap,
  }
}
