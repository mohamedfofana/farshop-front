import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styles: `
.about-us img {
    transition: transform 0.3s ease-in-out;
}

.about-us img:hover {
    transform: scale(1.05);
}

.about-us .list-unstyled li {
    margin-bottom: 10px;
}

.about-us .btn-primary {
    transition: all 0.3s ease;
}

.about-us .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}`,
})
export class AboutComponent {}
