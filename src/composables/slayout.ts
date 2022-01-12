import _ from 'lodash'

interface Component {
  position: {
    top: number,
    left: number,
    height: number,
    width: number
  },
  content: string
}

interface Components {
  [key: string]: Component
}

interface Block {
  width: number,
  components: Component[],
  blockId?: string,
  gridTempateRows?: string,
  gridTemplateColumns?: string,
  gridRows: number[],
  gridColumns: number[],
}

interface Blocks {
  [key: string]: Block
}

export const getGridBlocks = (initialData: {blocks: Blocks, components: Components}) => {

  console.warn(initialData)
  const {blocks, components} = initialData

  Object.entries(blocks).forEach(entry => {
    const [blockId, block] = entry
    const gridRows = getGridRows(block, components)
    console.warn(gridRows)
  })

  Object.entries(blocks).forEach(entry => {
    const [blockId, block] = entry
    const {components: blockComponents} = block
    blockComponents.forEach(component => {

    })
  })
  return {
  }
}

const getGridRows = (block: Block, components: Components) => {
    const rawValues = block.components.reduce((acc, componentId)  => {
      const component = components[componentId]
      const {top, height} = component.position
      return [...acc, top, top + height]
    }, [])

    const uniqueValues = _.uniq(rawValues)
    const sortedUniqueValues = uniqueValues.sort((a, b) => a - b)

    // I did not get this process
    // I couldn't figure out that I need to do this
    const gridRows = sortedUniqueValues.map((value, index) => {
      const previousValue = sortedUniqueValues[index - 1] || 0
      return value - previousValue
    })

    return gridRows
}

const getGridColumns = (block: Block, components: Components) => {
  const rawValues = block.components.reduce((acc, componentId) => {
    const component = components[componentId]
    const { top, height } = component.position
    return [...acc, top, top + height]
  }, [])

  const uniqueValues = _.uniq(rawValues)
  const sortedUniqueValues = uniqueValues.sort((a, b) => a - b)

  // I did not get this process
  // I couldn't figure out that I need to do this
  const gridRows = sortedUniqueValues.map((value, index) => {
    const previousValue = sortedUniqueValues[index - 1] || 0
    return value - previousValue
  })

  return gridRows
}