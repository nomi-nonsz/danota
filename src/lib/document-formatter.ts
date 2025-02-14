import { JSDOM } from 'jsdom';
import { getMiniBrowser } from './server-utils';
import htmlToDocx from 'html-to-docx';

export class DocumentFormatter {
  public filename: string;
  public content: string;

  public constructor(content: string, filename: string) {
    this.filename = filename;
    this.content = content;
  }

  private async generateHTML () {
    const dom = new JSDOM(`<html><head><meta charset="utf-8"></head><body class="content">${this.content}</body></html>`);
    const { document } = dom.window;

    const style = document.createElement('style');
    style.innerHTML = `@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'); body { font-family: 'Inter', serif; font-size: 11pt; }`;

    document.querySelector('head')?.append(style);
``
    return document.querySelector('html')!.outerHTML;
  }

  public async pdf (): Promise<Buffer> {
    const html = await this.generateHTML();
    const browser = await getMiniBrowser();
    const page = await browser.newPage();

    try {
      await page.setContent(html, { waitUntil: "networkidle0" });
  
      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "2.1cm", right: "2.1cm", bottom: "2.1cm", left: "2.1cm" }
      });
      return Buffer.from(pdfBuffer);
    }
    finally {
      await browser.close();
    }
  }

  public async docx (): Promise<Buffer> {
    const html = await this.generateHTML();
    const options: htmlToDocx.DocumentOptions = {
      margins: { top: 720 * 1.8, right: 720 * 1.8, bottom: 720 * 1.8, left: 720 * 1.8 },
      font: 'Inter',
      pageSize: {
        width: 11906,
        height: 16838
      },
      fontSize: 22
    };

    return Buffer.from(await htmlToDocx(html, null, options) as ArrayBuffer);
  }
}