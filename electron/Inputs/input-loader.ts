import {Dispatcher} from '../utils/dispatcher';
import {ActionLoader} from './action-loader';

export class InputLoader {

  inputName: string;
  inputLabel: string;
  actions: ActionLoader[] = [];
  dispatcher = new Dispatcher();

  constructor(inputName: string, inputLabel: string) {
    this.inputName = inputName;
    this.inputLabel = inputLabel;
    this.preInit();
    this.listenEvents();
    this.registerActions();
  }

  preInit() {
  }

  registerActions() {
  }

  listenEvents() {

  }

  dispatchEvent(data) {
    this.dispatcher.dispatch('event', data);
  }
}

