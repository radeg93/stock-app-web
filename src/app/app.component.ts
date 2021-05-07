import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Observable, Subject } from 'rxjs';
import { StockQuery } from './state/stock.query';
import { StockService } from './state/stock.service';
import { Stock } from './state/stock.model';
import { ID } from '@datorama/akita';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    stocks$: Observable<Stock[]> = new Observable<Stock[]>();
    destory$ = new Subject();
    activeIds: ID[] = [];

    constructor(private dataService: DataService, private stockQuery: StockQuery, private stockService: StockService) {}

    ngOnInit(): void {
        this.stocks$ = this.stockQuery.selectAll();
        this.dataService.setupSocketConnection();
        this.stockService.getStocks();
        this.stockQuery.selectActiveIds$.pipe(takeUntil(this.destory$)).subscribe((res) => (this.activeIds = res));
    }

    onToggleChange(event: any, stock: any): void {
        this.stockService.updateStatus(stock);
    }

    ngOnDestroy(): void {
        this.destory$.next();
        this.destory$.complete();
    }
}
