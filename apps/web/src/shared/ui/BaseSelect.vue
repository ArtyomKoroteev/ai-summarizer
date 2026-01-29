<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  options: { value: string; label: string }[]
  label: string
  id: string
  showLabel?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleChange = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLSelectElement).value)
}
</script>

<template>
  <div class="input-wrapper w-full flex">
    <label
      :for="id"
      :class="{
        'sr-only': !showLabel,
      }"
      >{{ label }}</label
    >
    <select
      class="border w-full border-blue-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      :id="id"
      :value="modelValue"
      @change="handleChange"
    >
      <option v-for="option in options" :id="id" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
