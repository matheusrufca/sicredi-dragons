import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Dragon } from '../../../../core/models/dragon';
import { DragonsActions } from '../../../../store/dragons/dragons.actions';
import { selectDragons } from '../../../../store/dragons/dragons.selectors';
import { RootState } from '../../../../store/states';
import { DragonTableItem } from '../../models';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { RemoveConfirmationDialogComponent } from './remove-confirmation-dialog/remove-confirmation-dialog.component';

const TABLE_COLLUMNS = ['selection', 'name', 'type', 'createdAt', 'actions'];

type DragonsTable = MatTableDataSource<DragonTableItem>;

@Component({
  selector: 'dragon-list',
  templateUrl: './list.dragon.component.html',
  styleUrls: ['./list.dragon.component.scss'],
})
export class ListDragonComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public readonly tableColumns: string[];
  public dataTableSource: DragonsTable = new MatTableDataSource<
    DragonTableItem
  >([]);
  public selectAll: boolean = false;
  private readonly unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly store$: Store<RootState>,
    public dialog: MatDialog,
  ) {
    this.tableColumns = TABLE_COLLUMNS;
  }

  ngOnInit(): void {
    this.store$.dispatch(DragonsActions.load());
    this.store$
      .select(selectDragons)
      .pipe(
        takeUntil(this.unsubscribe),
        filter((entities) => Array.isArray(entities) && !!entities.length),
        map((entities) => entities.sort(sortDragons)),
        map((entities) => entities.map(tableItemAdapter)),
      )
      .subscribe((result) => {
        this.dataTableSource.data = result;
      });
    this.dataTableSource.paginator = this.paginator;
  }

  refresh(): void {
    this.store$.dispatch(DragonsActions.load());
  }

  toggleSelectAll(): void {
    this.dataTableSource.data.forEach(
      (item) => (item.selected = this.selectAll),
    );
  }

  addItem(): void {
    this.showCreateDragonDialog();
  }

  removeItem(item: DragonTableItem): void {}

  confirmRemoveItem(item: DragonTableItem): void {
    this.showRemoveConfirmationDialog(item);
  }

  confirmRemoveSelected(): void {
    this.showRemoveConfirmationDialog();
  }

  getSelected(): DragonTableItem[] {
    return getSelected(this.dataTableSource.data);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private showCreateDragonDialog(): void {
    const dialogInstance = this.showDialog(CreateDialogComponent);
    dialogInstance.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

  private showRemoveConfirmationDialog(item?: DragonTableItem): void {
    const data = item ? item : undefined;
    const dialogInstance = this.showDialog(
      RemoveConfirmationDialogComponent,
      data,
    );

    dialogInstance
      .afterClosed()
      .subscribe((result) => this.onCloseRemoveConfirmation(result, item));
  }

  private onCloseRemoveConfirmation(result: any, item?: DragonTableItem): void {
    if (!result) return;

    if (item) {
      this.removeItem(item);
    } else {
      this.removeSelectedItems();
    }
    this.refresh();
  }

  private removeSelectedItems(): void {
    const items = this.getSelected();
    const removeItems$ = items.map((item) => this.removeItem(item));
  }

  private showDialog(dialogComponent: any, settings?: any) {
    const dialogSettings = Object.assign({}, settings || undefined);

    return this.dialog.open(dialogComponent, dialogSettings);
  }
}

function getSelected(items) {
  if (!(Array.isArray(items) && items.length)) return [];
  return items.filter((item) => item.selected);
}

function sortDragons(a: Dragon, b: Dragon) {
  return a.name.localeCompare(b.name);
}

function tableItemAdapter(entity: Dragon) {
  return { selected: false, data: entity };
}
