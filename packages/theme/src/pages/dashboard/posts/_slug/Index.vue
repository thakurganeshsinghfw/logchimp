<template>
  <div>
    <header class="form-header">
      <breadcrumbs>
        <router-link to="/dashboard/posts" class="breadcrum-item">
          Posts
        </router-link>

        <!-- Show divider & title once data loaded -->
        <template v-if="postData.title">
          <div class="breadcrum-divider">
            /
          </div>
          <h5 class="breadcrum-item">
            {{ postData.title }}
          </h5>
        </template>
      </breadcrumbs>

      <Button
        type="primary"
        :loading="loading.updatePostButton"
        :disabled="updatePostPermissionDisabled"
        @click="updatePostHandler"
      >
        Save
      </Button>
    </header>

    <div class="form-section">
      <div class="form-columns">
        <div class="form-column">
          <l-text
            v-model="postData.title"
            label="Title"
            placeholder="Name of the feature"
          />

          <l-textarea
            v-model="postData.contentMarkdown"
            label="Description"
            rows="4"
            placeholder="What would you use it for?"
          />
        </div>

        <div class="form-column">
          <div>
            <p class="input-field-label">
              Preview
            </p>
            <div class="card">
              <post-item v-if="!loading.post" :post="postData" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="form-section">
      <h6 class="form-section-title">
        Other
      </h6>
      <div class="form-columns" style="gap: 1rem;">
        <div class="form-column">
          <dropdown-wrapper>
            <template #toggle>
              <l-text
                v-model="boards.search"
                label="Board"
                placeholder="Search board"
                @input="suggestBoard"
              />
            </template>

            <template #default="dropdown">
              <dropdown
                v-if="dropdown.active && boards.suggestions.length"
                :height="300"
              >
                <board-suggestion
                  v-for="(item, index) in boards.suggestions"
                  :key="item.boardId"
                  :board="item"
                  @click="selectBoard(index)"
                />
              </dropdown>
            </template>
          </dropdown-wrapper>
        </div>

        <div class="form-column">
          <dropdown-wrapper>
            <template #toggle>
              <l-text
                v-model="roadmaps.search"
                label="Roadmap"
                placeholder="Search roadmap"
                @input="suggestRoadmap"
              />
            </template>

            <template #default="dropdown">
              <dropdown
                v-if="dropdown.active && roadmaps.suggestions.length"
                :height="300"
              >
                <board-suggestion
                  v-for="(item, index) in roadmaps.suggestions"
                  :key="item.id"
                  :board="item"
                  @click="selectRoadmap(index)"
                />
              </dropdown>
            </template>
          </dropdown-wrapper>
        </div>

        <div class="form-column">
          <dropdown-wrapper>
            <template #toggle>
              <l-text
                v-model="status.search"
                label="Status"
                placeholder="Select status"
                @focus="populateStatusDropdown"
                @input="filterStatusOptions"
              />
            </template>

            <template #default="dropdown">
              <dropdown
                v-if="showStatusDropdown"
                :height="250"
              >
                <div
                  v-for="(item, index) in filteredStatusOptions"
                  :key="index"
                  class="status-option"
                  @click="selectStatus(item)"
                >
                  {{ item.value }}
                </div>
              </dropdown>
            </template>
          </dropdown-wrapper>
        </div>
      </div>
    </div>
    <div style="display: flex; justify-items: auto; gap: 1rem;">
      <button class="filter-button" @click="createL2Ticket" :disabled="ticketDetails !== null">
        Create L2 Ticket
      </button>
      <div v-if="ticketDetails" class="ticket-details">
        <span>Support (L2) Ticket ID:</span>
        <a :href="ticketDetails.url" target="_blank" class="ticket-link">
          <span class="ticket-id">{{ ticketDetails.id }}</span>
          <Link2Icon />
        </a>
        <span class="ticket-status" v-if="ticketDetails.statusMeaning">
          ({{ ticketDetails.statusMeaning }})
        </span>
      </div>
    </div>

    <br/>
    <div style="display: flex; justify-items: auto; gap: 1rem;">
      <button class="filter-button" @click="createFreshreleaseStory">
        Create Story on Freshrelease
      </button>
      <p style="padding: 5px;" v-if="freshreleaseTicketDetails">
        Freshrelease Ticket ID: <b>{{ freshreleaseTicketDetails.id }}</b>
      </p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useHead } from "@vueuse/head";

