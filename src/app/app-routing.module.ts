import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'bridge',
        loadChildren: './bridger/bridger.module#BridgerModule'
      },
      {
        path: 'scenario',
        loadChildren: './scenario/scenario.module#ScenarioModule'
      },
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
