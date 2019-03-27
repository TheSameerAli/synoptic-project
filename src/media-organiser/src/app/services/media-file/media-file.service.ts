import { Injectable } from '@angular/core';
import { MediaFile } from '../../models/media-file';
import { Image } from '../../models/image';
import { Category } from '../../models/category';
import { Playlist } from '../../models/playlist/playlist';
import { PlaylistService } from '../playlist/playlist.service';

@Injectable({
  providedIn: 'root'
})
export class MediaFileService {
  private mediaFiles: MediaFile[];
  constructor(private _playlistService: PlaylistService) {
    if (!this.mediaFiles) {
      this.mediaFiles = [];
    }
  }

  getAllMediaFiles() {
    return this.mediaFiles;
  }

  getAllByPlaylistId(playlistId: string) {
    const mediaFilesFound: MediaFile[] = [];
    for (let i = 0; i < this.mediaFiles.length; i++) {
      const mediaFile = this.mediaFiles[i];
      if (mediaFile.playlists) {
        if (mediaFile.playlists.find(p => p.id === playlistId)) {
          mediaFilesFound.push(mediaFile);
        }
      }
    }
    return mediaFilesFound;
  }

  setFiles(files: MediaFile[]) {
    this.mediaFiles = files;
  }

  renameFile(name: string, mediaFile: MediaFile) {
    const fileIndex = this.mediaFiles.findIndex(mf => mf.id === mediaFile.id);
    this.mediaFiles[fileIndex].name = name;
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

  private addCategory(category: Category, mediaFile: MediaFile) {
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

  private addPlaylist(playlist: Playlist, mediaFile: MediaFile) {
    const mediaFileIndex = this.mediaFiles.findIndex(mf => mf.id === mediaFile.id);
    this.mediaFiles[mediaFileIndex].playlists.push(playlist);
    this._playlistService.addMediaFile(mediaFile, playlist);
  }

  addPlaylists(playlists: Playlist[], mediaFile: MediaFile) {
    playlists.forEach(playlist => {
      if (!this.playlistExist(playlist, mediaFile)) {
        this.addPlaylist(playlist, mediaFile);
      }
    });
  }

  playlistExist(playlist: Playlist, mediaFile: MediaFile) {
    if (mediaFile.playlists && mediaFile.playlists.find(p => p.id === playlist.id)) {
      return true;
    }
  return false;
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