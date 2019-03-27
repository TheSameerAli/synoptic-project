import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Playlist } from '../../../../models/playlist/playlist';
import { PlaylistService } from '../../../../services/playlist/playlist.service';

@Component({
  selector: 'app-edit-playlist-modal',
  templateUrl: './edit-playlist-modal.component.html',
  styleUrls: ['./edit-playlist-modal.component.css']
})
export class EditPlaylistModalComponent implements OnInit {
  @Input() playlist: Playlist;
  public playlistNewName: string;
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  constructor(private _playlistService: PlaylistService) { }

  ngOnInit() {
  }

  savePlaylist() {
    this._playlistService.rename(this.playlist, this.playlistNewName);
    this.resetInput();
    this.update.emit();
  }

  resetInput() {
    this.playlistNewName = '';
  }

}
