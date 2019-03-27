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

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private playlists: Playlist[];
  constructor() {
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
      this.array_move(this.playlists[playlistIndex].mediaFiles, index, index + toMove);
  }

  addMediaFile(mediaFile: MediaFile, playlist: Playlist) {
    const playlistIndex = this.playlists.findIndex(p => p.id === playlist.id);
    this.playlists[playlistIndex].mediaFiles.push(new PlaylistMediaFile(mediaFile.id, mediaFile.name));
  }

  delete(playlist: Playlist) {
    const playlistIndex = this.playlists.findIndex(p => p.id === playlist.id);
    this.playlists.splice(playlistIndex, 1);
  }

  rename(playlist: Playlist, newName: string) {
    console.log(playlist);
    const playlistIndex = this.playlists.findIndex(p => p.id === playlist.id);
    this.playlists[playlistIndex].name = newName;
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
