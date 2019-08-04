import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BridgerComponent } from './bridger.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [BridgerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BridgerComponent
      }
    ]),
    SharedModule
  ]
})
export class BridgerModule { }
