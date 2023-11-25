<template>
  <div>
    <header data-test="roadmap-header" class="roadmap-header">
      <div
        class="color-dot"
        :style="{
          backgroundColor: `#${roadmap.color}`
        }"
      />
      <h6>{{ roadmap.name }}</h6>
    </header>
    <div data-test="roadmap-column" class="roadmap-column">
      <roadmap-post-card
        v-for="post in posts"
        :key="post.postId"
        :post="post"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getPosts } from "../../modules/posts";
import RoadmapPostCard from "./RoadmapPostCard.vue";

const props = defineProps({
	roadmap: {
		type: Object,
		required: true
	}
});

const posts = ref<any>([]);

async function getRoadmapPosts() {
  const roadmapId = props.roadmap.id;
  try {
    const response = await getPosts({
      page: 1,
      limit: 20,
      sort: "DESC",
      roadmapId
    });

    // Update posts with the received data
    posts.value = response.data.posts;
  } catch (err) {
    console.error(err);
  }
}

onMounted(() => {
  // Check if posts have not been loaded for this roadmap
  if (posts.value.length === 0) {
    getRoadmapPosts();
  }
});
</script>

<style lang='sass'>
.roadmap-header
	display: flex
	align-items: center
	margin-bottom: 0.625rem

	.color-dot
		margin-right: 0.375rem

	h6
		font-weight: 400
		font-size: 0.875rem
		margin-bottom: 0
		color: var(--color-gray-60)

.roadmap-column
	border-radius: var(--border-radius-default)
	background-color: var(--color-gray-95)
	padding: 0.75rem
</style>
