import { Component, OnInit, Input } from '@angular/core';
import { MediaFile } from '../../../../models/media-file';

@Component({
  selector: 'app-view-media-file-modal',
  templateUrl: './view-media-file-modal.component.html',
  styleUrls: ['./view-media-file-modal.component.css']
})
export class ViewMediaFileModalComponent implements OnInit {
  @Input() file: MediaFile;
  constructor() { }

  ngOnInit() {
  }

}
