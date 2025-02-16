import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressAddEditDialogComponent } from './address-add-edit-dialog.component';

describe('AddressViewEditdialogComponent', () => {
  let component: AddressAddEditDialogComponent;
  let fixture: ComponentFixture<AddressAddEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressAddEditDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressAddEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
