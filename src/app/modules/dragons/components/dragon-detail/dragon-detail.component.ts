import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Dragon } from '../../../../core/models/dragon';
import { DragonsService } from '../../../../core/services/dragons.service';
import { DragonForm } from '../../models';

enum SaveActions {
  Create,
  Edit,
}

@Component({
  selector: 'dragon-detail',
  templateUrl: './dragon-detail.component.html',
  styleUrls: ['./dragon-detail.component.scss'],
})
export class DragonDetailComponent implements OnInit {
  public availableDragonTypes$: Observable<string[]>;
  public availableHistories$: Observable<string[]>;
  public dragon$: Observable<Dragon>;
  public dragons$: Observable<Dragon[]>;
  public dragonForm: DragonForm;
  private saveAction: SaveActions;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly dragonService: DragonsService,
  ) {}

  ngOnInit() {
    this.availableDragonTypes$ = this.dragonService.fetchDragonTypes();
    this.availableHistories$ = this.dragonService.fetchHistories();

    this.activatedRoute.paramMap.subscribe((params) => {
      this.saveAction = params.get('id')
        ? SaveActions.Edit
        : SaveActions.Create;
      this.loadDragon(params.get('id'));
    });
    this.loadForm();
  }

  save() {
    if (!this.dragonForm.valid) return;

    if (this.dragonForm.value.id) this.edit();
    else this.create();

    this.navigateToList();
  }

  pageTitle() {
    const pageMode = this.saveAction === SaveActions.Create ? 'Create' : 'Edit';
    return `${pageMode} Dragon`;
  }

  navigateToList(): void {
    this.router.navigate(['/dragons']);
  }

  private edit(): Observable<Dragon> {
    const payload = this.dragonForm.value;
    return this.dragonService.edit(payload.id, payload);
  }

  private create(): Observable<Dragon> {
    const payload = this.dragonForm.value;
    return this.dragonService.create(payload);
  }

  private loadForm() {
    this.dragonForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      histories: ['Other'],
    }) as DragonForm;
  }

  private loadDragon(id: string): void {
    if (!id) return;

    this.dragon$ = this.dragonService.fetchById(id);
  }
}
