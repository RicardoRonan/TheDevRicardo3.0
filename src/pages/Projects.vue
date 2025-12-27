<template>
  <div class="min-h-screen bg-theme">
    <NavBar />
    
    <!-- Main Content - fades in smoothly -->
    <main 
      class="transition-all duration-1200 ease-[cubic-bezier(0.4,0,0.2,1)] relative"
      :class="{ 
        'opacity-100': showContent,
        'opacity-0': !showContent 
      }"
    >
      <!-- Projects Section -->
      <section class="pt-24 py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <img src="https://i.postimg.cc/wjL2Sxyv/pc.png" alt="Projects" class="w-24 h-24 mx-auto mb-4">
            <h1 class="font-pixelify font-bold text-4xl md:text-5xl text-theme mb-4">
              My Projects
            </h1>
            <p class="font-pixelify text-lg text-theme max-w-2xl mx-auto">
              A showcase of my recent work and technical expertise
            </p>
          </div>

          <!-- Featured Projects Section -->
          <div class="mb-16">
            <div class="text-center mb-12">
              <h2 class="font-pixelify font-bold text-3xl md:text-4xl text-theme mb-4">
                Featured Projects
              </h2>
              <p class="font-pixelify text-lg text-theme/80 max-w-xl mx-auto">
                My portfolio evolution - showcasing growth and development over time
              </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <ProjectListItem 
                v-for="(project, index) in featuredProjects" 
                :key="project.id"
                :project="project"
                :delay="index * 100"
                @view-project="viewProject"
                class="transition-all duration-300 ease-out"
              />
            </div>
          </div>

          <!-- Regular Projects Section -->
          <div class="mb-16">
            <div class="text-center mb-12">
              <h2 class="font-pixelify font-bold text-3xl md:text-4xl text-theme mb-4">
                All Projects
              </h2>
              <p class="font-pixelify text-lg text-theme/80 max-w-xl mx-auto">
                Complete collection of my work and client projects
              </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProjectListItem 
                v-for="(project, index) in projects" 
                :key="project.id"
                :project="project"
                :delay="index * 100"
                @view-project="viewProject"
              />
            </div>
          </div>

          <!-- Tech Assessments Section -->
          <div>
            <div class="text-center mb-12">
              <h2 class="font-pixelify font-bold text-3xl md:text-4xl text-theme mb-4">
                Tech Assessments
              </h2>
              <p class="font-pixelify text-lg text-theme/80 max-w-xl mx-auto">
                Technical assessments and coding challenges I've completed
              </p>
            </div>

            <!-- Assessments List -->
            <div v-if="assessments.length > 0" class="max-w-5xl mx-auto">
              <div class="space-y-4 md:space-y-6">
                <div 
                  v-for="assessment in assessments" 
                  :key="assessment.id" 
                  class="bg-theme-light rounded-xl p-4 md:p-6 border border-theme hover:border-accent-red transition-all duration-300 hover:shadow-lg group"
                >
                  <!-- Mobile Layout -->
                  <div class="block md:hidden">
                    <div class="flex items-start justify-between mb-3">
                      <h3 class="font-pixelify font-bold text-lg text-theme group-hover:text-accent-red transition-colors flex-1 pr-2">{{ assessment.title }}</h3>
                      <div class="flex flex-col items-end gap-1 flex-shrink-0">
                        <span class="px-2 py-1 bg-theme/10 text-theme text-xs font-pixelify rounded-full">{{ assessment.company }}</span>
                        <span v-if="assessment.status" :class="getStatusClass(assessment.status)" class="px-2 py-1 text-xs font-pixelify rounded-full">{{ assessment.status }}</span>
                      </div>
                    </div>
                    <p class="font-pixelify text-sm text-theme opacity-75 mb-3">{{ assessment.category }}</p>
                    <p class="font-pixelify text-sm text-theme leading-relaxed mb-3 line-clamp-3">{{ assessment.description }}</p>
                    <div class="flex flex-wrap gap-2 mb-3">
                      <span v-for="tech in assessment.tech" :key="tech" class="px-2 py-1 bg-theme/20 text-theme text-xs font-pixelify rounded">
                        {{ tech }}
                      </span>
                    </div>
                    <div v-if="assessment.date" class="text-xs text-theme/60 font-pixelify mb-4">
                      Completed: {{ formatDate(assessment.date) }}
                    </div>
                    <div class="flex gap-2">
                      <a 
                        v-if="assessment.link" 
                        :href="assessment.link" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="inline-flex items-center text-accent-red font-pixelify font-semibold text-sm hover:underline group-hover:text-accent-red/80 transition-colors px-3 py-2 rounded-lg hover:bg-accent-red/10 flex-1 justify-center"
                      >
                        View Details
                        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </a>
                      <a 
                        v-if="assessment.githubLink" 
                        :href="assessment.githubLink" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        class="inline-flex items-center text-theme font-pixelify font-semibold text-sm hover:text-accent-red transition-colors px-3 py-2 rounded-lg hover:bg-theme border border-theme"
                      >
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                    </div>
                  </div>

                  <!-- Desktop Layout -->
                  <div class="hidden md:block">
                    <div class="flex items-start justify-between gap-6">
                      <div class="flex items-start flex-1 gap-6">
                        <div class="flex-1 min-w-0">
                          <div class="flex items-start justify-between mb-3">
                            <h3 class="font-pixelify font-bold text-xl text-theme group-hover:text-accent-red transition-colors">{{ assessment.title }}</h3>
                            <div class="flex items-center gap-3 ml-6 flex-shrink-0">
                              <span class="px-3 py-1 bg-theme/10 text-theme text-xs font-pixelify rounded-full">{{ assessment.company }}</span>
                              <span v-if="assessment.status" :class="getStatusClass(assessment.status)" class="px-3 py-1 text-xs font-pixelify rounded-full">{{ assessment.status }}</span>
                            </div>
                          </div>
                          <p class="font-pixelify text-sm text-theme opacity-75 mb-3">{{ assessment.category }}</p>
                          <p class="font-pixelify text-base text-theme leading-relaxed mb-3">{{ assessment.description }}</p>
                          <div class="flex flex-wrap gap-2 mb-3">
                            <span v-for="tech in assessment.tech" :key="tech" class="px-2 py-1 bg-theme/20 text-theme text-xs font-pixelify rounded">
                              {{ tech }}
                            </span>
                          </div>
                          <div v-if="assessment.date" class="text-xs text-theme/60 font-pixelify">
                            Completed: {{ formatDate(assessment.date) }}
                          </div>
                        </div>
                      </div>
                      <div class="flex-shrink-0 flex flex-col gap-2">
                        <a 
                          v-if="assessment.link" 
                          :href="assessment.link" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          class="inline-flex items-center text-accent-red font-pixelify font-semibold text-sm hover:underline group-hover:text-accent-red/80 transition-colors px-4 py-2 rounded-lg hover:bg-accent-red/10 whitespace-nowrap"
                        >
                          View Details
                          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                          </svg>
                        </a>
                        <a 
                          v-if="assessment.githubLink" 
                          :href="assessment.githubLink" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          class="inline-flex items-center justify-center text-theme font-pixelify font-semibold text-sm hover:text-accent-red transition-colors px-4 py-2 rounded-lg hover:bg-theme border border-theme"
                        >
                          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Coming Soon Alert -->
            <div class="max-w-5xl mx-auto mt-8">
              <div class="bg-accent-red/10 border border-accent-red/30 rounded-xl p-4 md:p-6">
                <div class="flex items-start gap-3 md:gap-4">
                  <div class="flex-shrink-0">
                    <svg class="w-5 h-5 md:w-6 md:h-6 text-accent-red mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-pixelify font-bold text-lg md:text-xl text-accent-red mb-2">Coming Soon</h3>
                    <p class="font-pixelify text-sm md:text-base text-theme">
                      Tech assessments section is currently under development. Check back soon to see the technical challenges and coding assessments I've completed!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <Footer />
    
    <!-- Project Detail Modal -->
    <ProjectDetail 
      v-if="selectedProject"
      :project="selectedProject"
      @close="closeModal"
    />
    
    <!-- Image Loading Popup -->
    <SimpleRetroLoading 
      v-if="showImageLoading"
      :duration="1500"
      :loading-message="'Loading project images...'"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import NavBar from '../components/layout/NavBar.vue'
