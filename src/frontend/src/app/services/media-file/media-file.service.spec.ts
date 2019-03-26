import { TestBed, inject } from '@angular/core/testing';

import { MediaFileService } from './media-file.service';

describe('MediaFileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MediaFileService]
    });
  });

  it('should be created', inject([MediaFileService], (service: MediaFileService) => {
    expect(service).toBeTruthy();
  }));
});
