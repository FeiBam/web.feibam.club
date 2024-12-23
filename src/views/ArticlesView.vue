<template>
  <div style="width: 100%">
    <Transition name="fade" mode="out-in">
      <TagArticlesView v-if="tag" />
      <DefaultArticlesView v-else />
    </Transition>
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
<style lang="css" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
