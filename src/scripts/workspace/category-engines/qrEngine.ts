import qrcode from '../../qrcodegen';

export type QrErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

/**
 * Auto-detects the required QR version (1-40) based on payload length and ECL.
 * The original hardcoded type=4 only handled ~50 chars and would crash silently on longer URLs.
 */
function makeQr(text: string, ecl: QrErrorCorrectionLevel) {
  // typeNumber=0 means "auto" in qrcodegen; if the library doesn't support it,
  // we iterate from 1 up to find the smallest version that fits.
  try {
    const qr = (qrcode as any)(0, ecl);
    qr.addData(text);
    qr.make();
    return qr;
  } catch {
    // Fallback: iterate versions 1-40 until one fits
    for (let v = 1; v <= 40; v++) {
      try {
        const qr = (qrcode as any)(v, ecl);
        qr.addData(text);
        qr.make();
        return qr;
      } catch {
        if (v === 40) throw new Error('QR payload too large for any version');
      }
    }
  }
}

export function generateQrSvg(
  text: string,
  ecl: QrErrorCorrectionLevel = 'M',
  darkColor = '#000000',
  lightColor = '#ffffff'
): string {
  if (!text) return '';
  try {
    const qr = makeQr(text, ecl);
    if (typeof qr.createSvgTag === 'function') {
      let svg: string = qr.createSvgTag(6);
      // Apply custom colors when non-default
      if (darkColor !== '#000000' || lightColor !== '#ffffff') {
        svg = svg.replace(/fill="(#000|black)"/gi, `fill="${darkColor}"`);
        svg = svg.replace(/fill="(#fff|white)"/gi, `fill="${lightColor}"`);
      }
      return svg;
    }
    // Manual SVG fallback for libraries that don't have createSvgTag
    const count: number = qr.getModuleCount();
    const cellSize = 6;
    const size = count * cellSize;
    let cells = '';
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (qr.isDark(r, c)) {
          cells += `<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize}" height="${cellSize}" fill="${darkColor}"/>`;
        }
      }
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" style="background:${lightColor}">${cells}</svg>`;
  } catch {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="60"><rect width="220" height="60" fill="#1e293b" rx="6"/><text x="12" y="36" fill="#ef4444" font-family="monospace" font-size="12">QR Error: input too long</text></svg>`;
  }
}

export function drawQrToCanvas(
  canvas: HTMLCanvasElement,
  text: string,
  ecl: QrErrorCorrectionLevel = 'M',
  scale = 8,
  darkColor = '#000000',
  lightColor = '#ffffff'
): void {
  if (!canvas || !text) return;
  try {
    const qr = makeQr(text, ecl);
    const count: number = qr.getModuleCount();
    canvas.width = count * scale;
    canvas.height = count * scale;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = lightColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = darkColor;
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (qr.isDark(r, c)) {
          ctx.fillRect(c * scale, r * scale, scale, scale);
        }
      }
    }
  } catch (e) {
    console.error('drawQrToCanvas failed:', e);
  }
}

/** Returns a PNG data URL from the canvas for one-click download */
export function exportQrToPng(canvas: HTMLCanvasElement): string {
  try {
    return canvas.toDataURL('image/png');
  } catch {
    return '';
  }
}
