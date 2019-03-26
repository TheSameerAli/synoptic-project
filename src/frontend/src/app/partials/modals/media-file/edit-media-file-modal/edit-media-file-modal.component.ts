import { Component, OnInit, Input } from '@angular/core';
import { MediaFile } from '../../../../models/media-file';
import { Playlist } from '../../../../models/playlist';
import { Category } from '../../../../models/category';
import { PlaylistService } from '../../../../services/playlist/playlist.service';
import { CategoryService } from '../../../../services/category/category.service';

@Component({
  selector: 'app-edit-media-file-modal',
  templateUrl: './edit-media-file-modal.component.html',
  styleUrls: ['./edit-media-file-modal.component.css']
})
export class EditMediaFileModalComponent implements OnInit {
  @Input() file: MediaFile;

  public playlists = [];
  public categories = [];

  public selectedPlaylists;
  public selectedCategories;

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
    private _categoryService: CategoryService) { }

  ngOnInit() {
    this.playlists = this._playlistService.getPlaylists().map((playlist) => {
      return {item_id: playlist.id, item_text: playlist.name};
    });
    console.log(this.playlists);

    this.categories = this._categoryService.getCategories().map((category) => {
      return {item_id: category.id, item_text: category.name};
    });
  }

}
