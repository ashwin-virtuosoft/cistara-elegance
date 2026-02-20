/**
 * Image optimization script using Sharp
 * Compresses JPGs (quality 82%) and PNGs, resizes images > 1920px
 */
import sharp from 'sharp';
import { readdirSync, readFileSync, writeFileSync, renameSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const MAX_WIDTH = 1920;
const JPG_QUALITY = 82;
const PNG_COMPRESSION = 9;

function* walkDir(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkDir(fullPath);
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(entry.name)) {
      yield fullPath;
    }
  }
}

async function optimizeImage(filePath) {
  const lower = filePath.toLowerCase();
  const isJpg = lower.endsWith('.jpg') || lower.endsWith('.jpeg');
  const isPng = lower.endsWith('.png');
  const isWebp = lower.endsWith('.webp');

  if (!isJpg && !isPng && !isWebp) return null;

  try {
    const inputBuffer = readFileSync(filePath, { flag: 'r' });
    let image = sharp(inputBuffer);
    const metadata = await image.metadata();
    const origSize = inputBuffer.length;

    if (metadata.width > MAX_WIDTH) {
      image = image.resize(MAX_WIDTH, null, { withoutEnlargement: true });
    }

    let buffer;
    if (isJpg) {
      buffer = await image.jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toBuffer();
    } else if (isPng) {
      buffer = await image.png({ compressionLevel: PNG_COMPRESSION }).toBuffer();
    } else if (isWebp) {
      buffer = await image.webp({ quality: 85 }).toBuffer();
    } else {
      return null;
    }

    const newSize = buffer.length;
    if (newSize >= origSize) return null;

    const tmpPath = filePath + '.opt';
    writeFileSync(tmpPath, buffer);
    unlinkSync(filePath);
    renameSync(tmpPath, filePath);

    const saved = origSize - newSize;
    const pct = origSize > 0 ? ((saved / origSize) * 100).toFixed(1) : 0;
    return { filePath: filePath.replace(ROOT, ''), origSize, newSize, saved, pct };
  } catch (err) {
    console.error(`Error optimizing ${filePath}:`, err.message);
    return null;
  }
}

async function main() {
  const dirs = [
    join(ROOT, 'src', 'assets'),
    join(ROOT, 'public'),
  ];

  let totalSaved = 0;
  let totalOrig = 0;
  const results = [];

  for (const dir of dirs) {
    try {
      for (const filePath of walkDir(dir)) {
        const result = await optimizeImage(filePath);
        if (result) {
          results.push(result);
          totalOrig += result.origSize;
          totalSaved += result.saved;
        }
      }
    } catch (err) {
      if (err.code === 'ENOENT') continue;
      throw err;
    }
  }

  console.log('\n--- Image optimization results ---\n');
  for (const r of results) {
    console.log(`${r.filePath}: ${(r.origSize / 1024).toFixed(1)} KB → ${(r.newSize / 1024).toFixed(1)} KB (${r.pct}% smaller)`);
  }
  console.log(`\nTotal: ${(totalOrig / 1024 / 1024).toFixed(1)} MB → ${((totalOrig - totalSaved) / 1024 / 1024).toFixed(1)} MB (saved ${(totalSaved / 1024 / 1024).toFixed(1)} MB)`);
}

main().catch(console.error);
