import { Component, model } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';

interface SortByField {
  label: string;
  value: string;
}

interface SortByFieldGroup {
  label: string;
  sortByField: SortByField[];
}

@Component({
  selector: 'app-select-sort-products',
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
  templateUrl: './select-sort-products.component.html',
  styles: ``,
})
export class SelectSortProductsComponent {
  pageSize = model.required<number>();
  pageIndex = model.required<number>();
  sortField = model.required<string>();
  sortDirection = model.required<string>();
  selectSortByFieldFormControl = new FormControl<string>('');

  readonly fieldList: SortByField[] = [
    {
      label: 'general.sort.most-reviewed.title',
      value: 'general.sort.most-reviewed.desc',
    },
  ];
  readonly sortByFieldGroups: SortByFieldGroup[] = [
    {
      label: 'general.sort.price.title',
      sortByField: [
        {
          label: 'general.sort.asc',
          value: 'general.sort.price.asc',
        },
        {
          label: 'general.sort.desc',
          value: 'general.sort.price.desc',
        },
      ],
    },
    {
      label: 'general.sort.rate.title',
      sortByField: [
        {
          label: 'general.sort.asc',
          value: 'general.sort.rate.asc',
        },
        {
          label: 'general.sort.desc',
          value: 'general.sort.rate.desc',
        },
      ],
    },
  ];

  onSortByFieldRemoved() {
    this.selectSortByFieldFormControl.setValue('');
    this.sortField.set('createdAt');
    this.sortDirection.set('desc');
  }

  onSelectFieldChange() {
    this.sortField.set(this.getSortFieldSelected());
    this.sortDirection.set(this.getSortDirectionSelected());
  }

  getSortFieldSelected(): string {
    return (this.selectSortByFieldFormControl.value || '').split('.')[2];
  }

  getSortDirectionSelected(): string {
    return (this.selectSortByFieldFormControl.value || '').split('.')[3];
  }
}
