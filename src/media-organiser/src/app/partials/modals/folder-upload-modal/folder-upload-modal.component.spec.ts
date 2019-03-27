import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderUploadModalComponent } from './folder-upload-modal.component';

describe('FolderUploadModalComponent', () => {
  let component: FolderUploadModalComponent;
  let fixture: ComponentFixture<FolderUploadModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolderUploadModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderUploadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
