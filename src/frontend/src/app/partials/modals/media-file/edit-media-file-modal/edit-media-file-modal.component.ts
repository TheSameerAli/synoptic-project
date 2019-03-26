import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MediaFile } from '../../../../models/media-file';
import { Playlist } from '../../../../models/playlist';
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

  public playlists = [];
  public categories = [];

  public selectedPlaylists;
  public selectedCategories;

  public newComment: string;
  public newImageFilePath: string;

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
    this.loadCategories();
    this.loadComment();
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

  loadData() {
    this.playlists = this._playlistService.getPlaylists().map((playlist) => {
      return {item_id: playlist.id, item_text: playlist.name};
    });
    this.categories = this._categoryService.getCategories().map((category) => {
      return {item_id: category.id, item_text: category.name};
    });
  }

  save() {
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
      this._mediaFileService.addCategories(categories, this.file);
    }
  }

  openImageDialog() {
    this._ipcService.send('upload-image');
  }

}
