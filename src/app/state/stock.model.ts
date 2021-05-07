import { ID } from '@datorama/akita';

export interface Stock {
    id: ID;
    name: string;
    currentPrice: number;
    dailyHigh: number;
    dailyLow: number;
    yearlyHigh: number;
    yearlyLow: number;
    difference?: number;
    percentage?: number;
}
