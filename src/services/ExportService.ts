import { Card } from '~/types';

export class ExportService {
  exportJson(cards: Card[]): string {
    return JSON.stringify(cards, null, 2);
  }

  downloadFile(content: string, filename: string, type: string): void {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  exportAndDownload(cards: Card[]): void {
    const data = this.exportJson(cards);
    const filename = `nihongo-cards-${new Date().toISOString().slice(0, 10)}.json`;
    this.downloadFile(data, filename, 'application/json');
  }
}

export const exportService = new ExportService();
