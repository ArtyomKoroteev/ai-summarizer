<template>
  <div class="container mx-auto p-4 min-h-screen">
    <header class="header flex justify-between">
      <div class="logo">
        <svg width="25" height="25" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
          <rect width="25" height="25" rx="6" ry="6" fill="#2F92FF" />
          <path
            d="M12.5 6 L14 10.5 L18.5 12 L14 13.5 L12.5 18 L11 13.5 L6.5 12 L11 10.5 Z"
            fill="white"
          />
          <path
            d="M17.5 7.5 L18.5 10.5 L21.5 11.5 L18.5 12.5 L17.5 15.5 L16.5 12.5 L13.5 11.5 L16.5 10.5 Z"
            fill="white"
            opacity="0.9"
          />
          <path
            d="M9 14 L9.7 16 L11.7 16.7 L9.7 17.4 L9 19.4 L8.3 17.4 L6.3 16.7 L8.3 16 Z"
            fill="white"
            opacity="0.85"
          />
        </svg>
      </div>
    </header>
    <main class="main h-full">
      <div class="main-content flex align-center justify-center flex-col gap-2 mt-10 mb-20">
        <h1 class="text-6xl font-bold text-center mb-4">Summarize with precision</h1>
        <p class="text-center text-lg text-gray-500">
          AI-powered text summarization service with REST API and web interface.
        </p>
      </div>
      <div class="wrapper">
        <div class="wrapper-content mb-4">
          <BaseTextarea v-model="text"  placeholder="Paste your text here" id="prompt-input" label="Prompt" :show-label="false" />
        </div>
        <div class="wrapper-summary flex gap-2 justify-between mb-10">
          <div class="flex gap-2 w-full max-w-2xl">
            <BaseSelect v-model="language" :options="languagesOptions" label="Language" id="language-select" />
            <BaseSelect v-model="mode" :options="modesOptions" label="Mode" id="mode-select" />
          </div>
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 cursor-pointer"
            @click="summarizeText"
          >
            Summarize
          </button>
        </div>
      </div>
      <div class="wrapper-summary flex flex-col gap-2">
        <h2 class="text-2xl font-bold">{{ summary.title }}</h2>
        <ul class="list-disc list-inside">
            <li v-for="item in summary.summary" :key="item">{{ item }}</li>
          </ul>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { summarize } from './api/summarize'
import { ref } from 'vue'
import type { SummarizeResponse, SummarizeLanguage, SummarizeMode } from '@repo/shared'

const languagesOptions = [
  { value: 'auto', label: 'Auto' },
  { value: 'en', label: 'English' },
  { value: 'ru', label: 'Russian' },
]
const modesOptions = [
  { value: 'bullets', label: 'Bullets' },
  { value: 'short', label: 'Short' },
  { value: 'detailed', label: 'Detailed' },
]

const text = ref('')
const language = ref<SummarizeLanguage>('en')
const mode = ref<SummarizeMode>('bullets')
const summary = ref<SummarizeResponse>({
  title: '',
  summary: [],
})

const summarizeText = async () => {
  const result = await summarize({
    text: text.value,
    mode: mode.value,
    language: language.value,
  })
  summary.value = result
}
</script>
