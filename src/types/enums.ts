export enum ExportType {
  PDF = 'pdf',
  DOCX = 'docx',
  HTML = 'html',
  MD = 'md'
}

export const getExportTypeValue = (value: ExportType) => {
  switch (value) {
    case ExportType.PDF: return 'PDF';
    case ExportType.DOCX: return 'DOCX';
  }
}