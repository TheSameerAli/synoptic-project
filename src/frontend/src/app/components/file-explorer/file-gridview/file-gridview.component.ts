import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-file-gridview',
  templateUrl: './file-gridview.component.html',
  styleUrls: ['./file-gridview.component.css']
})
export class FileGridviewComponent implements OnInit {
  @Input() files;

  public selectedFileId = null;

  constructor(private eRef: ElementRef) { }

  ngOnInit() {
  }

  selectFile(id) {
    this.selectedFileId = id;
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
    } else {
      this.selectedFileId = null;
    }
  }
}
