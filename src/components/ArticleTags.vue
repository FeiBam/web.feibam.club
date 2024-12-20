<template>
  <div class="Article-Tag">
    <a v-for="item in tags" v-bind:key="item.id" @click="handelTagClick(item)"
      ><font-awesome-icon icon="fas fa-tag fa-fw"></font-awesome-icon>{{ item.name }}</a
    >
  </div>
</template>

<script setup lang="ts">
import type { Tag } from '@/types/article_types'
import { useRouter } from 'vue-router'
import { inject } from 'vue'
const router = useRouter()
const props = defineProps<{ tags: Tag[] }>()

const onTagClick = inject('onTagClick', (item: { name: string }) => {
  console.error("No 'onTagClick' provided.", item)
})

function handelTagClick(item: Tag) {
  onTagClick(item)
}
</script>
