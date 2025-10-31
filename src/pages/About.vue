<template>
  <div class="min-h-screen bg-theme">
    <NavBar />
    
    <!-- Main Content - fades in smoothly -->
    <main 
      class="transition-all duration-1000 ease-out relative"
      :class="{ 
        'opacity-100': showContent,
        'opacity-0': !showContent 
      }"
    >
      <!-- About Section -->
      <section id="about" class="pt-24 py-8 md:py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8 md:mb-16">
            <img src="https://i.postimg.cc/wjbp1VTd/icons-3.png" alt="About Me" class="w-24 h-24 object-cover portfolio-icon flex justify-center items-center mx-auto mb-4"></img>
            <h1 class="font-pixelify font-bold text-3xl sm:text-4xl md:text-5xl text-theme mb-3 md:mb-4">
              About Me
            </h1>
            <p class="font-pixelify text-base md:text-lg text-theme max-w-2xl mx-auto px-4">
              Passionate developer creating exceptional digital experiences
            </p>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-left text-left">
            <div class="order-2 lg:order-1">
              <h3 class="font-pixelify font-bold text-xl md:text-2xl mb-3 md:mb-4 text-theme">My Story</h3>
              <p class="font-pixelify text-sm md:text-base text-theme mb-4 md:mb-6 leading-relaxed">
                I'm a creative developer with a passion for building modern web applications. 
                With expertise in Vue.js, React, and modern CSS frameworks, I create 
                user-centered solutions that combine functionality with beautiful design.
              </p>
              <p class="font-pixelify text-sm md:text-base text-theme leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, 
                contributing to open source projects, or sharing knowledge with 
                the developer community.
              </p>
              
              <!-- CV Button -->
              <div class="mt-6 text-center">
                <p class="font-pixelify text-sm md:text-base text-theme mb-3">
                  Press Start to see my CV
                </p>
                <button 
                  @click="openCV" 
                  class="cv-button bg-cover bg-center bg-no-repeat w-48 h-24 transition-all duration-300 transform hover:scale-105"
                  style="background-image: url('https://i.postimg.cc/5tCLGs6h/icons-4.png')"
                >
                </button>
              </div>
            </div>
             <div class="order-1 lg:order-2 relative" id="about-image-frame">
             </div>
          </div>
        </div>
      </section>

      <!-- Fun Facts About Me Section -->
      <section class="py-8 md:py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8 md:mb-12">
            <h2 class="font-pixelify font-bold text-2xl sm:text-3xl md:text-4xl text-theme mb-4">
              Fun Facts About Me
            </h2>
            <p class="font-pixelify text-base md:text-lg text-theme max-w-2xl mx-auto px-4">
              Things I love and enjoy
            </p>
          </div>
          
          <div class="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-12">
            <div 
              v-for="(fact, index) in funFacts" 
              :key="index"
              class="fun-fact-item group relative flex flex-col items-center"
              :title="fact.name"
            >
              <div class="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                <img 
                  :src="fact.icon" 
                  :alt="fact.name"
                  class="w-full h-full object-contain transition-all duration-300 grayscale-0 md:grayscale md:group-hover:grayscale-0"
                />
              </div>
              <!-- Mobile: Always show text below icon -->
              <div class="md:hidden mt-2 text-center">
                <p class="text-theme text-xs font-pixelify leading-tight px-1">
                  {{ fact.name }}
                </p>
              </div>
              <!-- Desktop: Show tooltip on hover -->
              <div class="hidden md:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-theme text-theme text-xs font-pixelify rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                {{ fact.name }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Experience Section -->
      <section class="pt-24 py-8 md:py-16 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8 md:mb-16">
            <h2 class="font-pixelify font-bold text-3xl sm:text-4xl md:text-5xl text-theme mb-3 md:mb-4">
              Experience
            </h2>
            <p class="font-pixelify text-base md:text-lg text-theme max-w-2xl mx-auto px-4">
              My professional journey and key achievements
            </p>
          </div>
          
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-2 px-2 py-3 ">
            <div v-for="(experience, index) in experiences" :key="index" class="bg-theme-light  p-4 md:p-4 rounded-2xl">
              <div class="flex flex-col md:flex-column md:items-left md:justify-left mb-3 md:mb-4 ">
                <div class="mb-2 md:mb-0">
                  <h3 class="font-pixelify font-bold text-lg md:text-2xl text-theme mb-1 md:mb-2">{{ experience.title }}</h3>
                  <p class="font-pixelify text-base md:text-lg text-theme opacity-75">{{ experience.company }}</p>
                </div>
                <div class="text-left md:text-left">
                  <p class="font-pixelify text-xs md:text-sm text-theme opacity-75">{{ experience.duration }}</p>
                  <p class="font-pixelify text-xs md:text-sm text-theme opacity-75">{{ experience.location }}</p>
                </div>
              </div>
              
              <p class="font-pixelify text-sm md:text-base text-theme leading-relaxed mb-3 md:mb-4">{{ experience.description }}</p>
              <div class="flex flex-wrap gap-1 md:gap-2">
                <span 
                  v-for="skill in experience.skills" 
                  :key="skill"
                  class="px-2 md:px-3 py-1 bg-theme text-theme text-xs md:text-sm font-pixelify rounded-lg"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
    
    <Footer />
    
    <!-- PDF Viewer Modal -->
    <PDFViewer 
      :isOpen="showPDFViewer" 
      @close="closePDFViewer"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import NavBar from '../components/layout/NavBar.vue'
