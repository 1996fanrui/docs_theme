import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp() {
    if (typeof window !== 'undefined') {
      // When search modal appears, clear any previous input value
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node instanceof HTMLElement && node.classList?.contains('VPLocalSearchBox')) {
              const input = node.querySelector('input')
              if (input) {
                input.value = ''
                input.dispatchEvent(new Event('input', { bubbles: true }))
              }
            }
          }
        }
      })
      observer.observe(document.body, { childList: true })
    }
  },
}
