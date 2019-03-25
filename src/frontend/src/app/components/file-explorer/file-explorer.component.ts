import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.css']
})

export class FileExplorerComponent implements OnInit {
  public files = [
    {
      'id': 1,
      'name' : 'Test file.docx',
      'date_modified' : '20 Jan 2019 16:49',
      'file_size': '1.26Mb',
      'icon': '<i class="fas fa-file-word"></i>'
    },
    {
      'id': 2,
      'name' : 'Test file.docx',
      'date_modified' : '20 Jan 2019 12:30',
      'file_size': '1.26Mb',
      'icon': '<i class="fas fa-file-word"></i>'
    },
    {
      'id': 3,
      'name' : 'Test file.docx',
      'date_modified' : '20 Jan 2019 16:13',
      'file_size': '1.26Mb',
      'icon': '<i class="fas fa-file-word"></i>'
    }
  ];
  public viewOptions = FileViewOptions;
  public selectedView: FileViewOptions = FileViewOptions.List;

  constructor() { }

  ngOnInit() {
  }

  changeView(viewOption: FileViewOptions) {
    this.selectedView = viewOption;
  }
}
export enum FileViewOptions {
  List = 0,
  Grid = 1
}