// modules
import { router } from "../../../../router"
import axios from 'axios';
import { PostType, getPostBySlug, updatePost } from "../../../../modules/posts";
import { Board, searchBoard } from "../../../../modules/boards";
import { Roadmap, searchRoadmap } from "../../../../modules/roadmaps";
import { UserType } from "../../../../modules/users";
import { PostVoteType } from "../../../../modules/votes";

import { useUserStore } from "../../../../store/user";

// components
import Button from "../../../../components/ui/Button.vue";
import LText from "../../../../components/ui/input/LText.vue";
import LTextarea from "../../../../components/ui/input/LTextarea.vue";
import PostItem from "../../../../components/post/PostItem.vue";
import Dropdown from "../../../../components/ui/dropdown/Dropdown.vue";
import DropdownWrapper from "../../../../components/ui/dropdown/DropdownWrapper.vue";
import BoardSuggestion from "../../../../components/board/BoardSuggestion.vue";
import Breadcrumbs from "../../../../components/Breadcrumbs.vue";
import config from "../../../../config/config";
import { Link2Icon } from "lucide-vue";

interface GetPostType extends PostType {
  author: UserType
  board: Board
  roadmap: Roadmap
  voters: {
    votes: PostVoteType[]
    votesCount: number
    viewerVote: boolean
  }
}

interface TicketDetails {
  id: string;
  url: string;
}

const { permissions } = useUserStore()

const loading = reactive<{
  post: boolean
  updatePostButton: boolean
}>({
  post: false,
  updatePostButton: false
})
const postData = reactive<GetPostType>({
  postId: "",
  title: "",
  slug: "",
  slugId: "",
  contentMarkdown: "",
  createdAt: "",
  updatedAt: "",
  author: {
    userId: "",
    name: "",
    username: "",
    avatar: "",
  },
  board: {
    boardId: "",
    name: "",
    url: "",
    color: "",
  },
  roadmap: {
    id: "",
    name: "",
    url: "",
    color: "",
  },
  voters: {
    votes: [],
    votesCount: 0,
    viewerVote: false,
  },
  status: ""
})
const boards = reactive<{
  search: string
  suggestions: Board[]
}>({
  search: "",
  suggestions: []
})
const roadmaps = reactive<{
  search: string
  suggestions: Roadmap[]
}>({
  search: "",
  suggestions: []
})
const status = reactive<{
  search: string
}>({
  search: ""
})
const showStatusDropdown = ref(false)
const statusOptions = [
  { key: "submitted", value: "Submitted" },
  { key: "prioritised", value: "Prioritised" },
  { key: "in development", value: "In Development" },
  { key: "resolved", value: "Resolved" },
  { key: "rejected", value: "Rejected" }
]
const filteredStatusOptions = ref(statusOptions)

const updatePostPermissionDisabled = computed(() =>  {
  const checkPermission = permissions.includes("post:update");
  return !checkPermission;
})

async function updatePostHandler() {
  loading.updatePostButton = true;

  try {
    const response = await updatePost({
      id: postData.postId,
      title: postData.title,
      contentMarkdown: postData.contentMarkdown,
      slugId: postData.slugId,
      userId: postData.author.userId,
      boardId: postData.board ? postData.board.boardId : undefined,
      roadmapId: postData.roadmap ? postData.roadmap.id : undefined,
      status: postData.status
    });

    if (response.status === 200) {
      router.push("/dashboard/posts");
    }
  } catch (err) {
    console.error(err);
  } finally {
    loading.updatePostButton = false;
  }
}

async function postBySlug() {

  loading.post = true;
	const route = router.currentRoute.value;

  if (route.params.slug) {
    try {
      const slug = route.params.slug.toString();
      console.log('Fetching post with slug:', slug); // Debugging log
      const response = await getPostBySlug(slug);
      console.log('API response:', response.data); // Debugging log

      Object.assign(postData, response.data.post);
      console.log("post details is : ", postData)

      status.search = formatStatus(postData.status); // Set the initial status search value
      loading.post = false;
      callFetchDetails();
    } catch (err) {
      console.error(err);
      loading.post = false;
    }
  }
}

