<template>
  <div class="roadmaps-container">
    <h4>Roadmaps</h4>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="roadmap-tabs">
      <div class="tabs">
        <div
          v-for="roadmap in roadmaps"
          :key="roadmap.id"
          :class="['tab', { active: selectedRoadmapId === roadmap.id }]"
          @click="selectRoadmap(roadmap.id)"
        >
          {{ roadmap.name }}
        </div>
      </div>
      <div class="tab-content">
        <div class="roadmap-columns-container">
          <RoadmapColumn v-if="selectedRoadmap" :roadmap="selectedRoadmap" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import RoadmapColumn from '../components/roadmap/RoadmapColumn.vue';

const roadmaps = ref<any[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const selectedRoadmapId = ref<string | null>(null);

const selectedRoadmap = computed(() => {
  return roadmaps.value.find(roadmap => roadmap.id === selectedRoadmapId.value) || null;
});

async function getRoadmaps() {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get('/api/v1/roadmaps');
    roadmaps.value = response.data.roadmaps;
    if (roadmaps.value.length > 0) {
      selectedRoadmapId.value = roadmaps.value[0].id;
    }
  } catch (err) {
    error.value = 'Failed to fetch roadmaps.';
    console.error('Error fetching roadmaps:', err);
  } finally {
    loading.value = false;
  }
}

function selectRoadmap(roadmapId: string) {
  selectedRoadmapId.value = roadmapId;
}

onMounted(() => {
  getRoadmaps();
});
</script>

<style scoped lang="sass">
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css')

.roadmaps-container
  padding: 20px
  max-width: 1200px
  margin: 0 auto
  font-family: Arial, sans-serif

h1
  text-align: center
  margin-bottom: 20px
  font-size: 2.5em
  color: #333

.loading, .error
  text-align: center
  font-size: 1.2em
  color: #555

.roadmap-tabs
  display: flex

.tabs
  flex: 0 0 200px
  display: flex
  flex-direction: column
  gap: 10px
  border-right: 1px solid #ddd
  padding-right: 10px

.tab
  padding: 10px
  cursor: pointer
  background-color: #f9f9f9
  border-radius: 4px
  transition: background-color 0.3s

.tab:hover
  background-color: #e9e9e9

.tab.active
  background-color: #007bff
  color: white

.tab-content
  flex: 1
  padding-left: 20px
  overflow-x: auto

.roadmap-columns-container
  display: flex
  gap: 20px
  overflow-x: auto
  padding-bottom: 10px
</style>
