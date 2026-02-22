<template>
  <div class="tabs">
    <div class="tabs-list">
      <div class="tabs-list__header" role="tablist">
        <button
          ref="tabButtons"
          class="tabs-list__button"
          role="tab"
          :aria-label="tab.title"
          v-for="tab in tabs"
          :key="tab.id"
          :aria-controls="tab.id"
          :aria-selected="selectedTab === tab.id"
          :tabindex="tab.id === selectedTab ? 0 : -1"
          @click="selectTab(tab.id)"
          @keydown.right.prevent="selectNextTab"
          @keydown.left.prevent="selectPreviousTab"
          @keydown.home.prevent="selectFirstTab"
          @keydown.end.prevent="selectLastTab"
        >
          {{ tab.title }}
        </button>
      </div>
      <div
        class="tabs-list__content"
        v-for="tab in tabs"
        :key="tab.id"
        :tabindex="tab.id === selectedTab ? 0 : -1"
        role="tabpanel"
        :aria-labelledby="tab.id"
      >
        <p class="tabs-list__description" v-if="selectedTab === tab.id">{{ tab.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

const props = defineProps<{
  tabs: { id: string; title: string; description: string }[]
}>()

const selectedTab = ref<string>(props.tabs[0]?.id || '')
const tabButtons = ref<HTMLButtonElement[]>([])

const selectTab = (tabId: string) => {
  selectedTab.value = tabId
}

const focusTab = (index: number) => {
  nextTick(() => {
    tabButtons.value[index]?.focus()
  })
}

const selectNextTab = () => {
  const currentIndex = props.tabs.findIndex((tab) => tab.id === selectedTab.value)
  const nextIndex = (currentIndex + 1) % props.tabs.length
  selectTab(props.tabs[nextIndex]?.id || '')
  focusTab(nextIndex)
}

const selectFirstTab = () => {
  selectTab(props.tabs[0]?.id || '')
  focusTab(0)
}

const selectLastTab = () => {
  const lastIndex = props.tabs.length - 1
  selectTab(props.tabs[lastIndex]?.id || '')
  focusTab(lastIndex)
}

const selectPreviousTab = () => {
  const currentIndex = props.tabs.findIndex((tab) => tab.id === selectedTab.value)
  const previousIndex = (currentIndex - 1 + props.tabs.length) % props.tabs.length
  selectTab(props.tabs[previousIndex]?.id || '')
  focusTab(previousIndex)
}
</script>

<style scoped lang="scss">
.tabs-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  &__header {
    display: flex;
    gap: 10px;
  }
  &__button {
    background-color: #f0f0f0;
    border: none;
    padding: 10px;
    border-radius: 5px;

    &:focus {
      outline: 2px solid #000;
    }

    &[aria-selected="true"] {
    background-color: #005fcc;
    color: white;
  }
  }
  &__content {
    display: flex;
    gap: 10px;
  }
}
</style>
