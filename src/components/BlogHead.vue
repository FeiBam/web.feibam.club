<script setup lang="ts"></script>
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
        <a class="menu-tag">
          <font-awesome-icon :icon="['fas', 'rss']" class="fa-fw" />
          {{ $t('article') }}
        </a>
        <a class="menu-tag">
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

<style scoped></style>
