<template>
  <div class="chart-container">
      <Bar :data="chartData" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps<{
  chartData: any;
  options: any;
}>();
</script>

<style scoped>
.chart-container {
  margin-bottom: 30px;
  height: 400px;
}
</style>
