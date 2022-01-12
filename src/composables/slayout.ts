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
    const gridColumns = getGridColumns(block, components)
    console.warn(gridColumns)

    const gridTemplateRows = getGridTemplateRows(gridRows)
    console.warn(gridTemplateRows)
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

    return parseRawValues(rawValues)
}

const getGridColumns = (block: Block, components: Components) => {
  const rawValues = block.components.reduce((acc, componentId) => {
    const component = components[componentId]
    const { left, width } = component.position
    return [...acc, left, left + width]
  }, [])

  return parseRawValues(rawValues)
}

const parseRawValues = (rawValues) => {
  const uniqueValues = _.uniq(rawValues)
  const sortedUniqueValues = uniqueValues.sort((a, b) => a - b)

  // I did not get this process
  // I couldn't figure out that I need to do this
  const gridValues = sortedUniqueValues.map((value, index) => {
    const previousValue = sortedUniqueValues[index - 1] || 0
    return value - previousValue
  })

  return gridValues
}

function getGridTemplateRows(gridRows: number[]) {
  return gridRows.reduce((acc, value) => {
    if(value){
      return `${acc? acc + ' ' : ''}minmax(${value}px, auto)`
    }

    return acc
  }, '')
}