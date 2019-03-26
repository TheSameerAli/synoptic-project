import { Injectable } from '@angular/core';
import { MediaFile } from '../../models/media-file';
import { Image } from '../../models/image';
import { Category } from '../../models/category';

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

  addComment(comment: string, mediaFile: MediaFile) {
    const mediaFileIndex = this.mediaFiles.findIndex(mf => mf.id === mediaFile.id);
    this.mediaFiles[mediaFileIndex].comment = comment;
  }

  addImage(image: Image, mediaFile: MediaFile) {
    const mediaFileIndex = this.mediaFiles.findIndex(mf => mf.id === mediaFile.id);
    this.mediaFiles[mediaFileIndex].image = image;
  }

  addCategory(category: Category, mediaFile: MediaFile) {
    const mediaFileIndex = this.mediaFiles.findIndex(mf => mf.id === mediaFile.id);
    this.mediaFiles[mediaFileIndex].categories.push(category);
  }

  addCategories(categories: Category[], mediaFile: MediaFile) {
    categories.forEach(category => {
      if (!this.categoryExist(category, mediaFile)) {
        this.addCategory(category, mediaFile);
      }
    });
  }

  categoryExist(category: Category, mediaFile: MediaFile) {
      if (mediaFile.categories && mediaFile.categories.find(c => c.id === category.id)) {
        return true;
      }
    return false;
  }


  remove(mediaFile: MediaFile) {
    const mediaFileIndex = this.mediaFiles.findIndex(mf => mf.id === mediaFile.id);
    this.mediaFiles.splice(mediaFileIndex, 1);
  }
}
