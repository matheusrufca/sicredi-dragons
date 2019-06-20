import { TestBed, inject } from '@angular/core/testing';

import { DragonsService } from './dragon.service';

describe('DragonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DragonsService]
    });
  });

  it('should be created', inject([DragonsService], (service: DragonsService) => {
    expect(service).toBeTruthy();
  }));
});
