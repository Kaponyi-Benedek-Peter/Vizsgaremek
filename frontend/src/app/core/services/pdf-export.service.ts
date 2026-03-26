import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PdfExportService {
  private async loadJsPdf(): Promise<{ jsPDF: any; autoTable: any }> {
    const jspdfModule = await import('jspdf');
    const autoTableModule = await import('jspdf-autotable');
    return {
      jsPDF: jspdfModule.default,
      autoTable: autoTableModule.default,
    };
  }

  async exportTable(
    title: string,
    headers: string[],
    rows: string[][],
    filename: string,
  ): Promise<void> {
    const { jsPDF, autoTable } = await this.loadJsPdf();
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(title, 14, 20);

    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(`Generated: ${new Date().toLocaleString('hu-HU')}`, 14, 28);
    doc.text(`Roy's Shack Est. 1888 — Admin Panel`, 14, 33);
    doc.setTextColor(0, 0, 0);

    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 40,
      styles: {
        fontSize: 7.5,
        cellPadding: 3,
        overflow: 'linebreak',
      },
      headStyles: {
        fillColor: [6, 122, 69],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 8,
      },
      alternateRowStyles: {
        fillColor: [245, 247, 250],
      },
      margin: { left: 14, right: 14 },
    });

    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(7);
      doc.setTextColor(160, 160, 160);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.getWidth() - 30,
        doc.internal.pageSize.getHeight() - 10,
      );
    }

    doc.save(filename);
  }

  async exportDashboardStats(
    stats: { label: string; value: string | number }[],
    recentOrders: { headers: string[]; rows: string[][] },
    filename: string,
  ): Promise<void> {
    const { jsPDF, autoTable } = await this.loadJsPdf();
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Roy's Shack Est. 1888", 14, 20);

    doc.setFontSize(13);
    doc.setTextColor(60, 60, 60);
    doc.text('Admin Dashboard Report', 14, 28);

    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(`Generated: ${new Date().toLocaleString('hu-HU')}`, 14, 35);
    doc.setTextColor(0, 0, 0);

    doc.setDrawColor(6, 122, 69);
    doc.setLineWidth(0.5);
    doc.line(14, 39, 196, 39);

    let y = 48;
    doc.setFontSize(12);
    doc.text('Summary', 14, y);
    y += 8;

    stats.forEach((stat) => {
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text(stat.label, 18, y);
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined!, 'bold');
      doc.text(String(stat.value), 80, y);
      doc.setFont(undefined!, 'normal');
      y += 7;
    });

    y += 6;

    if (recentOrders.rows.length > 0) {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Recent Orders', 14, y);

      autoTable(doc, {
        head: [recentOrders.headers],
        body: recentOrders.rows,
        startY: y + 5,
        styles: { fontSize: 7.5, cellPadding: 3 },
        headStyles: { fillColor: [6, 122, 69], fontSize: 8 },
        margin: { left: 14, right: 14 },
      });
    }

    doc.save(filename);
  }
}
