import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { IpcService } from '../../../services/ipc.service';
import { IpcMessageEvent } from 'electron';
import { forEach } from '@angular/router/src/utils/collection';
import { MediaFileService } from '../../../services/media-file/media-file.service';
import { MediaFile } from '../../../models/media-file';

@Component({
  selector: 'app-file-upload-modal',
  templateUrl: './file-upload-modal.component.html',
  styleUrls: ['./file-upload-modal.component.css']
})
export class FileUploadModalComponent implements OnInit {
  public fileTypes = [
    { item_id: 1, item_text: 'AAC' },
    { item_id: 2, item_text: 'MP3' },
    { item_id: 3, item_text: 'WAV' },
    { item_id: 4, item_text: 'MP4' },
    { item_id: 5, item_text: 'AVI' }
  ];
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
  constructor(private _ipcService: IpcService, private _mediaFileService: MediaFileService) {
  }

  ngOnInit() {
    this._ipcService.on('files', (event, files) => {
      this.saveFiles(files);
    });
  }

  saveFiles(files) {
    files.forEach(file => {
      this._mediaFileService.add(new MediaFile(file));
    });
    this.update.emit();
    this.closeButton.nativeElement.click();
  }

  showFileUpload() {
    const fileTypes = this.selectedFileTypes.map(val => val.item_text);
    this._ipcService.send('show-file-upload', fileTypes);
  }

  resetInput() {
    this.selectedFileTypes = undefined;
  }

}
