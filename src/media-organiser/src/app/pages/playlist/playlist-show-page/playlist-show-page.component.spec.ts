import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistShowPageComponent } from './playlist-show-page.component';

describe('PlaylistShowPageComponent', () => {
  let component: PlaylistShowPageComponent;
  let fixture: ComponentFixture<PlaylistShowPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistShowPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistShowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
