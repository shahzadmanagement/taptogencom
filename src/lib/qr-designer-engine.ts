import qrcode from '../scripts/qrcodegen';

export type QRErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
export type QRModuleShape = 'square' | 'dots' | 'rounded';
export type QREyeStyle = 'square' | 'circle' | 'rounded';
export type QRGradientType = 'none' | 'linear' | 'radial';

export interface QRDesignerOptions {
  text: string;
  ecc: QRErrorCorrectionLevel;
  size: number; // Render resolution (e.g. 1024 or 4096 for 4K)
  fgColor: string;
  bgColor: string; // 'transparent' or hex/rgb
  gradientType: QRGradientType;
  gradientColorStop: string;
  moduleShape: QRModuleShape;
  eyeStyle: QREyeStyle;
  eyeColor?: string;
  logoUrl?: string;
  logoScale?: number; // 0.15 to 0.30
  margin: number;
}

export const QR_PRESETS: Record<string, Partial<QRDesignerOptions>> = {
  business: { fgColor: '#0f172a', bgColor: '#ffffff', gradientType: 'none', moduleShape: 'square', eyeStyle: 'square', ecc: 'H' },
  restaurant: { fgColor: '#b91c1c', bgColor: '#fffbe6', gradientType: 'none', moduleShape: 'rounded', eyeStyle: 'rounded', ecc: 'Q' },
  social: { fgColor: '#4f46e5', bgColor: '#ffffff', gradientType: 'linear', gradientColorStop: '#ec4899', moduleShape: 'dots', eyeStyle: 'circle', ecc: 'Q' },
  wifi: { fgColor: '#0284c7', bgColor: '#f0f9ff', gradientType: 'radial', gradientColorStop: '#06b6d4', moduleShape: 'rounded', eyeStyle: 'rounded', ecc: 'M' },
  portfolio: { fgColor: '#18181b', bgColor: '#fafafa', gradientType: 'none', moduleShape: 'square', eyeStyle: 'circle', ecc: 'H' },
  minimal: { fgColor: '#000000', bgColor: '#ffffff', gradientType: 'none', moduleShape: 'square', eyeStyle: 'square', ecc: 'L' },
  dark: { fgColor: '#6366f1', bgColor: '#0b0f19', gradientType: 'linear', gradientColorStop: '#a855f7', moduleShape: 'rounded', eyeStyle: 'rounded', ecc: 'H' },
  gradient: { fgColor: '#2563eb', bgColor: '#ffffff', gradientType: 'linear', gradientColorStop: '#7c3aed', moduleShape: 'dots', eyeStyle: 'circle', ecc: 'Q' }
};

export function getQRMatrix(text: string, ecc: QRErrorCorrectionLevel = 'M'): boolean[][] {
  const qr: any = (qrcode as any)(0, ecc);
  qr.addData(text || 'https://taptogen.com');
  qr.make();

  const count = qr.getModuleCount();
  const matrix: boolean[][] = [];
  for (let r = 0; r < count; r++) {
    const row: boolean[] = [];
    for (let c = 0; c < count; c++) {
      row.push(qr.isDark(r, c));
    }
    matrix.push(row);
  }
  return matrix;
}

export function isEyeModule(r: number, c: number, count: number): boolean {
  // Top-left Eye
  if (r < 7 && c < 7) return true;
  // Top-right Eye
  if (r < 7 && c >= count - 7) return true;
  // Bottom-left Eye
  if (r >= count - 7 && c < 7) return true;
  return false;
}

