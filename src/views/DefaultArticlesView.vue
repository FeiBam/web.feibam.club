<template>
  <div>
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
      :AllPage="totalPage"
      :NowPage="pageNum"
      :onPreviousPage="handlePreviousPage"
      :onNextPage="handleNextPage"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useArticleStore } from '@/stores/index'
import ArticleLoad from '@/components/ArticleLoad.vue'
import PaginationComponents from '@/components/PaginationComponents.vue'
import ArticlePreview from '@/components/ArticlePreview.vue'
import { fetchArticleCountInfo, fetchArticleUsePageWithLang } from '@/request'
import i18n from '@/i18n'
import type { Article, ArticleCount } from '@/types/article_types'
import type { ResponseArticles } from '@/types/response_types'
import { useToast } from '@/service/toastService'

const toast = useToast()
const router = useRouter()
const articleStore = useArticleStore()
const isLoad = ref(true)
const pageNum = ref(1)
const viewArticles = ref<Array<Article>>([])

const articleLimitOfPage = import.meta.env.VITE_ARTICLE_LIMIT_OF_PAGE
const totalPage = computed(() =>
  Math.ceil(articleStore.getArticleCountByLangString(i18n.global.locale) / articleLimitOfPage),
)

async function handlePageChange(nextPage: number) {
  if (!articleStore.articlesOfPage.has(nextPage)) {
    isLoad.value = true
    const [err, res] = await fetchArticleUsePageWithLang<ResponseArticles>(
      nextPage,
      articleLimitOfPage,
      i18n.global.locale,
    )
    if (!err) {
      articleStore.updateArticles(res!.articles)
      articleStore.updateArticlesOfPage(nextPage, res!.articles)
    }
    viewArticles.value = articleStore.articlesOfPage.get(nextPage) || []
    isLoad.value = false
  } else {
    viewArticles.value = articleStore.articlesOfPage.get(nextPage) || []
  }
  pageNum.value = nextPage
  router.push(`/articles/${nextPage}`)
}

async function handlePreviousPage() {
  if (pageNum.value > 1) await handlePageChange(pageNum.value - 1)
}

async function handleNextPage() {
  if (pageNum.value < totalPage.value) await handlePageChange(pageNum.value + 1)
}

function viewArticle(id: number) {
  const article = articleStore.getArticleById(id)
  if (!article) return
  articleStore.setViewArticle(article)
  router.push(`/article/${id}`)
}

async function viewInit() {
  isLoad.value = true
  const [err, res] = await fetchArticleCountInfo<ArticleCount>(i18n.global.locale)
  if (err) {
    isLoad.value = true
    return toast({
      type: 'error',
      message: `${t('fetchArticleCountInfoFail')} `,
    })
  }
  if (!err) {
    articleStore.updateArticleCountInfo(
      res || {
        articleCount: 0,
        articleCountOfLang: { ZH: 0, EN: 0, JP: 0 },
        articleCountOfLangAndTag: {},
      },
    )
  }
  console.log(isLoad)
  await handlePageChange(pageNum.value)
  isLoad.value = false
}

onMounted(async () => {
  await viewInit()
})
</script>
