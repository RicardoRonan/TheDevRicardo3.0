import { ref } from 'vue'

// Global loading state
const isLoading = ref(false)
const loadingMessage = ref('Loading content...')

export function useLoading() {
  const showLoading = (message = 'Loading content...', duration = 2000) => {
    loadingMessage.value = message
    isLoading.value = true
    
    // Auto-hide after duration
    setTimeout(() => {
      hideLoading()
    }, duration)
  }

  const hideLoading = () => {
    isLoading.value = false
  }

  const setLoadingMessage = (message) => {
    loadingMessage.value = message
  }

  return {
    isLoading,
    loadingMessage,
    showLoading,
    hideLoading,
    setLoadingMessage
  }
}
