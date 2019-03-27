import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileListviewComponent } from './file-listview.component';

describe('FileListviewComponent', () => {
  let component: FileListviewComponent;
  let fixture: ComponentFixture<FileListviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileListviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileListviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
