import {
  Injectable
} from '@angular/core';
import {
  Playlist
} from '../../models/playlist/playlist';
import {
  MediaFile
} from '../../models/media-file';
import {
  PlaylistMediaFile
} from '../../models/playlist/playlist-media-file';
import { MediaFileService } from '../media-file/media-file.service';
import { EventService } from '../event/event.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private playlists: Playlist[];
  constructor(private _eventService: EventService) {
    if (!this.playlists) {
      this.playlists = [];
    }
  }

  getPlaylists() {
    return this.playlists;
  }

  getById(id: string) {
    return this.playlists.find(pl => pl.id === id);
  }

  setPlaylists(playlists: Playlist[]) {
    this.playlists = playlists;
  }

  add(playlist: Playlist) {
    this.playlists.push(playlist);
  }

  moveMediaFile(playlist: Playlist, index: number, toMove: number) {
    const playlistIndex = this.playlists.findIndex(pl => pl.id === playlist.id);
      this.playlists[playlistIndex].mediaFiles =
      this.array_move(this.playlists[playlistIndex].mediaFiles, index, index + toMove); // Moves the item up or down
  }

  addMediaFile(mediaFile: MediaFile, playlist: Playlist) {
    if (!this.mediaFileExist(mediaFile, playlist)) { // Only adds the media file if it doesn't exist in that playlist
      const playlistIndex = this.playlists.findIndex(p => p.id === playlist.id);
      this.playlists[playlistIndex].mediaFiles.push(new PlaylistMediaFile(mediaFile.id, mediaFile.name));
    }
  }

  mediaFileExist(mediaFile: MediaFile, playlist: Playlist) {
    const playlistIndex = this.playlists.findIndex(p => p.id === playlist.id);
    if (this.playlists[playlistIndex].mediaFiles
      && this.playlists[playlistIndex].mediaFiles.find(mf => mf.id === mediaFile.id)) {
        return true;
    }
    return false;
  }

  delete(playlist: Playlist) {
    const playlistIndex = this.playlists.findIndex(p => p.id === playlist.id);
    this.playlists.splice(playlistIndex, 1);
    this._eventService.onPlaylistRemove.emit(playlist);
  }

  rename(playlist: Playlist, newName: string) {
    const playlistIndex = this.playlists.findIndex(p => p.id === playlist.id);
    this.playlists[playlistIndex].name = newName;
    this._eventService.onPlaylistRename.emit(this.playlists[playlistIndex]);
  }

  removeMediaFile(mediaFile: MediaFile, playlist: Playlist) {
    const playlistIndex = this.playlists.findIndex(p => p.id === playlist.id);
    const mediaFileIndex = this.playlists[playlistIndex].mediaFiles.findIndex(mf => mf.id === mediaFile.id);
    this.playlists[playlistIndex].mediaFiles.splice(mediaFileIndex, 1);
  }

  removeMediaFileFromPlaylists(mediaFile: MediaFile) {
    this.playlists.forEach(playlist => {
      if (playlist.mediaFiles && playlist.mediaFiles.find(mf => mf.id === mediaFile.id)) {
        const playlistIndex = this.playlists.findIndex(p => p.id === playlist.id);
        const mediaFileIndex = this.playlists[playlistIndex].mediaFiles.findIndex(mf => mf.id === mediaFile.id);
        this.playlists[playlistIndex].mediaFiles.splice(mediaFileIndex, 1);
      }
    });
  }

  private array_move(arr, old_index, new_index) {
    while (old_index < 0) {
      old_index += arr.length;
    }
    while (new_index < 0) {
      new_index += arr.length;
    }
    if (new_index >= arr.length) {
      let k = new_index - arr.length;
      while ((k--) + 1) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    console.log(arr);
    return arr;
  }
}
