import fs from 'fs'
import path from 'path'
import assert from 'node:assert/strict'
import test from 'node:test'
import { remark } from 'remark'
import remarkLintCurvyTypography from '../index.js'

const invalidMdPath = path.join(import.meta.dirname, 'docs', 'invalid.md')
const validMdPath = path.join(import.meta.dirname, 'docs', 'valid.md')

const invalidMd = fs.readFileSync(invalidMdPath, 'utf8')
const validMd = fs.readFileSync(validMdPath, 'utf8')

test('catch default set of symbols', async () => {
  const result = await remark()
    .use(remarkLintCurvyTypography)
    .process(invalidMd)

  assert.deepEqual(
    result.messages.map(d => d.reason),
    [
      'Found typographic symbols: [↓]',
      'Found typographic symbols: [“ ” “ ” ‘ ’ ’ „ “]',
      'Found typographic symbols: [– — — ′ ″ …]',
      'Found typographic symbols: [•]',
      'Found typographic symbols: [→ ←]'
    ]
  )
})

test('catch default and extra set of symbols', async () => {
  const result = await remark()
    .use(remarkLintCurvyTypography, ['×', '÷', '™', '℃', '℉'])
    .process(invalidMd)

  assert.deepEqual(
    result.messages.map(d => d.reason),
    [
      'Found typographic symbols: [↓]',
      'Found typographic symbols: [“ ” “ ” ‘ ’ ’ „ “]',
      'Found typographic symbols: [– — — ′ ″ …]',
      'Found typographic symbols: [•]',
      'Found typographic symbols: [→ ←]',
      'Found typographic symbols: [× ÷]',
      'Found typographic symbols: [™]',
      'Found typographic symbols: [℃ ℉]'
    ]
  )
})

test('catch all non ASCII symbols', async () => {
  const result = await remark()
    .use(remarkLintCurvyTypography, 'non-ascii')
    .process(invalidMd)

  assert.deepEqual(
    result.messages.map(d => d.reason),
    [
      'Found typographic symbols: [↓]',
      'Found typographic symbols: [“ ” “ ” ‘ ’ ’ „ “]',
      'Found typographic symbols: [– — — ′ ″ …]',
      'Found typographic symbols: [•]',
      'Found typographic symbols: [→ ←]',
      'Found typographic symbols: [\ud83d \ude03 \ud83d \udc81]',
      'Found typographic symbols: [€ × ÷]',
      'Found typographic symbols: [£]',
      'Found typographic symbols: [™]',
      'Found typographic symbols: [℃ ℉]',
      'Found typographic symbols: [é ñ П о к а ç]'
    ]
  )
})

test('wrong options format', async () => {
  const result = await remark()
    .use(remarkLintCurvyTypography, { chars: ['a', 1] })
    .process(invalidMd)

  assert.strictEqual(
    result.messages[0].reason,
    "Wrong options format. Use array of chars, for example: ['±', '“'] or 'non-ascii'"
  )
})

test('no curvy typography', async () => {
  const result = await remark()
    .use(remarkLintCurvyTypography, 'non-ascii')
    .process(validMd)

  assert.strictEqual(result.messages.length, 0)
})
