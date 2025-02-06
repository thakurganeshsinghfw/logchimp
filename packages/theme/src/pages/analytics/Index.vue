<template>
  <div class="analytics-container">
    <h1>Analytics Dashboard</h1>
    <div class="date-filters">
      <label>
        Start Date:
        <input class="date-input" type="date" v-model="startDate" />
      </label>
      <label>
        End Date:
        <input class="date-input" type="date" v-model="endDate" />
      </label>
      <button @click="fetchAnalytics" class="filter-button">Filter</button>
    </div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <div class="analytics-cards">
        <div class="card">
          <h2>Total Posts</h2>
          <p>{{ analytics.totalPosts }}</p>
        </div>
        <div class="card">
          <h2>Total Comments</h2>
          <p>{{ analytics.totalComments }}</p>
        </div>
        <div class="card">
          <h2>Total Upvotes</h2>
          <p>{{ analytics.totalUpvotes }}</p>
        </div>
        <div class="card">
          <h2>Engagement Rate</h2>
          <p>{{ analytics.engagementRate }}%</p>
        </div>
        <div class="card">
          <h2>Resolution Rate</h2>
          <p>{{ analytics.resolutionRate }}%</p>
        </div>
        <div class="card">
          <h2>Response Rate</h2>
          <p>{{ analytics.responseRate }}%</p>
        </div>
        <div class="card">
          <h2>MVP Interaction Rate</h2>
          <p>{{ analytics.mvpInteractionRate }}%</p>
        </div>
        <div class="card">
          <h2>Resolved Posts</h2>
          <p>{{ analytics.resolvedPosts }}</p>
        </div>
        <div class="card">
          <h2>Responded Posts</h2>
          <p>{{ analytics.respondedPosts }}</p>
        </div>
        <div class="card">
          <h2>MVP Posts</h2>
          <p>{{ analytics.mvpPosts }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getAnalytics } from '../../modules/analytics';

const analytics = ref({
  engagementRate: '0',
  resolutionRate: '0',
  responseRate: '0',
  mvpInteractionRate: '0',
  totalUpvotes: 0,
  totalComments: 0,
  resolvedPosts: 0,
  respondedPosts: 0,
  mvpPosts: 0,
  totalPosts: 0
});
const loading = ref(true);
const startDate = ref('');
const endDate = ref('');

const fetchAnalytics = async () => {
  loading.value = true;
  try {
    const response = await getAnalytics({
      startDate: startDate.value,
      endDate: endDate.value
    });
    analytics.value = response.data;
  } catch (error) {
    console.error('Error fetching analytics data:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchAnalytics();
});
</script>

<style scoped>
.analytics-container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.date-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.date-input {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.filter-button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.filter-button:hover {
  background-color: #0056b3;
}

.loading {
  text-align: center;
  font-size: 18px;
}

.summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.summary-item {
  flex: 1;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.analytics-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 calc(33% - 20px);
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.card h2 {
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
}

.card p {
  font-size: 24px;
  color: #007bff;
}
</style>
