import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragonDetailComponent } from './components/dragon-detail/dragon-detail.component';
import { DragonsListComponent } from './components/dragons-list/dragons-list.component';
import { DragonsComponent } from './dragons.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'dragons',
    component: DragonsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'create', component: DragonDetailComponent },
      { path: 'edit/:id', component: DragonDetailComponent },
      { path: 'list', component: DragonsListComponent },
      { path: '**', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DragonsRoutingModule {}
