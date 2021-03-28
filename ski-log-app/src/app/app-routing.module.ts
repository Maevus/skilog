import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogComponent } from './log/log.component';
import { DashComponent } from './dash/dash.component';
import { PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'log', component: LogComponent },
  { path: 'dashboard', component: DashComponent },
  { path: '', redirectTo: '/log', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
