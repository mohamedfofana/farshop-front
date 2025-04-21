import {
  Component,
  inject,
  input,
  model,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Category } from '@core/model/db/category';
import { AbstractOnDestroy } from '@core/directives/unsubscriber/abstract.ondestroy';
import { PAGINATION_DEFAULT } from '@app/core/model/enum/paginationConst';

interface SortByField {
  label: string;
  value: string;
}

interface SortByFieldGroup {
  label: string;
  sortByField: SortByField[];
}

@Component({
  selector: 'app-select-sort-category',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatIcon,
    MatSelectModule,
    MatChipsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './select-sort-category.component.html',
  styles: ``,
})
export class SelectSortCategoryComponent
  extends AbstractOnDestroy
  implements OnInit, OnChanges
{
  activatedRoute = inject(ActivatedRoute);
  pageSize = model.required<number>();
  pageIndex = model.required<number>();
  sortValue = model.required<number>();
  defaultField = input.required<number>();
  selectSortValueFormControl = new FormControl<number>(0);
  categories = input.required<Category[]>();
  selectedFieldLabel = signal<string>('');

  ngOnInit() {
    this.updateSort(this.defaultField());
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params) => {
        this.sortValue.set(params['id']);
        this.selectSortValueFormControl.setValue(params['id']);
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateSort(this.getSortFieldSelected());
  }

  private updateSort(value: number) {
    this.selectSortValueFormControl.setValue(value);
    this.sortValue.set(value);
    this.setSortFieldSelectedValue();
  }

  onSortByFieldRemoved() {
    this.updateSort(PAGINATION_DEFAULT.categoryId);
  }

  onSelectFieldChange() {
    this.updateSort(this.getSortFieldSelected());
  }

  getSortFieldSelected(): number {
    return this.selectSortValueFormControl.value || 0;
  }

  setSortFieldSelectedValue() {
    const selectedValue = this.getSortFieldSelected();
    const selectedCategory = this.categories().find(
      (c) => c.id === selectedValue
    );
    this.selectedFieldLabel.set(selectedCategory ? selectedCategory.title : '');
  }
}
