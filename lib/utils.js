import typographicSymbols from './typographicSymbols.js'

export function getPattern(options) {
  if (options === 'non-ascii') {
    return /[^\x00-\x7F]/g // Non-ASCII regex
  }

  const defaultPattern = typographicSymbols.join('')
  let additionalPattern = ''

  if (Array.isArray(options) && options.length > 0) {
    additionalPattern = options
      .map(char => char.replace(/[\n\r\t\b\f]/g, '')) // Sanitize special symbols
      .join('')
  }

  return new RegExp(`[${defaultPattern}${additionalPattern}]`, 'g')
}

export function isValidOptions(options) {
  if (options === 'non-ascii') {
    return true
  }

  if (Array.isArray(options) && options.every(el => typeof el === 'string')) {
    return true
  }

  return false
}
