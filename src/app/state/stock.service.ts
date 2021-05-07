import { Injectable } from '@angular/core';
import { Stock } from './stock.model';
import { StockStore } from './stock.store';
import { DataService } from '../data.service';
import { StockQuery } from './stock.query';

@Injectable({ providedIn: 'root' })
export class StockService {
    constructor(private stockStore: StockStore, private stockQuery: StockQuery, private dataService: DataService) {}

    getStocks(): any {
        this.dataService.getMessages().subscribe((stocks: any) => {
            const entities = this.stockQuery.getAll();
            if (entities.length === 0) {
                this.insertStocks(stocks);
            } else {
                this.updateStocks(stocks);
            }
        });
    }

    insertStocks(stocks: any): any {
        const ids = stocks.map((stock: any) => stock.id);
        const newStocks = stocks.map((stock: any) => {
            return {
                ...stock,
                currentPrice: Number(stock.currentPrice),
                dailyHigh: Number(stock.currentPrice),
                dailyLow: Number(stock.currentPrice),
                yearlyHigh: Number(stock.currentPrice),
                yearlyLow: Number(stock.currentPrice),
            };
        });
        this.stockStore.setActive(ids);
        this.stockStore.set(newStocks);
    }

    updateStocks(stocks: any): any {
        const activeIds = this.stockQuery.getValue().active;
        const updatedStocks = stocks
            .filter((stock: any) => activeIds.includes(stock.id))
            .map((stock: any) => {
                const entity: any = this.stockQuery.getEntity(stock.id);
                return {
                    ...entity,
                    currentPrice: stock.currentPrice,
                    dailyHigh: entity?.dailyHigh > stock.currentPrice ? entity?.dailyHigh : stock.currentPrice,
                    dailyLow: entity?.dailyLow < Number(stock.currentPrice) ? entity?.dailyLow : Number(stock.currentPrice),
                    yearlyHigh: entity?.yearlyHigh > Number(stock.currentPrice) ? entity?.yearlyHigh : Number(stock.currentPrice),
                    yearlyLow: entity?.yearlyLow < Number(stock.currentPrice) ? entity?.yearlyLow : Number(stock.currentPrice),
                    difference: (Number(stock.currentPrice) - entity.currentPrice).toFixed(2),
                    percentage: ((Number(stock.currentPrice) / entity.currentPrice) * 100).toFixed(2),
                };
            });
        this.stockStore.upsertMany(updatedStocks);
    }

    updateStatus(stock: Stock): void {
        this.stockStore.toggleActive(stock.id);
    }
}