import Footer from '../components/layout/Footer.vue'
import PDFViewer from '../components/ui/PDFViewer.vue'

export default {
  name: 'AboutPage',
  components: {
    NavBar,
    Footer,
    PDFViewer
  },
  setup() {
    const showContent = ref(false)
    const showPDFViewer = ref(false)
    const experiences = ref([
      {
        title: 'Automation Specialist',
        company: 'B2B-Ai',
        duration: 'May 2025 – Present',
        location: 'Remote',
        description: 'Working on automation workflows and streamlining repetitive tasks to improve operational efficiency and reduce manual processes.',
        skills: ['Automation Workflows', 'Process Optimization', 'Task Automation', 'Efficiency Improvement']
      },
      {
        title: 'Software Developer',
        company: 'Payment24',
        duration: 'Mar 2023 – May 2025',
        location: 'Remote',
        description: 'Worked on fullstack Microsoft projects using .NET, SQL Server, and Azure. Fintech systems and Banking ,Standard Bank Fleet Managment systems website.',
        skills: ['Vue.js', 'Bootstrap', 'REST APIs', '.NET', 'Performance Optimization', 'Frontend Development']
      },
      {
        title: 'SEO Intern',
        company: 'Grizzly New Marketing',
        duration: 'Sep 2022 – Dec 2022',
        location: 'Remote',
        description: 'Optimized on-page SEO and front-end performance for client websites. Improved accessibility and technical SEO structure.',
        skills: ['SEO Optimization', 'Performance Optimization', 'Accessibility', 'Technical SEO', 'Frontend Performance']
      }
    ])

    const funFacts = ref([
      {
        name: 'Coffee Lover',
        icon: 'https://i.postimg.cc/LXZSjZQt/icons-5.png'
      },
      {
        name: 'Art Enthusiast',
        icon: 'https://i.postimg.cc/VkMXZ7SG/art.png'
      },
      {
        name: 'Music Lover (2.5k song liked on Spotify)',
        icon: 'https://i.postimg.cc/rwW5Zhd9/music.png'
      },
      {
        name: 'Enjoy hiking and nature',
        icon: 'https://i.postimg.cc/CxDbrvZ6/nature.png'
      },
      {
        name: 'FASP (Flow and Stay Positive) [My mindset I live by]',
        icon: 'https://i.postimg.cc/3xp2fLyL/smile.png'
      }
    ])

    const openCV = () => {
      // Open PDF viewer modal
      showPDFViewer.value = true
    }

    const closePDFViewer = () => {
      showPDFViewer.value = false
    }

    onMounted(() => {
      // Trigger fade-in animation after component mounts
      setTimeout(() => {
        showContent.value = true
      }, 100)
    })

    return {
      showContent,
      showPDFViewer,
      experiences,
      funFacts,
      openCV,
      closePDFViewer
    }
  }
}
</script>
<style scoped>
/* #about {
  background-image: url('https://i.postimg.cc/SxvN8qNR/icons-2.png');
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: contain;
} */
  #about-image-frame {
   background-image: url('https://i.postimg.cc/zvPsyD8J/about-image-frame-1.png');
   background-repeat: no-repeat;
   background-position: center;
   background-size: contain;
   width: 100%;
   height: 450px;
   position: relative;
   z-index: 10;
  }
  
  #about-image-frame > div {
   z-index: 1;
  }
</style>
