import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { Dragon } from '../../core/models/dragon';
import { DragonsService } from '../../core/services/dragons.service';
import {
  createErrorEffect,
  createRestoreEffect,
  createRestoreEmptyEffect,
} from '../effects';
import { SharedActions } from '../shared.actions';
import { FeatureNames } from '../states';
import { HttpRequestAction } from './../actions';
import { DragonsActions } from './dragons.actions';
import { NotificationService } from '../../core/services/notification.service';

@Injectable()
export class DragonsEffects {
  readonly featureName = FeatureNames.Dragons;

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly notificationService: NotificationService,
    private readonly dragonsService: DragonsService,
  ) {}

  @Effect()
  load$ = this.actions$.pipe(
    ofType(DragonsActions.load),
    map((action) =>
      SharedActions.httpRequest({
        entity: this.featureName,
        operation: 'GET',
      }),
    ),
  );

  @Effect()
  loadDetail$ = this.actions$.pipe(
    ofType(DragonsActions.loadDetail),
    map((action) =>
      SharedActions.httpRequest({
        entity: this.featureName,
        entityId: action.payload,
        operation: 'GET',
      }),
    ),
  );

  @Effect()
  addDragon$ = this.actions$.pipe(
    ofType(DragonsActions.add),
    map((action) =>
      SharedActions.httpRequest({
        entity: this.featureName,
        operation: 'POST',
        payload: {
          payload: action.payload,
        },
      }),
    ),
  );

  @Effect()
  editDragon$ = this.actions$.pipe(
    ofType(DragonsActions.edit),
    map((action) =>
      SharedActions.httpRequest({
        entity: this.featureName,
        entityId: action.payload.id,
        operation: 'PUT',
        payload: {
          payload: action.payload,
        },
      }),
    ),
  );

  @Effect()
  fromFetch$ = this.actions$.pipe(
    ofType(SharedActions.httpRequest),
    filter((action) => action.entity === this.featureName),
    filter((action) => action.operation === 'GET'),
    filter((action) => !action.entityId),
    switchMap((action) => this.fetchAll(action)),
  );

  @Effect()
  fromFetchDetail = this.actions$.pipe(
    ofType(SharedActions.httpRequest),
    filter((action) => action.entity === this.featureName),
    filter((action) => action.operation === 'GET'),
    filter((action) => !!action.entityId),
    switchMap((action) => this.fetchDetail(action)),
  );

  @Effect()
  removeDragon$ = this.actions$.pipe(
    ofType(DragonsActions.remove),
    map((action) =>
      SharedActions.httpRequest({
        entity: this.featureName,
        entityId: Array.isArray(action.payload)
          ? (action.payload.map((item) => item.id) as string[])
          : action.payload.id,
        operation: 'DELETE',
      }),
    ),
  );

  @Effect()
  fromDelete$ = this.actions$.pipe(
    ofType(SharedActions.httpRequest),
    filter((action) => action.entity === this.featureName),
    filter((action) => action.operation === 'DELETE'),
    filter((action) => !!action.entityId),
    switchMap((action) => this.remove(action)),
  );

  @Effect()
  fromAdd$ = this.actions$.pipe(
    ofType(SharedActions.httpRequest),
    filter((action) => action.entity === this.featureName),
    filter((action) => action.operation === 'POST'),
    switchMap((action) => this.add(action)),
  );

  @Effect()
  fromEdit$ = this.actions$.pipe(
    ofType(SharedActions.httpRequest),
    filter((action) => action.entity === this.featureName),
    filter((action) => action.operation === 'PUT'),
    switchMap((action) => this.edit(action)),
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
    (action) =>
      this.notificationService.notify(action.payload.errorMessage, 'error'),
  );

  @Effect({ dispatch: false })
  listRedirection$ = this.actions$.pipe(
    ofType(SharedActions.httpRequestSucceed),
    filter((action) => action.entity === this.featureName),
    filter(
      (action) => action.operation === 'POST' || action.operation === 'PUT',
    ),
    tap(() => this.router.navigate(['../list'])),
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
    return this.dragonsService.fetchById(action.entityId as string).pipe(
      map((result) =>
        SharedActions.httpRequestSucceed({
          entity: this.featureName,
          entityId: action.entityId as string,
          operation: 'GET',
          payload: { result },
        }),
      ),
      catchError((error) =>
        of(
          SharedActions.httpRequestFailed({
            entity: this.featureName,
            entityId: action.entityId as string,
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

  private add(action: HttpRequestAction<Dragon>) {
    return this.dragonsService.create(action.payload.payload).pipe(
      map((result) =>
        SharedActions.httpRequestSucceed({
          entity: this.featureName,
          operation: 'POST',
          payload: { result },
        }),
      ),
      catchError((error) =>
        of(
          SharedActions.httpRequestFailed({
            entity: this.featureName,
            error: true,
            operation: 'POST',
            payload: {
              errorMessage:
                'Ocorreu um erro ao efetuar a operação. Por favor, tente novamente.',
              source: error,
            },
          }),
        ),
      ),
    );
  }

  private edit(action: HttpRequestAction<Dragon>) {
    return this.dragonsService
      .edit(action.entityId as string, action.payload.payload)
      .pipe(
        map((result) =>
          SharedActions.httpRequestSucceed({
            entity: this.featureName,
            operation: 'PUT',
            payload: { result },
          }),
        ),
        catchError((error) =>
          of(
            SharedActions.httpRequestFailed({
              entity: this.featureName,
              error: true,
              operation: 'PUT',
              payload: {
                errorMessage:
                  'Ocorreu um erro ao efetuar a operação. Por favor, tente novamente.',
                source: error,
              },
            }),
          ),
        ),
      );
  }

  private remove(action: HttpRequestAction<Dragon | Dragon[]>) {
    if (Array.isArray(action.entityId)) {
      const entitiesIds = action.entityId as string[];
      const removes$ = entitiesIds.map((item) =>
        this.dragonsService
          .remove(item)
          .pipe(catchError((error) => of({ error: true, entityId: item }))),
      );

      return forkJoin(removes$).pipe(
        map((result: any) => result.filter((item) => !!item && !item.error)),
        map((result) =>
          SharedActions.httpRequestBatchSucceed({
            entity: this.featureName,
            entityId: result.map((item) => item.id),
            operation: 'DELETE',
            payload: { result },
          }),
        ),
      );
    }

    return this.dragonsService.remove(action.entityId).pipe(
      map((result) =>
        SharedActions.httpRequestSucceed({
          entity: this.featureName,
          entityId: action.entityId as string,
          operation: 'DELETE',
          payload: { result },
        }),
      ),
      catchError((error) =>
        of(
          SharedActions.httpRequestFailed({
            entity: this.featureName,
            entityId: action.entityId as string,
            error: true,
            operation: 'DELETE',
            payload: {
              errorMessage: 'Não foi posssível concluir a operação.',
              source: error,
            },
          }),
        ),
      ),
    );
  }
}
