import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './style.css'
import '../../visual-components/styles/ave-bridge.css'

import AveGrid from '../../visual-components/components/AveGrid.vue'
import AveCard from '../../visual-components/components/AveCard.vue'
import AveCompareTable from '../../visual-components/components/AveCompareTable.vue'
import AveCodeblock from '../../visual-components/components/AveCodeblock.vue'
import AveForkDecision from '../../visual-components/components/AveForkDecision.vue'
import AveFlowContrast from '../../visual-components/components/AveFlowContrast.vue'
import AveParallelIsolated from '../../visual-components/components/AveParallelIsolated.vue'
import AveInstance from '../../visual-components/components/AveInstance.vue'
import AveLifecycleRing from '../../visual-components/components/AveLifecycleRing.vue'
import AveNode from '../../visual-components/components/AveNode.vue'
import AveVerticalList from '../../visual-components/components/AveVerticalList.vue'
import AveListItem from '../../visual-components/components/AveListItem.vue'
import AveNestedBoundary from '../../visual-components/components/AveNestedBoundary.vue'
import AveBoundaryItem from '../../visual-components/components/AveBoundaryItem.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('AveGrid', AveGrid)
    app.component('AveCard', AveCard)
    app.component('AveCompareTable', AveCompareTable)
    app.component('AveCodeblock', AveCodeblock)
    app.component('AveForkDecision', AveForkDecision)
    app.component('AveFlowContrast', AveFlowContrast)
    app.component('AveParallelIsolated', AveParallelIsolated)
    app.component('AveInstance', AveInstance)
    app.component('AveLifecycleRing', AveLifecycleRing)
    app.component('AveNode', AveNode)
    app.component('AveVerticalList', AveVerticalList)
    app.component('AveListItem', AveListItem)
    app.component('AveNestedBoundary', AveNestedBoundary)
    app.component('AveBoundaryItem', AveBoundaryItem)

    // When search modal appears, clear any previous input value
    if (typeof window !== 'undefined') {
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
} satisfies Theme
