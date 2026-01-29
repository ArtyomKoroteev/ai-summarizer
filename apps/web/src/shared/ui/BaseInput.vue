<template>
  <input :value="modelValue" :placeholder="placeholder" :type="type" @input="handleInput" />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: string;
  placeholder?: string;
  type?: string;
}>(), {
  placeholder: '',
  type: 'text',
});

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>();

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>