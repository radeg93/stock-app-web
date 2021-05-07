import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-stock',
    templateUrl: './stock.component.html',
    styleUrls: ['./stock.component.scss'],
})
export class StockComponent implements OnInit {
    @Input() stock: any;
    @Input() activeIds: any;

    // tslint:disable-next-line:no-output-on-prefix
    @Output() onToggleChange = new EventEmitter<any>();

    constructor() {}

    ngOnInit(): void {}

    toggle(value: any): void {
        this.onToggleChange.emit(value);
    }
}
