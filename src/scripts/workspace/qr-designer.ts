import { renderQRCanvas, exportQRCustom, validateQRContrast, QR_PRESETS, type QRDesignerOptions, type QRErrorCorrectionLevel, type QRModuleShape, type QREyeStyle, type QRGradientType } from '../../lib/qr-designer-engine';
import type { ToolConfig } from '../../config';
import { downloadFile } from './downloads';

export function isQRGenerator(slug: string): boolean {
  return slug === 'qr-code-generator' || slug.includes('qr-code');
}

export function bindQRDesigner(config: ToolConfig) {
  if (!isQRGenerator(config.slug) || typeof document === 'undefined') return;

  const workspace = document.getElementById('tool-workspace');
  const inputEl = document.getElementById('tool-input') as HTMLTextAreaElement | null;
  const outputEl = document.getElementById('tool-output');
  if (!workspace || !inputEl || !outputEl) return;

  // Insert QR Customization Toolbar / Designer Panel if not present
  let designerPanel = document.getElementById('qr-designer-panel');
  if (!designerPanel) {
    designerPanel = document.createElement('div');
    designerPanel.id = 'qr-designer-panel';
    designerPanel.style.cssText = `
      margin-top: 16px; margin-bottom: 20px; padding: 20px;
      background: rgba(30, 41, 59, 0.5); border: 1px solid var(--color-border, #334155);
      border-radius: 16px; display: flex; flex-direction: column; gap: 16px; backdrop-filter: blur(12px);
    `;

    const isFr = document.documentElement.lang === 'fr';
    designerPanel.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px;">
        <h4 style="margin: 0; font-size: 1rem; color: #818cf8;">🎨 ${isFr ? 'Design du Code QR' : 'Enterprise QR Designer'}</h4>
        <div style="display: flex; gap: 6px; overflow-x: auto;" id="qr-presets-container">
          <!-- Presets dynamically inserted -->
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
        <!-- Logo Upload -->
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <label style="font-size: 0.8rem; color: #94a3b8;">${isFr ? 'Logo (PNG/SVG)' : 'Center Logo'}</label>
          <input type="file" id="qr-logo-input" accept="image/png,image/jpeg,image/svg+xml" style="font-size: 0.78rem; color: #94a3b8;" />
        </div>

        <!-- Foreground Color -->
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <label style="font-size: 0.8rem; color: #94a3b8;">${isFr ? 'Couleur Principale' : 'Foreground Color'}</label>
          <input type="color" id="qr-fg-color" value="#000000" style="width: 100%; height: 36px; border: none; border-radius: 8px; cursor: pointer; background: transparent;" />
        </div>

        <!-- Background Color -->
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <label style="font-size: 0.8rem; color: #94a3b8;">${isFr ? 'Arrière-plan' : 'Background Color'}</label>
          <div style="display: flex; gap: 8px;">
            <input type="color" id="qr-bg-color" value="#ffffff" style="flex: 1; height: 36px; border: none; border-radius: 8px; cursor: pointer; background: transparent;" />
            <label style="font-size: 0.75rem; color: #94a3b8; display: flex; align-items: center; gap: 4px;">
              <input type="checkbox" id="qr-transparent-bg" /> ${isFr ? 'Transpar.' : 'Transp.'}
            </label>
          </div>
        </div>

        <!-- Module Shape -->
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <label style="font-size: 0.8rem; color: #94a3b8;">${isFr ? 'Forme des Modules' : 'Module Shape'}</label>
          <select id="qr-module-shape" style="padding: 8px; border-radius: 8px; background: #0f172a; border: 1px solid #334155; color: #fff; font-size: 0.82rem;">
            <option value="square">Square</option>
            <option value="rounded">Rounded</option>
            <option value="dots">Dots</option>
          </select>
        </div>

        <!-- Eye Style -->
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <label style="font-size: 0.8rem; color: #94a3b8;">${isFr ? 'Style des Yeux' : 'Eye Style'}</label>
          <select id="qr-eye-style" style="padding: 8px; border-radius: 8px; background: #0f172a; border: 1px solid #334155; color: #fff; font-size: 0.82rem;">
            <option value="square">Square Eye</option>
            <option value="rounded">Rounded Eye</option>
            <option value="circle">Circle Eye</option>
          </select>
        </div>

        <!-- Error Correction Level -->
        <div style="display: flex; flex-direction: column; gap: 6px;">
          <label style="font-size: 0.8rem; color: #94a3b8;">${isFr ? 'Correction d\'Erreur' : 'Error Correction'}</label>
          <select id="qr-ecc-level" style="padding: 8px; border-radius: 8px; background: #0f172a; border: 1px solid #334155; color: #fff; font-size: 0.82rem;">
            <option value="L">L (7%)</option>
            <option value="M">M (15%)</option>
            <option value="Q">Q (25%)</option>
            <option value="H" selected>H (30% - Best for Logo)</option>
          </select>
        </div>
      </div>

      <!-- Scannability Contrast Warning -->
      <div id="qr-contrast-warning" style="display: none; padding: 10px 14px; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; font-size: 0.8rem; color: #f87171;"></div>

      <!-- Custom Exporters -->
      <div style="display: flex; gap: 8px; flex-wrap: wrap; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 12px; align-items: center;">
        <span style="font-size: 0.8rem; color: #94a3b8; margin-right: auto;">${isFr ? 'Export Haute Résolution :' : 'High Res Export:'}</span>
        <button type="button" id="btn-export-png-1k" class="btn btn-ghost" style="padding: 6px 12px; font-size: 0.8rem; border-radius: 8px;">🖼 PNG 1K</button>
        <button type="button" id="btn-export-png-4k" class="btn btn-primary" style="padding: 6px 12px; font-size: 0.8rem; border-radius: 8px;">✨ PNG 4K</button>
        <button type="button" id="btn-export-svg" class="btn btn-ghost" style="padding: 6px 12px; font-size: 0.8rem; border-radius: 8px;">📐 SVG</button>
        <button type="button" id="btn-export-webp" class="btn btn-ghost" style="padding: 6px 12px; font-size: 0.8rem; border-radius: 8px;">🌐 WEBP</button>
        <button type="button" id="btn-export-pdf" class="btn btn-ghost" style="padding: 6px 12px; font-size: 0.8rem; border-radius: 8px;">📄 PDF</button>
      </div>
    `;

    const inputArea = document.getElementById('tool-input');
    if (inputArea && inputArea.parentNode) {
      inputArea.parentNode.insertBefore(designerPanel, inputArea.nextSibling);
    }
  }

  // Populate Presets Buttons
  const presetContainer = document.getElementById('qr-presets-container');
  if (presetContainer && presetContainer.children && presetContainer.children.length === 0) {
    Object.keys(QR_PRESETS).forEach(pName => {
      const pBtn = document.createElement('button');
      pBtn.type = 'button';
      pBtn.className = 'btn btn-ghost';
      pBtn.style.cssText = 'padding: 3px 8px; font-size: 0.72rem; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); text-transform: capitalize;';
      pBtn.textContent = pName;
      pBtn.addEventListener('click', () => {
        applyPreset(pName);
      });
      presetContainer.appendChild(pBtn);
    });
  }

  let logoUrl: string | undefined = undefined;

  // Logo file upload handler
  document.getElementById('qr-logo-input')?.addEventListener('change', (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        logoUrl = evt.target?.result as string;
        updatePreviewCanvas();
      };
      reader.readAsDataURL(file);
    }
  });

  const getOptions = (overrideSize: number = 512): QRDesignerOptions => {
    const fgColor = (document.getElementById('qr-fg-color') as HTMLInputElement)?.value || '#000000';
    const isTransp = (document.getElementById('qr-transparent-bg') as HTMLInputElement)?.checked;
    const bgColor = isTransp ? 'transparent' : ((document.getElementById('qr-bg-color') as HTMLInputElement)?.value || '#ffffff');
    const moduleShape = ((document.getElementById('qr-module-shape') as HTMLSelectElement)?.value as QRModuleShape) || 'square';
    const eyeStyle = ((document.getElementById('qr-eye-style') as HTMLSelectElement)?.value as QREyeStyle) || 'square';
    const ecc = ((document.getElementById('qr-ecc-level') as HTMLSelectElement)?.value as QRErrorCorrectionLevel) || 'H';

    return {
      text: inputEl.value || 'https://taptogen.com',
      ecc,
      size: overrideSize,
      fgColor,
      bgColor,
      gradientType: 'none',
      gradientColorStop: '#4f46e5',
      moduleShape,
      eyeStyle,
      logoUrl,
      margin: 2
    };
  };

  const updatePreviewCanvas = async () => {
    const opts = getOptions(512);

    // Validate Contrast
    const contrast = validateQRContrast(opts.fgColor, opts.bgColor);
    const warnEl = document.getElementById('qr-contrast-warning');
    if (warnEl) {
      if (!contrast.passes && contrast.warning) {
        warnEl.style.display = 'block';
        warnEl.textContent = `⚠️ ${contrast.warning} (Contrast Ratio: ${contrast.ratio.toFixed(2)})`;
      } else {
        warnEl.style.display = 'none';
      }
    }

    const canvas = await renderQRCanvas(opts);
    if (!canvas) return;

    // Render Canvas into workspace output
    outputEl.innerHTML = '';
    canvas.style.cssText = 'max-width: 100%; height: auto; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);';
    outputEl.appendChild(canvas);
  };

  const applyPreset = (name: string) => {
    const p = QR_PRESETS[name];
    if (!p) return;

    if (p.fgColor) (document.getElementById('qr-fg-color') as HTMLInputElement).value = p.fgColor;
    if (p.bgColor) (document.getElementById('qr-bg-color') as HTMLInputElement).value = p.bgColor;
    if (p.moduleShape) (document.getElementById('qr-module-shape') as HTMLSelectElement).value = p.moduleShape;
    if (p.eyeStyle) (document.getElementById('qr-eye-style') as HTMLSelectElement).value = p.eyeStyle;
    if (p.ecc) (document.getElementById('qr-ecc-level') as HTMLSelectElement).value = p.ecc;

    updatePreviewCanvas();
  };

  // Attach Input Listeners for Instant Live Preview
  ['qr-fg-color', 'qr-bg-color', 'qr-transparent-bg', 'qr-module-shape', 'qr-eye-style', 'qr-ecc-level'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', updatePreviewCanvas);
    document.getElementById(id)?.addEventListener('input', updatePreviewCanvas);
  });

  inputEl.addEventListener('input', updatePreviewCanvas);

  // Exporters
  document.getElementById('btn-export-png-1k')?.addEventListener('click', async () => {
    const res = await exportQRCustom(getOptions(1024), 'png', 1024);
    downloadFile(await res.blob.text(), res.filename, 'image/png');
  });

  document.getElementById('btn-export-png-4k')?.addEventListener('click', async () => {
    const res = await exportQRCustom(getOptions(4096), 'png', 4096);
    downloadFile(await res.blob.text(), res.filename, 'image/png');
  });

  document.getElementById('btn-export-svg')?.addEventListener('click', async () => {
    const res = await exportQRCustom(getOptions(1024), 'svg', 1024);
    downloadFile(await res.blob.text(), res.filename, 'image/svg+xml');
  });

  document.getElementById('btn-export-webp')?.addEventListener('click', async () => {
    const res = await exportQRCustom(getOptions(1024), 'webp', 1024);
    downloadFile(await res.blob.text(), res.filename, 'image/webp');
  });

  document.getElementById('btn-export-pdf')?.addEventListener('click', async () => {
    const res = await exportQRCustom(getOptions(1024), 'pdf', 1024);
    downloadFile(await res.blob.text(), res.filename, 'application/pdf');
  });

  // Initial Preview Draw
  updatePreviewCanvas();
}
