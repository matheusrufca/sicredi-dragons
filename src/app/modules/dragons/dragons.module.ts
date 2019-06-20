import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { DragonsRoutingModule } from './dragons-routing.module';
import { EditDragonComponent } from './components/edit/edit.dragon.component';
import { ListDragonComponent } from './components/list/list.dragon.component';
import { RemoveConfirmationDialogComponent } from './components/list/remove-confirmation-dialog/remove-confirmation-dialog.component';
import { CreateDialogComponent } from './components/list/create-dialog/create-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    LayoutModule,
    CoreModule,
    DragonsRoutingModule,
  ],
  declarations: [
    EditDragonComponent,
    ListDragonComponent,
    CreateDialogComponent,
    RemoveConfirmationDialogComponent,
  ],
  entryComponents: [CreateDialogComponent, RemoveConfirmationDialogComponent],
  exports: [EditDragonComponent, ListDragonComponent],
})
export class DragonsModule {}
