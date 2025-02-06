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
      <div v-else class="kanban-board">
        <div v-for="status in statuses" :key="status" class="kanban-column">
          <h6 class="kanban-column-header">{{ formatStatus(status) }}</h6>
          <div class="kanban-column-content">
            <roadmap-post-card
              v-for="post in filteredPostsByStatus(status)"
              :key="post.postId"
              :post="post"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref, computed } from "vue";
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
  status: string;
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

const statuses = ["submitted", "prioritised", "in development", "resolved", "not implementing"];

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

function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
}

function filteredPostsByStatus(status: string) {
  return posts.value.filter(post => post.status === status);
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

.kanban-board {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.kanban-column {
  flex: 0 0 250px;
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 10px;
}

.kanban-column-header {
  font-size: 1.2em;
  margin-bottom: 10px;
  text-align: center;
}

.kanban-column-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
