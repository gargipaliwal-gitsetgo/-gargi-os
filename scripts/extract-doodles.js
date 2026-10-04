import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const DOODLES_DIR = 'src/assets/doodles';

// Define the crops with bounding boxes (normalized or pixel coords based on 960x1280)
const CROPS = [
  // 1. eyes.jpeg
  {
    src: 'eyes.jpeg',
    name: 'eye-01',
    box: { left: 280, top: 560, width: 550, height: 380 },
    variants: ['light', 'dark', 'olive'],
  },
  {
    src: 'eyes.jpeg',
    name: 'eye-02',
    box: { left: 170, top: 10, width: 440, height: 270 },
    variants: ['light', 'dark', 'olive'],
  },
  {
    src: 'eyes.jpeg',
    name: 'eye-03',
    box: { left: 540, top: 240, width: 420, height: 320 },
    variants: ['light', 'dark'],
  },
  {
    src: 'eyes.jpeg',
    name: 'stars-cluster',
    box: { left: 450, top: 400, width: 260, height: 220 },
    variants: ['light', 'dark', 'olive'],
  },

  // 2. butterflies.jpeg
  {
    src: 'butterflies.jpeg',
    name: 'butterfly-01',
    box: { left: 300, top: 950, width: 160, height: 160 },
    variants: ['light', 'dark', 'olive'],
  },
  {
    src: 'butterflies.jpeg',
    name: 'butterfly-02',
    box: { left: 570, top: 960, width: 160, height: 160 },
    variants: ['light', 'dark', 'olive'],
  },
  {
    src: 'butterflies.jpeg',
    name: 'butterfly-03',
    box: { left: 660, top: 1040, width: 220, height: 200 },
    variants: ['light', 'dark', 'olive'],
  },
  {
    src: 'butterflies.jpeg',
    name: 'butterfly-04',
    box: { left: 140, top: 1060, width: 240, height: 200 },
    variants: ['light', 'dark', 'olive'],
  },
  {
    src: 'butterflies.jpeg',
    name: 'eye-cloud',
    box: { left: 210, top: 130, width: 380, height: 180 },
    variants: ['light', 'dark'],
  },
  {
    src: 'butterflies.jpeg',
    name: 'ribcage',
    box: { left: 140, top: 350, width: 700, height: 600 },
    variants: ['light', 'dark'],
  },

  // 3. spidey.jpeg
  {
    src: 'spidey.jpeg',
    name: 'spidey-01',
    box: { left: 390, top: 20, width: 330, height: 260 },
    variants: ['light', 'dark'],
  },
  {
    src: 'spidey.jpeg',
    name: 'spidey-02',
    box: { left: 260, top: 520, width: 350, height: 340 },
    variants: ['light', 'dark', 'olive'],
  },
  {
    src: 'spidey.jpeg',
    name: 'spidey-hand',
    box: { left: 510, top: 220, width: 180, height: 150 },
    variants: ['light', 'dark', 'olive'],
  },
  {
    src: 'spidey.jpeg',
    name: 'spidey-web',
    box: { left: 550, top: 450, width: 210, height: 150 },
    variants: ['light', 'dark'],
  },
  {
    src: 'spidey.jpeg',
    name: 'spidey-spider',
    box: { left: 20, top: 350, width: 180, height: 140 },
    variants: ['light', 'dark'],
  },
  {
    src: 'spidey.jpeg',
    name: 'spidey-speech',
    box: { left: 240, top: 360, width: 270, height: 160 },
    variants: ['light', 'dark'],
  },
  {
    src: 'spidey.jpeg',
    name: 'spidey-rules',
    box: { left: 10, top: 480, width: 320, height: 200 },
    variants: ['light', 'dark'],
  },

  // 4. cute.jpeg
  {
    src: 'cute.jpeg',
    name: 'cute-duo',
    box: { left: 360, top: 440, width: 600, height: 580 },
    variants: ['light', 'dark'],
  },
  {
    src: 'cute.jpeg',
    name: 'cute-flame-eye',
    box: { left: 130, top: 220, width: 440, height: 190 },
    variants: ['light', 'dark', 'olive'],
  },

  // 5. dooodle.jpeg
  {
    src: 'dooodle.jpeg',
    name: 'doodle-mandala',
    box: { left: 0, top: 500, width: 660, height: 480 },
    variants: ['light', 'dark'],
  },
  {
    src: 'dooodle.jpeg',
    name: 'glasses-sketch',
    box: { left: 410, top: 80, width: 370, height: 150 },
    variants: ['light', 'dark'],
  },
  {
    src: 'dooodle.jpeg',
    name: 'laptop-sketch',
    box: { left: 710, top: 200, width: 250, height: 200 },
    variants: ['light', 'dark'],
  },
  {
    src: 'dooodle.jpeg',
    name: 'cse-operations',
    box: { left: 210, top: 240, width: 560, height: 360 },
    variants: ['light', 'dark'],
  },

  // 6. express.jpeg
  {
    src: 'express.jpeg',
    name: 'engineering-express',
    box: { left: 220, top: 20, width: 730, height: 360 },
    variants: ['light', 'dark'],
  },
  {
    src: 'express.jpeg',
    name: 'git-workshop',
    box: { left: 0, top: 460, width: 780, height: 270 },
    variants: ['light', 'dark'],
  },

  // 7. faces.jpeg
  {
    src: 'faces.jpeg',
    name: 'celestial-face',
    box: { left: 80, top: 450, width: 800, height: 430 },
    variants: ['light', 'dark', 'olive'],
  },
  {
    src: 'faces.jpeg',
    name: 'portrait-eye',
    box: { left: 130, top: 80, width: 580, height: 270 },
    variants: ['light', 'dark'],
  },

  // 8. femme.jpeg
  {
    src: 'femme.jpeg',
    name: 'hand-henna',
    box: { left: 40, top: 340, width: 880, height: 400 },
    variants: ['light', 'dark'],
  },
  {
    src: 'femme.jpeg',
    name: 'nonchalant',
    box: { left: 310, top: 150, width: 650, height: 280 },
    variants: ['light', 'dark', 'olive'],
  },

  // 9. heart.jpeg
  {
    src: 'heart.jpeg',
    name: 'heart-01',
    box: { left: 220, top: 20, width: 500, height: 480 },
    variants: ['light', 'dark', 'olive'],
  },
  {
    src: 'heart.jpeg',
    name: 'note-private',
    box: { left: 90, top: 480, width: 860, height: 230 },
    variants: ['light', 'dark'],
  },
  {
    src: 'heart.jpeg',
    name: 'schedule-notes',
    box: { left: 0, top: 680, width: 540, height: 290 },
    variants: ['light', 'dark'],
  },

  // 10. japanese.jpeg
  {
    src: 'japanese.jpeg',
    name: 'japanese-hiragana',
    box: { left: 180, top: 0, width: 780, height: 540 },
    variants: ['light', 'dark'],
  },
  {
    src: 'japanese.jpeg',
    name: 'japanese-grammar',
    box: { left: 0, top: 380, width: 740, height: 580 },
    variants: ['light', 'dark'],
  },

  // 11. japanese1.jpeg
  {
    src: 'japanese1.jpeg',
    name: 'japanese-dialogue',
    box: { left: 0, top: 40, width: 960, height: 940 },
    variants: ['light', 'dark'],
  },

  // 12. random1.jpeg
  {
    src: 'random1.jpeg',
    name: 'cartoon-stern',
    box: { left: 310, top: 50, width: 510, height: 280 },
    variants: ['light', 'dark'],
  },
  {
    src: 'random1.jpeg',
    name: 'cartoon-backpack',
    box: { left: 640, top: 280, width: 310, height: 300 },
    variants: ['light', 'dark'],
  },
  {
    src: 'random1.jpeg',
    name: 'cartoon-bucket-hat',
    box: { left: 450, top: 550, width: 410, height: 390 },
    variants: ['light', 'dark'],
  },
  {
    src: 'random1.jpeg',
    name: 'cartoon-egghead',
    box: { left: 130, top: 280, width: 320, height: 340 },
    variants: ['light', 'dark'],
  },

  // 13. random2.jpeg
  {
    src: 'random2.jpeg',
    name: 'car-mcqueen',
    box: { left: 20, top: 360, width: 520, height: 220 },
    variants: ['light', 'dark'],
  },
  {
    src: 'random2.jpeg',
    name: 'running-figures',
    box: { left: 480, top: 410, width: 340, height: 210 },
    variants: ['light', 'dark'],
  },
  {
    src: 'random2.jpeg',
    name: 'planet-saturn',
    box: { left: 320, top: 310, width: 270, height: 110 },
    variants: ['light', 'dark', 'olive'],
  },
  {
    src: 'random2.jpeg',
    name: 'skull-sketch',
    box: { left: 560, top: 220, width: 160, height: 130 },
    variants: ['light', 'dark'],
  },
  {
    src: 'random2.jpeg',
    name: 'hourglass-sketch',
    box: { left: 790, top: 500, width: 160, height: 240 },
    variants: ['light', 'dark'],
  },
  {
    src: 'random2.jpeg',
    name: 'date-sunday',
    box: { left: 250, top: 70, width: 540, height: 180 },
    variants: ['light', 'dark'],
  },
];

