const getGridRows = (positionMap) => {
    return Object.keys(positionMap.rows).reduce((rowHeights, currentPosition) => {
      const previousRowsHeight = rowHeights.reduce((sum, rowHeight) => sum + rowHeight, 0)
      const currentRowHeight = Number(currentPosition) - previousRowsHeight
  
      return [...rowHeights, currentRowHeight]
    }, [])
  }
  
  const getGridColumns = (positionMap) => {
    return Object.keys(positionMap.columns).reduce((columnWidths, currentPosition) => {
      const previousColumnsWidth = columnWidths.reduce(
        (sum, columnWidth) => sum + columnWidth,
        0,
      )
      const currentColumnWidth = Number(currentPosition) - previousColumnsWidth
  
      return [...columnWidths, currentColumnWidth]
    }, [])
  }
  
  const getPositionMap = (blockComponents) => {
    return blockComponents.reduce((positions, component) => {
      const { position, componentId } = component
      const { top, height, left, width } = position
      const bottom = top + height
      const right = left + width
  
      return {
        ...positions,
        rows: {
          ...positions.rows,
          [top]: {
            ...positions.rows?.[top],
            [componentId]: 'top',
          },
          [bottom]: {
            ...positions.rows?.[bottom],
            [componentId]: 'bottom',
          },
        },
        columns: {
          ...positions.columns,
          [left]: {
            ...positions.columns?.[left],
            [componentId]: 'left',
          },
          [right]: {
            ...positions.columns?.[right],
            [componentId]: 'right',
          },
        },
      }
    }, {})
  }
  
  // loop through the components and assign the grid row:
  const getSlayoutComponents = (blockComponents, positionMap) => {
    // additional push index for rows/columns if there is no '0' top/left
    const pushRowsIndex = positionMap.rows[0] ? 0 : 1
    const pushColumnsIndex = positionMap.columns[0] ? 0 : 1
    return blockComponents.map((component) => {
      const top = Object.values(positionMap.rows).findIndex((position) => {
        return position[component.componentId] === 'top'
      })
      const bottom = Object.values(positionMap.rows).findIndex((position) => {
        return position[component.componentId] === 'bottom'
      })
      const left = Object.values(positionMap.columns).findIndex((position) => {
        return position[component.componentId] === 'left'
      })
      const right = Object.values(positionMap.columns).findIndex((position) => {
        return position[component.componentId] === 'right'
      })
  
      return {
        ...component,
        gridRow: `${top + 1 + pushRowsIndex}/${bottom + 1 + pushRowsIndex}`,
        gridColumn: `${left + 1 + pushColumnsIndex}/${right + 1 + pushColumnsIndex}`,
      }
    })
  }
  
  export const getGridBlocks = (initialData) => {
    return Object.entries(initialData.blocks).reduce((gridBlocks, [blockId, blockData]) => {
      const blockComponents = blockData.components.map((componentId) => {
        return {
          ...initialData.components[componentId],
          componentId,
        }
      })
      const positionMap = getPositionMap(blockComponents)
      const gridRows = getGridRows(positionMap)
      const gridColumns = getGridColumns(positionMap)
      const unusedColumnWidth = gridColumns.reduce(
        (width, column) => width - column,
        blockData.width,
      )
  
      // if all the columns were subtracted and there is still space left - add a column of that space
      if (unusedColumnWidth !== 0) gridColumns.push(unusedColumnWidth)
  
      const gridTemplateRows = gridRows
        .filter(i => i !== 0)
        .map(row => `minmax(${row}px, auto)`)
        .join(' ')
  
      const gridTemplateColumns = gridColumns
        .filter(i => i !== 0)
        .map(column => `${column / blockData.width}fr`) // use fr?
        .join(' ')
  
      const components = getSlayoutComponents(blockComponents, positionMap)
  
      return {
        ...gridBlocks,
        [blockId]: {
          ...blockData,
          blockId,
          gridTemplateRows,
          gridTemplateColumns,
          gridRows,
          gridColumns,
          components,
        },
      }
    }, {})
  }
  