<template>
  <div class="pdf-viewer-container">
    <!-- Modal Overlay -->
    <div 
      v-if="isOpen" 
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      @click="closeViewer"
    >
      <!-- Modal Content -->
      <div 
        class="bg-theme-light border-2 border-theme rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden transition-all duration-300"
        :class="{ 'fixed inset-4 max-w-none max-h-none rounded-none': isFullscreen }"
        @click.stop
      >
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b-2 border-theme">
          <h3 class="font-pixelify font-bold text-xl text-theme">
            Ricardo Moses - Resume
          </h3>
          <div class="flex items-center gap-2">
            <!-- Full Screen Button -->
            <button 
              @click="toggleFullscreen"
              class="px-3 py-1 bg-theme text-theme-light font-pixelify text-sm rounded-lg hover:bg-opacity-80 transition-all duration-300"
              title="Toggle Full Screen"
            >
              {{ isFullscreen ? 'Exit Full' : 'Full Screen' }}
            </button>
            <!-- Download Button -->
            <button 
              @click="downloadPDF"
              class="px-3 py-1 bg-theme text-theme-light font-pixelify text-sm rounded-lg hover:bg-opacity-80 transition-all duration-300"
              title="Download PDF"
            >
              Download
            </button>
            <!-- Close Button -->
            <button 
              @click="closeViewer"
              class="w-8 h-8 bg-theme text-theme-light font-pixelify text-lg rounded-lg hover:bg-opacity-80 transition-all duration-300 flex items-center justify-center"
              title="Close"
            >
              ×
            </button>
          </div>
        </div>

        <!-- PDF Content -->
        <div class="p-4 overflow-auto max-h-[calc(90vh-80px)]" :class="{ 'max-h-[calc(100vh-80px)]': isFullscreen }">
          <div v-if="loading" class="flex items-center justify-center py-12">
            <div class="text-center">
              <div class="retro-loading mb-4"></div>
              <p class="font-pixelify text-theme">Loading PDF...</p>
            </div>
          </div>
          
          <div v-else-if="error" class="text-center py-12">
            <p class="font-pixelify text-theme mb-4">Error loading PDF</p>
            <button 
              @click="downloadPDF"
              class="px-4 py-2 bg-theme text-theme-light font-pixelify rounded-lg hover:bg-opacity-80 transition-all duration-300"
            >
              Download Instead
            </button>
          </div>
          
          <div v-else class="pdf-content">
            <!-- PDF Viewer using iframe -->
            <iframe
              :src="pdfSource"
              class="pdf-iframe"
              :style="{ transform: `scale(${zoomLevel})`, transformOrigin: 'top left' }"
              @load="onPdfLoaded"
              @error="onPdfError"
              title="Ricardo Moses Resume"
            ></iframe>
            

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onUnmounted } from 'vue'

export default {
  name: 'PDFViewer',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    pdfUrl: {
      type: String,
      default: '/Ricardo_Moses_Resume.pdf'
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const loading = ref(true)
    const error = ref(false)
    const pdfSource = ref(props.pdfUrl)
    const isFullscreen = ref(false)
    const zoomLevel = ref(1)

    const closeViewer = () => {
      emit('close')
    }

    const downloadPDF = () => {
      const link = document.createElement('a')
      link.href = props.pdfUrl
      link.download = 'Ricardo_Moses_Resume.pdf'
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    const toggleFullscreen = () => {
      isFullscreen.value = !isFullscreen.value
    }


    const resetZoom = () => {
      zoomLevel.value = 1
    }

    const onPdfLoaded = () => {
      loading.value = false
      error.value = false
    }

    const onPdfError = () => {
      loading.value = false
      error.value = true
    }

    // Keyboard shortcuts
    const handleKeydown = (event) => {
      if (!props.isOpen) return
      
      switch (event.key) {
        case 'Escape':
          if (isFullscreen.value) {
            isFullscreen.value = false
          } else {
            closeViewer()
          }
          break
        case 'F11':
          event.preventDefault()
          toggleFullscreen()
          break
        case '0':
          event.preventDefault()
          resetZoom()
          break
      }
    }

    // Reset state when modal opens
    watch(() => props.isOpen, (newValue) => {
      if (newValue) {
        loading.value = true
        error.value = false
        isFullscreen.value = false
        zoomLevel.value = 1
        // Add keyboard event listener
        document.addEventListener('keydown', handleKeydown)
        // Add a small delay to show loading state
        setTimeout(() => {
          loading.value = false
        }, 1000)
      } else {
        // Remove keyboard event listener
        document.removeEventListener('keydown', handleKeydown)
      }
    })

    // Cleanup on unmount
    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeydown)
    })

    return {
      loading,
      error,
      pdfSource,
      isFullscreen,
      zoomLevel,
      closeViewer,
      downloadPDF,
      toggleFullscreen,
      resetZoom,
      onPdfLoaded,
      onPdfError
    }
  }
}
</script>

<style scoped>
.pdf-viewer-container {
  font-family: 'Courier New', monospace;
}

.pdf-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pdf-iframe {
  width: 100%;
  height: 70vh;
  min-height: 500px;
  border: 2px solid var(--theme-color, #333);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.pdf-content {
  overflow: auto;
  max-height: calc(90vh - 120px);
}

/* Fullscreen mode adjustments */
.fixed.inset-4 .pdf-content {
  max-height: calc(100vh - 120px);
}

.fixed.inset-4 .pdf-iframe {
  height: calc(100vh - 200px);
  min-height: 600px;
}

.retro-loading {
  width: 40px;
  height: 40px;
  border: 3px solid var(--theme-color, #333);
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Custom scrollbar for the modal content */
.overflow-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-auto::-webkit-scrollbar-track {
  background: var(--theme-light, #f0f0f0);
  border-radius: 4px;
}

.overflow-auto::-webkit-scrollbar-thumb {
  background: var(--theme-color, #333);
  border-radius: 4px;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
  background: var(--theme-color, #555);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .pdf-viewer-container .max-w-5xl {
    max-width: 95vw;
  }
  
  .pdf-iframe {
    height: 60vh;
    min-height: 400px;
  }
}

@media (max-width: 480px) {
  .pdf-iframe {
    height: 50vh;
    min-height: 300px;
  }
}
</style>
