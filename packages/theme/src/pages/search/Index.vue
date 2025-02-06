<template>
  <div class="search-container">
    <h1>Search Posts</h1>
    <div class="search-bar">
      <input
        v-model="query"
        @input="fetchPosts"
        placeholder="Search..."
        class="search-input"
      />
      <button v-if="query" @click="clearSearch" class="clear-button">✕</button>
    </div>
    <div class="filters">
      <label>
        Board:
        <select v-model="board" class="filter-select" @change="fetchPosts">
          <option value="">All Boards</option>
          <option v-for="board in boards" :key="board.boardId" :value="board.boardId">{{ board.name }}</option>
        </select>
      </label>
      <label>
        Roadmap:
        <select v-model="roadmap" class="filter-select" @change="fetchPosts">
          <option value="">All Roadmaps</option>
          <option v-for="roadmap in roadmaps" :key="roadmap.id" :value="roadmap.id">{{ roadmap.name }}</option>
        </select>
      </label>
    </div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="results.length === 0" class="no-results">No results found</div>
    <div v-else class="results">
      <div v-for="post in results" :key="post.postId" class="result-item">
        <router-link :to="`/posts/${post.slug}`">
          <h2>{{ post.title }}</h2>
        </router-link>
        <p>
          {{ useTrim(post.contentMarkdown, 160) }}....
        </p>
<pre>
<p style="font-weight: 700;">{{dayjs(post.createdAt, "yyyy mm dd")}}    Status: {{ post.status }}</p>
</pre>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { searchPosts } from '../../modules/posts';
import { getAllBoards } from '../../modules/boards';
import { getAllRoadmaps } from '../../modules/roadmaps';
import dayjs from "dayjs";
import { useTrim } from "../../hooks";

interface SearchResult {
  postId: string;
  title: string;
  slug: string;
  slugId: string;
  contentMarkdown?: string;
  createdAt: string;
  updatedAt: string;
  status?: string; // Added status field
}

interface Board {
  boardId: string;
  name: string;
  color: string;
  url: string;
  display: boolean;
  post_count: string;
}

interface Roadmap {
  id: string;
  name: string;
  url: string;
  color: string;
}

const query = ref('');
const board = ref('');
const roadmap = ref('');
const results = ref<SearchResult[]>([]);
const boards = ref<Board[]>([]);
const roadmaps = ref<Roadmap[]>([]);
const loading = ref(false);
const error = ref('');

async function fetchPosts() {
  loading.value = true;
  error.value = '';

  try {
    const response = await searchPosts({
      query: query.value,
      board: board.value,
      roadmap: roadmap.value
    });
    results.value = response.data.posts;
  } catch (err) {
    console.error('Error fetching search results:', err);
    error.value = 'Failed to fetch search results. Please try again.';
  } finally {
    loading.value = false;
  }
}

async function fetchBoardsAndRoadmaps() {
  try {
    const [boardsResponse, roadmapsResponse] = await Promise.all([getBoards(), getRoadmaps()]);
    boards.value = boardsResponse.data.boards;
    roadmaps.value = roadmapsResponse.data.roadmaps;
  } catch (err) {
    console.error('Error fetching boards and roadmaps:', err);
  }
}

onMounted(async () => {
  await fetchBoardsAndRoadmaps();
  await fetchPosts();
});

const fetchBoards = async () => {
  try {
    const response = await getAllBoards({ page: 1, limit: 10, sort: "DESC" });
    console.log('Boards API response:', response.data); // Debugging log
    boards.value = response.data.boards; // Access the boards property
    console.log('Boards ref:', boards.value); // Debugging log
  } catch (err) {
    console.error('Error fetching boards:', err);
  }
};

const fetchRoadmaps = async () => {
  try {
    const response = await getAllRoadmaps();
    console.log('Roadmaps API response:', response.data); // Debugging log
    roadmaps.value = response.data.roadmaps; // Access the roadmaps property
    console.log('Roadmaps ref:', roadmaps.value); // Debugging log
  } catch (err) {
    console.error('Error fetching roadmaps:', err);
  }
};

const onSearch = async () => {
  loading.value = true;
  error.value = '';

  try {
    const response = await searchPosts({
      query: query.value,
      board: board.value,
      roadmap: roadmap.value
    });
    results.value = response.data;
  } catch (err) {
    console.error('Error fetching search results:', err);
    error.value = 'Failed to fetch search results. Please try again.';
  } finally {
    loading.value = false;
  }
};

const clearSearch = () => {
  query.value = '';
  board.value = '';
  roadmap.value = '';
  results.value = [];
};

watch([board, roadmap], () => {
  onSearch();
});

onMounted(() => {
  fetchBoards();
  fetchRoadmaps();
});
</script>

<style scoped>
.search-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  position: relative;
}

.search-input {
  flex: 1;
  padding: 10px 40px 10px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-input::placeholder {
  color: #aaa;
}

.clear-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  right: 10px;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filter-select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
}

.filter-select option {
  background-color: #fff;
  color: #333;
}

.loading {
  text-align: center;
  font-size: 18px;
}

.error {
  color: red;
  text-align: center;
  font-size: 18px;
}

.no-results {
  text-align: center;
  font-size: 18px;
}

.results {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.result-item {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.result-item:hover {
  transform: translateY(-5px);
}

.result-item h2 {
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
}

.result-item p {
  font-size: 16px;
  color: #666;
}
</style>
