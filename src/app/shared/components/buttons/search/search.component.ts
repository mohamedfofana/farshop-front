import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  template: `
    <div class="ps-3 mt-1">
      <a
        href="javascript:void(0)"
        data-bs-toggle="modal"
        data-bs-target="#searchModal"
      >
        <i class="bi bi-search h5 text-dark"></i>
      </a>
    </div>
    <div class="modal" id="searchModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <form class="row g-3">
              <div class="col-sm">
                <input
                  type="text"
                  class="form-control"
                  id="staticEmail2"
                  placeholder="Search ..."
                />
              </div>
              <div class="col-auto">
                <button type="submit" class="btn btn-light mb-3">
                  <i class="bi bi-search h5 text-dark"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class SearchComponent {}
