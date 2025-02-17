import { inject, Injectable, signal } from '@angular/core';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { StorageConstant } from '../../security/constants/StorageConstants';
import { CartProductDto } from '../../model/dto/product/cartProductDto';
import { ProductColor } from '@app/core/model/db/productColor';
import { ProductSize } from '@app/core/model/db/productSize';
import { BaseEntityStore } from '@app/core/model/types/baseEntityStore';
import { Product } from '@app/core/model/db/product';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  localStorageService = inject(LocalStorageService);
  cartProductCount = signal<number>(this.getCartProductCount());
  cartProducts = signal<CartProductDto[]>(this.getCartProductList());

  @LocalStorage()
  public CartProducts: any;

  // Language
  changeLanguage(lang: string) {
    this.storeValue(StorageConstant.CURRENT_LANGUAGE, lang);
  }

  getLanguage() {
    return this.findValue(StorageConstant.CURRENT_LANGUAGE);
  }

  // color

  findCurrentColor(id: number): ProductColor | undefined {
    const cartProduct = this.findObject<CartProductDto>(
      id,
      StorageConstant.CART_PRODUCTS
    );
    if (cartProduct) {
      return cartProduct.selectedColor;
    }
    return undefined;
  }

  // size

  findCurrentSize(id: number): ProductSize | undefined {
    const cartProduct = this.findObject<CartProductDto>(
      id,
      StorageConstant.CART_PRODUCTS
    );
    if (cartProduct) {
      return cartProduct.selectedSize;
    }
    return undefined;
  }

  updateDetails(
    product: Product,
    cartProductDto: CartProductDto
  ): CartProductDto {
    if (product.category.colors) {
      cartProductDto.selectedColor = cartProductDto.selectedColor;
    }
    if (product.category.sizes) {
      cartProductDto.selectedSize = cartProductDto.selectedSize;
    }

    return cartProductDto;
  }

  updateQuantity(
    product: Product,
    cartProductDto: CartProductDto
  ): CartProductDto {
    if (product.category.colors) {
      let currentColor = this.findCurrentColor(product.id);
      if (!currentColor) {
        currentColor = product.category.colors[0];
      }
      cartProductDto.selectedColor = currentColor;
    }
    if (product.category.sizes) {
      let currentSize = this.findCurrentSize(product.id);
      if (!currentSize) {
        currentSize = product.category.sizes[0];
      }
      cartProductDto.selectedSize = currentSize;
    }

    return cartProductDto;
  }

  // common

  public getList<T>(key: string): T[] {
    const list = this.findValueObject(key);

    if (!list) {
      return [];
    }
    const listObjects: T[] = JSON.parse(list);

    return listObjects;
  }

  private storedObject<T extends BaseEntityStore>(object: T, key: string) {
    let list = this.getList<T>(key);
    const current = this.findObject<T>(object.id, key);
    if (!list) {
      list = [];
    }
    if (!current) {
      list = [...list, object];
    } else {
      list = list.map((p) => {
        if (p.id === object.id) {
          return object;
        }
        return p;
      });
    }
    this.localStorageService.store(key, list);
  }

  private findObject<T extends BaseEntityStore>(
    id: number,
    key: string
  ): T | undefined {
    const list = this.getList<T>(key);

    if (list) {
      return list.find((p) => p.id === id);
    }
    return undefined;
  }

  private storeValue<T>(key: string, value: T) {
    this.localStorageService.store(key, this.encrypt(<string>value));
  }

  private findValueObject(key: string): string {
    const item = this.localStorageService.retrieve(key);
    const value = item && item.length > 0 ? item : '';
    return JSON.stringify(this.decrypt(value));
  }

  addProduct(cartProduct: CartProductDto) {
    this.addProductToStorage(cartProduct);
  }

  removeProduct(cartProduct: CartProductDto) {
    this.removeProductFromStorage(cartProduct);
  }

  private addProductToStorage(cartProduct: CartProductDto) {
    this.updateCartProduct(cartProduct);
  }

  public getCartProductList(): CartProductDto[] {
    const list = this.findValueObject(StorageConstant.CART_PRODUCTS);

    if (!list) {
      return [];
    }
    const cartList: CartProductDto[] = JSON.parse(list);
    if (!cartList) {
      return [];
    }
    // add color and size
    cartList.map((p) => {
      p.selectedColor = this.findCurrentColor(p.id);
      p.selectedSize = this.findCurrentSize(p.id);
    });

    return cartList;
  }

  private removeProductFromStorage(cartProduct: CartProductDto) {
    const oldCartProduct = this.getCartProduct(cartProduct.id);
    if (oldCartProduct) {
      const newCartProduct = {
        ...oldCartProduct,
        quantity: cartProduct.quantity,
      };
      this.updateCartProduct(newCartProduct);
    }
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
            p.selectedColor = cartProduct.selectedColor;
            p.selectedSize = cartProduct.selectedSize;
          }
        });
      }
    }
    this.setProductList(cartProductList);
  }

  private setProductList(list: CartProductDto[]) {
    this.localStorageService.store(StorageConstant.CART_PRODUCTS, list);
    this.cartProductCount.set(this.getCartProductCount());
    this.cartProducts.set(this.getCartProductList());
  }

  getCartProductCount(): number {
    const productList = this.getCartProductList();
    if (!productList) {
      return 0;
    }
    return productList.reduce((sum, p) => sum + p.quantity, 0);
  }

  getCartProduct(idProduct: number): CartProductDto | undefined {
    const productList = this.getCartProductList();
    if (productList) {
      const cartProduct = productList.find((p) => p.id === idProduct);
      return cartProduct;
    }

    return undefined;
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
