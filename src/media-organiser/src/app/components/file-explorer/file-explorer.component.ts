import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  MediaFile
} from '../../models/media-file';
import {
  MediaFileService
} from '../../services/media-file/media-file.service';
import {
  StateService
} from '../../services/state/state.service';
import {
  ActivatedRoute,
  Route
} from '@angular/router';

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
  @ViewChild('fileViewModal') fileViewModal: ElementRef;
  constructor(private _mediaFileService: MediaFileService,
    private _stateService: StateService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.updateFileList();
    this._stateService.stateLoaded.subscribe(() => {
      this.updateFileList();
    });
    // Search functionality
    this._activatedRoute.queryParams.subscribe(params => {
      if (params['searchQuery']) {
        this.filterFiles(params['searchQuery']);
      } else {
        this.updateFileList();
      }
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

  filterFiles(filter: string) {
    this.files = this._mediaFileService.getAllMediaFiles()
      .filter(mf => mf.name.toLowerCase().includes(filter.toLowerCase()));
    if (this.files.length === 0) {
      this.files = this._mediaFileService.getAllMediaFiles()
        .filter(mf => mf.type.toLowerCase().includes(filter.toLowerCase()));
    }
  }

  openFileViewModal() {
    this.fileViewModal.nativeElement.click();
  }
}
export enum FileViewOptions {
  List = 0,
    Grid = 1
}
