import {Injectable} from '@angular/core';
import * as ElectronStore from 'electron-store';

@Injectable({
  providedIn: 'root'
})
export class ElectronStoreService {

  store = new ElectronStore();

  constructor() {
  }

  get(key: string, defaultValue?: any) {
    return this.store.get(key, defaultValue);
  }

  set(key: string, value: any) {
    this.store.set(key, value);
  }

  delete(key: string) {
    this.store.delete(key);
  }

}
