export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPriceHT: number;
  tvaRate: number; // 0, 0.021, 0.055, 0.10, 0.20
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  // Issuer (freelancer / company)
  issuerName?: string;
  issuerAddress?: string;
  issuerSiret?: string;
  issuerIban?: string;
  // Client
  clientName: string;
  clientAddress?: string;
  siret?: string;
  isAutoEntrepreneur: boolean; // Article 293 B du CGI
  items: InvoiceLineItem[];
  currency?: string; // e.g. 'EUR', 'USD', 'GBP' — defaults to EUR (€)
}

export interface InvoiceCalculation {
  totalHTCents: number;
  totalTVACents: number;
  totalTTCCents: number;
  tvaBreakdownCents: Record<number, number>;
  // Convenience rounded floats for display
  totalHT: number;
  totalTVA: number;
  totalTTC: number;
}

const CURRENCY_SYMBOLS: Record<string, string> = {
  EUR: '€', USD: '$', GBP: '£', CAD: 'CA$', CHF: 'CHF', AUD: 'A$'
};

/**
 * All math is done in integer cents to avoid floating-point rounding errors
 * (e.g. 0.1 + 0.2 = 0.30000000000000004 in IEEE-754).
 */
export function calculateInvoiceTotals(
  items: InvoiceLineItem[],
  isAutoEntrepreneur = false
): InvoiceCalculation {
  let totalHTCents = 0;
  let totalTVACents = 0;
  const tvaBreakdownCents: Record<number, number> = {};

  for (const item of items) {
    // Round each line to nearest cent before accumulating
    const lineHTCents = Math.round(item.quantity * item.unitPriceHT * 100);
    totalHTCents += lineHTCents;

    if (!isAutoEntrepreneur && item.tvaRate > 0) {
      const lineTVACents = Math.round(lineHTCents * item.tvaRate);
      totalTVACents += lineTVACents;
      tvaBreakdownCents[item.tvaRate] = (tvaBreakdownCents[item.tvaRate] || 0) + lineTVACents;
    }
  }

  const totalTTCCents = isAutoEntrepreneur ? totalHTCents : totalHTCents + totalTVACents;

  return {
    totalHTCents,
    totalTVACents,
    totalTTCCents,
    tvaBreakdownCents,
    totalHT: totalHTCents / 100,
    totalTVA: totalTVACents / 100,
    totalTTC: totalTTCCents / 100
  };
}

