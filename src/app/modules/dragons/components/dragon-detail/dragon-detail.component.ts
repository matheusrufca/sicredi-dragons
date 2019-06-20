import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, Subject, zip } from 'rxjs';
import { catchError, delay, map, takeUntil, tap, filter } from 'rxjs/operators';
import { Dragon } from '../../../../core/models/dragon';
import { DragonsService } from '../../../../core/services/dragons.service';
import {
  selectDragon,
  selectDragonsStateIsLoading,
} from '../../../../store/dragons/dragons.selectors';
import { RootState } from '../../../../store/states';
import { DragonForm } from '../../models';
import { DragonsActions } from './../../../../store/dragons/dragons.actions';

enum SaveActions {
  Create,
  Edit,
}

@Component({
  selector: 'dragon-detail',
  templateUrl: './dragon-detail.component.html',
  styleUrls: ['./dragon-detail.component.scss'],
})
export class DragonDetailComponent implements OnInit, OnDestroy {
  private saveAction: SaveActions;
  private readonly unsubscribe: Subject<void> = new Subject<void>();
  public availableDragonTypes$: Observable<string[]>;
  public availableHistories$: Observable<string[]>;
  public dragon$: Observable<Dragon>;
  public isLoading$: Observable<boolean>;
  public entityForm: DragonForm;
  public entityId: number | string;
  lo: void;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly store$: Store<RootState>,
    private readonly dragonService: DragonsService,
  ) {}

  ngOnInit() {
    this.availableDragonTypes$ = this.dragonService
      .fetchDragonTypes()
      .pipe(catchError(() => of([])));
    this.availableHistories$ = this.dragonService
      .fetchHistories()
      .pipe(catchError(() => of([])));

    this.activatedRoute.paramMap.subscribe((params) => {
      this.entityId = params.get('id');
      this.saveAction = !!this.entityId ? SaveActions.Edit : SaveActions.Create;

      if (this.saveAction === SaveActions.Edit) {
        this.store$.dispatch(
          DragonsActions.loadDetail({
            payload: this.entityId,
          }),
        );
      }
    });

    this.isLoading$ = zip(
      this.availableDragonTypes$,
      this.availableHistories$,
      this.store$.select(selectDragonsStateIsLoading),
    ).pipe(
      map(
        ([loadingA, loadingB, loadingC]) =>
          !(Array.isArray(loadingA) || Array.isArray(loadingB)) && loadingC,
      ),
    );

    this.isLoading$
      .pipe(
        filter((isLoading) => !isLoading),
        tap(() => this.loadForm()),
        filter(() => !!this.entityId),
        delay(500),
        tap(
          () =>
            (this.dragon$ = this.store$
              .select(selectDragon, this.entityId)
              .pipe(takeUntil(this.unsubscribe))),
        ),
      )
      .subscribe(() => {
        this.dragon$.subscribe((entity) =>
          this.entityForm.patchValue({ ...entity }),
        );
      });
  }

  save() {
    if (!this.entityForm.valid) return;

    if (this.entityId) this.edit();
    else this.create();
  }

  pageTitle() {
    const pageMode = this.saveAction === SaveActions.Create ? 'Create' : 'Edit';
    return `${pageMode} Dragon`;
  }

  navigateToList(): void {
    this.router.navigate(['/dragons']);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private edit(): void {
    const payload = this.entityForm.value;
    this.store$.dispatch(
      DragonsActions.edit({
        payload: payload,
      }),
    );
  }

  private create(): void {
    const payload = { ...this.entityForm.value, createdAt: new Date() };
    this.store$.dispatch(
      DragonsActions.add({
        payload: payload,
      }),
    );
  }

  private loadForm(): void {
    this.entityForm = this.formBuilder.group({
      id: [undefined, []],
      createdAt: [undefined, []],
      histories: [['Other'], []],
      name: ['', Validators.required],
      type: ['', Validators.required],
    }) as DragonForm;
  }
}
