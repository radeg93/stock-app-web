import { Injectable } from '@angular/core';
import { EntityState, EntityStore, ID, MultiActiveState, StoreConfig } from '@datorama/akita';
import { Stock } from './stock.model';

export interface StockState extends EntityState<Stock, string>, MultiActiveState {
    active: ID[];
}

export function createInitialState(): StockState {
    return {
        active: [],
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'stock' })
export class StockStore extends EntityStore<StockState> {
    constructor() {
        super(createInitialState());
    }
}
