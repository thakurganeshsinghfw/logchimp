<template>
  <div>
    <h1>User Activities</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <div v-if="posts.length === 0" class="no-posts">No posts found.</div>
      <ul v-else class="posts-list">
        <li v-for="post in posts" :key="post.postId" class="post-item">
          <router-link :to="`/dashboard/posts/${post.slug}`">
            <h3>{{ post.title }}</h3>
          </router-link>
          <p>{{ post.createdAt | formatDate }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '../store/user';
import { getPosts, PostType } from '../modules/posts';

const loading = ref(true);
const posts = ref<PostType[]>([]);

const { getUserId } = useUserStore();

async function fetchUserPosts() {
  console.log(getUserId)
  try {
    const response = await getPosts({
      userId: getUserId,
      sort: 'DESC',
      page: 1,
      limit: 20,
    });
    posts.value = response.data.posts;
  } catch (error) {
    console.error('Error fetching user posts:', error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchUserPosts();
});
</script>

<style scoped>
.loading {
  text-align: center;
  margin-top: 20px;
}

.no-posts {
  text-align: center;
  margin-top: 20px;
}

.posts-list {
  list-style-type: none;
  padding: 0;
}

.post-item {
  margin-bottom: 20px;
}

.post-item h3 {
  margin: 0;
}

.post-item p {
  margin: 5px 0 0;
  color: #666;
}
</style>
