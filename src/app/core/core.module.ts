import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';
import { DragonsEffects } from '../store/dragons/dragons.effects';
import { metaReducers } from '../store/store.metareducers';
import { reducers } from '../store/store.reducers';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      autoDismiss: true,
      countDuplicates: true,
      maxOpened: 1,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([DragonsEffects]),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [AuthService, AuthGuard, NotificationService],
})
export class CoreModule {}
