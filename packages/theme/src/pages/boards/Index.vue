<template>
  <div class="boards-container">
    <div v-if="boards.length > 0" class="boards-list">
      <div v-for="board in boards" :key="board.boardId" class="board-card" :style="{ borderColor: `#${board.color}` }">
        <div class="board-header" :style="{ backgroundColor: `#${board.color}` }">
          <h4>{{ board.name }}</h4>
        </div>
        <div class="board-body">
          <p style="font-size: larger;"><i class="fas fa-thumbtack"></i> Posts: {{ board.post_count }}</p>
          <a :href="board.url" class="board-link">View Board</a>
        </div>
      </div>
    </div>
    <infinite-scroll @infinite="getBoards" :state="state">
      <template #no-results>
        <p>There are no boards.</p>
      </template>
    </infinite-scroll>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Board {
  boardId: string;
  name: string;
  color: string;
  url: string;
  post_count: number;
}

const boards = ref<Board[]>([]);
const state = ref({ loading: false, finished: false });

const getBoards = async () => {
  if (state.value.loading || state.value.finished) return;
  state.value.loading = true;
  console.log('Fetching boards...'); // Debugging log
  try {
    const response = await axios.get('/api/v1/boards');
    console.log('API response:', response.data); // Debugging log
    if (response.data.boards.length === 0) {
      state.value.finished = true;
    } else {
      boards.value = [...boards.value, ...response.data.boards]; // Ensure reactivity
    }
  } catch (err) {
    console.error('Error fetching boards:', err);
  } finally {
    state.value.loading = false;
  }
};

onMounted(() => {
  getBoards();
});
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.boards-container {
  padding: 10px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 10px;
  font-size: 2.5em;
  color: #333;
}

.boards-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.board-card {
  border: 1px solid;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: white;
}

.board-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.board-header {
  padding: 5px;
  color: white;
  text-align: center;
  font-size: 1.2em;
}

.board-body {
  padding: 10px;
  text-align: center;
}

.board-body p {
  margin: 0;
  font-size: 1em;
  color: #555;
}

.board-body i {
  margin-right: 5px;
  color: #007bff;
}

.board-link {
  display: inline-block;
  margin-top: 5px;
  padding: 8px 16px;
  background-color: #080808;
  color: white;
  text-decoration: none;
  border-radius: 12px;
  transition: background-color 0.3s, transform 0.3s;
}

.board-link:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}
</style>
