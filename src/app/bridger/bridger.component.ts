import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ElectronService, ElectronStoreService} from '../core/services';

@Component({
  selector: 'app-bridger',
  templateUrl: './bridger.component.html',
  styleUrls: ['./bridger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BridgerComponent implements OnInit {

  loading = false;
  waitingButton = false;
  username: string;

  constructor(private electron: ElectronService, private cdr: ChangeDetectorRef, private store: ElectronStoreService) {
  }

  ngOnInit() {
  }

  startSearching() {
    this.loading = true;

    this.electron.ipcRenderer.on('searchBridgesReply', (event, arg) => {
      if (null === arg) {
        return;
      }
      this.loading = false;
      this.waitingButton = true;
      this.cdr.detectChanges();

      this.electron.ipcRenderer.send('waitButton');
    });
    this.electron.ipcRenderer.on('waitButtonReply', (event, arg) => {
      this.username = arg;
      this.cdr.detectChanges();
    });

    this.electron.ipcRenderer.send('searchBridges');
  }

}
