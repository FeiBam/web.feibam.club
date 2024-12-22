import { createRouter, createWebHistory } from 'vue-router'
import ArticlesView from '@/views/ArticlesView.vue'
import ArticleView from '@/views/ArtcleView.vue'
import FriendLinks from '@/views/FriendLinks.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: ArticlesView,
    },
    {
      path: '/articles/:page',
      name: 'articles',
      component: ArticlesView,
    },
    {
      path: '/tag/:tagname/:page',
      name: 'articlesOfTag',
      component: ArticlesView,
    },
    {
      path: '/article/:id',
      name: 'article',
      component: ArticleView,
    },
    {
      path: '/friends',
      name: 'friends',
      component: FriendLinks,
    },
  ],
})

export default router
