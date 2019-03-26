import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMediaFileModalComponent } from './view-media-file-modal.component';

describe('ViewMediaFileModalComponent', () => {
  let component: ViewMediaFileModalComponent;
  let fixture: ComponentFixture<ViewMediaFileModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMediaFileModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMediaFileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
