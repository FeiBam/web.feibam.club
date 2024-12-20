<script setup lang="ts">
import BlogSide from '../components/BlogSide.vue'
</script>

<template>
  <div class="blog-main-content flex flex-align-start flex-space-between">
    <RouterView />
    <BlogSide></BlogSide>
  </div>
</template>

<style scoped></style>