async function suggestBoard(event: any) {
  const name = event.target.value;
  if (!name) {
    boards.search = "";
    boards.suggestions = []
    return;
  }

  try {
    const response = await searchBoard(name);
    boards.suggestions = response.data.boards;
  } catch (err) {
    console.error(err);
  }
}

async function suggestRoadmap(event: any) {
  const name = event.target.value;
  if (!name) {
    roadmaps.search = "";
    roadmaps.suggestions = []
    return;
  }

  try {
    const response = await searchRoadmap(name);
    roadmaps.suggestions = response.data.roadmaps;
  } catch (err) {
    console.error(err);
  }
}

function selectBoard(index: number) {
  const item = boards.suggestions[index];

  Object.assign(postData.board, item)
  boards.search = "";
  boards.suggestions = []
}

function selectRoadmap(index: number) {
  const item = roadmaps.suggestions[index];

  Object.assign(postData.roadmap, item)
  roadmaps.search = "";
  roadmaps.suggestions = []
}

function selectStatus(item: { key: string, value: string }) {
  postData.status = item.key;
  status.search = item.value;
  showStatusDropdown.value = false;
}

function formatStatus(status: string | undefined): string {
  if (!status) return '';
  const option = statusOptions.find(option => option.key === status);
  return option ? option.value : '';
}

function populateStatusDropdown() {
  showStatusDropdown.value = true;
  filteredStatusOptions.value = statusOptions;
}

function filterStatusOptions(event: any) {
  console.log("I am hit")
  const search = event.target.value.toLowerCase();
  filteredStatusOptions.value = statusOptions.filter(option =>
    option.value.toLowerCase().includes(search)
  );
  populateStatusDropdown();
}

onMounted(() => {
  postBySlug();
});

async function callFetchDetails() {

  await fetchTicketDetails();
}

const ticketDetails = ref<TicketDetails | null>(null);

const fetchTicketDetails = async () => {
  try {
    const response = await axios.get(`/api/v1/tickets/${postData.postId}`);
    if (response.data) {
      ticketDetails.value = {
        id: response.data.ticketId,
        url: response.data.ticketUrl
      };
    }
  } catch (error) {
    console.error('Error fetching ticket details:', error);
  }
};

const createL2Ticket = async () => {
  try {
    const response = await axios.post('/api/v1/tickets', {
      postId: postData.postId,
      title: postData.title,
      description: postData.contentMarkdown,
      email: config.freshdesk.email
    });

    if (response.status === 201) {
      ticketDetails.value = {
        id: response.data.ticketId,
        url: response.data.ticketUrl
      };
      alert('L2 Ticket created successfully!');
    } else {
      alert('Failed to create L2 Ticket.');
    }
  } catch (error) {
    console.error('Error creating L2 Ticket:', error);
    alert('An error occurred while creating the L2 Ticket.');
  }
};

const freshreleaseTicketDetails = ref<{ id: string } | null>(null);

// Create Freshrelease story
const createFreshreleaseStory = async () => {
  try {
    const response = await axios.post('/api/v1/tickets/freshrelease', {
      postId: postData.postId,
      title: postData.title,
      description: postData.contentMarkdown,
      email: config.freshdesk.email // Assuming the API expects the same email or another auth method
    });

    if (response.status === 201) {
      freshreleaseTicketDetails.value = {
        id: response.data.ticketId
      };
      alert('Freshrelease story created successfully!');
    } else {
      alert('Failed to create Freshrelease story.');
    }
  } catch (error) {
    console.error('Error creating Freshrelease story:', error);
    alert('An error occurred while creating the Freshrelease story.');
  }
};


useHead({
  title: () => `${postData.title ? `${postData.title} • `: ''}Post • Dashboard`
})
</script>

<style scoped>
.filter-button {
  padding: 10px 20px;
  background-color: #050505;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.filter-button:disabled {
  background-color: #7f7f7f;
  cursor: not-allowed;
}

.ticket-details {
  display: flex;
  align-items: center;
  gap: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.ticket-link {
  color: #007bff;
  text-decoration: none;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 4px; /* Space between ID and icon */
  text-decoration: underline;

}

.ticket-link:hover {
  text-decoration: underline;
}

.ticket-link i {
  margin-right: 5px;
}

</style>
