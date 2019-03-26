import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IpcService } from '../../../services/ipc.service';
import { MediaFileService } from '../../../services/media-file/media-file.service';
import { MediaFile } from '../../../models/media-file';

@Component({
  selector: 'app-file-saver',
  templateUrl: './file-saver.component.html',
  styleUrls: ['./file-saver.component.css']
})
export class FileSaverComponent implements OnInit {
  @Output() update: EventEmitter<any> = new EventEmitter();

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
  }

}
