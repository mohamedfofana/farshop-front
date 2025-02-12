import { Address } from './../../../../../core/model/db/address';
import { Component, ViewChild, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AddressListComponent } from './address-list/address-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddressAddEditDialogComponent } from '../../../../../shared/dialog/address-add-edit-dialog/address-add-edit-dialog.component';
import { Customer } from '../../../../../core/model/db/customer';
import { AddressService } from '../../../../../core/services/http/addresses/address.service';
import { AddressTypeEnum } from '../../../../../core/model/enum/addressTypeEnum';
import { AsyncPipe } from '@angular/common';
import { of } from 'rxjs';
import { IDialogFormData } from '../../../../../core/model/dto/common/dialog-form-data.model';
import { AbstractOnDestroy } from '../../../../../core/directives/unsubscriber/abstract.ondestroy';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatIconModule,
    AddressListComponent,
    MatButtonModule,
    TranslateModule,
    AsyncPipe,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './addresses.component.html',
  styleUrl: './addresses.component.css',
})
export class AddressesComponent extends AbstractOnDestroy {
  customer = input.required<Customer>();
  private readonly addressService = inject(AddressService);
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  dialog = inject(MatDialog);
  deliveryAddresses$ = of<Address[]>([]);
  billingAddresses$ = of<Address[]>([]);
  residentialAddresses$ = of<Address[]>([]);

  ngOnInit(): void {
    this.reloadData();
  }

  addNewAdress() {
    const dialogData: IDialogFormData<Address> = {
      new: true,
    };

    let dialogRef = this.dialog.open(AddressAddEditDialogComponent, {
      data: dialogData,
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((changed) => {
        if (changed) {
          this.reloadData();
        }
      })
    );
  }

  reloadData() {
    this.deliveryAddresses$ = this.addressService.findByCustomerAndType({
      customerId: this.customer().id,
      type: AddressTypeEnum.DELIVERY,
    });
    this.billingAddresses$ = this.addressService.findByCustomerAndType({
      customerId: this.customer().id,
      type: AddressTypeEnum.BILLING,
    });
    this.residentialAddresses$ = this.addressService.findByCustomerAndType({
      customerId: this.customer().id,
      type: AddressTypeEnum.RESIDENTIAL,
    });
  }
}
