import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Dragon } from '../../../../core/models/dragon';
import { DragonsActions } from '../../../../store/dragons/dragons.actions';
import { selectDragons } from '../../../../store/dragons/dragons.selectors';
import { RootState } from '../../../../store/states';
import { DragonTableItem, TableItem } from '../../models';
import { DragonDetailDialogComponent } from '../dragon-detail-dialog/dragon-detail-dialog.component';
import { RemoveDragonConfirmationDialogComponent } from '../remove-dragon-confirmation-dialog/remove-dragon-confirmation-dialog.component';
import { selectDragonsStateIsLoading } from './../../../../store/dragons/dragons.selectors';

const TABLE_COLLUMNS = ['selection', 'name', 'type', 'createdAt', 'actions'];

type DragonsTable = MatTableDataSource<DragonTableItem>;

@Component({
  selector: 'dragons-list',
  templateUrl: './dragons-list.component.html',
  styleUrls: ['./dragons-list.component.scss'],
})
export class DragonsListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public readonly tableColumns: string[];
  public dataTableSource: DragonsTable = new MatTableDataSource<
    DragonTableItem
  >([]);
  public isLoading$: Observable<boolean>;
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

    this.isLoading$ = this.store$.select(selectDragonsStateIsLoading);
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

  confirmRemoveItem(item: DragonTableItem): void {
    this.showRemoveConfirmationDialog(item);
  }

  confirmRemoveSelected(): void {
    this.showRemoveConfirmationDialog();
  }

  getSelected(): DragonTableItem[] {
    return getSelected<Dragon>(this.dataTableSource.data);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private onCloseRemoveConfirmation(result: any, item?: DragonTableItem): void {
    if (!result) return;

    if (item) {
      this.removeItem(item);
    } else {
      this.removeSelectedItems();
    }
  }

  private removeItem(item: DragonTableItem): void {
    this.store$.dispatch(DragonsActions.remove({ payload: item.data }));
  }

  private removeSelectedItems(): void {
    const items = getSelected<Dragon>(this.dataTableSource.data).map(
      (item) => item.data,
    );
    const selectedIds = items.map((item) => item.id);
    this.store$.dispatch(
      DragonsActions.remove({
        payload: items,
      }),
    );
  }

  private showDialog(dialogComponent: any, settings?: any) {
    const dialogSettings = Object.assign({}, settings || undefined);

    return this.dialog.open(dialogComponent, dialogSettings);
  }

  private showCreateDragonDialog(): void {
    const dialogInstance = this.showDialog(DragonDetailDialogComponent);
    dialogInstance.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
  }

  private showRemoveConfirmationDialog(item?: DragonTableItem): void {
    const data = item ? item : undefined;
    const dialogInstance = this.showDialog(
      RemoveDragonConfirmationDialogComponent,
      data,
    );

    dialogInstance
      .afterClosed()
      .subscribe((result) => this.onCloseRemoveConfirmation(result, item));
  }
}

function getSelected<T>(items: TableItem<T>[]): TableItem<T>[] {
  if (!(Array.isArray(items) && items.length)) return [];
  return items.filter((item) => item.selected);
}

function sortDragons(a: Dragon, b: Dragon) {
  return a.name.localeCompare(b.name);
}

function tableItemAdapter(entity: Dragon) {
  return { selected: false, data: entity };
}
