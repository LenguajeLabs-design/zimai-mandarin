import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const outputPath = resolve(dirname(fileURLToPath(import.meta.url)), '../src/content/hskVocabulary.json')
const sourceUrl = 'https://hskhsk.com/word-lists'
const baseUrl = 'https://raw.githubusercontent.com/glxxyz/hskhsk.com/main/data/lists/HSK%20Official%20With%20Definitions%202012%20L'
const levels = [1, 2, 3, 4, 5, 6]

async function importLevel(level) {
  const response = await fetch(`${baseUrl}${level}.txt`)
  if (!response.ok) throw new Error(`Could not download HSK ${level}: ${response.status} ${response.statusText}`)

  const text = (await response.text()).replace(/^\uFEFF/, '')
  const words = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean).map((line, index) => {
    const [hanzi, traditional, pinyinNumbered, pinyin, ...glossParts] = line.split('\t')
    const gloss = glossParts.join(' ').trim()
    if (!hanzi || !traditional || !pinyin || !gloss) throw new Error(`Unexpected HSK ${level} row ${index + 1}: ${line}`)
    return { id: `hsk-${level}-${String(index + 1).padStart(4, '0')}`, hanzi, traditional, pinyinNumbered, pinyin, gloss, hskLevel: level }
  })

  return { level, words }
}

const imported = await Promise.all(levels.map(importLevel))
const data = {
  source: {
    name: 'HSK Official With Definitions 2012',
    attribution: 'Alan Davies / HSK东西',
    url: sourceUrl,
    license: 'Non-commercial use with attribution; commercial use requires permission from the original author.',
    retrievedAt: new Date().toISOString().slice(0, 10),
  },
  levels: imported,
}

await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')

const total = imported.reduce((count, level) => count + level.words.length, 0)
console.log(`Imported ${total} HSK words across ${levels.length} levels into ${outputPath}`)
