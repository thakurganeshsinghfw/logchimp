<template>
  <div class="post-card">
    <div class="post-card-main">
      <Vote
        :post-id="post.postId"
        :votes-count="post.voters.votesCount"
        :is-voted="post.voters.viewerVote"
        @update-voters="updateVoters"
      />
      <div style="width: 100%">
        <div class="post-card-section">
          <div>
            <router-link data-test="post-link" :to="`/posts/${post.slug}`">
              <h6>{{ post.title }}</h6>
            </router-link>
            <span v-if="!isExpanded">
              {{ useTrim(post.contentMarkdown, 60) }}....
              <br/>
            </span>
            <span v-if="!isExpanded" data-test="post-board-name" class="post-card-board">
              <b>{{ post.board.name }}</b>
            </span>
            <span v-if="!isExpanded" data-test="post-status" :class="['post-card-status', statusClass(post.status)]">
              {{ formatStatus(post.status) }}
            </span>
            <span v-if="!isExpanded" :datetime="post.createdAt"
              :title="dayjs(post.createdAt).format('dddd, DD MMMM YYYY hh:mm')" class="post-date" style="margin-left: 20px;">
              <br/><b>{{ dayjs(post.createdAt).fromNow() }}</b>
            </span>
            <time v-else data-test="post-date" :datetime="post.createdAt"
              :title="dayjs(post.createdAt).format('dddd, DD MMMM YYYY hh:mm')" class="post-date">
              {{ dayjs(post.createdAt).fromNow() }}
            </time>
          </div>
          <div data-test="post-card-toggle" class="post-card-toggle" @click="toggleExpanded">
            <ArrowTopIcon :style="{ transform: isExpanded ? 'rotateX(180deg)' : '' }" />
          </div>
        </div>
        <p v-if="isExpanded" data-test="post-card-description" class="post-card-description">
          {{ useTrim(post.contentMarkdown, 180) }}
        </p>
      </div>
    </div>
    <div v-if="isExpanded" data-test="post-card-extra" class="post-card-extra">
      <AvatarStack :avatars="post.voters.votes" :total-count="post.voters.votesCount" />
      <div class="post-card-extra-details">
        <BoardBadge :show-board="true" :name="post.board.name" :color="post.board.color" :url="post.board.url" />
        <span data-test="post-status-expanded" :class="['post-card-status', statusClass(post.status)]">
          {{ formatStatus(post.status) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// packages
import { ref } from "vue";
import { ChevronUp as ArrowTopIcon } from "lucide-vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { useTrim } from "../../hooks";

// components
import Vote, { VoteEventType } from "../vote/Vote.vue";
import BoardBadge from "../board/BoardBadge.vue";
import { AvatarStack } from "../ui/Avatar";

dayjs.extend(relativeTime);

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});

const isExpanded = ref(false);
const postData = ref(props.post);

function updateVoters(voters: VoteEventType) {
  postData.value.voters.votesCount = voters.votesCount;
  postData.value.voters.viewerVote = voters.viewerVote;
}

function toggleExpanded() {
  isExpanded.value = !isExpanded.value;
}

function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
}

function statusClass(status: string): string {
  switch (status.toLowerCase()) {
    case 'submitted':
      return 'status-submitted';
    case 'prioritised':
      return 'status-prioritised';
    case 'in development':
      return 'status-in-development';
    case 'resolved':
      return 'status-resolved';
    case 'not implementing':
      return 'status-not-implementing';
    default:
      return '';
  }
}
</script>

<style lang='sass'>
.post-card
  background-color: var(--color-white)
  margin-bottom: 0.75rem
  border-radius: var(--border-radius-default)
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1)
  transition: transform 0.3s, box-shadow 0.3s

  &:hover
    transform: translateY(-5px)
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2)

  &:last-child
    margin-bottom: 0

.post-card-main
  padding: 0.75rem
  display: flex
  align-items: self-start

  h5
    color: var(--color-text-black)
    margin-bottom: 0.125em

.post-card-board
  text-transform: uppercase
  font-size: 0.875rem
  font-weight: 700
  color: var(--color-gray-40)

.post-card-status
  font-size: 0.875rem
  font-weight: 500
  margin-left: 10px
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

.post-card-section
  display: flex
  align-items: center
  width: 100%

.post-card-toggle
  margin-left: auto
  padding: 0.125rem
  cursor: pointer
  background-color: var(--color-gray-95)
  user-select: none
  border-radius: 1rem

  svg
    display: block
    stroke: var(--color-gray-60)

.post-card-description
  color: var(--color-gray-40)
  font-size: 0.875rem
  margin-top: 0.5rem

.post-card-extra
  padding: 0.75rem
  border-top: 1px solid var(--color-gray-95)
  display: flex
  align-items: center

  .post-card-extra-details
    display: flex
    align-items: center

  .board-badge
    margin-left: auto
</style>
