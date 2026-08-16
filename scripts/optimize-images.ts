import fs from 'node:fs'
import path from 'node:path'
import { glob } from 'glob'
import sharp from 'sharp'

const MAX_DIMENSION = 1200 // Max width/height in px for optimal web/mobile loading
const QUALITY = 82 // High quality while reducing file size by 80-90%

async function optimizeImages() {
  console.log('🖼️  Starting image optimization scan...')

  const files = await glob('public/images/**/*.{jpg,jpeg,png}', { ignore: '**/node_modules/**' })

  let totalSavedBytes = 0
  let processedCount = 0

  for (const file of files) {
    const absolutePath = path.resolve(process.cwd(), file)
    const ext = path.extname(absolutePath).toLowerCase()
    const dir = path.dirname(absolutePath)
    const baseName = path.basename(absolutePath, ext)
    const webpPath = path.join(dir, `${baseName}.webp`)

    const stats = fs.statSync(absolutePath)
    const initialSize = stats.size

    try {
      const image = sharp(absolutePath)
      const metadata = await image.metadata()

      const width = metadata.width || 0
      const height = metadata.height || 0

      // Only resize if image is larger than MAX_DIMENSION or uncompressed (> 300KB)
      const needsResize = width > MAX_DIMENSION || height > MAX_DIMENSION
      const isOversized = initialSize > 300 * 1024

      if (needsResize || isOversized || !fs.existsSync(webpPath)) {
        processedCount++
        console.log(`Processing: ${file} (${(initialSize / 1024 / 1024).toFixed(2)} MB, ${width}x${height})`)

        let pipeline = sharp(absolutePath)

        if (needsResize) {
          pipeline = pipeline.resize({
            width: MAX_DIMENSION,
            height: MAX_DIMENSION,
            fit: 'inside',
            withoutEnlargement: true,
          })
        }

        // 1. Generate WebP
        const webpBuffer = await pipeline.clone().webp({ quality: QUALITY, effort: 6 }).toBuffer()
        fs.writeFileSync(webpPath, webpBuffer)

        // 2. Compress original JPEG/PNG in place
        let compressedBuffer: Buffer
        if (ext === '.png') {
          compressedBuffer = await pipeline.clone().png({ quality: QUALITY, compressionLevel: 9 }).toBuffer()
        } else {
          compressedBuffer = await pipeline.clone().jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer()
        }

        fs.writeFileSync(absolutePath, compressedBuffer)

        const finalSize = compressedBuffer.length
        const saved = initialSize - finalSize
        totalSavedBytes += Math.max(0, saved)

        console.log(
          `  └─ Done! JPG: ${(finalSize / 1024).toFixed(1)} KB, WebP: ${(webpBuffer.length / 1024).toFixed(1)} KB (Saved ${(saved / 1024 / 1024).toFixed(2)} MB)`
        )
      }
    } catch (err) {
      console.error(`Failed to process ${file}:`, err)
    }
  }

  console.log(`\n✅ Optimization complete! Processed ${processedCount} images. Total space saved: ${(totalSavedBytes / 1024 / 1024).toFixed(2)} MB.`)
}

// Run script
optimizeImages().catch(console.error)
