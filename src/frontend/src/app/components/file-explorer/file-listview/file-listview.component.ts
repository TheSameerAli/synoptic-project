import { Component, OnInit, ElementRef, Input, HostListener, ViewChild } from '@angular/core';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { MediaFile } from '../../../models/media-file';

@Component({
  selector: 'app-file-listview',
  templateUrl: './file-listview.component.html',
  styleUrls: ['./file-listview.component.css']
})
export class FileListviewComponent implements OnInit {
  @Input() files: MediaFile[];
  public selectedFile = null;
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  constructor(private eRef: ElementRef) { }

  ngOnInit() {
  }

  selectFile(id) {
    this.selectedFile = id;
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      if (event.path[2].localName === 'thead') {
        this.selectedFile = null;
      }
    } else {
      this.selectedFile = null;
    }
  }
}
