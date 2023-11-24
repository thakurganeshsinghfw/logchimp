<template>
  <div class="file-upload-wrapper">
    <label :for="fileInputId">{{ label }}</label>
    <input
      type="file"
      :id="fileInputId"
      :name="name"
      :disabled="disabled"
      :multiple="multiple"
      :accept="accept"
      @change="handleFileChange"
    />
    <div v-if="preview && files.length">
      <p>Selected Files:</p>
      <ul>
        <li v-for="file in files" :key="file.name">{{ file.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: '',
    },
    preview: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      files: [] as File[],
      fileInputId: `fileInput_${Math.random().toString(36).substring(2, 15)}`, // Generate unique ID for file input
    };
  },
  methods: {
    handleFileChange(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files) {
        this.files = Array.from(target.files);
      }
    },
  },
});
</script>

<style scoped>
.file-upload-wrapper {
  font-size: 0.75rem;
  margin-bottom: 0.375rem;
  color: var(--color-gray-60);
}

.file-input-container {
  position: relative;
  overflow: hidden;
  display: inline-block;
}

/* Styles for the file input */
.file-input-container input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
}

/* Styles for the icon */
.file-input-icon {
  position: absolute;
  top: 0;
  right: 0;
  padding: 8px; 
  background-color: #f0f0f0;
  cursor: pointer;
  z-index: 0;
}
</style>
