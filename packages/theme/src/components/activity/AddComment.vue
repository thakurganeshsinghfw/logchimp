<template>
  <div class="card">
    <div ref="toolbarRef" class="toolbar"></div> <!-- Toolbar container -->
    <div ref="editorRef" class="editor"></div> <!-- Quill editor container -->

    <div style="display: flex; justify-content: flex-end">
      <Button
        type="primary"
        :loading="loading"
        :disabled="!comment"
        @click="submitComment"
      >
        Submit
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Quill, { Quill as QuillType } from 'quill'; // Import Quill and QuillType
import 'quill/dist/quill.core.css'; // Import Quill styles
import 'quill/dist/quill.snow.css'; // Import Quill's Snow theme (you may adjust it as needed)

// modules
import { addComment } from "../../modules/posts";
import tokenError from "../../utils/tokenError";

// components
import Button from "../ui/Button.vue";

const props = defineProps({
  postId: {
    type: String,
    required: true,
  },
});

const comment = ref<string>("");
const loading = ref<boolean>(false);
const emit = defineEmits(['add-comment']);

let quillInstance: QuillType | null = null; // Define quillInstance with QuillType

const toolbarRef = ref<HTMLDivElement | null>(null); // Define toolbarRef with proper typing
const editorRef = ref<HTMLDivElement | null>(null); // Define editorRef with proper typing

onMounted(() => {
  // Ensure the toolbarRef and editorRef are available for Quill Editor initialization
  if (toolbarRef.value && editorRef.value) {
    quillInstance = new Quill(editorRef.value, {
      theme: 'snow', // Use Snow theme for the editor
      placeholder: 'Leave a comment',
      modules: {
        toolbar: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          ['link', 'blockquote', 'code-block'],
          [{ 'align': [] }],
          ['image', 'video'],
          ['clean']
        ]
      }
    });

    // Attach the toolbar to the toolbarRef element
    toolbarRef.value.appendChild(quillInstance.getModule('toolbar').container);

    // Listen to editor changes if needed
    quillInstance.on('text-change', () => {
      comment.value = quillInstance!.root.innerHTML;
    });
  }
});

async function submitComment() {
  if (!comment.value || !props.postId) return;

  try {
    loading.value = true;
    const response = await addComment({
      post_id: props.postId,
      body: comment.value, // Passing captured comment content here
      is_internal: false,
    });

    comment.value = ""; // Clear comment after submission
    loading.value = false;

    emit('add-comment', response.data.comment);
  } catch (error) {
    tokenError(error);
    loading.value = false;
  }
}
</script>

<style scoped>
/* Add necessary styles for toolbar and editor */
.toolbar {
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  padding-bottom: 5px;
}

.editor {
  background-color: #efefef;
}
</style>
