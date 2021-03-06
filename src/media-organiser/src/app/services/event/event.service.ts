import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public onPlaylistRemove: EventEmitter<any> = new EventEmitter();
  public onCateogryRemove: EventEmitter<any> = new EventEmitter();
  public onPlaylistRename: EventEmitter<any> = new EventEmitter();
  public onCategoryRename: EventEmitter<any> = new EventEmitter();
  constructor() { }
}
