import { Injectable, EventEmitter } from '@angular/core';
import { MediaFileService } from '../media-file/media-file.service';
import { PlaylistService } from '../playlist/playlist.service';
import { CategoryService } from '../category/category.service';
import { IpcService } from '../ipc.service';
import { MediaFile } from '../../models/media-file';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public stateLoaded: EventEmitter<any> = new EventEmitter();
  constructor(private _mediaFileService: MediaFileService,
  private _categoryService: CategoryService,
  private _playlistService: PlaylistService,
  private _ipcService: IpcService) {
    _ipcService.on('state-data', (event, data) => {
      this.provisionState(data);
    });
  }

  save() {
    const data = {
      'files': this._mediaFileService.getAllMediaFiles(),
      'categories': this._categoryService.getCategories(),
      'playlists': this._playlistService.getPlaylists()
    };
    const jsonDataString = JSON.stringify(data);
    this._ipcService.send('save-state', jsonDataString);
  }

  load() {
    this._ipcService.send('load-state');
  }

  provisionState(data) {
    const jsonData = JSON.parse(data);
    this._categoryService.setCategories(jsonData.categories);
    this._playlistService.setPlaylists(jsonData.playlists);
    this._mediaFileService.setFiles(jsonData.files);
    this.stateLoaded.emit();
  }

  reset() {
    const data = {
      'categories': [],
      'playlists': [],
      'files': []
    };
    this.provisionState(JSON.stringify(data));
  }
}
