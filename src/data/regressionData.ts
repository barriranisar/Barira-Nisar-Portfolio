export interface RegressionPoint {
  id: number;
  x: number; // 0 to 100
  y: number; // 0 to 100
  label?: string;
}

export interface ModelMetrics {
  slope: number;
  intercept: number;
  r2: number;
  mse: number;
  correlation: number;
}

// Environmental AQI calibration dataset (PM2.5 Sensor Voltage vs Calculated AQI)
export const initialRegressionPoints: RegressionPoint[] = [
  { id: 1, x: 14, y: 20, label: 'Sensor 01' },
  { id: 2, x: 26, y: 34, label: 'Sensor 02' },
  { id: 3, x: 38, y: 44, label: 'Sensor 03' },
  { id: 4, x: 50, y: 60, label: 'Sensor 04' },
  { id: 5, x: 64, y: 70, label: 'Sensor 05' },
  { id: 6, x: 76, y: 82, label: 'Sensor 06' },
  { id: 7, x: 88, y: 95, label: 'Sensor 07' }
];

export function calculateLinearRegression(points: RegressionPoint[]): ModelMetrics {
  const n = points.length;
  if (n < 2) {
    return { slope: 0, intercept: 0, r2: 0, mse: 0, correlation: 0 };
  }

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  let sumY2 = 0;

  for (const pt of points) {
    sumX += pt.x;
    sumY += pt.y;
    sumXY += pt.x * pt.y;
    sumX2 += pt.x * pt.x;
    sumY2 += pt.y * pt.y;
  }

  const denominator = n * sumX2 - sumX * sumX;
  if (Math.abs(denominator) < 1e-7) {
    return { slope: 0, intercept: sumY / n, r2: 0, mse: 0, correlation: 0 };
  }

  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;

  // Compute R2 and MSE
  const meanY = sumY / n;
  let ssTot = 0;
  let ssRes = 0;

  for (const pt of points) {
    const yPred = slope * pt.x + intercept;
    ssTot += Math.pow(pt.y - meanY, 2);
    ssRes += Math.pow(pt.y - yPred, 2);
  }

  const r2 = ssTot === 0 ? 1 : Math.max(0, Math.min(1, 1 - ssRes / ssTot));
  const mse = ssRes / n;

  const numeratorCorr = n * sumXY - sumX * sumY;
  const denomCorr = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  const correlation = denomCorr === 0 ? 0 : numeratorCorr / denomCorr;

  return { slope, intercept, r2, mse, correlation };
}
