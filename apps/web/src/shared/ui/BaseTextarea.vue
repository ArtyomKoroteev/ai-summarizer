<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
    rows?: number
    label: string
    disabled?: boolean
    id?: string
    showLabel?: boolean
  }>(),
  {
    placeholder: '',
    rows: 10,
    disabled: false,
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
}
</script>

<template>
<div class="input-wrapper">
  <label :for="id" :class="{
    'sr-only': !showLabel
  }">{{ label }}</label>
  <textarea
    class="border w-full border-blue-500 rounded-md p-2 min-h-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
    col="10"
    resize="none"
    name="text"
    :id="id"
    :placeholder="placeholder"
    :value="modelValue"
    @input="handleInput"
  ></textarea>
</div>
</template>
