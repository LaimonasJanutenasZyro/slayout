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
    console.warn(rawValues)
    const uniqueValues = _.uniq(rawValues)

    console.warn(uniqueValues)

    const gridRows = uniqueValues.map((value, index) => {
      const previousValue = uniqueValues[index - 1] || 0
      return value - previousValue
    })

    return gridRows
}




// const getComponentData = (components: Component[], componentId: string) => {
//   const component = components.find(component => component.id === componentId)
//   if (!component) {
//     return null
//   }
//   return component
// }