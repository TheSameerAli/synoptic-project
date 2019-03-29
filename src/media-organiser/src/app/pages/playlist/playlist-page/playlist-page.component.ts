import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Playlist } from '../../../models/playlist/playlist';
import { PlaylistService } from '../../../services/playlist/playlist.service';
import { StateService } from '../../../services/state/state.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.css']
})
export class PlaylistPageComponent implements OnInit {
  public playlists: Playlist[];
  public selectedPlaylistIndex: number = undefined;
  public toDeletePlaylistIndex: number;
  @ViewChild('openConfirmModal') openConfirmModalButton: ElementRef;
  constructor(
    private _playlistService: PlaylistService,
    private eRef: ElementRef,
    private _stateService: StateService,
    private _router: Router) { }

  ngOnInit() {
    this.playlists = this._playlistService.getPlaylists();
    this._stateService.stateLoaded.subscribe(() => {
      this.updatePlaylistsList();
    });
  }

  public deletePlaylistConfirm() {
    this.toDeletePlaylistIndex = this.selectedPlaylistIndex;
    this.openConfirmModalButton.nativeElement.click();
  }

  public deletePlaylist() {
    this._playlistService.delete(this.playlists[this.toDeletePlaylistIndex]);
    this.updatePlaylistsList();
    this.toDeletePlaylistIndex = undefined;
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

  public goToPlaylist(id: string) {
    this._router.navigate(['/playlist', id]);
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
