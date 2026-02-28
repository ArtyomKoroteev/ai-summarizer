<template>
      <div class="wrapper">
        <div class="wrapper-content mb-4">
          <BaseTextarea v-model="textModel"  placeholder="Paste your text here" id="prompt-input" label="Prompt" :show-label="false" />
          <div class="error-message" v-if="errorMessage.length > 0">
        <ul>
          <li class="text-red-500 text-sm" v-for="error in errorMessage" :key="error">{{ error }}</li>
        </ul>
      </div>
        </div>
        
        <div class="wrapper-summary flex gap-2 justify-between mb-10">
          <div class="flex gap-2 w-full max-w-2xl">
            <BaseSelect v-model="languageModel" :options="languagesOptions" label="Language" id="language-select" />
            <BaseSelect v-model="modeModel" :options="modesOptions" label="Mode" id="mode-select" />
          </div>
          <button
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 cursor-pointer"
            @click="summarizeText"
          >
            Summarize
          </button>
        </div>
        
      </div>
</template>

<script setup lang="ts">
import type { SummarizeLanguage, SummarizeMode } from '@repo/shared';
import type { SummarizeRequest } from '@repo/shared';

defineProps<{
  language: SummarizeLanguage;
  mode: SummarizeMode;
  languagesOptions: { value: string; label: string }[];
  modesOptions: { value: string; label: string }[];
  text: string;
  errorMessage: string[];
}>();

const languageModel = defineModel<SummarizeLanguage>('language');
const modeModel = defineModel<SummarizeMode>('mode');
const textModel = defineModel<string>('text');

const emit = defineEmits<{
  (e: 'summarize', data: SummarizeRequest): void;
}>();

const summarizeText = () => {
  emit('summarize', {
    language: languageModel.value,
    mode: modeModel.value,
    text: textModel.value,
  } as SummarizeRequest);
};
</script>