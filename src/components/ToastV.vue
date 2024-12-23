<template>
  <div class="toast-container">
    <TransitionGroup tag="list" name="toast" class="container">
      <div v-for="item in toasts" class="toast" :class="item.options.type" :key="item.uuid">
        {{ item.options.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useToastState } from '@/service/toastService'

const toasts = useToastState()
</script>

<style scoped>
/* Toast 容器，位于页面顶部 */
.toast-container {
  position: fixed;
  top: 20px; /* 固定顶部 */
  left: 50%;
  transform: translateX(-50%); /* 水平居中 */
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none; /* 避免遮挡点击事件 */
  transition: 0.75s;
}

/* Toast 消息样式 */
.toast {
  width: 100%;
  height: auto;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  pointer-events: auto;
  margin-bottom: 20px;
  font-family: monospace;
}

.toast.success {
  background-color: #4caf50;
}

.toast.error {
  background-color: #f44336;
}

.toast.info {
  background-color: #2196f3;
}

.toast.warning {
  background-color: #ff9800;
}

.toast-move,
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
/* 2. 声明进入和离开的状态 */
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. 确保离开的项目被移除出了布局流
      以便正确地计算移动时的动画效果。 */
</style>
