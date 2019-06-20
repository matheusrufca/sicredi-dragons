import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListDragonComponent } from './components/list/list.dragon.component';
import { EditDragonComponent } from './components/edit/edit.dragon.component';

const routes: Routes = [
  {
    path: 'dragons', component: ListDragonComponent, canActivate: [],
    children: [
      { path: 'create', component: EditDragonComponent },
      { path: 'edit/:id', component: EditDragonComponent },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DragonsRoutingModule { }
