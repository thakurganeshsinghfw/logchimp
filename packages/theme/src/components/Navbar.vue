<template>
	<div class="navbar">
		<router-link to="/" class="navbar-item">
			<div class="navbar-item-icon">
				<home-icon />
			</div>
			<div class="navbar-item-content">
				Home
			</div>
		</router-link>
		<router-link to="/roadmaps" class="navbar-item">
			<div class="navbar-item-icon">
				<roadmap-icon />
			</div>
			<div class="navbar-item-content">
				Roadmaps
			</div>
		</router-link>
		<router-link to="/boards" class="navbar-item">
			<div class="navbar-item-icon">
				<board-icon />
			</div>
			<div class="navbar-item-content">
				Boards
			</div>
		</router-link>
		<router-link to="/search" class="navbar-item">
			<div class="navbar-item-icon">
				<SearchIcon />
			</div>
			<div class="navbar-item-content">
				Search
			</div>
		</router-link>
		<router-link to="/analytics" class="navbar-item">
			<div class="navbar-item-icon">
				<PlaneTakeoffIcon />
			</div>
			<div class="navbar-item-content">
				Analytics
			</div>
		</router-link>
		<router-link to="/leaderboard" class="navbar-item">
			<div class="navbar-item-icon">
        <leaderboard-icon />
			</div>
			<div class="navbar-item-content">
				Leaderboard
			</div>
		</router-link>
	</div>
</template>

<script setup lang="ts">
// packages
import { Home as HomeIcon, Columns as BoardIcon, SearchIcon, PlaneTakeoffIcon } from "lucide-vue";

// icons
import RoadmapIcon from "./icons/Roadmap.vue";
import LeaderboardIcon from "./icons/Leaderboard.vue";

</script>

<style lang='sass'>
.navbar
  margin-top: 0.5rem

.navbar, .navbar-item
  display: flex
  align-items: center

.navbar-item
  padding: 0.75rem 1.5rem
  border-bottom: 3px solid transparent

.navbar-item-icon
  display: flex

.navbar-item-icon
  margin-right: 0.625rem

  svg
    stroke: var(--color-white-light)
    width: 1.125rem
    height: 1.125rem

.navbar-item-content
  color: var(--color-white-light)
  font-weight: 500

.navbar-item.router-link-exact-active
  border-color: var(--color-white)

  .navbar-item-icon svg
    stroke: var(--color-white)

  .navbar-item-content
    color: var(--color-white)
</style>
