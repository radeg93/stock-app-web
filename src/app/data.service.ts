import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DataService {
    socket: any;
    observer$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

    constructor() {}

    setupSocketConnection(): void {
        this.socket = io(environment.SOCKET_ENDPOINT, {
            auth: {
                token: 'abc',
            },
        });
        this.sendMessage();
        this.socket.on('response', (data: any) => {
            this.observer$.next(data);
        });
    }

    sendMessage(): void {
        this.socket.emit('request', 'Hello there from Angular.');
        setTimeout(() => {
            this.sendMessage();
        }, 5000);
    }

    getMessages(): any {
        return this.observer$.asObservable();
    }
}
