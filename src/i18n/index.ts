import { createI18n } from 'vue-i18n'

const messages = {
  zh: {
    friendLink: '友链',
    friend: '朋友们',
    about: '关于',
    article: '文章',
    previouspage: '上一页',
    nextpage: '下一页',
    fetchArticleCountInfoFail: '无法获取文章信息!',
  },
  en: {
    friendLink: 'FriendLinks',
    friend: 'The friend',
    about: 'about',
    article: 'article',
    previouspage: 'Previous',
    nextpage: 'Next',
    fetchArticleCountInfoFail: 'Fail To Get Articles Info..',
  },
  jp: {
    friendLink: 'フレンズ',
    friend: 'フレンズ',
    about: '私について',
    article: '文章',
    previouspage: '前のページ',
    nextpage: '次のページ',
    fetchArticleCountInfoFail: '記事情報の入手に失敗...',
  },
}
const i18n = createI18n({
  locale: 'zh',
  messages,
})

export default i18n
