<template>
  <div class="Pagination-Content">
    <!-- 上一页按钮 -->
    <div>
      <div
        v-if="hasPreviousPage"
        class="Pagination-Button"
        style="border-radius: 32px 10px 10px 32px"
        @click="handlePreviousPage"
      >
        <p>{{ $t('previouspage') }}</p>
      </div>
      <p v-else>{{ currentPage }} / {{ AllPage }}</p>
    </div>

    <!-- 下一页按钮 -->
    <div>
      <div
        v-if="hasNextPage"
        class="Pagination-Button"
        style="border-radius: 10px 32px 32px 10px"
        @click="handleNextPage"
      >
        <p>{{ $t('nextpage') }}</p>
      </div>
      <p v-else>{{ currentPage }} / {{ AllPage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  NowPage: number // 当前页码
  AllPage: number // 总页数
  onPreviousPage?: () => void // 上一页回调函数（可选）
  onNextPage?: () => void // 下一页回调函数（可选）
}

const props = defineProps<Props>()

// 计算属性
const hasPreviousPage = computed(() => props.NowPage > 1)
const hasNextPage = computed(() => props.NowPage < props.AllPage)
const currentPage = computed(() => props.NowPage)

// 按钮点击事件
const handlePreviousPage = () => {
  if (!props.onPreviousPage) {
    return console.log('PreviousPage')
  }
  props.onPreviousPage()
}

const handleNextPage = () => {
  if (!props.onNextPage) {
    return console.log('NextPage')
  }
  props.onNextPage()
}
</script>
