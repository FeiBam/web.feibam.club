import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Article, ArticleCount } from '@/types/article_types'
import { CoverLangStringToLangCode } from '@/utils'

const useArticleStore = defineStore('article', () => {
  const viewArticle = ref<Article>({
    id: -1,
    introduction: '',
    subject: '',
    tags: [{ id: -1, name: '' }],
    links: [{ url: '' }],
    createAt: '',
    title: '',
    lang: 0,
  })
  const articles = ref<Map<number, Article>>(new Map())
  const articlesOfPage = ref(new Map<number, Article[]>(new Map()))
  const articlesOfTag = ref(new Map<string, Article[]>(new Map()))
  const articleCountInfo = reactive<ArticleCount>({
    articleCount: 0,
    articleCountOfLang: {
      ZH: 0,
      JP: 0,
      EN: 0,
    },
    articleCountOfLangAndTag: {},
  })
  const articleCountOfTag = ref(0)

  function updateArticles(newArticles: Array<Article>) {
    for (const item of newArticles) {
      articles.value.set(item.id, item)
      for (const tag of item.tags) {
        const currentArticles = articlesOfTag.value.get(tag.name) || []
        articlesOfTag.value.set(tag.name, [...currentArticles, item])
      }
    }
  }
  function updateArticlesOfPage(pageNum: number, newArticles: Array<Article>) {
    articlesOfPage.value.set(pageNum, newArticles)
  }
  function updateArticleCountInfo(newArticleCountInfo: ArticleCount) {
    articleCountInfo.articleCount = newArticleCountInfo.articleCount
    articleCountInfo.articleCountOfLang = newArticleCountInfo.articleCountOfLang
    articleCountInfo.articleCountOfLangAndTag = newArticleCountInfo.articleCountOfLangAndTag
  }
  function getArticleCountByLangString(langString: string): number {
    langString = langString.toUpperCase()
    const langCode = CoverLangStringToLangCode(langString)
    if (langCode === -1) {
      return -1
    }
    return articleCountInfo.articleCountOfLang[
      langString as keyof typeof articleCountInfo.articleCountOfLang
    ]
  }
  function setViewArticle(article: Article) {
    viewArticle.value = article
  }

  function getArticleById(id: number): Article | undefined {
    return articles.value.get(id)
  }
  function getArticlesByTagName(name: string): Article[] | undefined {
    return articlesOfTag.value.get(name)
  }

  return {
    viewArticle,
    articles,
    articleCountInfo,
    articleCountOfTag,
    articlesOfPage,
    updateArticleCountInfo,
    updateArticles,
    updateArticlesOfPage,
    getArticleCountByLangString,
    getArticlesByTagName,
    getArticleById,
    setViewArticle,
  }
})

export { useArticleStore }
