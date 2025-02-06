<template>
  <div
		class="dropdown-wrapper"
		@click="click"
		v-on-click-outside="away"
  >
    <slot name="toggle" />
    <slot :active="active" />
  </div>
</template>

<script setup lang="ts">
// packages
import { ref } from 'vue';
import { vOnClickOutside } from '@vueuse/components'

const active = ref<boolean>(false);
const props = defineProps({
	disabled: {
		type: Boolean,
		default: false
	}
});

function click() {
	if (props.disabled) return;
	active.value = !active.value;
};

function away() {
	active.value = false;
}
</script>

<style lang='sass'>
.dropdown-wrapper
	position: relative
</style>

<style lang='scss'>
.filter-button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: #050505;
  color: white;
  cursor: pointer;
}

.filter-button:hover {
  background-color: #0056b3;
}
</style>


