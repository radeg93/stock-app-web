import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { DataService } from './data.service';
import { environment } from '../environments/environment';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { ReactiveFormsModule } from '@angular/forms';
import { StockComponent } from './stock/stock.component';

const config: SocketIoConfig = { url: 'http://127.0.0.1:3000', options: {} };

@NgModule({
    declarations: [AppComponent, StockComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SocketIoModule.forRoot(config),
        environment.production ? [] : AkitaNgDevtools.forRoot(),
        ReactiveFormsModule,
    ],
    providers: [DataService],
    bootstrap: [AppComponent],
})
export class AppModule {}
