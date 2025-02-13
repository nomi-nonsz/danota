import { JSDOM } from 'jsdom';
import { getMiniBrowser } from './server-utils';

import path from 'path';
import fs from 'fs';

const fonts = {
  Inter: {
    normal: fs.readFileSync(path.join(process.cwd(), "public/fonts/static/Inter_18pt-Regular.ttf")),
    bold: fs.readFileSync(path.join(process.cwd(), "public/fonts/static/Inter_18pt-Bold.ttf")),
    italics: fs.readFileSync(path.join(process.cwd(), "public/fonts/static/Inter_18pt-Italic.ttf")),
    bolditalics: fs.readFileSync(path.join(process.cwd(), "public/fonts/static/Inter_18pt-BoldItalic.ttf")),
  },
};

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
    style.innerHTML = `@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap'); body { font-family: 'Inter', serif; }`;

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
        margin: { top: "1cm", right: "1cm", bottom: "1cm", left: "1cm" }
      });
      return Buffer.from(pdfBuffer);
    }
    finally {
      await browser.close();
    }
  }

  public async docx (): Promise<Buffer> {
    
  }
}