import { Injectable } from '@angular/core';

import { saveAs } from 'file-saver';
import * as Xlsx from 'xlsx';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelService { 
  constructor() {}

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    console.dir(json);

    const worksheet: Xlsx.WorkSheet = Xlsx.utils.json_to_sheet(json);
    console.log('worksheet', worksheet['rows']);
    const workbook: Xlsx.WorkBook = {
      Sheets: {
        data: worksheet,
      },
      SheetNames: ['data'],
    };
    const excelBuffer: any = Xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    saveAs(
      data,
      fileName +
        '_export_' +
        new Date().getHours() +
        ':' +
        new Date().getMinutes() +
        ':' +
        new Date().getSeconds() +
        EXCEL_EXTENSION
    );
  }
}