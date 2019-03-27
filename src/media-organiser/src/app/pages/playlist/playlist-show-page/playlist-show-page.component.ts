import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  Playlist
} from '../../../models/playlist/playlist';
import {
  MediaFile
} from '../../../models/media-file';
import {
  MediaFileService
} from '../../../services/media-file/media-file.service';
import { PlaylistService } from '../../../services/playlist/playlist.service';

@Component({
  selector: 'app-playlist-show-page',
  templateUrl: './playlist-show-page.component.html',
  styleUrls: ['./playlist-show-page.component.css']
})
export class PlaylistShowPageComponent implements OnInit {
  public playlistId: string;
  public playlist: Playlist;
  constructor(private _activatedRouter: ActivatedRoute,
    private _playlistService: PlaylistService) {}

  ngOnInit() {
    this._activatedRouter.params.subscribe(params => {
      this.playlistId = params['id'];
      this.getPlaylist();
    });

  }

  getPlaylist() {
    this.playlist = this._playlistService.getById(this.playlistId);
  }

  moveUp(index: number) {
    this._playlistService.moveMediaFile(this.playlist, index, -1);
    this.getPlaylist();
  }

  moveDown(index: number) {
    this._playlistService.moveMediaFile(this.playlist, index, 1);
    this.getPlaylist();
  }
}
