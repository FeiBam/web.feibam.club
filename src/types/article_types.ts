interface Article {
  id: number
  title: string
  introduction: string
  subject: string
  lang: ArticleLangCode
  createAt: string
  tags: Array<Tag>
  links: Array<Link>
}

interface ArticleCount {
  articleCount: number
  articleCountOfLang: ArticleCountOfLang
  articleCountOfLangAndTag: ArticleCountOfTag
}

type ArticleCountOfLang = {
  [key in keyof typeof ArticleLangCode]: number
}

type ArticleCountOfTag = {
  [key: string]: number
}

enum ArticleLangCode {
  ZH = 0, // 中文
  EN = 1, // 英文
  JP = 2, // 日文
}

interface Tag {
  id: number
  name: string
}

interface Link {
  url: string
}

interface ArticleStore {
  articles: Array<Article>
  articleCountInfo: ArticleCount
}

export type { Article, Tag, Link, ArticleCount, ArticleStore, ArticleLangCode }
