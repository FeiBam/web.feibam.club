<template>
  <a :href="link" class="Container" target="_blank">
    <div class="FriendImg">
      <img class="avatar" :src="friendImage" />
    </div>
    <div class="FriendName">
      <p>{{ friendName }}</p>
    </div>
  </a>
</template>

<script setup lang="ts">
import type { FriendLinkItemProps } from '@/types/frined_types'
import { defineProps } from 'vue'
const props = defineProps<FriendLinkItemProps>()
</script>
