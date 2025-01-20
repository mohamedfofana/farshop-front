import { inject, Injectable } from '@angular/core';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { StorageConstant } from '../../security/constants/StorageConstants';
import { CartProduct } from '../../model/dto/cartProduct';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  localStorageService = inject(LocalStorageService);

  @LocalStorage()
  public CartProducts: any;

  changeLanguage(lang: string) {
    this.storeValue(StorageConstant.CURRENT_LANGUAGE, lang);
  }

  getLanguage() {
    return this.findValue(StorageConstant.CURRENT_LANGUAGE);
  }

  removeProduct(cartProduct: CartProduct) {
    this.removeProductFromStorage(cartProduct);
  }

  addSingleProduct(id: number) {
    this.addProduct({ id: id, quantity: 1 });
  }

  removeSingleProduct(id: number) {
    this.removeProduct({ id: id, quantity: 1 });
  }

  addProduct(cartProduct: CartProduct) {
    this.addProductToStorage(cartProduct);
  }

  private addProductToStorage(cartProduct: CartProduct) {
    const oldQuantity = this.getProductQuantity(cartProduct.id);
    const quantity =
      oldQuantity === 0
        ? cartProduct.quantity
        : oldQuantity + cartProduct.quantity;

    this.updateCartProduct({
      id: cartProduct.id,
      quantity: quantity,
    });
  }

  private getCartProductList(): CartProduct[] {
    const list = this.findValueObject(StorageConstant.CART_PRODUCTS);
    if (!list) {
      return [];
    }
    const cartList: CartProduct[] = JSON.parse(list);

    return cartList;
  }

  private removeProductFromStorage(cartProduct: CartProduct) {
    const oldQuantity = this.getProductQuantity(cartProduct.id);
    const quantity = oldQuantity === 0 ? 0 : oldQuantity - cartProduct.quantity;

    this.updateCartProduct({
      id: cartProduct.id,
      quantity: quantity,
    });
  }

  private updateCartProduct(cartProduct: CartProduct) {
    let cartProductList = this.getCartProductList();
    if (cartProductList.length === 0) {
      cartProductList = [cartProduct];
    } else {
      const cartProductInStore = cartProductList.find(
        (p) => p.id === cartProduct.id
      );
      if (!cartProductInStore) {
        cartProductList = [...cartProductList, cartProduct];
      } else if (cartProduct.quantity === 0) {
        cartProductList = cartProductList.filter(
          (p) => p.id !== cartProduct.id
        );
      } else {
        cartProductList.map((p) => {
          if (p.id === cartProduct.id) {
            p.quantity = cartProduct.quantity;
          }
        });
      }
    }
    this.setProductList(cartProductList);
  }

  private setProductList(list: CartProduct[]) {
    this.localStorageService.store(StorageConstant.CART_PRODUCTS, list);
  }

  getProductQuantity(idProduct: number): number {
    const productList: CartProduct[] = this.getCartProductList();
    if (!productList) {
      // avoid productList.find is not a function error
      return 0;
    }
    const cartProduct = productList.find((p) => p.id === idProduct);
    if (!cartProduct) {
      return 0;
    }
    return cartProduct.quantity;
  }

  private storeValue<T>(key: string, value: T) {
    this.localStorageService.store(key, this.encrypt(<string>value));
  }

  private findValueObject(key: string): string {
    const item = this.localStorageService.retrieve(key);
    const value = item && item.length > 0 ? item : '';
    return JSON.stringify(this.decrypt(value));
  }

  private findValue(key: string): string {
    const item = this.localStorageService.retrieve(key);
    const value = item && item.length > 0 ? item : '';
    return this.decrypt(value);
  }

  private decryptCartList(value: string) {
    const decryptedValue = this.decrypt(value);
    const cartList: CartProduct[] = JSON.parse(decryptedValue);
    return;
  }

  private encrypt(value: string): string {
    // const encryptedValue = CryptoJS.AES.encrypt(
    //   JSON.stringify(value),
    //   environment.CRYPTO_JS_SECRET_KEY
    // );
    // return encryptedValue.toString();
    return value;
  }

  private decrypt(value: string): string {
    // return CryptoJS.AES.decrypt(
    //   value,
    //   environment.CRYPTO_JS_SECRET_KEY
    // ).toString(CryptoJS.enc.Utf8);
    return value;
  }

  getEncryptObjectValue<T>(key: string): T {
    const item: string = this.findValueObject(key);
    const encryptValue = this.decrypt(item && item.length > 0 ? item : '{}');
    const obj = <T>JSON.parse(encryptValue.length > 0 ? encryptValue : '{}');

    return obj;
  }
}
