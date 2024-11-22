import {Component, Injectable, Input} from '@angular/core';
import {MatPaginatorIntl, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {Subject} from 'rxjs';

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = $localize`First page`;
  itemsPerPageLabel = $localize`Items per page:`;
  lastPageLabel = $localize`Last page`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Next page';
  previousPageLabel = 'Previous page';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Page ${page + 1} of ${amountPages}`;
  }
}

/**
 * @title Paginator internationalization
 */
@Component({
  selector: 'paginator-comp',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.sass',
  standalone: true,
  imports: [MatPaginatorModule],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],
})
export class PaginatorComponent {
  
  @Input() totalPages: number = 0 
  @Input() currentPage: number = 0
  @Input() pageSize: number = 0

  @Input() nextPageFunction! : () => void
  @Input() prePageFunction! : () => void
  @Input() changePageSizeFunction!: (pageSize: number) => void

  public constructor(){

  }

  onPageChange(event: PageEvent) {
    if(event.pageSize != this.pageSize){
      this.changePageSizeFunction(event.pageSize)
    }
    // Kiểm tra và gọi hàm nextPage hoặc previousPage
    if (event.pageIndex > this.currentPage) {
      this.nextPageFunction();
    } else if (event.pageIndex < this.currentPage) {
      this.prePageFunction();
    }
  }
}
