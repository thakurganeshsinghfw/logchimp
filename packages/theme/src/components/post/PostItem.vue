<template>
  <div class="post-item">
    <div class="post-item-details">
      <router-link
        class="post-content-link"
        data-test="post-link"
        :to="`${dashboardUrl}/posts/${postData.slug}`"
      >
        <h5 class="post-content-title">
          {{ postData.title }}
        </h5>
      </router-link>
      <p
        v-if="postData.roadmap"
        class="post-roadmap"
        :style="{
          color: `#${postData.roadmap.color}`
        }"
      >
        {{ postData.roadmap.name }}
      </p>
      <p data-test="post-description" class="post-content-description">
        {{ useTrim(postData.contentMarkdown, 120) }}
      </p>
      <board-badge
        v-if="postData.board"
        :show-board="showBoard"
        :name="postData.board.name"
        :color="postData.board.color"
        :url="postData.board.url"
      />
    </div>
    <div class="post-item-vote-status">
      <vote
        :post-id="postData.postId"
        :votes-count="postData.voters.votesCount"
        :is-voted="isVoted"
        @update-voters="updateVoters"
      />
      <span data-test="post-status" :class="['post-status', statusClass(postData.status)]">
        {{ formatStatus(postData.status) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, withDefaults } from "vue";

import { useTrim } from "../../hooks";

// components
import Vote, { VoteEventType } from "../vote/Vote.vue";
import BoardBadge from "../board/BoardBadge.vue";

interface Props {
  post: any
  dashboard?: boolean
  showBoard?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  dashboard: false,
  showBoard: true,
})

const postData = ref(props.post);
const dashboardUrl = computed(() => props.dashboard ? "/dashboard" : "");
const isVoted = computed<boolean>(() => !!props.post.voters?.viewerVote?.voteId);

// TODO: Add TS types
function updateVoters(voters: VoteEventType) {
	postData.value.voters.votesCount = voters.votesCount;
	postData.value.voters.viewerVote = voters.viewerVote;
}

function formatStatus(status: string | undefined): string {
  if (!status) return '';

  return status.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
}
function statusClass(status: string | undefined): string {
  if (!status) return '';

  switch (status.toLowerCase()) {
    case 'submitted':
      return 'status-submitted';
    case 'prioritised':
      return 'status-prioritised';
    case 'in development':
      return 'status-in-development';
    case 'resolved':
      return 'status-resolved';
    case 'rejected':
      return 'status-not-implementing';
    default:
      return '';
  }
}

</script>

<style lang='sass'>
.post-item
  display: grid
  grid-template-columns: 1fr auto
  gap: 1rem
  align-items: center
  margin-bottom: 1.25rem
  padding: 1rem
  border: 1px solid var(--color-gray-95)
  border-radius: var(--border-radius-default)
  background-color: var(--color-white)
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)

  &:hover
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2)

  &:last-child
    margin-bottom: 0

.post-item-details
  display: flex
  flex-direction: column

.post-item-vote-status
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  text-align: center

.post-content-link
  text-decoration: none

.post-content-title
  color: var(--color-text-link)
  margin-bottom: 0

.post-roadmap
  text-transform: uppercase
  font-weight: 500
  font-size: 0.875rem
  margin-top: 0.25rem

.post-content-description
  margin-top: 0.5rem
  color: var(--color-gray-40)
  margin-bottom: 0.625rem

.post-date
  color: var(--color-gray-70)
  font-size: 0.875rem

.post-status
  font-size: 0.875rem
  font-weight: 500
  margin-top: 0.5rem
  padding: 0.25rem 0.5rem
  border-radius: 0.25rem
  background-color: var(--color-gray-95)
  &.status-submitted
    background-color: blue
    color: white
  &.status-prioritised
    background-color: orange
    color: white
  &.status-in-development
    background-color: purple
    color: white
  &.status-resolved
    background-color: green
    color: white
  &.status-not-implementing
    background-color: red
    color: white
</style>
