<template>
  <div class="card">
    <div ref="toolbarRef" class="toolbar"></div>
    <div ref="editorRef" class="editor"></div>

    <div style="display: flex; justify-content: flex-end">
      <Button type="primary" :loading="loading" :disabled="!comment" @click="submitComment">
        Submit
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Quill, { Quill as QuillType } from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import { addComment } from "../../modules/posts";
import tokenError from "../../utils/tokenError";
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
let quillInstance: QuillType | null = null;
const toolbarRef = ref<HTMLDivElement | null>(null);
const editorRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  if (toolbarRef.value && editorRef.value) {
    quillInstance = new Quill(editorRef.value, {
      theme: 'snow',
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
    toolbarRef.value.appendChild(quillInstance.getModule('toolbar').container);
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
      body: comment.value,
      is_internal: false,
    });

    comment.value = ""; // Clear the comment ref
    quillInstance?.setText(''); // Clear the Quill editor content
    loading.value = false;
    emit('add-comment', response.data.comment);
  } catch (error) {
    tokenError(error);
    loading.value = false;
  }
}
</script>

<style scoped>
.toolbar {
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
  padding-bottom: 5px;
}

.editor {
  background-color: #efefef;
}
</style>

