import {Dispatcher} from '../utils/dispatcher';

export class ActionLoader {
  actionName: string;
  actionLabel: string;
  dispatcher: Dispatcher;

  constructor(actionName: string, actionLabel: string, dispatcher: Dispatcher) {
    this.actionName = actionName;
    this.actionLabel = actionLabel;
    this.dispatcher = dispatcher;
    this.dispatcher.on('event', (data) => this.onEvent(data));
  }

  onEvent(data) {}

  dispatchAction() {
    this.dispatcher.dispatch(this.actionName, null);
  }
}
