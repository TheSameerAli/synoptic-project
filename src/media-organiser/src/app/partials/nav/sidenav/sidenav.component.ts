import {
  Component,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  StateService
} from '../../../services/state/state.service';
import {
  Router,
  NavigationEnd
} from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @ViewChild('openConfirmModal') openConfirmModalButton: ElementRef;
  constructor(private _stateService: StateService, private _router: Router) {}

  ngOnInit() {
  }

  saveState() {
    this._stateService.save();
  }

  loadState() {
    this._stateService.load();
  }

  resetStateConfirm() {
    this.openConfirmModalButton.nativeElement.click();
  }

  resetState() {
    this._stateService.reset();
  }

}
