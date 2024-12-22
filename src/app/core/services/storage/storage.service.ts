import { inject, Injectable } from '@angular/core';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { StorageConstant } from '../../security/constants/StorageConstants';
import { environment } from '../../../../environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  localStorageService = inject(LocalStorageService);

  @LocalStorage()
  public cartProducts: any;

  addProduct(id: number, quantity: number) {
    this.addProductToStorage(id, quantity);
  }

  removeProduct(id: number, quantity: number) {
    this.removeProductFromStorage(id, quantity);
  }

  addSingleProduct(id: number) {
    this.addProduct(id, 1);
  }

  removeSingleProduct(id: number) {
    this.removeProduct(id, 1);
  }

  changeLanguage(lang: string) {
    this.storeItem(StorageConstant.CURRENT_LANGUAGE, lang);
  }

  getLanguage() {
    return this.findItem(StorageConstant.CURRENT_LANGUAGE);
  }

  private getCartProductList(): number[] {
    const list = this.findItem(StorageConstant.CART_PRODUCTS);
    if (!list) {
      return [];
    }
    const listProduct = this.toArrayNumber(list, '_');

    return listProduct;
  }

  private removeProductFromStorage(idProduct: number, quantity: number) {
    let cleanCart: number[];
    const oldQuantity = this.getProductQuantity(idProduct);
    if (oldQuantity === 0) {
      cleanCart = this.getCartProductList();
    } else {
      cleanCart = this.getCartWithoutProduct(idProduct);
    }

    this.addProductInCart(cleanCart, idProduct, oldQuantity - quantity);
  }

  private addProductToStorage(idProduct: number, quantity: number) {
    const oldQuantity = this.getProductQuantity(idProduct);
    const cleanCart = this.getCartWithoutProduct(idProduct);

    this.addProductInCart(cleanCart, idProduct, oldQuantity + quantity);
  }

  private addProductInCart(
    list: number[],
    idProduct: number,
    quantity: number
  ) {
    let newList = list;
    for (let index = 0; index < quantity; index++) {
      newList = [...newList, idProduct];
    }

    this.setProductList(newList);
  }

  private setProductList(list: number[]) {
    const listString = list.join('_');

    this.storeItem(StorageConstant.CART_PRODUCTS, listString.toString());
  }

  private getCartWithoutProduct(idProduct: number): number[] {
    return this.getCartProductList().filter((id) => id !== idProduct);
  }

  getProductQuantity(idProduct: number): number {
    return this.getCartProductList().filter((id) => id === idProduct).length;
  }

  private toArrayNumber(list: string, separator: string): number[] {
    if (list) {
      return list.split(separator).map((id) => parseInt(id));
    }
    return [];
  }

  private storeItem<T>(key: string, value: T) {
    this.localStorageService.store(key, this.encrypt(<string>value));
  }

  private findItem(key: string): string {
    const item = this.localStorageService.retrieve(key);
    const value = item && item.length > 0 ? item : '';
    return this.decrypt(value);
  }

  private encrypt(value: string): string {
    const encryptedValue = CryptoJS.AES.encrypt(
      JSON.stringify(value),
      environment.CRYPTO_JS_SECRET_KEY
    );
    return encryptedValue.toString();
  }

  private decrypt(value: string): string {
    return CryptoJS.AES.decrypt(
      value,
      environment.CRYPTO_JS_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);
  }
}
