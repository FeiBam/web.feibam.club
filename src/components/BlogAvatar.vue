<script setup lang="ts">
import BaseContent from './BaseContent.vue'
import master_image from '../assets/71566075_p0_master1200.jpg'
</script>

<template>
  <BaseContent class="Avatar-Content">
    <div class="Avatar-Main">
      <img :src="master_image" />
    </div>
    <div class="Avatar-Tags-Box">
      <a><font-awesome-icon :icon="['fab', 'twitter']"></font-awesome-icon></a>
      <a target="_blank" href="https://www.github.com/feibam"
        ><font-awesome-icon :icon="['fab', 'github']"></font-awesome-icon
      ></a>
      <a target="_blank" href="https://t.me/n0099_tg"
        ><font-awesome-icon :icon="['fab', 'telegram']"></font-awesome-icon
      ></a>
    </div>
  </BaseContent>
</template>

<style scoped></style>
