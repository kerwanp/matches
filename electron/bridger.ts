import {Client} from 'node-ssdp';
import * as ElectronStore from 'electron-store';
import * as http from 'http';

export class Bridger {

  store: ElectronStore<any>;
  bridgeIp: string;
  username: string;

  constructor() {
    this.store = new ElectronStore();
    this.bridgeIp = this.store.get('hue.ip', null);
  }

  scanDevices(event) {
    const client = new Client();
    const devices = [];
    client.on('response', ((headers, statusCode, rinfo) => {
      devices.push({headers, statusCode, rinfo});
    }));

    client.search('ssdp:all');

    setTimeout(() => {
      const device = devices.find((element) => !!element.headers['HUE-BRIDGEID']);
      if (!device) {
        event.reply('searchBridgesReply', null);
      }
      this.store.set('hue.ip', device.rinfo.address);
      event.reply('searchBridgesReply', device);
    }, 5000);
  }

  waitForButton(event) {
    setTimeout(() => {

      const request = http.request({
        method: 'POST',
        hostname: this.bridgeIp,
        port: 80,
        path: `/api`,
      }, res => {
        let body = '';
        res.on('data', chunk => {
          body += chunk;
        });
        res.on('end', () => {
          const response = JSON.parse(body)[0];
          if (response.success) {
            this.username = response.success.username;
          }
        });
      });

      request.on('error', (error) => console.log(error));

      request.write(JSON.stringify({
        devicetype: 'matchers#desktop kerwan'
      }));
      request.end();

      if (!this.username) {
        this.waitForButton(event);
      } else {
        this.store.set('hue.username', this.username);
        this.store.set('hue.bridged', true);
        event.reply('waitButtonReply', this.username);
      }
    }, 1000);
  }
}
