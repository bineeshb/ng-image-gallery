import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent {
  @Input() pageParams = {
    pageNumber: 1,
    pageSize: 1,
    totalRecords: 0
  };
  @Output() onPageChange = new EventEmitter();

  constructor() { }

  get isFirstPage(): boolean {
    return this.pageParams.pageNumber === 1;
  }

  get isLastPage(): boolean {
    return this.pageParams.pageNumber === this.pageParams.totalRecords;
  }

  get previousPageNumber(): number {
    return this.pageParams.pageNumber - 1;
  }

  get nextPageNumber(): number {
    return this.pageParams.pageNumber + 1;
  }

  goToPage(pageNumber: number): void {
    this.onPageChange.emit({ pageNumber });
  }
}
