import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PlaylistService } from '../../../../services/playlist/playlist.service';
import { Playlist } from '../../../../models/playlist';

@Component({
  selector: 'app-add-playlist-modal',
  templateUrl: './add-playlist-modal.component.html',
  styleUrls: ['./add-playlist-modal.component.css']
})
export class AddPlaylistModalComponent implements OnInit {
  public playlistName;
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  constructor(private _playlistService: PlaylistService) { }

  ngOnInit() {
  }

  addPlaylist() {
    const playlist = new Playlist(this.playlistName);
    this._playlistService.add(playlist);
    this.update.emit();
    this.resetInput();
  }

  resetInput() {
    this.playlistName = '';
  }

}
