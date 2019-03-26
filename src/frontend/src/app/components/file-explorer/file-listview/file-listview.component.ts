import { Component, OnInit, ElementRef, Input, HostListener, ViewChild, Output, EventEmitter } from '@angular/core';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { MediaFile } from '../../../models/media-file';

@Component({
  selector: 'app-file-listview',
  templateUrl: './file-listview.component.html',
  styleUrls: ['./file-listview.component.css']
})
export class FileListviewComponent implements OnInit {
  @Input() files: MediaFile[];
  public selectedFileId = undefined;
  @Output() selectionChange: EventEmitter<any> = new EventEmitter();
  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  constructor(private eRef: ElementRef) { }

  ngOnInit() {
  }

  selectFile(id) {
    this.selectedFileId = id;
    this.selectionChange.emit(this.selectedFileId);
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      if (event.path[2].localName === 'thead') {
        this.selectedFileId = undefined;
        this.selectionChange.emit(this.selectedFileId);
      }
    } else {
      this.selectedFileId = undefined;
      this.selectionChange.emit(this.selectedFileId);
    }
  }
}
