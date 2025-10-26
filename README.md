# Vue 3 Modern Portfolio

A responsive portfolio homepage built with Vue 3 and Tailwind CSS, featuring a minimalist design aesthetic with clean typography, subtle animations, and premium user experience.

## Features

- **Modern Design**: Clean layout with Inter typography and custom color palette
- **Responsive Layout**: Mobile-first design that works perfectly on all devices
- **Smooth Animations**: Fade-in hero section, slide-up project cards, and hover effects
- **Modular Components**: Separate components for navigation, hero, project cards, and footer
- **Intersection Observer**: Scroll-triggered animations for project cards
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation support

## Tech Stack

- **Vue 3** with Composition API
- **Tailwind CSS** for styling
- **Vite** for build tooling
- **PostCSS** and **Autoprefixer** for CSS processing

## Setup Instructions

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone or download the project files**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── NavBar.vue          # Fixed navigation with hamburger menu
│   ├── Hero.vue            # Hero section with fade-in animation
│   ├── ProjectCard.vue     # Individual project cards with scroll animations
│   ├── Footer.vue          # Footer with 4-column layout
│   └── Portfolio.vue       # Main portfolio component
├── App.vue                 # Root component
├── main.js                 # Vue app entry point
└── style.css               # Tailwind CSS imports and custom styles
```

## Customization

### Colors
The project uses a custom color palette defined in `tailwind.config.js`:
- `primary-black`: #000000
- `secondary-gray`: #86868B  
- `border-gray`: #AEAEB2
- `accent-red`: #DC143C
- `dark-bg`: #1D1D1F

### Typography
Uses Inter font family with fallbacks to system fonts.

### Sample Data
Edit the `projects` array in `src/components/Portfolio.vue` to customize your project showcase:

```javascript
const projects = ref([
  {
    id: 1,
    title: 'Your Project Title',
    description: 'Project description...',
    imageUrl: 'path/to/your/image.jpg',
    link: 'https://your-project-link.com'
  }
  // Add more projects...
])
```

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## License

MIT License - feel free to use this template for your own portfolio!
