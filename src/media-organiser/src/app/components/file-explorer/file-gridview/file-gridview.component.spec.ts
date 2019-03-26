import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileGridviewComponent } from './file-gridview.component';

describe('FileGridviewComponent', () => {
  let component: FileGridviewComponent;
  let fixture: ComponentFixture<FileGridviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileGridviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileGridviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
