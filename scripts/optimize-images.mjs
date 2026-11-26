import { access, rm, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(root, '../public')

/** PNG/JPG → AVIF for heavy UI / locations / movement art. */
const targets = [
  'images/ui/navigation-background.png',
  'images/ui/border-vertical.png',
  'images/ui/border-horizontal.png',
  'images/ui/button-background.png',
  'images/ui/logo.png',
  'images/ui/page-background.jpg',
  'images/locations/caves.png',
  'images/locations/forest.png',
  'images/locations/mixed.png',
  'images/locations/settlement.png',
  'images/locations/swamp.png',
  'images/locations/abyss.png',
  'images/movement/back.jpg',
  'images/movement/east.png',
  'images/movement/west.png',
  'images/movement/north.png',
  'images/movement/south.png',
  'images/movement/no-movement.png',
  'images/movement/prev.png',
  'images/movement/next.png',
]

const dead = ['images/logo.png']

const formatBytes = (value) => `${(value / 1024).toFixed(1)} KB`

const exists = async (filePath) => {
  try {
    await access(filePath)
    return true
  } catch {
    return false
  }
}

const convert = async (relative) => {
  const input = path.join(publicDir, relative)
  if (!(await exists(input))) {
    console.log(`skip missing ${relative}`)
    return
  }
  const output = input.replace(/\.(png|jpg|jpeg)$/i, '.avif')
  const before = (await stat(input)).size
  await sharp(input).avif({ quality: 55, effort: 6 }).toFile(output)
  const after = (await stat(output)).size
  await rm(input)
  console.log(
    `${relative} → ${path.basename(output)}  ${formatBytes(before)} → ${formatBytes(after)}`,
  )
}

for (const file of dead) {
  const full = path.join(publicDir, file)
  if (await exists(full)) {
    await rm(full)
    console.log(`removed ${file}`)
  }
}

for (const file of targets) {
  await convert(file)
}

console.log('done')
