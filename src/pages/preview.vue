<script setup lang="ts">
import Prism from 'vue-prism-component'
import initialData from '~/data/initialData'
import renderData from '~/data/renderData'
import { getGridBlocks } from '~/composables/slayout'

const hoveredRow = ref(null)
const hoveredColumn = ref(null)
const hoveredBlockId = ref(null)

const getDataColumn = (block, index) => {
  // filter out 0 column, if exists:
  const columns = block.gridColumns.filter(i => i !== 0)
  const column = columns[index]
  return column && `${column / block.width}fr`
}

const getDataRow = (block, index) => {
  // filter out 0 row, if exists:
  const rows = block.gridRows.filter(i => i !== 0)
  return rows[index]
}

const gridBlocks = getGridBlocks(initialData)
</script>

<template>
  <div class="min-h-screen max-w-1032px mx-auto p-4">
    <h1 class="font-black tracking-tight text-4xl p-4 text-center">
      PREVIEW
    </h1>
    <template v-for="block in renderData" :key="block.blockId">
      <h2 class="font-black tracking-tight text-2xl py-4" v-text="block.blockId" />
      <div
        class="slayout__block mb-16 grid w-full"
        :style="{
          maxWidth: `${block.width}px`,
          gridTemplateRows: block.gridTemplateRows,
          gridTemplateColumns: block.gridTemplateColumns,
        }"
        @mouseenter="hoveredBlockId = block.blockId"
        @mouseleave="(hoveredColumn = null), (hoveredRow = null), (hoveredBlockId = null)"
      >
        <div
          v-for="component in block.components"
          :key="component.id"
          class="slayout__component z-2 border-light-500 border-current border-1 rounded p-2 opacity-60 hover:opacity-100 transition"
          :style="{
            gridRow: component.gridRow,
            gridColumn: component.gridColumn,
          }"
        >
          {{ component.content }}
          <details class="text-sm">
            <summary class="cursor-pointer">
              <b>props</b>
            </summary>
            <Prism
              language="javascript"
              v-text="{
                position: component.position,
                gridRow: component.gridRow,
                gridColumn: component.gridColumn,
              }"
            />
          </details>
        </div>
        <div
          v-for="(column, c) in block.gridColumns"
          :key="c"
          class="slayout__column relative z-1 opacity-20 transition"
          :class="{
            'opacity-80': hoveredColumn === c && hoveredBlockId === block.blockId,
          }"
          :data-column="getDataColumn(block, c)"
          :style="{
            gridColumn: `${c + 1}/${c + 2}`,
          }"
        />
        <div
          v-for="(row, r) in block.gridRows"
          :key="r"
          class="slayout__row relative z-1 opacity-20 transition grid"
          :class="{
            'opacity-80': hoveredRow === r && hoveredBlockId === block.blockId,
          }"
          :data-row="getDataRow(block, r)"
          :style="{
            gridRow: `${r + 1}/${r + 2}`,
            gridTemplateColumns: block.gridTemplateColumns,
          }"
        >
          <div
            v-for="(column, c) in block.gridColumns"
            :key="c"
            class="relative"
            :style="{
              gridColumn: `${c + 1}/${c + 2}`,
            }"
            @mouseenter="(hoveredColumn = c), (hoveredRow = r)"
          />
        </div>
      </div>
    </template>

    <h2 class="font-black tracking-tight text-2xl py-4">
      INSTRUCTIONS
    </h2>
    <p>
      Take <span class="font-mono text-sm bg-dark-50 py-0.5 px-1 rounded inline-flex items-center">
        src/data/initialData.json
      </span> and and reconstruct it so that:
    </p>
    <ol class="list-decimal px-6">
      <li>Blocks would contain corresponding components with their data.</li>
      <li>
        Components data would be extended with additional
        <span class="font-mono text-sm bg-dark-50 py-0.5 px-1 rounded inline-block">{ gridRow: '1/2', gridColumn: '3/4' }</span>
        where 1/2 is starting/ending rows, 3/4 is starting/endiing colums.
      </li>
      <li>
        Blocks data would be extended with additional
        <span class="font-mono text-sm bg-dark-50 py-0.5 px-1 rounded inline-block">{ gridTemplateRows: 'minmax(200px, auto) minmax(100px, auto)' }</span>
        where 200px and 100px is row heigts calculated from components.
      </li>
      <li>
        Blocks data would be extended with additional
        <span class="font-mono text-sm bg-dark-50 py-0.5 px-1 rounded inline-block">{ gridTemplateColumns: '0.2fr 0.1fr' }</span>
        where 0.2fr and 0.1fr is relative column width (0.1 == 10%).
      </li>
    </ol>

    <h2 class="font-black tracking-tight text-2xl py-6">
      GOTCHAS
    </h2>
    <ol class="list-decimal px-4">
      <li>
        <span class="font-mono text-sm bg-dark-50 py-0.5 px-1 rounded inline-block">{ gridRow: '1/2', gridColumn: '3/4' }</span>
        values take 1 as first index (not 0).
      </li>
      <li>There can be multiple components with same top / left values</li>
      <li>There can be components with top values matching other components bottom values</li>
      <li>
        There can be components that are not sticking to the side of the block, like
        <span class="font-mono text-sm bg-dark-50 py-0.5 px-1 rounded inline-block">blockId2</span>
      </li>
    </ol>
  </div>
</template>

<style>
.slayout__row {
  grid-column: -1 / 1;
  outline: solid 1px rgba(255, 255, 255, 0.2);
}

.slayout__row::after {
  content: attr(data-row);
  position: absolute;
  left: 100%;
  bottom: 0;
  padding: 0 8px;
  font-size: 14px;
  top: 0;
  display: flex;
  align-items: center;
}

.slayout__column {
  grid-row: -1 / 1;
  outline: solid 1px rgba(255, 255, 255, 0.2);
}

.slayout__column::after {
  content: attr(data-column);
  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  text-align: center;
  padding: 4px 0;
  font-size: 14px;
}
</style>

<route lang="yaml">
meta:
  layout: default
</route>
