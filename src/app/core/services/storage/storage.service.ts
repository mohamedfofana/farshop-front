import { inject, Injectable, signal } from '@angular/core';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { StorageConstant } from '../../security/constants/StorageConstants';
import { CartProductDto } from '../../model/dto/cartProduct';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  localStorageService = inject(LocalStorageService);
  productCount = signal<number>(this.getCartProductCount());

  @LocalStorage()
  public CartProducts: any;

  changeLanguage(lang: string) {
    this.storeValue(StorageConstant.CURRENT_LANGUAGE, lang);
  }

  getLanguage() {
    return this.findValue(StorageConstant.CURRENT_LANGUAGE);
  }

  removeProduct(cartProduct: CartProductDto) {
    this.removeProductFromStorage(cartProduct);
  }

  addSingleProduct(id: number) {
    this.addProduct({ id: id, quantity: 1 });
  }

  removeSingleProduct(id: number) {
    this.removeProduct({ id: id, quantity: 1 });
  }

  addProduct(cartProduct: CartProductDto) {
    this.addProductToStorage(cartProduct);
  }

  private addProductToStorage(cartProduct: CartProductDto) {
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

  private getCartProductList(): CartProductDto[] {
    const list = this.findValueObject(StorageConstant.CART_PRODUCTS);
    if (!list) {
      return [];
    }
    const cartList: CartProductDto[] = JSON.parse(list);

    return cartList;
  }

  private removeProductFromStorage(cartProduct: CartProductDto) {
    const oldQuantity = this.getProductQuantity(cartProduct.id);
    const quantity = oldQuantity === 0 ? 0 : oldQuantity - cartProduct.quantity;

    this.updateCartProduct({
      id: cartProduct.id,
      quantity: quantity,
    });
  }

  private updateCartProduct(cartProduct: CartProductDto) {
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

  private setProductList(list: CartProductDto[]) {
    this.localStorageService.store(StorageConstant.CART_PRODUCTS, list);
    this.productCount.set(this.getCartProductCount());
  }

  getCartProductCount(): number {
    const productList = this.getCartProductList();
    if (!productList) {
      return 0;
    }
    return productList.reduce((sum, p) => sum + p.quantity, 0);
  }

  getProductQuantity(idProduct: number): number {
    const productList = this.getCartProductList();
    if (!productList) {
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
    const cartList: CartProductDto[] = JSON.parse(decryptedValue);
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
