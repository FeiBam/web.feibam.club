<template>
  <div class="cover cover-flex">
    <h1 class="cover-title">Blog</h1>
    <div class="cover-search">
      <form class="cover-search-form">
        <input class="cover-search-form-input" type="text" />
        <i class="cover-search-form-input-icon fa fa-search"></i>
      </form>
    </div>
    <div class="menu">
      <div class="menu-flex">
        <a class="menu-tag" :class="{ 'menu-tag-active': isArticleActive }">
          <font-awesome-icon :icon="['fas', 'rss']" class="fa-fw" />
          {{ $t('article') }}
        </a>
        <a class="menu-tag" :class="{ 'menu-tag-active': isFriendLinkActive }">
          <font-awesome-icon :icon="['fas', 'link']" class="fa-fw" />
          {{ $t('friendLink') }}
        </a>
        <a class="menu-tag">
          <font-awesome-icon :icon="['fas', 'info-circle']" class="fa-fw" />
          {{ $t('about') }}
        </a>
      </div>
    </div>
    <div class="cover-img">
      <img src="@/assets/default-banner.jpg" class="cover-img" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// 获取当前路由
const route = useRoute()

// 判断是否为目标路由
const isArticleActive = computed(() => {
  return route.name === 'articles' || route.name === 'articlesOfTag'
})

const isFriendLinkActive = computed(() => {
  return route.name === 'friendLink'
})
</script>
