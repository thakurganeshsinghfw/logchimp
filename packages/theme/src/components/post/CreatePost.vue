<template>
	<div class="scrollable-container">
		<div class="card">
			<h5>Create a new post</h5>
			<l-text
			v-model="title.value"
			label="Title"
			type="text"
			name="Post title"
			data-test="post-title"
			placeholder="Name of the feature"
			:error="title.error"
			:disabled="createPostPermissionDisabled"
			@keyup-enter="submitPost"
			@hide-error="hideTitleError"
			/>
			<l-textarea
			v-model="description"
			label="Description"
			rows="4"
			name="Post description"
			placeholder="What would you use it for?"
			:disabled="createPostPermissionDisabled"
			/>
			<l-select
			name="Post Category"
			:value="category"
			@update:value="updateSelection"
			label="Category"
			:options="categoryOptions"
			placeholder="--"
			:disabled="createPostPermissionDisabled"
		/>
		<l-select
			name="severity"
			:value="category"
			@update:value="updateSelection"
			label="Severity"
			:options="severityOptions"
			placeholder="--"
			:disabled="createPostPermissionDisabled"
		/>

			<l-file-upload
			v-model="attachments"
			label="Attachments"
			name="Attachments"
			placeholder="Attach files"
			:disabled="createPostPermissionDisabled"
			multiple
			accept=".pdf,.doc,.docx,.jpg,.png"
			/>
			<div style="display: flex; justify-content: center;">
			<Button
				type="primary"
				data-test="create-post-button"
				:loading="loading"
				:disabled="createPostPermissionDisabled"
				@click="submitPost"
			>
				Submit
			</Button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, defineEmits } from "vue";

// modules
import { createPost } from "../../modules/posts";
import { useUserStore } from "../../store/user"
import { router } from "../../router";

// components
import { FormFieldErrorType } from "../ui/input/formBaseProps";
import LText from "../ui/input/LText.vue";
import LTextarea from "../ui/input/LTextarea.vue";
import LSelect from "../ui/input/LSelect.vue"
import LFileUpload from "../ui/input/LFileUpload.vue"
import Button from "../ui/Button.vue";

// utils
import validateUUID from "../../utils/validateUUID";
import tokenError from "../../utils/tokenError";

const { permissions } = useUserStore()

const props = defineProps({
	boardId: {
		type: String,
		required: true,
		validator: validateUUID
	},
	dashboard: {
		type: Boolean,
		default: false
	},
	category: {
    type: String,
    required: false,
  },
  categoryOptions: {
	type: Array as () => Array<{ label: string; value: string }>,
    required: false,
  },
  severityOptions: {
	type: Array as () => Array<{ label: string; value: string }>,
    required: false,
  },
  createPostPermissionDisabled: Boolean,
})

const title = reactive({
	value: "",
	error: {
		show: false,
		message: ""
	}
})
const description = ref<string>("")
const loading = ref<boolean>(false)
const emits = defineEmits(['updateSelection']);


const category = ref(props.category);
const severity = ref<string>("");
const attachments = ref<File[]>([]);
const categoryOptions = [
  { label: "Feature Request", value: "feature_request" },
  { label: "Bug Report", value: "bug_report" },
  { label: "Enhancement", value: "enhancement" },
  { label: "Other", value: "other" },
];
const severityOptions = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

const dashboardUrl = computed(() => props.dashboard ? "/dashboard" : "")
const createPostPermissionDisabled = computed(() => {
	const checkPermission = permissions.includes("post:create");
	return !checkPermission;
})

function hideTitleError(event: FormFieldErrorType) {
	title.error = event;
}

const updateSelection = (value: string) => {
  category.value = value;
  emits('updateSelection', value);
};

async function submitPost() {
	if (!title.value) {
		title.error.show = true;
		title.error.message = "You forgot to enter a post title";
		return;
	}

	loading.value = true;
	const postObject = {
		title: title.value,
		contentMarkdown: description.value,
		category: category.value,
		severity: severity.value,
		attachments: attachments.value
	};

	try {
		const response = await createPost(props.boardId, postObject);

		// redirect to post
		const slug = response.data.post.slug;
		router.push(`${dashboardUrl.value}/posts/${slug}`);
	} catch (error) {
		tokenError(error);
	} finally {
		loading.value = false;
	}
}
</script>

<style scoped>
.scrollable-container {
  /* max-height: 400px; */
  overflow-y: auto;
}
</style>
