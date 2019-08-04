import { Component, OnInit } from '@angular/core';
import {ElectronService} from '../../../core/services';

@Component({
  selector: 'app-window-bar',
  templateUrl: './window-bar.component.html',
  styleUrls: ['./window-bar.component.scss']
})
export class WindowBarComponent implements OnInit {

  constructor(private electron: ElectronService) { }

  ngOnInit() {
  }

  closeWindow() {
    console.log('test');
    this.electron.remote.getCurrentWindow().close();
  }

}
