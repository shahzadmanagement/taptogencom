import qrcode from '../../qrcodegen';

export type QrErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export function generateQrSvg(text: string, ecl: QrErrorCorrectionLevel = 'M'): string {
  if (!text) return '';
  try {
    const qr = (qrcode as any)(4, ecl);
    qr.addData(text);
    qr.make();
    return qr.createSvgTag(6);
  } catch (e) {
    return `<svg width="100" height="100"><text x="10" y="50">QR Error</text></svg>`;
  }
}

export function drawQrToCanvas(canvas: HTMLCanvasElement, text: string, ecl: QrErrorCorrectionLevel = 'M', scale: number = 8) {
  if (!canvas || !text) return;
  try {
    const qr = (qrcode as any)(4, ecl);
    qr.addData(text);
    qr.make();

    const count = qr.getModuleCount();
    canvas.width = count * scale;
    canvas.height = count * scale;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#000000';
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (qr.isDark(r, c)) {
          ctx.fillRect(c * scale, r * scale, scale, scale);
        }
      }
    }
  } catch (e) {
    console.error('Failed to draw QR canvas', e);
  }
}
