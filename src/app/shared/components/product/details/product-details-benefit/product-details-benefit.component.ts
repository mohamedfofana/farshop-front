import { Component } from '@angular/core';

@Component({
  selector: 'app-product-details-benefit',
  standalone: true,
  imports: [],
  template: `
    <div class="benefit">
      <div class="container">
        <div class="row benefit_row">
          <div class="col-lg-3 benefit_col">
            <div class="benefit_item d-flex flex-row align-items-center">
              <div class="benefit_icon">
                <i class="bi bi-truck" aria-hidden="true"></i>
              </div>
              <div class="benefit_content">
                <h6>free shipping</h6>
                <p>Suffered Alteration in Some Form</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 benefit_col">
            <div class="benefit_item d-flex flex-row align-items-center">
              <div class="benefit_icon">
                <i class="bi bi-cash" aria-hidden="true"></i>
              </div>
              <div class="benefit_content">
                <h6>cach on delivery</h6>
                <p>The Internet Tend To Repeat</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 benefit_col">
            <div class="benefit_item d-flex flex-row align-items-center">
              <div class="benefit_icon">
                <i class="bi bi-arrow-counterclockwise" aria-hidden="true"></i>
              </div>
              <div class="benefit_content">
                <h6>45 days return</h6>
                <p>Making it Look Like Readable</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 benefit_col">
            <div class="benefit_item d-flex flex-row align-items-center">
              <div class="benefit_icon">
                <i class="bi bi-stopwatch" aria-hidden="true"></i>
              </div>
              <div class="benefit_content">
                <h6>opening all week</h6>
                <p>8AM - 09PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['product-details-benefit.component.scss'],
})
export class ProductDetailsBenefitComponent {}
