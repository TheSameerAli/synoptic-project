import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { Playlist } from '../../../models/playlist';
import { PlaylistService } from '../../../services/playlist/playlist.service';
import { StateService } from '../../../services/state/state.service';

@Component({
  selector: 'app-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.css']
})
export class PlaylistPageComponent implements OnInit {
  public playlists: Playlist[];
  public selectedPlaylistIndex: number = undefined;
  constructor(
    private _playlistService: PlaylistService,
    private eRef: ElementRef,
    private _stateService: StateService) { }

  ngOnInit() {
    this.playlists = this._playlistService.getPlaylists();
    this._stateService.stateLoaded.subscribe(() => {
      this.updatePlaylistsList();
    });
  }

  public deletePlaylist() {
    this._playlistService.delete(this.playlists[this.selectedPlaylistIndex]);
    this.updatePlaylistsList();
  }

  public selectPlaylist(i) {
    this.selectedPlaylistIndex = i;
  }

  public updatePlaylistsList() {
    this.playlists = this._playlistService.getPlaylists();
    this.resetSelectedPlaylist();
  }

  public resetSelectedPlaylist() {
    this.selectedPlaylistIndex = undefined;
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      if (event.path[2].localName === 'thead') {
        this.resetSelectedPlaylist();
      }
    } else {
      this.resetSelectedPlaylist();
    }
  }
}
