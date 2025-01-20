import { Component, input } from '@angular/core';
import { Customer } from '../../../core/model/db/customer';

@Component({
  selector: 'app-like-dislike-button',
  standalone: true,
  imports: [],
  templateUrl: './like-dislike-button.component.html',
  styleUrl: './like-dislike-button.component.scss'
})
export class LikeDislikeButtonComponent {
  likes = input.required<Customer[]>();
  unlikes = input.required<Customer[]>()
}
