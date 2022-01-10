import { getGridBlocks } from '~/composables/slayout'
import initialData from '~/data/initialData'
import renderData from '~/data/renderData'

describe('getGridBlocks', () => {
  it('should correctly remap intial block data', () => {
    const blockData = getGridBlocks(initialData)
    console.log(blockData) // only gets grid template rows

    expect(blockData).toEqual(renderData)
  })
})
