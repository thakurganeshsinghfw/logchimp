  <template>
    <div>
      <div class="flex justify-between items-center">
    <div class="w-2/3 pr-4">
      <!-- Input for search -->
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search posts ..."
        @input="performSearch"
        class="border p-2 w-full"
      />
    </div>
    <div class="w-1/3 border p-2">
      <dropdown-wrapper v-if="boards.length > 0">
        <!-- Dropdown toggle with Lucide dropdown icon -->
        <template #toggle>
          <div class="flex items-center">
            <span>Boards</span>
            <ArrowDown />
          </div>
        </template>
        <!-- Dropdown content -->
        <template #default="dropdown">
          <dropdown v-if="dropdown.active">
            <dropdown-item v-for="board in boards" :key="board.boardId" @click="selectBoard(board)">
              {{ board.name }} <span class="border p-1">  <b>{{ board.post_count }}</b> Posts</span>
            </dropdown-item>
          </dropdown>
        </template>
      </dropdown-wrapper>
      <span v-else>Loading...</span>
    </div>
  </div>
  <div class="search-results">
      <div v-if="searchResults.length === 0 && searchQuery.length > 0">
        No results found.
      </div>
      <ul v-else>
        <li v-for="(result, index) in searchResults" :key="index">
          <!-- Display search results here -->
          {{ result.title }}
        </li>
      </ul>
    </div>
    </div>
  </template>
  
  
<script setup lang="ts">
// packages
import { ref, onMounted } from 'vue';
import { useHead } from "@vueuse/head";
import { getPublicBoards } from "../../modules/boards";
import DropdownWrapper from "../../components/ui/dropdown/DropdownWrapper.vue";
import Dropdown from "../../components/ui/dropdown/Dropdown.vue";
import DropdownItem from "../../components/ui/dropdown/DropdownItem.vue";
import { ArrowDown } from 'lucide-vue';

// modules
import { useSettingStore } from "../../store/settings"


const { get: siteSettings } = useSettingStore()


interface SearchResult {
  title: string;
}
  const searchQuery = ref('');
  const searchResults = ref<SearchResult[]>([]); // Explicitly specifying the type
  
  // Function to perform search based on the input query
  const performSearch = () => {
    searchResults.value = performSearchQuery(searchQuery.value);
  };
  
  // Function placeholder - replace with actual search logic
  const performSearchQuery = (query: string) => {
    // Simulated search results - replace with actual search functionality
    const results = [
      { title: 'Result 1' },
      { title: 'Result 2' },
      { title: 'Result 3' },
    ];
  
    // Filter results based on the search query
    return results.filter(result =>
      result.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  interface Board {
  boardId: string;
  name: string;
  color: string;
  url: string;
  post_count: number;
}

const boards = ref<Board[]>([]);

  const page = ref<number>(1)

// Fetch boards from the API and update the boards list
const fetchBoardsData = async () => {
  try {
    const response = await getPublicBoards({ page: page.value, sort: "DESC" });
    boards.value = response.data.boards;
  } catch (error) {
    console.error('Error fetching boards:', error);
  }
};
onMounted(() => {
  fetchBoardsData();
});

const selectBoard = (board: { boardId: string; name: string }) => {
  // Implement logic to handle board selection
  console.log('Selected board:', board);
};

useHead({
	title: "Search",
	meta: [
		{
			name: "og:title",
			content: () => `Search • ${siteSettings.title}`
		}
	]
})
</script>

<style>
.dropdown-wrapper
{	position: relative
}

</style>