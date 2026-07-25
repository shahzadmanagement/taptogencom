export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPriceHT: number;
  tvaRate: number; // 0, 0.021, 0.055, 0.10, 0.20
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  clientName: string;
  clientAddress?: string;
  siret?: string;
  isAutoEntrepreneur: boolean; // Article 293 B du CGI
  items: InvoiceLineItem[];
}

export interface InvoiceCalculation {
  totalHT: number;
  totalTVA: number;
  totalTTC: number;
  tvaBreakdown: Record<number, number>;
}

export function calculateInvoiceTotals(items: InvoiceLineItem[], isAutoEntrepreneur: boolean = false): InvoiceCalculation {
  let totalHT = 0;
  let totalTVA = 0;
  const tvaBreakdown: Record<number, number> = {};

  items.forEach(item => {
    const lineHT = item.quantity * item.unitPriceHT;
    totalHT += lineHT;

    if (!isAutoEntrepreneur && item.tvaRate > 0) {
      const lineTVA = lineHT * item.tvaRate;
      totalTVA += lineTVA;
      tvaBreakdown[item.tvaRate] = (tvaBreakdown[item.tvaRate] || 0) + lineTVA;
    }
  });

  const totalTTC = isAutoEntrepreneur ? totalHT : totalHT + totalTVA;
  return { totalHT, totalTVA, totalTTC, tvaBreakdown };
}

export function renderInvoiceA4HTML(data: InvoiceData, isFr: boolean = true): string {
  const calc = calculateInvoiceTotals(data.items, data.isAutoEntrepreneur);
  const fmt = (n: number) => n.toFixed(2) + ' €';

  return `
    <div class="invoice-a4-document" style="font-family: Arial, sans-serif; padding: 30px; background: #ffffff; color: #1e293b; border-radius: 8px; border: 1px solid #cbd5e1; max-width: 800px; margin: 0 auto;">
      <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #3b82f6; padding-bottom: 16px; margin-bottom: 24px;">
        <div>
          <h2 style="margin: 0; color: #1e3a8a; font-size: 1.5rem;">FACTURATIVE / INVOICE</h2>
          <p style="margin: 4px 0; font-weight: 600; color: #475569;">N° Facture : ${data.invoiceNumber || 'FACT-2026-001'}</p>
          <p style="margin: 0; color: #64748b;">Date : ${data.date || new Date().toLocaleDateString('fr-FR')}</p>
        </div>
        <div style="text-align: right;">
          <h3 style="margin: 0; font-size: 1.1rem; color: #0f172a;">Client : ${data.clientName || 'Client Exemplaire'}</h3>
          ${data.clientAddress ? `<p style="margin: 4px 0; color: #475569;">${data.clientAddress}</p>` : ''}
          ${data.siret ? `<p style="margin: 0; font-size: 0.85rem; color: #64748b;">SIRET : ${data.siret}</p>` : ''}
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 0.9rem;">
        <thead>
          <tr style="background: #f1f5f9; border-bottom: 1px solid #cbd5e1; text-align: left;">
            <th style="padding: 10px;">Description</th>
            <th style="padding: 10px; text-align: center;">Qté</th>
            <th style="padding: 10px; text-align: right;">Prix HT</th>
            <th style="padding: 10px; text-align: right;">TVA</th>
            <th style="padding: 10px; text-align: right;">Total HT</th>
          </tr>
        </thead>
        <tbody>
          ${data.items.map(item => `
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 10px;">${item.description}</td>
              <td style="padding: 10px; text-align: center;">${item.quantity}</td>
              <td style="padding: 10px; text-align: right;">${fmt(item.unitPriceHT)}</td>
              <td style="padding: 10px; text-align: right;">${data.isAutoEntrepreneur ? '0%' : (item.tvaRate * 100) + '%'}</td>
              <td style="padding: 10px; text-align: right; font-weight: 600;">${fmt(item.quantity * item.unitPriceHT)}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div style="display: flex; justify-content: flex-end; margin-bottom: 24px;">
        <div style="width: 280px; font-size: 0.95rem;">
          <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #e2e8f0;">
            <span>Total HT :</span>
            <strong>${fmt(calc.totalHT)}</strong>
          </div>
          ${!data.isAutoEntrepreneur ? `
            <div style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #e2e8f0; color: #475569;">
              <span>Total TVA :</span>
              <strong>${fmt(calc.totalTVA)}</strong>
            </div>
          ` : ''}
          <div style="display: flex; justify-content: space-between; padding: 10px 0; font-size: 1.15rem; color: #1e3a8a;">
            <span>Total TTC :</span>
            <strong>${fmt(calc.totalTTC)}</strong>
          </div>
        </div>
      </div>

      ${data.isAutoEntrepreneur ? `
        <div style="padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 0.85rem; color: #475569; text-align: center;">
          <strong>Mention légale :</strong> TVA non applicable, art. 293 B du CGI.
        </div>
      ` : ''}
    </div>
  `;
}