export function renderInvoiceA4HTML(data: InvoiceData, _isFr = true): string {
  const calc = calculateInvoiceTotals(data.items, data.isAutoEntrepreneur);
  const sym = CURRENCY_SYMBOLS[data.currency || 'EUR'] ?? (data.currency || '€');
  const fmt = (cents: number) => (cents / 100).toFixed(2) + ' ' + sym;
  const fmtF = (n: number) => n.toFixed(2) + ' ' + sym;

  const issuerBlock = (data.issuerName || data.issuerAddress || data.issuerSiret)
    ? `<div>
        ${data.issuerName ? `<p style="margin:0 0 2px;font-weight:700;color:#0f172a;">${data.issuerName}</p>` : ''}
        ${data.issuerAddress ? `<p style="margin:0 0 2px;color:#475569;">${data.issuerAddress}</p>` : ''}
        ${data.issuerSiret ? `<p style="margin:0;font-size:0.82rem;color:#64748b;">SIRET : ${data.issuerSiret}</p>` : ''}
        ${data.issuerIban ? `<p style="margin:0;font-size:0.82rem;color:#64748b;">IBAN : ${data.issuerIban}</p>` : ''}
      </div>`
    : '<div style="color:#94a3b8;font-size:0.82rem;">(No issuer details provided)</div>';

  const tvaRows = !data.isAutoEntrepreneur
    ? Object.entries(calc.tvaBreakdownCents).map(([rate, cents]) =>
        `<div style="display:flex;justify-content:space-between;padding:4px 0;font-size:0.85rem;color:#475569;">
          <span>TVA ${(Number(rate) * 100).toFixed(1)}% :</span>
          <span>${fmt(cents)}</span>
        </div>`
      ).join('')
    : '';

  return `<div class="invoice-a4-document" style="font-family:Arial,sans-serif;padding:30px;background:#ffffff;color:#1e293b;border-radius:10px;border:1px solid #cbd5e1;max-width:820px;margin:0 auto;box-shadow:0 4px 24px rgba(0,0,0,.06);">
  <!-- Header -->
  <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2.5px solid #3b82f6;padding-bottom:20px;margin-bottom:24px;gap:16px;flex-wrap:wrap;">
    <div>
      <h2 style="margin:0 0 6px;color:#1e3a8a;font-size:1.6rem;letter-spacing:-.5px;">INVOICE</h2>
      <p style="margin:2px 0;font-weight:700;color:#334155;">No. ${data.invoiceNumber || 'INV-2026-001'}</p>
      <p style="margin:0;color:#64748b;font-size:0.9rem;">Date: ${data.date || new Date().toLocaleDateString('en-GB')}</p>
    </div>
    <div style="text-align:right;">
      <p style="margin:0 0 2px;font-size:0.78rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.5px;">From</p>
      ${issuerBlock}
    </div>
  </div>

  <!-- Bill To -->
  <div style="background:#f8fafc;border-radius:8px;padding:14px 18px;margin-bottom:24px;border-left:3px solid #3b82f6;">
    <p style="margin:0 0 4px;font-size:0.78rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.5px;">Bill To</p>
    <p style="margin:0 0 2px;font-weight:700;color:#0f172a;">${data.clientName || 'Client Name'}</p>
    ${data.clientAddress ? `<p style="margin:0 0 2px;color:#475569;font-size:0.9rem;">${data.clientAddress}</p>` : ''}
    ${data.siret ? `<p style="margin:0;font-size:0.82rem;color:#64748b;">SIRET : ${data.siret}</p>` : ''}
  </div>

  <!-- Line items -->
  <table style="width:100%;border-collapse:collapse;margin-bottom:24px;font-size:0.9rem;">
    <thead>
      <tr style="background:#f1f5f9;border-bottom:2px solid #e2e8f0;text-align:left;">
        <th style="padding:10px 12px;">Description</th>
        <th style="padding:10px 12px;text-align:center;width:60px;">Qty</th>
        <th style="padding:10px 12px;text-align:right;width:100px;">Unit Price</th>
        <th style="padding:10px 12px;text-align:center;width:60px;">VAT</th>
        <th style="padding:10px 12px;text-align:right;width:110px;">Subtotal</th>
      </tr>
    </thead>
    <tbody>
      ${data.items.map((item, idx) => {
        const lineCents = Math.round(item.quantity * item.unitPriceHT * 100);
        return `<tr style="border-bottom:1px solid #e2e8f0;background:${idx % 2 ? '#fafafa' : '#fff'};">
          <td style="padding:10px 12px;">${item.description || 'Service'}</td>
          <td style="padding:10px 12px;text-align:center;">${item.quantity}</td>
          <td style="padding:10px 12px;text-align:right;">${fmtF(item.unitPriceHT)}</td>
          <td style="padding:10px 12px;text-align:center;">${data.isAutoEntrepreneur ? '0%' : (item.tvaRate * 100).toFixed(0) + '%'}</td>
          <td style="padding:10px 12px;text-align:right;font-weight:600;">${fmt(lineCents)}</td>
        </tr>`;
      }).join('')}
    </tbody>
  </table>

  <!-- Totals -->
  <div style="display:flex;justify-content:flex-end;margin-bottom:24px;">
    <div style="width:300px;font-size:0.9rem;">
      <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #e2e8f0;">
        <span style="color:#475569;">Subtotal (excl. VAT):</span>
        <strong>${fmt(calc.totalHTCents)}</strong>
      </div>
      ${tvaRows}
      ${!data.isAutoEntrepreneur ? `<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #e2e8f0;color:#475569;">
        <span>Total VAT:</span>
        <strong>${fmt(calc.totalTVACents)}</strong>
      </div>` : ''}
      <div style="display:flex;justify-content:space-between;padding:12px 0;font-size:1.15rem;color:#1e3a8a;font-weight:700;border-top:2px solid #3b82f6;">
        <span>Total Due:</span>
        <span>${fmt(calc.totalTTCCents)}</span>
      </div>
    </div>
  </div>

  <!-- Legal note -->
  ${data.isAutoEntrepreneur
    ? `<div style="padding:12px 16px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;font-size:0.85rem;color:#166534;text-align:center;">
        <strong>Legal notice:</strong> VAT not applicable — Art. 293 B du CGI (micro-enterprise regime).
      </div>`
    : ''}
</div>`;
}

