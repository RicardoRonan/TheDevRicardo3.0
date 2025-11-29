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
          <div>
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
        title: "ChooseAFeel",
        company: "Personal Project",
        description: "A comprehensive color palette design tool with an intuitive control panel. Features real-time color customization, live preview on professional templates, accessibility checks, and multiple export formats for designers and developers.",
        tech: ["Vue.js", "CSS3", "JavaScript", "Color Theory", "Design Tools", "Accessibility", "Export Features"],
        liveLink: "https://choose-a-feel.netlify.app/",
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
      selectedProject,
      viewProject,
      closeModal
    }
  }
}
</script>
