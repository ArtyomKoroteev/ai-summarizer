<template>
  <div class="container mx-auto p-4 min-h-screen">
    <AppHeader />
    <main class="main h-full">
      <AppHero />
      <SummarizeForm
        :language="language"
        :mode="mode"
        :text="text"
        :languagesOptions="languagesOptions"
        :modesOptions="modesOptions"
        :errorMessage="errorMessage"
        @summarize="summarizeText"
      />
      <SummarizeResponseText :summary="summary" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { summarize } from './api/summarize'
import { ref } from 'vue'
import type { SummarizeResponse, SummarizeLanguage, SummarizeMode, SummarizeRequest } from '@repo/shared'
import AppHeader from './widgets/AppHeader.vue';
import AppHero from './widgets/AppHero.vue';
import { AxiosError } from 'axios';
import SummarizeForm from './feature/summarize/ui/SummarizeForm.vue';
import SummarizeResponseText from './feature/summarize/ui/SummarizeResponseText.vue';
import { languagesOptions, modesOptions } from './feature/constants';

const text = ref('');
const language = ref<SummarizeLanguage>('en');
const mode = ref<SummarizeMode>('bullets');
const summary = ref<SummarizeResponse>({
  title: '',
  summary: [],
  tags: [],
});
const errorMessage = ref<string[]>([]);

const summarizeText = async (data: SummarizeRequest) => {
  text.value = data.text;
  mode.value = data.mode;
  language.value = data.language;
  try {
    const result = await summarize({
      text: text.value,
      mode: mode.value,
      language: language.value,
    })
    summary.value = result;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      errorMessage.value = error.response?.data.message;
    }
  }
}
</script>
