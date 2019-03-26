import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileTypeService {
  public fileTypes: string[];
  constructor() {
    this.fileTypes = [
      'AAC',
      'MP3',
      'WAV',
      'MP4',
      'AVI'
    ];
  }

  getFileTypes() {
    return this.fileTypes;
  }

  getFileTypesAsDropdownList() {
    const fileTypes = [];
    this.fileTypes.forEach((fileType, index) => {
      fileTypes.push({item_id: `${index + 1}`, item_text: fileType});
    });
    return fileTypes;
  }
}
