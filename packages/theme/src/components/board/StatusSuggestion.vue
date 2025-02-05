<template>
  <div class="status-suggestion" @click="$emit('click', status)">
    <div
      class="status-dot"
      data-test="status-suggestion-dot"
      :style="{
        backgroundColor: status.color
      }"
    />
    <div class="status-suggestion-content">
      <h5 data-test="status-suggestion-name">
        {{ status.name }}
      </h5>
      <span data-test="status-suggestion-description">{{ status.description }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  status: {
    type: Object,
    required: true,
    default: () => ({
      name: "",
      color: "#000000", // Default color for the status dot
      description: "",
    }),
  },
});
</script>

<style lang="sass">
.status-suggestion
  display: flex
  align-items: center
  padding: 0.75rem 1rem
  background-color: var(--color-white)
  cursor: pointer
  margin: 0 0.375rem
  border-radius: var(--border-radius-default)

  &:hover
    background-color: var(--color-gray-97)

.status-dot
  width: 1rem
  height: 1rem
  border-radius: 50%

.status-suggestion-content
  margin-left: 1.5rem

  h5
    margin-bottom: 0

  span
    color: var(--color-gray-60)
</style>
