import { lintRule } from 'unified-lint-rule'
import { visit } from 'unist-util-visit'
import { getPattern, isValidOptions } from './lib/utils.js'

function curvyTypography(tree, file, options) {

  // Check options format
  if (options && !isValidOptions(options)) {
    file.fail(
      `Wrong options format. Use array of chars, for example: ['±', '“'] or 'non-ascii'`
    )
    return
  }

  const pattern = getPattern(options)

  visit(tree, 'text', node => {
    const matches = node.value.match(pattern)

    if (matches && matches.length > 0) {
      file.message(`Found typographic symbols: [${matches.join(' ')}]`, node)
    }
  })
}

const remarkLintCurvyTypography = lintRule(
  'remark-lint:curvy-typography',
  curvyTypography
)

export default remarkLintCurvyTypography
