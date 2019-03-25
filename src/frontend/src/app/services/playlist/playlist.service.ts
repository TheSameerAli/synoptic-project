import { Injectable } from '@angular/core';
import { Playlist } from '../../models/playlist';

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

  add(playlist: Playlist) {
    this.playlists.push(playlist);
  }

  delete(playlist: Playlist) {
    const playlistIndex = this.playlists.findIndex(p => p.id === playlist.id);
    this.playlists.splice(playlistIndex, 1);
  }

  rename(playlist: Playlist, newName: string) {
    console.log(playlist);
    const playlistIndex  = this.playlists.findIndex(p => p.id === playlist.id);
    this.playlists[playlistIndex].name = newName;
  }
}
