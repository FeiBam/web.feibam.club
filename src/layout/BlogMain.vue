<script setup lang="ts">
import BlogSide from '../components/BlogSide.vue'
</script>

<template>
  <div class="blog-main-content flex flex-align-start flex-space-between">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <BlogSide></BlogSide>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
