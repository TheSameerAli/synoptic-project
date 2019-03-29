import { Injectable } from '@angular/core';
import { MediaFile } from '../../models/media-file';
import { Image } from '../../models/image';
import { Category } from '../../models/category';
import { Playlist } from '../../models/playlist/playlist';
import { PlaylistService } from '../playlist/playlist.service';
import { EventService } from '../event/event.service';
import { CastExpr } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class MediaFileService {
  private mediaFiles: MediaFile[];
  constructor(private _playlistService: PlaylistService,
    private _eventService: EventService) {
    if (!this.mediaFiles) {
      this.mediaFiles = [];
    }
    this.subscribeEvents();
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

  renamePlaylistFromMediaFiles(playlist: Playlist) {
    this.mediaFiles.forEach(mediaFile => {
      if (mediaFile.playlists.find(p => p.id === playlist.id)) {
        const mediaFileIndex = this.mediaFiles.findIndex(mf => mf.id === mediaFile.id);
        const playlistIndex = this.mediaFiles[mediaFileIndex].playlists.findIndex(p => p.id === playlist.id);
        this.mediaFiles[mediaFileIndex].playlists[playlistIndex] = playlist;
      }
    });
  }

  renameCategoryFromMediaFiles(category: Category) {
    this.mediaFiles.forEach(mediaFile => {
      if (mediaFile.categories.find(c => c.id === category.id)) {
        const mediaFileIndex = this.mediaFiles.findIndex(mf => mf.id === mediaFile.id);
        const categoryIndex = this.mediaFiles[mediaFileIndex].categories.findIndex(c => c.id === category.id);
        this.mediaFiles[mediaFileIndex].categories[categoryIndex] = category;
      }
    });
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

  removePlaylistFromAllMediaFiles(playlist: Playlist) {
    this.mediaFiles.forEach(mediaFile => {
      if (mediaFile.playlists.includes(playlist)) {
        const mediaFileIndex = this.mediaFiles.findIndex(mf => mf.id === mediaFile.id);
        const playlistIndex = this.mediaFiles[mediaFileIndex].playlists.findIndex(p => p.id === playlist.id);
        this.mediaFiles[mediaFileIndex].playlists.splice(playlistIndex, 1);
      }
    });
  }

  removeCategoryFromAllMediaFiles(category: Category) {
    this.mediaFiles.forEach(mediaFile => {
      if (mediaFile.categories.includes(category)) {
        const mediaFileIndex = this.mediaFiles.findIndex(mf => mf.id === mediaFile.id);
        const categoryIndex = this.mediaFiles[mediaFileIndex].categories.findIndex(c => c.id === category.id);
        this.mediaFiles[mediaFileIndex].categories.splice(categoryIndex, 1);
      }
    });
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

  updateCategories(categories: Category[], mediaFile: MediaFile) {
    const mediaFileIndex = this.mediaFiles.findIndex(mf => mf.id === mediaFile.id);
    this.mediaFiles[mediaFileIndex].categories = [];
    this.addCategories(categories, mediaFile);
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

  subscribeEvents() {
    this._eventService.onPlaylistRemove.subscribe((playlist) => {
      this.removePlaylistFromAllMediaFiles(playlist);
    });
    this._eventService.onCateogryRemove.subscribe((category) => {
      this.removeCategoryFromAllMediaFiles(category);
    });
    this._eventService.onPlaylistRename.subscribe((playlist) => {
      this.renamePlaylistFromMediaFiles(playlist);
    });
    this._eventService.onCategoryRename.subscribe((category) => {
      this.renameCategoryFromMediaFiles(category);
    });
  }
}
