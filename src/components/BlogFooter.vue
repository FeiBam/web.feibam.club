<template>
  <div style="display: flex; flex-direction: column; align-items: center">
    <p>本站已运行{{ day }}天</p>
    <p>©2024-{{ year }} All rights reserved.</p>
    <p>Builid by Feibam with <a style="color: red">❤</a></p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const year = new Date().getFullYear()
const start = new Date('2024/12/20').getTime()
const today = new Date().getTime()
const day = computed(() => Math.floor((today - start) / (1000 * 60 * 60 * 24)))
</script>

<style scoped>
.bn {
  color: rgba(0, 0, 0, 0.65);
}
.bn:hover {
  color: #1bc3fb;
}
</style>
