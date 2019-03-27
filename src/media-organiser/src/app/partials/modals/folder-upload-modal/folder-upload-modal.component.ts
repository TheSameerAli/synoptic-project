import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IpcService } from '../../../services/ipc.service';
import { FileTypeService } from '../../../services/file-types/file-type.service';

@Component({
  selector: 'app-folder-upload-modal',
  templateUrl: './folder-upload-modal.component.html',
  styleUrls: ['./folder-upload-modal.component.css']
})
export class FolderUploadModalComponent implements OnInit {
  public fileTypes = [];
  public selectedFileTypes;
  public dropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 10,
    allowSearchFilter: true
  };
  @ViewChild('close') closeButton: ElementRef;
  constructor(
    private _ipcService: IpcService,
    private _fileTypeService: FileTypeService) {
      this.fileTypes = _fileTypeService.getFileTypesAsDropdownList();
    }

  ngOnInit() {
    this._ipcService.on('files', (event, files) => {
      this.closeButton.nativeElement.click();
    });
  }

  showFolderUpload() {
    const fileTypes = this.selectedFileTypes.map(val => val.item_text.toLowerCase());
    this._ipcService.send('show-folder-upload', fileTypes);
  }
}
