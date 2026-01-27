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
      <nav class="nav">
        <ul class="flex gap-4">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
        </ul>
      </nav>
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
          <textarea
            class="border w-full border-blue-500 rounded-md p-2 min-h-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
            col="10"
            resize="none"
            name="text"
            id="text"
            placeholder="Paste your text here"
            v-model="text"
          ></textarea>
        </div>
        <div class="wrapper-summary flex gap-2 justify-end mb-10">
          <select class="border w-full border-blue-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" v-model="language">
            <option value="auto">Auto</option>
            <option value="en">English</option>
            <option value="ru">Russian</option>
          </select>
          <select class="border w-full border-blue-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" v-model="mode">
            <option value="bullets">Bullets</option>
            <option value="short">Short</option>
            <option value="detailed">Detailed</option>
          </select>
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
