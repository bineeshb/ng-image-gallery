import { TestBed } from '@angular/core/testing';

import { ImagesDetailsService } from './images-details.service';

describe('ImagesDetailsService', () => {
  let service: ImagesDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagesDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
