import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MediaFile } from '../../../../models/media-file';
import { Playlist } from '../../../../models/playlist/playlist';
import { Category } from '../../../../models/category';
import { PlaylistService } from '../../../../services/playlist/playlist.service';
import { CategoryService } from '../../../../services/category/category.service';
import { MediaFileService } from '../../../../services/media-file/media-file.service';
import { StateService } from '../../../../services/state/state.service';
import { IpcService } from '../../../../services/ipc.service';
import { Image } from '../../../../models/image';

@Component({
  selector: 'app-edit-media-file-modal',
  templateUrl: './edit-media-file-modal.component.html',
  styleUrls: ['./edit-media-file-modal.component.css']
})
export class EditMediaFileModalComponent implements OnInit, OnChanges {
  @Input() file: MediaFile;
  @Output() update: EventEmitter<any> = new EventEmitter();

  public playlists = [];
  public categories = [];

  public selectedPlaylists;
  public selectedCategories;

  public newComment: string;
  public newImageFilePath: string;
  public newFileName: string;

  public deselectedPlaylists = [];

  public dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 10,
    allowSearchFilter: true
  };

  constructor(private _playlistService: PlaylistService,
    private _categoryService: CategoryService,
    private _mediaFileService: MediaFileService,
    private _stateService: StateService,
    private _ipcService: IpcService) {
      this._stateService.stateLoaded.subscribe(() => {
        this.loadData();
      });
    }

  ngOnInit() {
    this.loadData();
    this._ipcService.on('image-path', (event, data) => {
      this.newImageFilePath = data;
      this.file.image = new Image(data, data);
    });
  }

  ngOnChanges() {
    this.newFileName = this.file.name;
    this.loadCategories();
    this.loadComment();
    this.loadPlaylists();
  }

  loadComment() {
    if (this.file.comment) {
      this.newComment = this.file.comment;
    }
  }

  loadCategories() {
    if (this.file.categories) {
      this.selectedCategories = this.file.categories.map(category => {
        return {item_id: category.id, item_text: category.name};
      });
    }
  }

  loadPlaylists() {
    if (this.file.playlists) {
      this.selectedPlaylists = this.file.playlists.map(playlist => {
        return {item_id: playlist.id, item_text: playlist.name};
      });
    }
  }

  loadData() {
    this.playlists = this._playlistService.getPlaylists().map((playlist) => {
      return {item_id: playlist.id, item_text: playlist.name};
    });
    this.categories = this._categoryService.getCategories().map((category) => {
      return {item_id: category.id, item_text: category.name};
    });
  }

  save() {
    if (this.newFileName !== this.file.name) {
      this._mediaFileService.renameFile(this.newFileName, this.file);
    }
    if (this.newComment) {
      this._mediaFileService.addComment(this.newComment, this.file);
    }

    if (this.newImageFilePath) {
      const imagePathSplit = this.newImageFilePath.split('/');
      const image = new Image(imagePathSplit[imagePathSplit.length - 1].split('.')[0], this.newImageFilePath);
      this._mediaFileService.addImage(image, this.file);
    }

    if (this.selectedCategories) {
      const categories = this.selectedCategories.map(sc => {
        return this._categoryService.getById(sc.item_id);
      });
      this._mediaFileService.updateCategories(categories, this.file);
    }

    if (this.selectedPlaylists) {
      const playlists = this.selectedPlaylists.map(pl => {
        return this._playlistService.getById(pl.item_id);
      });
      this._mediaFileService.updatePlaylists(playlists, this.file);
    }

    if (this.deselectedPlaylists) {
      this.deselectedPlaylists.forEach(playlistItem => {
        if (!this.selectedPlaylists.find(sp => sp.item_id === playlistItem.item_id)) {
          const playlist = this._playlistService.getById(playlistItem.item_id);
          this._playlistService.removeMediaFile(this.file, playlist);
        }
      });
    }

    this.update.emit();
  }

  openImageDialog() {
    this._ipcService.send('upload-image');
  }

  onDeselect(event) {
    this.deselectedPlaylists.push(event);
  }

}
