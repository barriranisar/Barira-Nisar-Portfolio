/**
 * Image Analysis Utility:
 * - RGB Histogram generation
 * - Fast k-means clustering for 5 dominant color palette
 */

export interface HistogramData {
  r: number[];
  g: number[];
  b: number[];
  maxBin: number;
}

export interface DominantColor {
  hex: string;
  rgb: [number, number, number];
  percent: number;
}

export interface AnalysisResult {
  histogram: HistogramData;
  palette: DominantColor[];
  luminance: number; // 0 - 100
  colorTemperature: 'Warm' | 'Cool' | 'Neutral';
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.min(255, Math.max(0, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function analyzeImagePixels(imageSrc: string): Promise<AnalysisResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const offscreen = document.createElement('canvas');
        const size = 100; // 100x100 downsampled
        offscreen.width = size;
        offscreen.height = size;
        const ctx = offscreen.getContext('2d', { willReadFrequently: true });

        if (!ctx) {
          reject(new Error('Canvas 2D context unavailable'));
          return;
        }

        ctx.drawImage(img, 0, 0, size, size);
        const imgData = ctx.getImageData(0, 0, size, size);
        const data = imgData.data;

        // 1. Compute RGB Histogram
        const rHist = new Array(256).fill(0);
        const gHist = new Array(256).fill(0);
        const bHist = new Array(256).fill(0);

        let totalR = 0;
        let totalG = 0;
        let totalB = 0;
        let sampledPixelCount = 0;
        const pixels: [number, number, number][] = [];

        for (let i = 0; i < data.length; i += 4) {
          const a = data[i + 3];
          if (a < 128) continue;

          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          rHist[r]++;
          gHist[g]++;
          bHist[b]++;

          totalR += r;
          totalG += g;
          totalB += b;
          sampledPixelCount++;

          // Subsample for fast k-means (take 1 every 2 pixels)
          if (sampledPixelCount % 2 === 0) {
            pixels.push([r, g, b]);
          }
        }

        let maxBin = 1;
        for (let i = 0; i < 256; i++) {
          if (rHist[i] > maxBin) maxBin = rHist[i];
          if (gHist[i] > maxBin) maxBin = gHist[i];
          if (bHist[i] > maxBin) maxBin = bHist[i];
        }

        // 2. K-Means Clustering for 5 Dominant Colors
        const k = 5;
        // Seed centroids evenly
        const centroids: [number, number, number][] = [];
        const step = Math.floor(pixels.length / (k + 1));
        for (let i = 1; i <= k; i++) {
          centroids.push([...(pixels[i * step] || [128, 128, 128])]);
        }

        const counts = new Array(k).fill(0);
        const iterations = 8;

        for (let iter = 0; iter < iterations; iter++) {
          const sums: [number, number, number][] = Array.from({ length: k }, () => [0, 0, 0]);
          counts.fill(0);

          for (let p = 0; p < pixels.length; p++) {
            const [pr, pg, pb] = pixels[p];
            let minDist = Infinity;
            let bestCluster = 0;

            for (let c = 0; c < k; c++) {
              const [cr, cg, cb] = centroids[c];
              const dist = (pr - cr) ** 2 + (pg - cg) ** 2 + (pb - cb) ** 2;
              if (dist < minDist) {
                minDist = dist;
                bestCluster = c;
              }
            }

            sums[bestCluster][0] += pr;
            sums[bestCluster][1] += pg;
            sums[bestCluster][2] += pb;
            counts[bestCluster]++;
          }

          for (let c = 0; c < k; c++) {
            if (counts[c] > 0) {
              centroids[c][0] = Math.round(sums[c][0] / counts[c]);
              centroids[c][1] = Math.round(sums[c][1] / counts[c]);
              centroids[c][2] = Math.round(sums[c][2] / counts[c]);
            }
          }
        }

        // Format and sort palette by popularity
        const totalSampled = counts.reduce((acc, val) => acc + val, 0) || 1;
        const palette: DominantColor[] = centroids
          .map((rgb, idx) => ({
            hex: rgbToHex(rgb[0], rgb[1], rgb[2]),
            rgb,
            percent: Math.round((counts[idx] / totalSampled) * 100)
          }))
          .sort((a, b) => b.percent - a.percent);

        // Compute average luminance & temperature
        const avgR = totalR / (sampledPixelCount || 1);
        const avgG = totalG / (sampledPixelCount || 1);
        const avgB = totalB / (sampledPixelCount || 1);
        const avgLuminance = Math.round((0.299 * avgR + 0.587 * avgG + 0.114 * avgB) / 2.55);

        let colorTemperature: 'Warm' | 'Cool' | 'Neutral' = 'Neutral';
        if (avgR > avgB + 15) {
          colorTemperature = 'Warm';
        } else if (avgB > avgR + 15) {
          colorTemperature = 'Cool';
        }

        resolve({
          histogram: { r: rHist, g: gHist, b: bHist, maxBin },
          palette,
          luminance: avgLuminance,
          colorTemperature
        });
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = (err) => reject(err);
    img.src = imageSrc;
  });
}
