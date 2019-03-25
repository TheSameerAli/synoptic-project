import { Component, OnInit } from '@angular/core';
import { MediaFile } from '../../models/media-file';
import { MediaFileService } from '../../services/media-file/media-file.service';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})

export class FileExplorerComponent implements OnInit {
  public files: MediaFile[];
  public viewOptions = FileViewOptions;
  public selectedView: FileViewOptions = FileViewOptions.List;

  constructor(private _mediaFileService: MediaFileService) { }

  ngOnInit() {
    this.updateFileList();
  }

  changeView(viewOption: FileViewOptions) {
    this.selectedView = viewOption;
  }

  updateFileList() {
    this.files = this._mediaFileService.getAllMediaFiles();
  }
}
export enum FileViewOptions {
  List = 0,
  Grid = 1
}
