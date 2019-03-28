import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public onPlaylistRemove: EventEmitter<any> = new EventEmitter();
  constructor() { }
}
