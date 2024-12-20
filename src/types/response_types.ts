import type { Article } from './article_types'

interface Response<T> {
  code: number
  error: string
  status: string
  message: string
  body: T
}

interface ResponseArticles {
  articles: Array<Article>
}

type FetchResult<T> = [Error | null, T | null]

export type { Response, FetchResult, ResponseArticles }
