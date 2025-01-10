<template>
  <Toast></Toast>
  <BlogHead></BlogHead>
  <BlogMain></BlogMain>
  <BlogFooter></BlogFooter>
  <I18nS></I18nS>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import BlogHead from './components/BlogHead.vue'
import BlogMain from './layout/BlogMain.vue'
import BlogFooter from './components/BlogFooter.vue'
import router from '@/router'
import type { Tag } from '@/types/article_types'
import { useToastProvider } from '@/service/toastService'
import Toast from './components/ToastV.vue'
import I18nS from './components/I18nS.vue'

useToastProvider()

provide('onTagClick', handleTagClick)
function handleTagClick(item: Tag) {
  router.push(`/tag/${item.name}/1`)
}
</script>

<style scoped></style>
