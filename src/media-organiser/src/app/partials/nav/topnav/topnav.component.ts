import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent implements OnInit {
  public searchQuery: string;
  constructor(private _router: Router) { }

  ngOnInit() {
  }

  executeSearch() {
    if (this.searchQuery === '') {
      this._router.navigate(['/files']);
      return;
    }
    this._router.navigate([`/files`],
    { queryParams: { searchQuery: this.searchQuery  }});
  }

}
