<template>
  <section 
    id="home"
    class="relative flex items-center justify-center min-h-screen h-screen"
    style="min-height: 100vh; min-height: 100dvh;"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div 
        class="opacity-0 animate-fade-in"
        :class="{ 'opacity-100': isVisible }"
      >
        <!-- Main Headline -->
        <h1 class="font-pixelify font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight mb-4 sm:mb-6 text-theme px-2">
        Welcome to my portfolio.
        </h1>
        
        <!-- Subheadline -->
        <p class="font-pixelify text-base sm:text-lg md:text-xl lg:text-2xl text-theme mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
          I create visually pleasing websites and web applications.
        </p>
        
        <!-- Scroll Down Arrow -->
        <button 
          @click="scrollToProjects"
          class="inline-flex flex-col items-center text-theme hover:text-accent-red transition-all duration-300 ease-out  group mt-4 sm:mt-6"
          aria-label="Scroll down to explore more"
        >
          <span class="font-pixelify text-xs sm:text-sm mb-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            Explore more
          </span>
          <div class="animate-bounce group-hover:animate-pulse">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'Hero',
  setup() {
    const isVisible = ref(false)

    const scrollToProjects = () => {
      // Scroll to the overview section (next section after hero)
      const overviewSection = document.querySelector('section.py-8')
      if (overviewSection) {
        overviewSection.scrollIntoView({ behavior: 'smooth' })
      } else {
        // Fallback: scroll down by viewport height
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
      }
    }

    onMounted(() => {
      // Trigger fade-in animation after component mounts
      setTimeout(() => {
        isVisible.value = true
      }, 100)
    })

    return {
      isVisible,
      scrollToProjects
    }
  }
}
</script>

<style scoped>
#home {
  background-image: 
    url('https://i.postimg.cc/GpNgPTGT/cloud-1.png'),
    url('https://i.postimg.cc/5tGK5QLY/cloud-2.png');
  background-position: 
    top right,
    top left;
  background-repeat: no-repeat;
  background-size: auto;
  animation: cloudsMoveIn 2s ease-out forwards;
}

/* Small laptop screens (1024px - 1366px) */
@media (max-width: 1366px) and (min-width: 1024px) {
  #home {
    background-size: 400px auto, 300px auto;
    background-image: 
      url('https://i.postimg.cc/GpNgPTGT/cloud-1.png'),
      url('https://i.postimg.cc/5tGK5QLY/cloud-2.png');
    background-position: calc(100% - 20px) 180px, 20px 180px;
  }
}

/* Tablet and mobile responsive cloud sizing */
@media (max-width: 1023px) and (min-width: 769px) {
  #home {
    background-size: 350px auto, 250px auto;
    background-image: 
      url('https://i.postimg.cc/GpNgPTGT/cloud-1.png'),
      url('https://i.postimg.cc/5tGK5QLY/cloud-2.png');
    background-position: calc(100% - 10px) 220px, 10px 220px;
  }
}

@media (max-width: 768px) {
  #home {
    background-size: 350px auto, 250px auto;
    background-image: 
      url('https://i.postimg.cc/GpNgPTGT/cloud-1.png'),
      url('https://i.postimg.cc/5tGK5QLY/cloud-2.png');
    background-position: calc(100% - 10px) 220px, 10px 220px;
  }
}

@media (max-width: 480px) {
  #home {
    background-size: 180px auto, 150px auto; /* Both clouds smaller */
    background-image: 
      url('https://i.postimg.cc/GpNgPTGT/cloud-1.png'),
      url('https://i.postimg.cc/5tGK5QLY/cloud-2.png'); /* Show both clouds */
    background-position: 
      calc(100% - 10px) 120px,  /* Cloud 1 positioned from right edge, above hero text */
      10px 120px;               /* Cloud 2 positioned from left edge, above hero text */
  }
}

@keyframes cloudsMoveIn {
  0% {
    background-position: 
      calc(100% + 200px) -200px,  /* Cloud 1 starts off-screen right */
      calc(-200px) -200px;        /* Cloud 2 starts off-screen left */
  }
  100% {
    background-position: 
      top right,                   /* Cloud 1 ends at top right */
      top left;                   /* Cloud 2 ends at top left */
  }
}

/* Small laptop animation */
@media (max-width: 1366px) and (min-width: 1024px) {
  @keyframes cloudsMoveIn {
    0% {
      background-position: 
        calc(100% + 200px) -100px,  /* Cloud 1 starts off-screen right */
        calc(-200px) -100px;        /* Cloud 2 starts off-screen left */
    }
    100% {
      background-position: 
        calc(100% - 20px) 180px,    /* Cloud 1 ends at right edge */
        20px 180px;                 /* Cloud 2 ends at left edge */
    }
  }
}

/* Tablet animation */
@media (max-width: 1023px) and (min-width: 769px) {
  @keyframes cloudsMoveIn {
    0% {
      background-position: 
        calc(100% + 200px) -100px,  /* Cloud 1 starts off-screen right */
        calc(-200px) -100px;        /* Cloud 2 starts off-screen left */
    }
    100% {
      background-position: 
        calc(100% - 10px) 220px,    /* Cloud 1 ends at right edge */
        10px 220px;                 /* Cloud 2 ends at left edge */
    }
  }
}

@media (max-width: 768px) {
  @keyframes cloudsMoveIn {
    0% {
      background-position: 
        calc(100% + 200px) -100px,  /* Cloud 1 starts off-screen right */
        calc(-200px) -100px;        /* Cloud 2 starts off-screen left */
    }
    100% {
      background-position: 
        calc(100% - 10px) 220px,    /* Cloud 1 ends at right edge */
        10px 220px;                 /* Cloud 2 ends at left edge */
    }
  }
}

/* Mobile animation - both clouds smaller */
@media (max-width: 480px) {
  @keyframes cloudsMoveIn {
    0% {
      background-position: 
        calc(100% + 100px) -50px,   /* Cloud 1 starts off-screen right */
        calc(-100px) -50px;         /* Cloud 2 starts off-screen left */
    }
    100% {
      background-position: 
        calc(100% - 10px) 120px,    /* Cloud 1 ends at right edge, above hero text */
        10px 120px;                 /* Cloud 2 ends at left edge, above hero text */
    }
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
</style>
