/**
 * Removes glass images beyond the first 3 per series from public/glasses/
 * Images to keep: empty, filled (if any), and gallery[0:3] for each series
 */
import { readdirSync, unlinkSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const GLASSES_DIR = join(ROOT, 'public', 'glasses');

const KEEP_FILES = new Set([
  'malta/v0273-malta.png', 'malta/v0277-malta.png', 'malta/v0278-malta.png', 'malta/ambiente-malta-2.png',
  'manhattan/manhattan.png', 'manhattan/manhattan-familia.png', 'manhattan/manhattan-gin.png',
  'margarita/margarita.png', 'margarita/margarita-familia.png', 'margarita/margarita-cocktail.png',
  'mencia/mencia-44.png', 'mencia/mencia-25.png', 'mencia/mencia-31.png',
  'merlot/merlot-42.png', 'merlot/merlot-31.png', 'merlot/merlot-23.png', 'merlot/merlot-19.png',
  'meslier/meslier-17.png', 'meslier/meslier-ambiente.png', 'meslier/meslier-ambiente-2.png',
  'millot/millot-47.png', 'millot/millot-40.png', 'millot/millot-ambiente.png',
  'mirage/mirage-30.png', 'mirage/mirage-27.png', 'mirage/mirage-20.png',
  'mokka/mokka-11.png', 'mokka/mokka-12-9.png', 'mokka/mokka-postre.png',
  'monastrell/monastrell.png', 'monastrell/monastrell-ambiente.png', 'monastrell/monastrell-ambiente-vacio.png',
  'nervion/nervion-29.png', 'nervion/nervion-20.png', 'nervion/nervion-bodegon.png',
  'ouro/ouro-vertical.png', 'ouro/ouro-horizontal.png',
  'piamonte/piamonte-50.png', 'piamonte/piamonte-marianito.png', 'piamonte/piamonte-bodegon.png',
  'pinot/pinot-25.png', 'pinot/pinot-copas.png', 'pinot/pinot-ambiente.png',
  'rioja/rioja-56.png', 'rioja/rioja-56-bodegon.png', 'rioja/rioja-42.png',
  'rocky-stack/rocky-stack-30.png', 'rocky-stack/rocky-stack-28.png', 'rocky-stack/rocky-stack-single.png',
  'rome/rome-65.png', 'rome/rome-bodegon.png', 'rome/rome-65-smoothie.png',
  'roncal/roncal-single.png', 'roncal/roncal-familia.png', 'roncal/roncal-familia-2.png',
  'samara/samara-58.png',
  'Seira/seira family.jpg', 'Seira/Seira ambiente.jpg',
  'SETS - Bodegon/Bodegon_048.jpg', 'SETS - Bodegon/Bodegon_054.jpg', 'SETS - Bodegon/Bodegon_074.jpg', 'SETS - Bodegon/uso licores 3.jpg',
  'Subirats/subirats 17.jpg', 'Subirats/subirats bodegon.jpg', 'Subirats/Ambiente-Subirats.jpg',
  'Syrah/syrah 58.jpg', 'Syrah/syrah 47.jpg', 'Syrah/syrah 35.jpg',
  'sauvignon/sauvignon-58.png', 'sauvignon/sauvignon-44.png', 'sauvignon/sauvignon-35.png',
  'stack-copa/copa-stack-25.png', 'stack-copa/copa-stack-19.png', 'stack-copa/copa-stack-single.png',
  'stack-vaso/vaso-stack-25.png', 'stack-vaso/vaso-stack-18.png', 'stack-vaso/vaso-stack-12.png',
  't-nonic/t-nonic-56.png', 't-nonic/t-nonic-47.png', 't-nonic/t-nonic-28.png',
  't-pinta/t-pinta-33.png', 't-pinta/t-pinta-ambiente.png',
  'txikitero/txikitero-individual.png', 'txikitero/txikitero-vaso.png', 'txikitero/txikitero-bodegon.png',
  'valencia/valencia-23.png', 'valencia/valencia-20.png', 'valencia/valencia-19.png',
  'valon/valon-25.png', 'valon/valon-19.png', 'valon/valon-15.png',
  'vermut/vermut-24.png', 'vermut/vermut-catalog.png', 'vermut/vermut-bodegon.png',
  'vintage/vintage-56.png', 'vintage/vintage-25.png', 'vintage/vintage-20.png',
  'viura/viura-42.png', 'viura/viura-30.png', 'viura/viura-23.png',
  'xarel/xarel-17.png', 'xarel/xarel-catalog.png', 'xarel/xarel-ambiente-2.png',
  'toscana/toscana-62.png', 'toscana/toscana-41.png', 'toscana/toscana-single.png',
]);

function toRelativePath(fullPath) {
  return relative(GLASSES_DIR, fullPath).replace(/\\/g, '/');
}

function isKeep(relPath) {
  if (KEEP_FILES.has(relPath)) return true;
  return false;
}

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

function main() {
  const dryRun = process.argv.includes('--dry-run');
  if (dryRun) console.log('DRY RUN - no files will be deleted\n');

  let deleted = 0;
  let kept = 0;
  for (const filePath of walkDir(GLASSES_DIR)) {
    const rel = toRelativePath(filePath);
    if (isKeep(rel)) {
      kept++;
      if (dryRun) console.log('KEEP:', rel);
    } else {
      if (!dryRun) {
        try {
          unlinkSync(filePath);
          console.log('Deleted:', rel);
          deleted++;
        } catch (e) {
          console.error('Failed to delete', filePath, e.message);
        }
      } else {
        console.log('Would delete:', rel);
        deleted++;
      }
    }
  }
  console.log(`\n${dryRun ? 'Would delete' : 'Deleted'} ${deleted} image(s), kept ${kept}`);
}

main();
