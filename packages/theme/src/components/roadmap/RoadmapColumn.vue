<template>
  <div class="roadmap-column-container">
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
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else>
        <roadmap-post-card
          v-for="post in posts"
          :key="post.postId"
          :post="post"
        />
        <div v-if="posts.length === 0" class="no-posts">No posts available.</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from "vue";
import { getPosts } from "../../modules/posts";
import RoadmapPostCard from "./RoadmapPostCard.vue";

interface Post {
  postId: string;
  roadmap: {
    id: string;
  };
  title: string;
  contentMarkdown: string;
  createdAt: string;
  voters: {
    votesCount: number;
    viewerVote: boolean;
    votes: Array<{ avatarUrl: string }>;
  };
  board: {
    name: string;
    color: string;
    url: string;
  };
  slug: string;
}

interface GetPostArgs {
  roadmapId: string;
  page: number;
}

const props = defineProps({
  roadmap: {
    type: Object as () => { id: string; name: string; color: string },
    required: true
  }
});

const posts = ref<Post[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const page = ref(1);

async function getRoadmapPosts() {
  loading.value = true;
  error.value = null;
  const roadmapId = props.roadmap.id;
  try {
    const response = await getPosts({ roadmapId, page: page.value } as GetPostArgs);
    console.log('API response:', response.data); // Debugging log
    posts.value = response.data.posts.filter((post: Post) => post.roadmap.id === roadmapId);
    console.log('Filtered posts:', posts.value); // Debugging log
  } catch (err) {
    error.value = 'Failed to fetch posts.';
    console.error('Error fetching posts:', err);
  } finally {
    loading.value = false;
  }
}

watch(() => props.roadmap.id, () => {
  page.value = 1;
  getRoadmapPosts();
});

onMounted(() => {
  getRoadmapPosts();
});
</script>

<style scoped>
.roadmap-column-container {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-bottom: 20px;
}

.roadmap-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.color-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
}

h6 {
  margin: 0;
  font-size: 1.2em;
  color: #333;
}

.loading, .error, .no-posts {
  text-align: center;
  font-size: 1.2em;
  color: #555;
}

.roadmap-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
