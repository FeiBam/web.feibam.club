<template>
  <div class="i18n-switcher">
    <button class="switcher-button">
      <FontAwesomeIcon :icon="['fas', 'globe']" />
      {{ currentLanguageLabel }}
    </button>
    <ul class="dropdown-menu">
      <li
        v-for="(lang, index) in availableLanguages"
        :key="index"
        @click="switchLanguage(lang.code)"
      >
        {{ lang.label }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

// 注册 FontAwesome 图标
library.add(faGlobe)

// 可用语言列表
const availableLanguages = ref([
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
  { code: 'jp', label: '日本語' },
])

// 使用 vue-i18n 实例
const { locale } = useI18n()

// 当前语言标签
const currentLanguageLabel = computed(() => {
  const currentLang = availableLanguages.value.find((lang) => lang.code === locale.value)
  return currentLang ? currentLang.label : locale.value
})

// 切换语言方法
const switchLanguage = (code: string) => {
  locale.value = code // 切换 vue-i18n 的语言
  console.log(`Switched to language: ${code}`)
}
</script>

<style scoped>
/* 外层容器，使用 flex 布局 */
.i18n-switcher {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
}

/* 按钮样式 */
.switcher-button {
  border: none;
  background: #007bff;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* 隐藏下拉菜单 */
.dropdown-menu {
  display: none;
  margin: 0;
  padding: 0;
  list-style-type: none;
  border: 1px solid #ccc;
  background: #fff;
  width: 120px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* 鼠标悬停时显示下拉菜单 */
.i18n-switcher:hover .dropdown-menu {
  display: flex;
  flex-direction: column;
}

/* 下拉菜单项样式 */
.dropdown-menu li {
  padding: 5px 10px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
}
</style>
