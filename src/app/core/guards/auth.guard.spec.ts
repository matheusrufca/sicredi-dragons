import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuard } from './auth.guard';
import { NotificationService } from '../services/notification.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';


xdescribe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireAuthModule
      ],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: { afAuth: { } } },
        { provide: NotificationService, useValue: { } }
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
  }));
});
