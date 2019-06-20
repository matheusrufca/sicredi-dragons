import { HttpRequestAction } from './../actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { interval, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { Dragon } from '../../modules/dragons/models/dragon';
import { DragonsService } from '../../modules/dragons/services/dragons.service';
import { SharedActions } from '../shared.actions';
import { FeatureNames, RootState } from '../states';
import { DragonsActions } from './dragons.actions';
import {
  createRestoreEffect,
  createRestoreEmptyEffect,
  createErrorEffect,
} from '../effects';

@Injectable()
export class DragonsEffects {
  readonly featureName = FeatureNames.Dragons;

  constructor(
    private readonly actions$: Actions,
    private readonly notificationService: ToastrService,
    private readonly dragonsService: DragonsService,
  ) {}

  @Effect()
  fetchDragons$ = this.actions$.pipe(
    ofType(SharedActions.httpRequest),
    filter((action) => action.entity === this.featureName),
    filter((action) => !action.entityId),
    switchMap((action) => this.fetchAll(action)),
    map((result) =>
      SharedActions.httpRequestSucceed({
        entity: this.featureName,
        operation: 'GET',
        payload: { result },
      }),
    ),
  );

  @Effect()
  fetchDragon$ = this.actions$.pipe(
    ofType(SharedActions.httpRequest),
    filter((action) => action.entity === this.featureName),
    filter((action) => !!action.entityId),
    switchMap((action) => this.fetchDetail(action)),
  );

  @Effect()
  restore$ = createRestoreEffect(this.actions$, this.featureName);

  @Effect()
  restoreEmpty$ = createRestoreEmptyEffect(this.actions$, this.featureName);

  @Effect()
  refresh$ = this.actions$.pipe(
    ofType(SharedActions.refresh),
    filter((action) => action.payload === this.featureName),
    map((action) =>
      SharedActions.httpRequest({
        entity: this.featureName,
        operation: 'GET',
      }),
    ),
  );

  @Effect({ dispatch: false })
  error$ = createErrorEffect(
    this.actions$,
    SharedActions.httpRequestFailed,
    (action) => this.notificationService.error(action.payload.errorMessage),
  );

  private fetchAll(action: HttpRequestAction<Dragon[]>) {
    return this.dragonsService.fetchAll().pipe(
      map((result) =>
        SharedActions.httpRequestSucceed({
          entity: this.featureName,
          operation: 'GET',
          payload: { result },
        }),
      ),
      catchError((error) =>
        of(
          SharedActions.httpRequestFailed({
            entity: this.featureName,
            error: true,
            operation: 'GET',
            payload: {
              errorMessage: 'Não foi posssível obter a lista de dragões.',
              source: error,
            },
          }),
        ),
      ),
    );
  }

  private fetchDetail(action: HttpRequestAction<Dragon[]>) {
    return this.dragonsService.fetchById(action.entityId).pipe(
      map((result) =>
        SharedActions.httpRequestSucceed({
          entity: this.featureName,
          entityId: action.entityId,
          operation: 'GET',
          payload: { result },
        }),
      ),
      catchError((error) =>
        of(
          SharedActions.httpRequestFailed({
            entity: this.featureName,
            entityId: action.entityId,
            error: true,
            operation: 'GET',
            payload: {
              errorMessage: 'Não foi posssível obter os detalhes do dragão.',
              source: error,
            },
          }),
        ),
      ),
    );
  }
}
