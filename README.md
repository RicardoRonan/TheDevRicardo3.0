<div align="center">

# TheDevRicardo 3.0

### *Welcome to my portfolio.*

A modern, responsive portfolio showcasing my work as a creative developer. Built with Vue 3 and featuring smooth animations, pixel-perfect design, and an exceptional user experience.

[![Vue.js](https://img.shields.io/badge/Vue.js-3.4.0-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[**Live Demo**](https://thedevricardo.netlify.app/) • [**Contact**](mailto:ricardoronanm@gmail.com) • [**LinkedIn**](https://www.linkedin.com/in/the-dev-ricardo/)

</div>

---

## Features

- **Modern Design**: Clean, minimalist aesthetic with custom animations
- **Fully Responsive**: Mobile-first design that works on all devices
- **Lightning Fast**: Optimized with Vite for blazing-fast performance
- **Smooth Animations**: Fade-in effects, cloud animations, and interactive elements
- **Interactive Portfolio**: Project showcases with detailed modals
- **Theme Support**: Dynamic theming with CSS custom properties
- **Accessible**: ARIA labels, semantic HTML, and keyboard navigation
- **Modern Stack**: Vue 3 Composition API with latest best practices

## Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | Vue 3, Composition API, Vue Router |
| **Styling** | Tailwind CSS, Custom CSS Variables |
| **Build Tool** | Vite, PostCSS, Autoprefixer |
| **Fonts** | Pixelify Sans (Custom), Inter |
| **Deployment** | Netlify |
| **Version Control** | Git, GitHub |

## Quick Start

### Prerequisites
- **Node.js** 16+ 
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RicardoRonan/TheDevRicardo3.0.git
   cd TheDevRicardo3.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── About.vue              # About page with personal story
│   ├── Contact.vue            # Contact form and information
│   ├── Footer.vue             # Site footer with links
│   ├── Hero.vue               # Hero section with cloud animations
│   ├── IntroAnimation.vue     # Loading animation component
│   ├── NavBar.vue             # Navigation with mobile menu
│   ├── Portfolio.vue          # Main portfolio landing page
│   ├── ProjectCard.vue        # Individual project cards
│   ├── ProjectDetail.vue      # Project detail modal
│   ├── ProjectListItem.vue    # Project list items
│   ├── Projects.vue            # Projects showcase page
│   ├── RetroLoadingBar.vue    # Retro-style loading component
│   ├── SimpleRetroLoading.vue # Simple loading animation
│   ├── Testimonials.vue       # Client testimonials
│   └── ThemeToggle.vue        # Dark/light theme toggle
├── composables/
│   └── useLoading.js          # Loading state management
├── router/
│   └── index.js               # Vue Router configuration
├── utils/
│   └── scrollPrevention.js    # Scroll behavior utilities
├── App.vue                    # Root component
├── main.js                    # Application entry point
└── style.css                  # Global styles and Tailwind imports
```

## Design System

### Color Palette
```css
--primary-black: #000000
--secondary-gray: #86868B  
--border-gray: #AEAEB2
--accent-red: #DC143C
--dark-bg: #1D1D1F
```

### Typography
- **Primary**: Pixelify Sans (Custom font for headings)
- **Secondary**: Inter (System font fallback)

### Key Features
- **Cloud Animations**: Animated background elements
- **Smooth Transitions**: 300ms ease-out transitions
- **Hover Effects**: Interactive element states
- **Loading States**: Retro-style loading animations

## Responsive Design

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px+
- **Large Desktop**: 1366px+

## Portfolio Sections

### Home
- Hero section with animated clouds
- Navigation cards to different sections
- Smooth scroll animations

### About
- Personal story and background
- Professional photo gallery
- Skills and expertise overview

### Projects
- **Client Work**: Spottless Cleaning, Clear Future SA, Damons Dynasty
- **Personal Projects**: Statsmanne, ChooseAFeel, Vue.js Portfolio
- Interactive project modals with detailed information

### Contact
- Contact form with validation
- Social media links
- Professional contact information

## Customization

### Adding New Projects
Edit the `projects` array in `src/components/Projects.vue`:

```javascript
{
  id: 12,
  title: "Your Project Title",
  company: "Company Name",
  description: "Detailed project description...",
  tech: ["Vue.js", "CSS3", "JavaScript"],
  liveLink: "https://your-project.com",
  githubLink: "https://github.com/your-repo",
  img: "https://your-image-url.com/image.png",
  category: "personal" // or "client"
}
```

### Customizing Colors
Update the color palette in `tailwind.config.js`:

```javascript
colors: {
  'accent-red': '#YOUR_COLOR',
  'primary-black': '#YOUR_COLOR',
  // ... other colors
}
```

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 88+ |
| Firefox | 85+ |
| Safari | 14+ |
| Edge | 88+ |

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with love by [Ricardo Moses](https://github.com/RicardoRonan)**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/RicardoRonan)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/the-dev-ricardo/)
[![Portfolio](https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=todoist&logoColor=white)](https://thedevricardo.netlify.app/)

</div>
