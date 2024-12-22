<template>
  <div style="width: 100%">
    <TagArticlesView v-if="tag" />
    <DefaultArticlesView v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultArticlesView from './DefaultArticlesView.vue'
import TagArticlesView from './TagArticlesView.vue'

// 获取路由参数
const route = useRoute()
const tag = computed(() => route.params.tagname ?? '')
</script>
