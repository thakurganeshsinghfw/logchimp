<template>
	<div class="coming-soon-container">
	  <img class="coming-soon-image" src="/build.png" alt="Coming soon!!"/>
	  <p class="coming-soon-text">Coming soon!!</p>
	</div>
  </template>
  
<script setup lang="ts">
// packages
import { useHead } from "@vueuse/head";

// modules
import { useSettingStore } from "../../store/settings"


const { get: siteSettings } = useSettingStore()


useHead({
	title: "Placeholder",
	meta: [
		{
			name: "og:title",
			content: () => `Placeholder • ${siteSettings.title}`
		}
	]
})
</script>

<style>
.dropdown-wrapper
{	position: relative
}
.coming-soon-container {
  text-align: center;
}

.coming-soon-image {
  display: block;
  margin: 0 auto;
}

.coming-soon-text {
  margin-top: 10px;
}


@media (max-width: 768px) {
  .coming-soon-image {
    max-width: 80%;
  }
}
@media (max-width: 480px) {
  .coming-soon-image {
    max-width: 60%;
  }
  .coming-soon-text {
    font-size: 14px;
    margin-top: 8px;
  }
}
</style>