import { Component } from '@angular/core';
import { ElectronService, ElectronStoreService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public electronService: ElectronService,
    private translate: TranslateService,
    private storeService: ElectronStoreService,
    private router: Router
  ) {
    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
      if (this.storeService.get('hue.bridged') === false) {
        this.router.navigateByUrl('/bridge');
      } else {
        this.router.navigateByUrl('/scenario');
      }
    } else {
      console.log('Mode web');
    }
  }
}
