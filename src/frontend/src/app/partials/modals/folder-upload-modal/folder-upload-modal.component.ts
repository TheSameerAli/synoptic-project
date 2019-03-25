import { Component, OnInit } from '@angular/core';
import { IpcService } from '../../../services/ipc.service';

@Component({
  selector: 'app-folder-upload-modal',
  templateUrl: './folder-upload-modal.component.html',
  styleUrls: ['./folder-upload-modal.component.css']
})
export class FolderUploadModalComponent implements OnInit {

  constructor(private _ipcService: IpcService) { }

  ngOnInit() {
  }

  showFolderUpload() {
    this._ipcService.send('show-folder-upload');
  }
}
