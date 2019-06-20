import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { map } from 'rxjs/operators';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Dragon } from '../../models/dragon';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { DragonTableItem } from './DragonTableItem';
import { RemoveConfirmationDialogComponent } from './remove-confirmation-dialog/remove-confirmation-dialog.component';
import { DragonsService } from '../../services/dragons.service';

const TABLE_COLLUMNS = ['selection', 'name', 'type', 'createdAt', 'actions'];

@Component({
  selector: 'dragon-list',
  templateUrl: './list.dragon.component.html',
  styleUrls: ['./list.dragon.component.scss'],
})
export class ListDragonComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public readonly tableColumns: string[];
  public items: MatTableDataSource<DragonTableItem> = new MatTableDataSource<
    DragonTableItem
  >([]);
  public selectAll: boolean = false;

  constructor(
    private readonly dragonService: DragonsService,
    public dialog: MatDialog,
    private readonly notificationService: NotificationService,
  ) {
    this.tableColumns = TABLE_COLLUMNS;
  }

  ngOnInit(): void {
    this.items.paginator = this.paginator;
    this.loadDragons();
  }

  refresh(): void {
    this.loadDragons();
  }

  toggleSelectAll(): void {
    this.items.data.forEach((item) => (item.selected = this.selectAll));
  }

  addItem(): void {
    this.showCreateDragonDialog();
  }

  removeItem(item: DragonTableItem) {
    try {
      this.dragonService.remove(item.data.id);
    } catch (error) {
      throw error;
    }
  }

  confirmRemoveItem(item: DragonTableItem): void {
    this.showRemoveConfirmationDialog(item);
  }

  confirmRemoveSelected(): void {
    this.showRemoveConfirmationDialog();
  }

  getSelected(): DragonTableItem[] {
    return getSelected(this.items.data);
  }

  private loadDragons(): void {
    this.dragonService
      .fetchAll()
      .pipe(
        map((entities) => entities.sort(sortDragons)),
        map((entities) => entities.map(tableItemAdapter)),
      )
      .subscribe((entities) => {
        this.items.data = entities;
      });
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
