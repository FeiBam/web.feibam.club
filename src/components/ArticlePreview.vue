<template>
  <BaseContent>
    <div class="Article-Main">
      <ArticleHead
        v-bind:title="article.title"
        v-bind:date="article.createAt"
        v-bind:introduction="article.introduction"
      ></ArticleHead>
      <div class="ReadMore">
        <a @click="onViewArticle"
          ><font-awesome-icon style="margin-right: 5px" :icon="['fa', 'tag']"></font-awesome-icon
          >阅读全文</a
        >
      </div>
      <ArticleTags v-bind:tags="article.tags"></ArticleTags>
    </div>
  </BaseContent>
</template>

<script setup lang="ts">
import type { Article } from '@/types/article_types'
import BaseContent from './BaseContent.vue'
import ArticleHead from './ArticleHead.vue'
import ArticleTags from './ArticleTags.vue'

interface Props {
  article: Article
  handlerViewArticle?: (id: number) => void
}

const props = defineProps<Props>()

function onViewArticle() {
  if (!props.handlerViewArticle) {
    return console.log(props.article.id)
  }
  props.handlerViewArticle(props.article.id)
}
</script>
