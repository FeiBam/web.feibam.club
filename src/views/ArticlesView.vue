<template>
  <div style="width: 100%">
    <div v-if="isLoad">
      <ArticleLoad v-for="index of 5" :key="index"></ArticleLoad>
    </div>
    <div v-else>
      <ArticlePreview
        v-for="item in viewArticles"
        :key="item.id"
        :article="item"
        :handlerViewArticle="viewArticle"
      />
    </div>
    <PaginationComponents
      :AllPage="totalPageOfSome"
      :NowPage="pageNum"
      :onPreviousPage="handlePreviousPage"
      :onNextPage="handleNextPage"
    />
  </div>
</template>

<script setup lang="ts">
//todo:分离view 分成 TagArticlesView 和 DefaultArticlesView 。。
import { provide } from 'vue'

import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from '@/stores/index'
import i18n from '@/i18n'
import { computed, onMounted, ref } from 'vue'
import ArticleLoad from '@/components/ArticleLoad.vue'
import PaginationComponents from '@/components/PaginationComponents.vue'
import ArticlePreview from '@/components/ArticlePreview.vue'
import {
  fetchArticleCountInfo,
  fetchArticleUsePageWithLang,
  fetchArticleUsePageWithLangAndTag,
} from '@/request'
import type { Article, ArticleCount, Tag } from '@/types/article_types'
import type { ResponseArticles } from '@/types/response_types'

provide('onTagClick', handelTagClick)

const route = useRoute()
const router = useRouter()
const articleStore = useArticleStore()

const articleLimitOfPage = import.meta.env.VITE_ARTICLE_LIMIT_OF_PAGE
const isLoad = ref(true)

function parseRouteParams() {
  return {
    page: Number(route.params.page) || 1,
    tag: route.params.tagname || '',
  }
}

const { page, tag } = parseRouteParams()
const pageNum = ref(page)
const tagName = ref(tag)
const i18nLocal = ref(i18n.global.locale)
const viewArticles = ref<Article[]>([])

const totalPageOfSome = computed(() => {
  if (tagName.value) {
    return Math.ceil(
      articleStore.articleCountInfo.articleCountOfLangAndTag[
        tagName.value as keyof typeof articleStore.articleCountInfo.articleCountOfLangAndTag
      ] / articleLimitOfPage,
    )
  }
  return Math.ceil(articleStore.getArticleCountByLangString(i18nLocal.value) / articleLimitOfPage)
})

async function handlePreviousPage() {
  await handlePageChange(pageNum.value - 1)
}

async function handleNextPage() {
  await handlePageChange(pageNum.value + 1)
}

async function handelTagClick(item: Tag) {
  isLoad.value = true
  tagName.value = item.name
  pageNum.value = 1
  const articleOfTag = articleStore.getArticlesByTagName(item.name)
  if (!articleOfTag) return
  viewArticles.value = articleOfTag.slice(0, articleLimitOfPage)
  router.push(`/tag/${item.name}/1`)
  isLoad.value = false
}

async function fetchPageData(nextPage: number, tagName: string): Promise<Article[]> {
  let err, res
  if (tagName) {
    ;[err, res] = await fetchArticleUsePageWithLangAndTag<ResponseArticles>(
      nextPage,
      articleLimitOfPage,
      i18nLocal.value,
      tagName,
    )
  } else {
    ;[err, res] = await fetchArticleUsePageWithLang<ResponseArticles>(
      nextPage,
      articleLimitOfPage,
      i18nLocal.value,
    )
  }
  return err ? [] : res?.articles || []
}

async function fetchPageBy(nextPage: number, tagName: string) {
  isLoad.value = true
  const articles = await fetchPageData(nextPage, tagName)
  articleStore.updateArticles(articles)
  articleStore.updateArticlesOfPage(nextPage, articles)
  viewArticles.value = articleStore.articlesOfPage.get(nextPage) || []
  pageNum.value = nextPage
  isLoad.value = false
}

function viewArticle(id: number) {
  const article = articleStore.getArticleById(id)
  if (!article) return
  articleStore.setViewArticle(article)
  router.push(`/article/${id}`)
}

async function handlePageChange(nextPage: number) {
  if (!articleStore.articlesOfPage.has(nextPage)) {
    await fetchPageBy(nextPage, tagName.value.toString())
  } else {
    viewArticles.value = articleStore.articlesOfPage.get(nextPage) || []
    pageNum.value = nextPage
  }
  if (tagName.value) {
    const articleOfTag = articleStore.getArticlesByTagName(tagName.value.toString())
    if (!articleOfTag) return
    viewArticles.value = articleOfTag.slice(
      (pageNum.value - 1) * articleLimitOfPage,
      (pageNum.value - 1) * articleLimitOfPage + articleLimitOfPage,
    )
    return router.push(`/tag/${tagName.value.toString()}/${nextPage}`)
  }
  return router.push(`/articles/${nextPage}`)
}

async function pageInit() {
  const [err, res] = await fetchArticleCountInfo<ArticleCount>(i18nLocal.value)
  if (!err) {
    articleStore.updateArticleCountInfo(
      res || {
        articleCount: 0,
        articleCountOfLang: { ZH: 0, EN: 0, JP: 0 },
        articleCountOfLangAndTag: {},
      },
    )
  }
  await fetchPageBy(pageNum.value, tagName.value.toString())
}

onMounted(() => {
  pageInit()
})
</script>
