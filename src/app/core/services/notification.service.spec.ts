import { inject, TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';

describe('NotifyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService]
    });
  });

  it('should be created', inject([NotificationService], (service: NotificationService) => {
    expect(service).toBeTruthy();
  }));
});
