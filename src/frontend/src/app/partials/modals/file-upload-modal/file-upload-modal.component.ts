import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { IpcService } from '../../../services/ipc.service';
import { IpcMessageEvent } from 'electron';
import { forEach } from '@angular/router/src/utils/collection';
import { MediaFileService } from '../../../services/media-file/media-file.service';
import { MediaFile } from '../../../models/media-file';
import { FileTypeService } from '../../../services/file-types/file-type.service';

@Component({
  selector: 'app-file-upload-modal',
  templateUrl: './file-upload-modal.component.html',
  styleUrls: ['./file-upload-modal.component.css']
})
export class FileUploadModalComponent implements OnInit {
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
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private _ipcService: IpcService,
    private _mediaFileService: MediaFileService,
    private _fileTypeService: FileTypeService
  ) {
    this.fileTypes = _fileTypeService.getFileTypesAsDropdownList();
  }

  ngOnInit() {
  }


  showFileUpload() {
    const fileTypes = this.selectedFileTypes.map(val => val.item_text);
    this._ipcService.send('show-file-upload', fileTypes);
  }

  resetInput() {
    this.selectedFileTypes = undefined;
  }

  closeModal() {
    this.closeButton.nativeElement.click();
  }

}
