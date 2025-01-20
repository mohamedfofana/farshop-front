import { DOCUMENT } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Product } from '../../../../../core/model/db/product';

@Component({
  selector: 'app-product-details-images',
  standalone: true,
  imports: [],
  templateUrl: './product-details-images.component.html',
  styleUrl: './product-details-images.component.scss',
})
export class ProductDetailsImagesComponent {
  private document = inject(DOCUMENT);
  product = input.required<Product>();
  mainImageSrc =
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080';

  changeImage(event: any, src: string) {
    this.mainImageSrc = src;
    this.document
      .querySelectorAll('.thumbnail')
      .forEach((thumb) => thumb.classList.remove('active'));
    event.target.classList.add('active');
  }
}
