<template>
  <BlogHead></BlogHead>
  <BlogMain></BlogMain>
  <Icons></Icons>
  <Toast></Toast>
</template>

<script setup lang="ts">
import BlogHead from './components/BlogHead.vue'
import BlogMain from './layout/BlogMain.vue'
import { useToastProvider } from '@/service/toastService'
import Toast from './components/ToastV.vue'

useToastProvider()
</script>

<style scoped></style>
