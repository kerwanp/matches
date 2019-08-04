import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { WebviewDirective } from './directives/';
import { WindowBarComponent } from './components/window-bar/window-bar.component';

@NgModule({
  declarations: [PageNotFoundComponent, WebviewDirective, WindowBarComponent],
  imports: [CommonModule, TranslateModule],
  exports: [TranslateModule, WebviewDirective, WindowBarComponent]
})
export class SharedModule {}
