import { JSDOM } from 'jsdom';

// used for backend
export function generateShorterContent(html: string, maxChar: number = 150, maxLine: number = 3): string {
  const { document } = new JSDOM(html).window;
  const contents = document.getElementsByTagName('body')[0].children;
  let totalText = '';

  for (let index = 0; index < contents.length; index++) {
    const contentText = contents[index].textContent;

    if (!contentText) continue;
    if (totalText.length + contentText.length <= maxChar && index < maxLine) {
      totalText += contentText + ' ';
      continue;
    }
    
    const remainingChars = maxChar - totalText.length;
    contents[index].textContent = remainingChars > 0 ? contentText.substring(0, remainingChars) + '...' : '';

    for (let i = index + 1; i < contents.length * 2; i++) {
      contents[index + 1].remove();
    }
    break;
  }

  return document.getElementsByTagName('body')[0].innerHTML;
}

export function generateNoteOrder (sort?: string, order?: string) {
  let trueSort = 'updatedAt';
  let trueOrder = 'desc';

  if (!sort || !order) return { [trueSort]: trueOrder }

  switch (sort) {
    case 'title': trueSort = 'title'; break;
    case 'date': trueSort = 'updatedAt'; break;
    default: trueSort = 'updatedAt';
  }

  trueOrder = order;

  if (!["desc", "order"].includes(order)) {
    trueOrder = 'desc';
  }

  return { [trueSort]: trueOrder }
}