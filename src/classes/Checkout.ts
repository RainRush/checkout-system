import { IItem } from './Item';
import { IPricingRules } from './PricingRules';

interface ICheckout {
  scan(newItem: IItem): void;
  unscanItem(itemToRemove: IItem): void;
  printItemsInCart(): void;
  resetCart(): void;
  printTotal(): void;
}

class Checkout implements ICheckout {
  #cartItems: IItem[] = [];
  #pricingRules: IPricingRules;

  constructor(pricingRules: IPricingRules) {
    this.#pricingRules = pricingRules;
  }

  scan(newItem: IItem): void {
    this.#cartItems.push(newItem);
  }

  unscanItem(itemToRemove: IItem): void {
    const indexOfItem = this.#cartItems.findIndex((item: IItem) => {
      return item.sku === itemToRemove.sku;
    });

    if (indexOfItem === -1) {
      console.error('Cannot find the item intended to remove from the cart');
      return;
    }

    this.#cartItems.splice(indexOfItem, 1);
  }

  printItemsInCart(): void {
    console.table(this.#cartItems);
  }

  resetCart(): void {
    this.#cartItems = [];
  }

  #getCartItemsBasePrice(): number {
    return this.#cartItems.reduce((totalPrice: number, currentItem: IItem) => {
      return totalPrice + currentItem.price;
    }, 0);
  }

  printTotal(): void {
    const currentPrice = this.#getCartItemsBasePrice();
    const priceAfterApplyingRules = this.#pricingRules.applyRules(
      currentPrice,
      this.#cartItems
    );
    console.log(`Checkout price: ${priceAfterApplyingRules}`);
  }
}

export { Checkout };
