import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';

@NgModule({
  providers: [AuthService, AuthGuard, NotificationService]
})
export class CoreModule { }
