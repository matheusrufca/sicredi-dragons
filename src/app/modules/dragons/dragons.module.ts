import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { DragonDetailDialogComponent } from './components/dragon-detail-dialog/dragon-detail-dialog.component';
import { DragonDetailComponent } from './components/dragon-detail/dragon-detail.component';
import { DragonsListComponent } from './components/dragons-list/dragons-list.component';
import { RemoveDragonConfirmationDialogComponent } from './components/remove-dragon-confirmation-dialog/remove-dragon-confirmation-dialog.component';
import { DragonsRoutingModule } from './dragons-routing.module';
import { DragonsComponent } from './dragons.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragonsRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    LayoutModule,
    CoreModule,
  ],
  declarations: [
    DragonsListComponent,
    DragonDetailComponent,
    DragonsComponent,
    DragonDetailDialogComponent,
    RemoveDragonConfirmationDialogComponent,
  ],
  entryComponents: [
    DragonDetailDialogComponent,
    RemoveDragonConfirmationDialogComponent,
  ],
  exports: [
    DragonsListComponent,
    DragonDetailComponent,
    DragonsComponent,
    DragonDetailDialogComponent,
    RemoveDragonConfirmationDialogComponent,
  ],
})
export class DragonsModule {}
