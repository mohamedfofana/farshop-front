import { Component } from '@angular/core';

@Component({
  selector: 'app-social-media',
  standalone: true,
  template: `
    <ul class="nav col-md-4 justify-content-start list-unstyled d-flex">
      <li class="ms-3">
        <a class="text-light" href="#"><i class="bi bi-twitter"></i> </a>
      </li>
      <li class="ms-3">
        <a class="text-light" href="#"><i class="bi bi-instagram"></i> </a>
      </li>
      <li class="ms-3">
        <a class="text-light" href="#"><i class="bi bi-facebook"></i> </a>
      </li>
    </ul>
  `,
  styles: ``,
})
export class SocialMediaComponent {}
