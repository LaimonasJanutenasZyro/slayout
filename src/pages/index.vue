<script setup lang="ts">
const isCopied = ref(false)
const copy = () => {
  navigator.clipboard.writeText('git@github.com:algirdas-zyro/slayout.git')
  isCopied.value = true
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center max-w-4xl mx-auto p-4">
    <h1 class="font-black tracking-tight text-8xl leading-24">
      <span
        class="bg-gradient-to-r to-violet-500 from-fuchsia-500 bg-clip-text"
        style="-webkit-text-fill-color: transparent"
      >
        SLAYOUT
      </span>
      <span class="font-light relative -left-4">*</span>
      <br>
      <span>CHALLENGE</span>
    </h1>
    <p class="opacity-50 text-sm">
      * Superior Layout
    </p>
    <div class="py-16 text-xl">
      Let's calculate some declarative
      <router-link class="underline" to="/preview">
        CSS grid positioning
      </router-link>.
    </div>
    <div class="text-left">
      <ol class="list-decimal px-4">
        <li>
          clone
          <span class="font-mono text-sm bg-dark-50 py-0.5 px-1 rounded inline-flex items-center">
            git@github.com:algirdas-zyro/slayout.git
            <carbon-copy v-if="!isCopied" class="relative text-xs cursor-pointer ml-2" @click="copy" />
            <carbon-checkmark-outline v-else class="relative text-xs cursor-pointer ml-2" />
          </span>
        </li>
        <li>
          initialize and start the challenge
          <span class="font-mono text-sm bg-dark-50 py-0.5 px-1 rounded inline-flex items-center">
            yarn start
          </span>
        </li>
        <li>
          observe
          <span class="font-mono text-sm bg-dark-50 py-0.5 px-1 rounded inline-flex items-center">
            src/data/initialData.json
          </span> and
          <span class="font-mono text-sm bg-dark-50 py-0.5 px-1 rounded inline-flex items-center">
            src/data/renderData.json
          </span> - this is initial and expeced final render data blocks with extended components
        </li>
        <li>
          open
          <span class="font-mono text-sm bg-dark-50 py-0.5 px-1 rounded inline-flex items-center">
            src/composables/slayout.ts
          </span>
          and
          <span class="font-mono text-sm bg-dark-50 py-0.5 px-1 rounded inline-flex items-center">
            test/slayout.test.ts
          </span>
          for tests
        </li>
        <li>have fun!</li>
      </ol>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
