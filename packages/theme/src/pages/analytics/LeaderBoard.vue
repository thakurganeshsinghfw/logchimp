<template>
  <div class="leaderboard-container">
    <h1>Leaderboard</h1>
    <div class="filters">
      <label>
        Metric:
        <select v-model="selectedMetric" @change="fetchLeaderboard">
          <option value="posts">Posts</option>
          <option value="comments">Comments</option>
          <option value="upvotes">Upvotes</option>
          <option value="activities">Activities</option>
        </select>
      </label>
    </div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <ul class="leaderboard-list">
        <li v-for="(contributor, index) in contributors" :key="contributor.id" class="leaderboard-item">
          <div class="rank">{{ index + 1 }}</div>
          <img :src="contributor.avatarUrl" alt="Avatar" class="avatar" />
          <div class="info">
            <h2>{{ contributor.name }}</h2>
            <div class="metrics">
              <div class="metric">
                <font-awesome-icon icon="pencil-alt" />
                <span>Posts <b class="badge">{{ contributor.posts }}</b></span>
              </div>
              <div class="metric">
                <font-awesome-icon icon="comments" />
                <span>Comments <b class="badge">{{ contributor.comments }}</b></span>
              </div>
              <div class="metric">
                <font-awesome-icon icon="thumbs-up" />
                <span>Upvotes <b class="badge">{{ contributor.upvotes || 0 }}</b></span>
              </div>
              <div class="metric">
                <font-awesome-icon icon="tasks" />
                <span>All Activities <b class="badge">{{ contributor.activities }}</b></span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPencilAlt, faComments, faThumbsUp, faTasks } from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(faPencilAlt, faComments, faThumbsUp, faTasks);

interface Contributor {
  id: string;
  name: string;
  avatarUrl: string;
  posts: number;
  comments: number;
  upvotes: number;
  activities: number;
}

const selectedMetric = ref('posts');
const contributors = ref<Contributor[]>([]);
const loading = ref(false);

const fetchLeaderboard = async () => {
  loading.value = true;
  try {
    const response = await axios.get('/api/v1/leaderboard', {
      params: { metric: selectedMetric.value }
    });
    contributors.value = response.data;
  } catch (err) {
    console.error('Error fetching leaderboard data:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchLeaderboard();
});
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.leaderboard-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.filters {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.filters label {
  display: flex;
  align-items: center;
  gap: 10px;
}

.loading {
  text-align: center;
  font-size: 18px;
}

.leaderboard-list {
  list-style: none;
  padding: 0;
}

.leaderboard-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 10px;
}

.rank {
  font-size: 24px;
  font-weight: bold;
  color: #007bff;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.info {
  flex: 1;
}

.info h2 {
  margin: 0;
  font-size: 18px;
  color: #333;
}

.metrics {
  display: flex;
  gap: 15px;
  margin-top: 5px;
}

.metric {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #666;
}

.metric i {
  color: #050505;
}

.badge {
  background-color: #050505;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-left: 5px;
}
</style>
