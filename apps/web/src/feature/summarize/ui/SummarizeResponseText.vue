<template>
      <div class="wrapper-summary flex flex-col gap-2">
        <h2 class="text-2xl font-bold">{{ summary.title }}</h2>
        <ul class="list-disc list-inside">
            <li v-for="item in summary.summary" :key="item">{{ item }}</li>
          </ul>
      </div>
</template>

<script setup lang="ts">
import type { SummarizeResponse } from '@repo/shared';

defineProps<{
  summary: SummarizeResponse;
}>();
</script>