async function extractAll() {
  console.log(`Starting extraction of ${CROPS.length} distinct doodle assets...`);

  for (const crop of CROPS) {
    const filePath = path.join(DOODLES_DIR, crop.src);
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      continue;
    }

    try {
      const input = sharp(filePath).extract(crop.box);
      const { data: orig, info } = await input.clone().raw().toBuffer({ resolveWithObject: true });
      const { width, height, channels } = info;

      // Grayscale luminance
      const lum = new Uint8Array(width * height);
      for (let i = 0, j = 0; i < orig.length; i += channels, j++) {
        lum[j] = Math.round(0.299 * orig[i] + 0.587 * orig[i+1] + 0.114 * orig[i+2]);
      }

      // Fast block dilation to estimate background paper luminance
      const step = 4;
      const radius = 12;
      const dilated = new Uint8Array(width * height);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let maxV = 0;
          for (let dy = -radius; dy <= radius; dy += step) {
            const ny = y + dy;
            if (ny < 0 || ny >= height) continue;
            for (let dx = -radius; dx <= radius; dx += step) {
              const nx = x + dx;
              if (nx < 0 || nx >= width) continue;
              const v = lum[ny * width + nx];
              if (v > maxV) maxV = v;
            }
          }
          dilated[y * width + x] = maxV;
        }
      }

      const blurredBg = await sharp(Buffer.from(dilated), { raw: { width, height, channels: 1 } })
        .blur(14)
        .raw()
        .toBuffer();

      // Compute normalized alpha mask with smooth edge feathering
      // This guarantees NO square edges, rectangular border cuts, or hard box outlines
      const alphas = new Float32Array(width * height);
      const featherRadius = 22; // 22px smooth feathered boundary

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = y * width + x;
          const paper = Math.max(150, blurredBg[i]);
          const val = lum[i];
          const diff = paper - val;
          let a = 0;
          if (diff > 18) {
            a = (diff - 18) / 42;
            if (a > 1) a = 1;
            a = Math.pow(a, 1.15);
          }

          // Smooth edge falloff so strokes dissolve naturally with zero square edges
          const distLeft = x;
          const distRight = width - 1 - x;
          const distTop = y;
          const distBottom = height - 1 - y;
          const minDist = Math.min(distLeft, distRight, distTop, distBottom);

          let edgeFactor = 1;
          if (minDist < featherRadius) {
            const t = minDist / featherRadius;
            // Hermite cubic smoothstep: 3t^2 - 2t^3
            edgeFactor = t * t * (3 - 2 * t);
          }

          alphas[i] = a * edgeFactor;
        }
      }

      // Generate requested color variants
      for (const variant of crop.variants) {
        let outName = `${crop.name}.png`;
        let r = 242, g = 240, b = 232; // Default light: #f2f0e8

        if (variant === 'dark') {
          outName = `${crop.name}-dark.png`;
          r = 24; g = 26; b = 20; // Near-black charcoal
        } else if (variant === 'olive') {
          outName = `${crop.name}-olive.png`;
          r = 124; g = 143; b = 85; // #7c8f55 olive
        }

        const outBuf = Buffer.alloc(width * height * 4);
        for (let i = 0; i < width * height; i++) {
          const o = i * 4;
          outBuf[o] = r;
          outBuf[o+1] = g;
          outBuf[o+2] = b;
          outBuf[o+3] = Math.round(alphas[i] * 255);
        }

        const outPath = path.join(DOODLES_DIR, outName);
        await sharp(outBuf, { raw: { width, height, channels: 4 } })
          .png()
          .toFile(outPath);
      }

      console.log(`✓ Generated: ${crop.name} (${crop.variants.join(', ')})`);
    } catch (err) {
      console.error(`Error processing ${crop.name}:`, err);
    }
  }

  console.log('All doodle extraction complete!');
}

extractAll();
