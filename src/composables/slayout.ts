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
    const {width} = block
    const gridRows = getGridRows(block, components)
    const gridColumns = getGridColumns(block, components)
    const gridTemplateRows = getGridTemplateRows(gridRows)
    const gridTemplateColumns = getGridTemplateColumns(width, gridColumns)
    
    Object.values(components).forEach(component => {
      const componentPosition = getComponentPosition(component, gridRows, gridColumns)
    })    
    console.warn(gridRows)
    console.warn(gridColumns)
    console.warn(gridTemplateRows)
    console.warn(gridTemplateColumns)
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

const parseRawValues = (rawValues: number[]) => {
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

// also these two were unclear to me. What are their purpose ?
const getGridTemplateRows = (gridRows: number[]) => {
  return gridRows.reduce((acc, value) => {
    if(value){
      return `${acc? acc + ' ' : ''}minmax(${value}px, auto)`
    }

    return acc
  }, '')
}

const getGridTemplateColumns = (width: number, gridColumns: number[]) => {
  return gridColumns.reduce((acc, value) => {
    if (value) {
      return `${acc ? acc + ' ' : ''}${value/width}fr`
    }

    return acc
  }, '')
}

const getComponentPosition = (
  component: Component, 
  gridRows: number[], 
  gridColumns: number[]) => {
    return 'Bush did 9/11'
  }
  