import ProjectListItem from '../components/project/ProjectListItem.vue'
import ProjectDetail from '../components/project/ProjectDetail.vue'
import Footer from '../components/layout/Footer.vue'
import SimpleRetroLoading from '../components/ui/SimpleRetroLoading.vue'

export default {
  name: 'Projects',
  components: {
    NavBar,
    ProjectListItem,
    ProjectDetail,
    Footer,
    SimpleRetroLoading
  },
  setup() {
    const showContent = ref(false)
    const showImageLoading = ref(false)
    
    // Featured projects (portfolio iterations)
    const featuredProjects = ref([
    {  id: 1,
        title: "The Meta Stack ",
        company: "Personal Project",
        description: "A digital community platform for developers, designers, and creators to share knowledge, build innovative solutions together.",
        brief: "The Meta Stack was conceived as a comprehensive platform to connect developers, designers, and creators in a collaborative environment. The project aimed to solve the fragmentation in developer communities by providing a unified space for knowledge sharing, project collaboration, and networking.\n\nKey objectives included:\n• Creating an intuitive user interface that encourages engagement\n• Implementing real-time features for seamless collaboration\n• Building a scalable architecture to support growing user base\n• Ensuring mobile responsiveness for accessibility across devices\n\nThe development process involved extensive user research, iterative design improvements, and performance optimization to deliver a smooth user experience.",
        tech: ["Vue.js", "CSS3", "JavaScript", "Firebase", "Responsive Design", "Animations"],
        liveLink: "https://themetastack.com/",
        img: "https://i.postimg.cc/V6Wx8Mn2/Meta-Stack-Developer-Community-Platform.png",
        landingImage: "https://i.postimg.cc/V6Wx8Mn2/Meta-Stack-Developer-Community-Platform.png",
        category: "featured",},
      {
        id: 1,
        title: "The Dev Ricardo 1.0",
        company: "Personal Project",
        description: "My first portfolio website built with Vue.js, featuring a modern design, smooth animations, and Firebase integration for dynamic content management. This marked the beginning of my journey as a web developer.",
        tech: ["Vue.js", "CSS3", "JavaScript", "Firebase", "Responsive Design", "Animations"],
        liveLink: "https://original-the-dev-ricardo.netlify.app/",
        img: "https://i.postimg.cc/htTnbRjT/image.png",
        landingImage: "https://i.postimg.cc/htTnbRjT/image.png",
        category: "featured",
      }, 
      {
        id: 12,
        title: "The Dev Ricardo 2.0",
        company: "Personal Project",
        description: "An evolved version of my portfolio with enhanced design, improved performance, and additional features. Showcasing my growth as a developer with better code organization and user experience.",
        tech: ["Vue.js", "CSS3", "JavaScript", "Firebase", "Responsive Design", "Performance Optimization"],
        liveLink: "https://thedevricardo-e8d7f.web.app/",
        img: "https://i.postimg.cc/Y9qWYqVg/image.png",
        landingImage: "https://i.postimg.cc/Y9qWYqVg/image.png",
        category: "featured",
      }
    ])
    
    const projects = ref([
      // Client Projects
      {
        id: 11,
        title: "ColoursPal",
        company: "Personal Project",
        description: "A comprehensive color palette design tool with an intuitive control panel. Features real-time color customization, live preview on professional templates, accessibility checks, and multiple export formats for designers and developers.",
        tech: ["Vue.js", "CSS3", "JavaScript", "Color Theory", "Design Tools", "Accessibility", "Export Features"],
        liveLink: "https://colourspal.netlify.app/",
        img: "https://i.postimg.cc/FKG0RqjQ/image.png", 
        landingImage: "https://i.postimg.cc/FKG0RqjQ/image.png",
        category: "personal",
      },
      {
        id: 8,
        title: "Clear Future SA",
        company: "Clear Future SA",
        description: "A comprehensive business website for Clear Future SA, featuring modern design, service information, and client testimonials. Built with WordPress for easy content management.",
        tech: ["WordPress", "PHP", "CSS3", "JavaScript", "SEO Optimization"],
        liveLink: "https://clearfuturesa.co.za/",
        img: "https://i.postimg.cc/yNgK7JRD/image.png",
        landingImage: "https://i.postimg.cc/yNgK7JRD/image.png",
        category: "client",
      },
      {
        id: 9,
        title: "Damons Dynasty",
        company: "Damons Dynasty",
        description: "A dynamic business website showcasing Damons Dynasty services and portfolio. Features include image galleries, contact forms, and mobile-responsive design.",
        tech: ["WordPress", "PHP", "CSS3", "JavaScript", "Image Galleries"],
        liveLink: "https://damonsdynasty.co.za/",
        img: "https://i.postimg.cc/TYKHgjw0/image.png",
        landingImage: "https://i.postimg.cc/TYKHgjw0/image.png",
        category: "client",
      },
      {
        id: 7,
        title: "Spottless Cleaning Services",
        company: "Spottless Cleaning Services",
        description: "A professional cleaning services website built with WordPress. Features include service listings, contact forms, and responsive design optimized for local business needs.",
        tech: ["WordPress", "PHP", "CSS3", "JavaScript", "Contact Forms"],
        liveLink: "https://spottless.co.za/",
        img: "https://i.postimg.cc/qBL4Cqyj/image.png",
        landingImage: "https://i.postimg.cc/qBL4Cqyj/image.png",
        category: "client",
      },
      // Personal/Fun Projects
      {
        id: 10,
        title: "Game Stats App",
        company: "Personal Project",
        description: "A comprehensive gaming statistics and analytics dashboard application. Features session tracking, player leaderboards, game statistics, and interactive data visualization with modern UI/UX design for gaming communities.",
        tech: ["Vue.js", "CSS3", "JavaScript", "Chart.js", "Data Visualization", "Gaming Analytics", "Dashboard"],
        liveLink: "https://statsmanne.netlify.app/",
        img: "https://i.postimg.cc/Nj4JwdPv/image.png",
        landingImage: "https://i.postimg.cc/Nj4JwdPv/image.png",
        category: "personal",
      }
    ])

    const selectedProject = ref(null)

    // Tech assessments data
    const assessments = ref([
      // Add your tech assessments here
      // Example structure:
      // {
      //   id: 1,
      //   title: 'Assessment Title',
      //   company: 'Company Name',
      //   category: 'Frontend',
      //   description: 'Description of the assessment',
      //   tech: ['Vue.js', 'JavaScript', 'CSS'],
      //   date: '2024-01-15',
      //   status: 'Completed',
      //   link: 'https://example.com',
      //   githubLink: 'https://github.com/example'
      // }
    ])

    // Format date
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }

    // Get status badge class
    const getStatusClass = (status) => {
      const statusLower = status.toLowerCase()
      if (statusLower === 'completed' || statusLower === 'passed') {
        return 'bg-green-500/20 text-green-500'
      } else if (statusLower === 'in progress' || statusLower === 'pending') {
        return 'bg-yellow-500/20 text-yellow-500'
      } else {
        return 'bg-theme/10 text-theme'
      }
    }

    const viewProject = (project) => {
      selectedProject.value = project
    }

    const closeModal = () => {
      selectedProject.value = null
    }

    onMounted(() => {
      // Show loading for images
      showImageLoading.value = true
      
      // Trigger fade-in animation after component mounts
      setTimeout(() => {
        showContent.value = true
        // Hide loading after content is ready
        setTimeout(() => {
          showImageLoading.value = false
        }, 1500)
      }, 100)
    })

    return {
      showContent,
      showImageLoading,
      featuredProjects,
      projects,
      assessments,
      selectedProject,
      viewProject,
      closeModal,
      formatDate,
      getStatusClass
    }
  }
}
</script>
