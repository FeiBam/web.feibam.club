import { ref, provide, inject } from 'vue'

import { GenerateUUID } from '@/utils'
export interface ToastOptions {
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number // 毫秒
}

interface Toast {
  options: ToastOptions
  uuid: string
}

const toasts = ref<Toast[]>([])

export const useToastProvider = () => {
  const addToast = (toastOptions: ToastOptions) => {
    const toast: Toast = {
      options: toastOptions,
      uuid: GenerateUUID(),
    }
    toasts.value.push(toast)
    setTimeout(() => {
      toasts.value.shift()
    }, toast.options.duration || 3000)
  }

  provide('addToast', addToast)
}

export const useToast = (): ((toast: ToastOptions) => void) => {
  const addToast = inject<(toast: ToastOptions) => void>('addToast')
  if (!addToast) {
    throw new Error('useToast must be used within a provider')
  }
  return addToast
}

export const useToastState = () => {
  return toasts
}