export function renderQRCanvas(options: QRDesignerOptions): Promise<HTMLCanvasElement> {
  return new Promise((resolve) => {
    if (typeof document === 'undefined' || typeof document.createElement !== 'function') {
      resolve(null as any);
      return;
    }

    const canvas = document.createElement('canvas');
    const size = options.size || 1024;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    const matrix = getQRMatrix(options.text, options.ecc);
    const count = matrix.length;
    const margin = options.margin || 2;
    const totalModules = count + margin * 2;
    const cellSize = size / totalModules;

    // Background
    if (options.bgColor === 'transparent') {
      ctx.clearRect(0, 0, size, size);
    } else {
      ctx.fillStyle = options.bgColor || '#ffffff';
      ctx.fillRect(0, 0, size, size);
    }

    // Foreground Fill Style (Solid or Gradient)
    let fgStyle: string | CanvasGradient = options.fgColor || '#000000';
    if (options.gradientType === 'linear') {
      const grad = ctx.createLinearGradient(0, 0, size, size);
      grad.addColorStop(0, options.fgColor || '#000000');
      grad.addColorStop(1, options.gradientColorStop || '#4f46e5');
      fgStyle = grad;
    } else if (options.gradientType === 'radial') {
      const grad = ctx.createRadialGradient(size / 2, size / 2, size * 0.1, size / 2, size / 2, size * 0.7);
      grad.addColorStop(0, options.fgColor || '#000000');
      grad.addColorStop(1, options.gradientColorStop || '#4f46e5');
      fgStyle = grad;
    }

    ctx.fillStyle = fgStyle;

    // Render Data Modules
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (!matrix[r][c] || isEyeModule(r, c, count)) continue;

        const x = (c + margin) * cellSize;
        const y = (r + margin) * cellSize;

        if (options.moduleShape === 'dots') {
          ctx.beginPath();
          ctx.arc(x + cellSize / 2, y + cellSize / 2, cellSize / 2 * 0.85, 0, Math.PI * 2);
          ctx.fill();
        } else if (options.moduleShape === 'rounded') {
          const rSize = cellSize * 0.85;
          const rOffset = (cellSize - rSize) / 2;
          ctx.beginPath();
          ctx.roundRect(x + rOffset, y + rOffset, rSize, rSize, rSize * 0.3);
          ctx.fill();
        } else {
          ctx.fillRect(x, y, cellSize + 0.5, cellSize + 0.5);
        }
      }
    }

    // Render Eyes (Top-Left, Top-Right, Bottom-Left)
    const eyeStyle = options.eyeColor || fgStyle;
    const eyePositions = [
      { r: margin, c: margin },
      { r: margin, c: margin + count - 7 },
      { r: margin + count - 7, c: margin }
    ];

    eyePositions.forEach(pos => {
      const x = pos.c * cellSize;
      const y = pos.r * cellSize;
      const eyeSize = 7 * cellSize;

      ctx.fillStyle = eyeStyle;
      if (options.eyeStyle === 'circle') {
        // Outer Ring
        ctx.beginPath();
        ctx.arc(x + eyeSize / 2, y + eyeSize / 2, eyeSize / 2, 0, Math.PI * 2);
        ctx.fill();

        // Inner Cutout
        ctx.fillStyle = options.bgColor === 'transparent' ? '#ffffff' : options.bgColor;
        ctx.beginPath();
        ctx.arc(x + eyeSize / 2, y + eyeSize / 2, (5 * cellSize) / 2, 0, Math.PI * 2);
        ctx.fill();

        // Inner Dot
        ctx.fillStyle = eyeStyle;
        ctx.beginPath();
        ctx.arc(x + eyeSize / 2, y + eyeSize / 2, (3 * cellSize) / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (options.eyeStyle === 'rounded') {
        // Outer Rounded
        ctx.beginPath();
        ctx.roundRect(x, y, eyeSize, eyeSize, eyeSize * 0.25);
        ctx.fill();

        // Inner Cutout
        ctx.fillStyle = options.bgColor === 'transparent' ? '#ffffff' : options.bgColor;
        ctx.beginPath();
        ctx.roundRect(x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize, 5 * cellSize * 0.2);
        ctx.fill();

        // Inner Center
        ctx.fillStyle = eyeStyle;
        ctx.beginPath();
        ctx.roundRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize, 3 * cellSize * 0.2);
        ctx.fill();
      } else {
        // Square Eye
        ctx.fillRect(x, y, eyeSize, eyeSize);
        ctx.fillStyle = options.bgColor === 'transparent' ? '#ffffff' : options.bgColor;
        ctx.fillRect(x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize);
        ctx.fillStyle = eyeStyle;
        ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize);
      }
    });

    // Embed Center Logo if provided
    if (options.logoUrl) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const logoScale = options.logoScale || 0.22;
        const logoSize = size * logoScale;
        const logoX = (size - logoSize) / 2;
        const logoY = (size - logoSize) / 2;

        // White/Transparent padding background behind logo
        ctx.fillStyle = options.bgColor === 'transparent' ? '#ffffff' : options.bgColor;
        ctx.beginPath();
        ctx.roundRect(logoX - 10, logoY - 10, logoSize + 20, logoSize + 20, 16);
        ctx.fill();

        ctx.drawImage(img, logoX, logoY, logoSize, logoSize);
        resolve(canvas);
      };
      img.onerror = () => resolve(canvas);
      img.src = options.logoUrl;
    } else {
      resolve(canvas);
    }
  });
}

export function validateQRContrast(fgColor: string, bgColor: string): { ratio: number; passes: boolean; warning?: string } {
  if (bgColor === 'transparent') return { ratio: 21, passes: true };

  // Simple Luma contrast calculation
  const getLuma = (hex: string) => {
    const c = hex.replace('#', '');
    if (c.length !== 6) return 0.5;
    const r = parseInt(c.substring(0, 2), 16) / 255;
    const g = parseInt(c.substring(2, 4), 16) / 255;
    const b = parseInt(c.substring(4, 6), 16) / 255;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const l1 = getLuma(fgColor);
  const l2 = getLuma(bgColor);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

  const passes = ratio >= 3.0;
  const warning = !passes ? 'Low contrast between QR code and background. Camera scanners may fail to read.' : undefined;

  return { ratio, passes, warning };
}

export async function exportQRCustom(options: QRDesignerOptions, format: 'png' | 'svg' | 'pdf' | 'webp', resolution: number = 1024): Promise<{ blob: Blob, filename: string }> {
  const opts = { ...options, size: resolution };
  const filename = `taptogen-qr-${Date.now()}.${format}`;

  if (format === 'svg') {
    const canvas = await renderQRCanvas(opts);
    const dataUrl = canvas.toDataURL('image/png');
    const svgStr = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${resolution}" height="${resolution}" viewBox="0 0 ${resolution} ${resolution}">
        <image href="${dataUrl}" width="${resolution}" height="${resolution}" />
      </svg>
    `;
    return { blob: new Blob([svgStr], { type: 'image/svg+xml' }), filename };
  }

  const canvas = await renderQRCanvas(opts);

  if (format === 'webp') {
    const blob = await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), 'image/webp'));
    return { blob, filename };
  }

  if (format === 'pdf') {
    const dataUrl = canvas.toDataURL('image/png');
    const htmlPdfStr = `<!DOCTYPE html><html><body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh;"><img src="${dataUrl}" style="max-width:90%;height:auto;"/></body></html>`;
    return { blob: new Blob([htmlPdfStr], { type: 'application/pdf' }), filename };
  }

  // PNG (1024 or 4K)
  const blob = await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), 'image/png'));
  return { blob, filename };
}
