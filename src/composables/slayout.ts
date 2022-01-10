export const getGridBlocks = (initialData) => {
  console.log(initialData)
  return {
    blockId1: {
      width: 1000,
      components: [
        {
          position: { top: 0, left: 0, height: 100, width: 400 },
          content: 'What makes this app different from other such apps are its numerous features and many specialties.',
          componentId: 'componentId1',
          gridRow: '1/3',
          gridColumn: '1/4',
        },
        {
          position: { top: 0, left: 700, height: 260, width: 300 },
          content: 'Easy to use, easy to scale. That\'s not all though. It is so much more than just the interface of a simple drawing program; it could do everything you\'d expect in an image editing application (especially if they came with some support for landscape orientation).',
          componentId: 'componentId2',
          gridRow: '1/6',
          gridColumn: '7/8',
        },
        {
          position: { top: 80, left: 200, height: 120, width: 400 },
          content: 'Icon packs A huge collection can be found within one menu bar without opening them again!',
          componentId: 'componentId3',
          gridRow: '2/4',
          gridColumn: '2/5',
        },
        {
          position: { top: 225, left: 250, height: 100, width: 400 },
          content: 'There will always-be at least four icons available even wher',
          componentId: 'componentId4',
          gridRow: '5/7',
          gridColumn: '3/6',
        },
      ],
      blockId: 'blockId1',
      gridTemplateRows: 'minmax(80px, auto) minmax(20px, auto) minmax(100px, auto) minmax(25px, auto) minmax(35px, auto) minmax(65px, auto)',
      gridTemplateColumns: '0.2fr 0.05fr 0.15fr 0.2fr 0.05fr 0.05fr 0.3fr',
      gridRows: [0, 80, 20, 100, 25, 35, 65],
      gridColumns: [0, 200, 50, 150, 200, 50, 50, 300],
    },
    blockId2: {
      width: 1000,
      components: [
        {
          position: { top: 10, left: 50, height: 100, width: 500 },
          content: 'What makes this app different from other such apps are its numerous features and many specialties.',
          componentId: 'componentId5',
          gridRow: '2/5',
          gridColumn: '2/5',
        },
        {
          position: { top: 25, left: 700, height: 260, width: 250 },
          content: 'Easy to use, easy to scale. That\'s not all though. It is so much more than just the interface of a simple drawing program; it could do everything you\'d expect in an image editing application (especially if they came with some support for landscape orientation).',
          componentId: 'componentId6',
          gridRow: '3/8',
          gridColumn: '8/9',
        },
        {
          position: { top: 80, left: 200, height: 120, width: 400 },
          content: 'Icon packs A huge collection can be found within one menu bar without opening them again!',
          componentId: 'componentId3',
          gridRow: '4/6',
          gridColumn: '3/6',
        },
        {
          position: { top: 225, left: 250, height: 100, width: 400 },
          content: 'There will always-be at least four icons available even wher',
          componentId: 'componentId4',
          gridRow: '7/9',
          gridColumn: '4/7',
        },
      ],
      blockId: 'blockId2',
      gridTemplateRows: 'minmax(10px, auto) minmax(15px, auto) minmax(55px, auto) minmax(30px, auto) minmax(90px, auto) minmax(25px, auto) minmax(60px, auto) minmax(40px, auto)',
      gridTemplateColumns: '0.05fr 0.15fr 0.05fr 0.3fr 0.05fr 0.05fr 0.05fr 0.25fr 0.05fr',
      gridRows: [10, 15, 55, 30, 90, 25, 60, 40],
      gridColumns: [50, 150, 50, 300, 50, 50, 50, 250, 50],
    },
  }
}
