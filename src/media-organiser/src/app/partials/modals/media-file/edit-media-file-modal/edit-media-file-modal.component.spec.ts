import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMediaFileModalComponent } from './edit-media-file-modal.component';

describe('EditMediaFileModalComponent', () => {
  let component: EditMediaFileModalComponent;
  let fixture: ComponentFixture<EditMediaFileModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMediaFileModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMediaFileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
