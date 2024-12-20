<template>
  <div style="width: 100%">
    <div v-if="isLoad">
      <ArticleLoad v-if="isLoad"></ArticleLoad>
    </div>
    <div v-if="!isLoad">
      <BaseContent>
        <div class="Article-Main" v-if="!isLoad">
          <ArticleHead
            v-bind:title="articleStore.viewArticle?.title"
            v-bind:date="articleStore.viewArticle?.createAt"
            v-bind:introduction="articleStore.viewArticle?.introduction"
          ></ArticleHead>
          <hr />
          <div class="markdown-body" v-html="articleSubjectHtml"></div>
          <ArticleTags v-bind:tags="articleStore.viewArticle?.tags"></ArticleTags>
        </div>
      </BaseContent>
    </div>
  </div>
</template>

<script setup lang="ts">
import markdown from 'markdown-it'
import { HttpError } from '@/utils/index'

import { useRouter } from 'vue-router'

import i18n from '@/i18n'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import ArticleHead from '@/components/ArticleHead.vue'
import ArticleTags from '@/components/ArticleTags.vue'
import BaseContent from '@/components/BaseContent.vue'
import { useArticleStore } from '@/stores'
import { fetchArticleUseIdWithLang } from '@/request'
import type { Article } from '@/types/article_types'
import ArticleLoad from '@/components/ArticleLoad.vue'

const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()

const i18nLocal = i18n.global.locale
const articleId = route.params.id
const isLoad = ref(true)

const md = new markdown()

const articleSubjectHtml = ref('')

async function initView() {
  if (articleStore.viewArticle.id === -1) {
    const [err, res] = await fetchArticleUseIdWithLang<Article>(Number(articleId), i18nLocal)
    if (err) {
      const httpError = err as HttpError // 类型断言
      if (httpError.status === 404) {
        setTimeout(() => {
          return router.push('/articles/1')
        }, 3000)
      }
      isLoad.value = true
      return
    }
    articleStore.updateArticles([res as Article])
  }
  const article = articleStore.getArticleById(Number(articleId))
  if (article === undefined) {
    return
  }
  articleStore.setViewArticle(article)
  articleSubjectHtml.value = md.render(articleStore.viewArticle?.subject)
  isLoad.value = false
}

onMounted(() => {
  initView()
})
</script>
