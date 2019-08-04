import * as ElectronStore from 'electron-store';
import * as http from 'http';

export class HueApi {

  store: ElectronStore<any>;
  ip: string;
  basePath: string;

  constructor() {
    this.store = new ElectronStore();
    if (!this.store.get('hue.bridged')) {
      return;
    }
    this.ip = this.store.get('hue.ip');
    this.basePath = `/api/${this.store.get('hue.username')}`;
  }

  getLight(lightId: number, callback) {
    const request = http.request({
      method: 'GET',
      host: `${this.ip}/lights/${lightId}`,
      port: 80,
    }, res => {
      let body = '';
      res.on('data', chunk => {
        body += chunk;
      });
      res.on('end', () => {
        const response = JSON.parse(body)[0];
        callback(response);
      });
    });
    request.on('error', (error) => console.log(error));
    request.end();
  }

  updateLight(lightId: number, state: any, callback) {
    const request = http.request({
      method: 'PUT',
      hostname: `${this.ip}`,
      path: `${this.basePath}/lights/${lightId}/state`,
      port: 80
    }, res => {
      let body = '';
      res.on('data', chunk => {
        body += chunk;
      });
      res.on('end', () => {
        const response = JSON.parse(body)[0];
        callback(response);
      });
    });
    request.on('error', (error) => console.log(error));
    request.write(JSON.stringify(state));
    request.end();
  }


}
