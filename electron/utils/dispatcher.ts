import {DispacherEvent} from './dispacher-event';

export class Dispatcher {
  events = {};

  constructor() {}

  dispatch(eventName: string, data: any) {
    const event: DispacherEvent = this.events[eventName];
    if (event) {
      event.fire(data);
    }
  }

  on(eventName: string, callback) {
    let event: DispacherEvent = this.events[eventName];
    if (!event) {
      event = new DispacherEvent(eventName);
      this.events[eventName] = event;
    }

    event.registerCallback(callback);
  }

  off(eventName: string, callback) {
    const event = this.events[eventName];
    if (event && event.callbacks.indexOf(callback) > -1) {
      event.unregisterCallback(callback);
      if (event.callbacks.length === 0) {
        delete this.events[eventName];
      }
    }
  }
}
