<template>
  <footer class="bg-theme text-theme py-16 md:py-24 border-t border-theme">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        <!-- About Section -->
        <div class="text-center md:text-left">
          <h3 class="font-pixelify font-semibold text-lg mb-4 text-theme">About</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/about" class="text-theme hover:text-accent-red transition-colors duration-150 font-pixelify">
                About Me
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="text-theme hover:text-accent-red transition-colors duration-150 font-pixelify">
                Experience
              </router-link>
            </li>
            <li>
              <button @click="openCV" class="text-theme hover:text-accent-red transition-colors duration-150 font-pixelify cursor-pointer">
                View CV
              </button>
            </li>
          </ul>
        </div>

        <!-- Contact Section -->
        <div class="text-center md:text-left">
          <h3 class="font-pixelify font-semibold text-lg mb-4 text-theme">Contact</h3>
          <ul class="space-y-2">
            <li>
              <a href="mailto:ricardoronanm@gmail.com" class="text-theme hover:text-accent-red transition-colors duration-150 font-pixelify">
                Email
              </a>
            </li>
            <li>
              <a href="tel:+270762834237" class="text-theme hover:text-accent-red transition-colors duration-150 font-pixelify">
                Phone
              </a>
            </li>
            <li>
              <router-link to="/contact" class="text-theme hover:text-accent-red transition-colors duration-150 font-pixelify">
                Contact Form
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Social Section -->
        <div class="text-center md:text-left">
          <h3 class="font-pixelify font-semibold text-lg mb-4 text-theme">Social</h3>
          <ul class="space-y-2">
            <li>
              <a href="https://github.com/RicardoRonan" target="_blank" rel="noopener noreferrer" class="text-theme hover:text-accent-red transition-colors duration-150 font-pixelify">
                GitHub
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/the-dev-ricardo/" target="_blank" rel="noopener noreferrer" class="text-theme hover:text-accent-red transition-colors duration-150 font-pixelify">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
        <div class="border-t border-theme mt-12 pt-8 text-center">
        <p class="text-theme font-pixelify text-sm">
          © 2025 TheDevRicardo. All rights reserved.
        </p>
      </div>
    </div>
    
    <!-- PDF Viewer Modal -->
    <PDFViewer 
      :isOpen="showPDFViewer" 
      @close="closePDFViewer"
    />
  </footer>
</template>

<script>
import { ref } from 'vue'
import PDFViewer from '../ui/PDFViewer.vue'

export default {
  name: 'Footer',
  components: {
    PDFViewer
  },
  setup() {
    const showPDFViewer = ref(false)

    const openCV = () => {
      showPDFViewer.value = true
    }

    const closePDFViewer = () => {
      showPDFViewer.value = false
    }

    return {
      showPDFViewer,
      openCV,
      closePDFViewer
    }
  }
}
</script>