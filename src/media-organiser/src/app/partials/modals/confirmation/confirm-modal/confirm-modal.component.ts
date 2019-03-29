import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  @Input() modalId: string;
  @Input() confirmButtonText: string;
  @Input() confirmText: string;
  @Input() data: any;
  @Output() confirmed: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  confirmClicked() {
    this.confirmed.emit(this.data);
  }

}
