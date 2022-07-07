import { EventEmitter, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SocketWebService extends Socket {

  outEven: EventEmitter<any> = new EventEmitter();

  constructor(private cookieService: CookieService) {
    super({
      url: 'http://localhost:5000',
      options: {
        query:{
          nameRoom: cookieService.get('room')
        }
      }
    })
    this.listen();
  }

  listen = () => {
    this.ioSocket.on('evento', (res: any) => this.outEven.emit(res));   

  }
  emitEvent = (payload = {}) => {
    this.ioSocket.emit('evento', payload)

  }
}
