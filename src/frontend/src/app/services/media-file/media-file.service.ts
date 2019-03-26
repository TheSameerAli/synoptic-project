import { Injectable } from '@angular/core';
import { MediaFile } from '../../models/media-file';

@Injectable({
  providedIn: 'root'
})
export class MediaFileService {
  private mediaFiles: MediaFile[];
  constructor() {
    if (!this.mediaFiles) {
      this.mediaFiles = [];
    }
  }

  getAllMediaFiles() {
    return this.mediaFiles;
  }

  setFiles(files: MediaFile[]) {
    this.mediaFiles = files;
  }

  add(mediaFile: MediaFile) {
    this.mediaFiles.push(mediaFile);
  }

  remove(mediaFile: MediaFile) {
    const mediaFileIndex = this.mediaFiles.findIndex(mf => mf.id === mediaFile.id);
    this.mediaFiles.splice(mediaFileIndex, 1);
  }
}
