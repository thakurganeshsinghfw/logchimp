<template>
  <div class="select-wrapper">
    <label :for="name">{{ label }}</label>
    <select :id="name" :name="name" v-model="internalValue" :disabled="disabled">
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    options: {
      type: Array as PropType<Array<{ label: string; value: string }>>,
      required: true
    },
    selectedValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    internalValue: {
      get() {
        return this.selectedValue;
      },
      set(value: string) {
        this.$emit('update:selectedValue', value);
      }
    }
  }
});
</script>

<style>
.select-wrapper label {
  font-size: 0.75rem;
  margin-bottom: 0.375rem;
  color: var(--color-gray-60);
}

.select-wrapper select {
  font-size: 0.75rem;
  margin-bottom: 0.375rem;
  color: var(--color-gray-60);
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Style for option elements */
.select-wrapper select option {
  font-size: 0.75rem;
  color: var(--color-text-black);
}

/* Style for the selected option */
.select-wrapper select option:checked {
  background-color: var(--color-primary);
  color: white; 
}

.select-wrapper select option[disabled] {
  font-style: italic;
}

</style>