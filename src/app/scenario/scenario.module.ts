import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScenarioComponent} from './scenario.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [ScenarioComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ScenarioComponent
    }])
  ]
})
export class ScenarioModule {
}
