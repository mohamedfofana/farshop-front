import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductListComponent } from '../../product/product-list/product-list.component';
import { ActivatedRoute } from '@angular/router';
import { AbstractOnDestroy } from '@core/directives/unsubscriber/abstract.ondestroy';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [ProductListComponent],
  template: ` <app-product-list [(categoryIdParam)]="categoryId" /> `,
  styles: ``,
})
export class CategoryListComponent extends AbstractOnDestroy implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  categoryId = signal<number>(0);

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params) => {
        this.categoryId.set(params['id']);
      })
    );
  }
}
