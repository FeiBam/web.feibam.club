interface PostCreateArticleBody {
  articleData: ArticleFrontMatter
}

interface ArticleFrontMatter {
  id: number
  title: string
  introduction: string
  Tags: string[]
  CreateAt: string
  Lang: string
  Links: string[]
  subject: string
}

export type { PostCreateArticleBody }
