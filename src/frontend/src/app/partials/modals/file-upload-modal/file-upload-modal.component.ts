import { Component, OnInit } from '@angular/core';
import { IpcService } from '../../../services/ipc.service';
import { IpcMessageEvent } from 'electron';

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
  constructor(private _ipcService: IpcService) {
  }

  ngOnInit() {
    this._ipcService.on('files', (event, files) => {
      console.log(files);
    });
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  showFileUpload() {
    const fileTypes = this.selectedFileTypes.map(val => val.item_text);
    this._ipcService.send('show-file-upload', fileTypes);
  }

}
