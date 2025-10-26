// Scroll prevention utility for modals and overlays
// Handles edge cases and provides better browser compatibility

let scrollPreventionCount = 0
let originalBodyStyle = ''

export const preventBodyScroll = () => {
  scrollPreventionCount++
  
  if (scrollPreventionCount === 1) {
    // Store original body style
    originalBodyStyle = document.body.style.overflow
    
    // Apply scroll prevention
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = getScrollbarWidth() + 'px'
    
    // Also prevent scroll on html element for better compatibility
    document.documentElement.style.overflow = 'hidden'
  }
}

export const restoreBodyScroll = () => {
  scrollPreventionCount = Math.max(0, scrollPreventionCount - 1)
  
  if (scrollPreventionCount === 0) {
    // Restore original styles
    document.body.style.overflow = originalBodyStyle
    document.body.style.paddingRight = ''
    document.documentElement.style.overflow = ''
  }
}

// Get scrollbar width to prevent layout shift
const getScrollbarWidth = () => {
  if (typeof window === 'undefined') return 0
  
  // Create a temporary div to measure scrollbar width
  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.overflow = 'scroll'
  outer.style.msOverflowStyle = 'scrollbar'
  document.body.appendChild(outer)
  
  const inner = document.createElement('div')
  outer.appendChild(inner)
  
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth
  outer.parentNode.removeChild(outer)
  
  return scrollbarWidth
}

// Force restore scroll (useful for cleanup)
export const forceRestoreBodyScroll = () => {
  scrollPreventionCount = 0
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
  document.documentElement.style.overflow = ''
}

// Check if scroll is currently prevented
export const isScrollPrevented = () => {
  return scrollPreventionCount > 0
}
