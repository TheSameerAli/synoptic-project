import { Component, OnInit } from '@angular/core';
import { MediaFile } from '../../models/media-file';
import { MediaFileService } from '../../services/media-file/media-file.service';
import { StateService } from '../../services/state/state.service';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})

export class FileExplorerComponent implements OnInit {
  public files: MediaFile[];
  public viewOptions = FileViewOptions;
  public selectedView: FileViewOptions = FileViewOptions.List;
  public selectedFileId: string = undefined;
  public selectedFile: MediaFile = undefined;

  constructor(private _mediaFileService: MediaFileService, private _stateService: StateService) { }

  ngOnInit() {
    this.updateFileList();
    this._stateService.stateLoaded.subscribe(() => {
      this.updateFileList();
    });
  }

  changeView(viewOption: FileViewOptions) {
    this.selectedView = viewOption;
  }

  updateFileList() {
    this.files = this._mediaFileService.getAllMediaFiles();
  }

  changeSelectedFileId(fileId) {
    this.selectedFileId = fileId;
    if (fileId) {
      this.selectedFile = this.files.find(f => f.id === fileId);
      return;
    }
  }

  deleteFile() {
    this._mediaFileService.remove(this.files.find(f => f.id === this.selectedFileId));
    this.updateFileList();
    this.selectedFileId = undefined;
  }
}
export enum FileViewOptions {
  List = 0,
  Grid = 1
}
