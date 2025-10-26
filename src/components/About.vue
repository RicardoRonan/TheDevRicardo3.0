<template>
  <section id="about" class="py-16 md:py-24 bg-theme">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="font-pixelify font-bold text-4xl md:text-5xl text-theme mb-4">
          About Me
        </h2>
        <p class="font-pixelify text-lg text-theme max-w-2xl mx-auto">
          Passionate developer creating exceptional digital experiences
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 class="font-pixelify font-bold text-2xl mb-4 text-theme">My Story</h3>
          <p class="font-pixelify text-base text-theme mb-6 leading-relaxed">
            I'm a creative developer with a passion for building modern web applications. 
            With expertise in Vue.js, React, and modern CSS frameworks, I create 
            user-centered solutions that combine functionality with beautiful design.
          </p>
          <p class="font-pixelify text-base text-theme leading-relaxed">
            When I'm not coding, you'll find me exploring new technologies, 
            contributing to open source projects, or sharing knowledge with 
            the developer community.
          </p>
        </div>
        <div class="bg-theme-light rounded-2xl p-8 border border-theme">
          <img 
            src="https://i.postimg.cc/Z57HPdr4/2.png" 
            alt="Developer photo"
            class="w-full h-64 object-cover rounded-xl"
          />
          <div class="image-background">

            <img 
              src="https://i.postimg.cc/Dy5PFXpJ/1.png" 
              alt="Developer photo"
              class="w-full h-64 object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'About'
}
</script>
