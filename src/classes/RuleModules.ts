import { IItem } from './Item';

interface IRuleModule {
  getName(): string;
  applyRuleAndGetUpdatedPrice(currentPrice: number, cartItems: IItem[]): number;
}

class XForYRuleModule implements IRuleModule {
  #item: IItem;
  #broughtInCount: number;
  #viewAsCount: number;

  constructor(item: IItem, broughtInCount: number, viewAsCount: number) {
    this.#broughtInCount = broughtInCount;
    this.#viewAsCount = viewAsCount;
    this.#item = item;
  }

  getName(): string {
    return `${this.#broughtInCount} for ${
      this.#viewAsCount
    } discount on item "${this.#item.name}"`;
  }

  applyRuleAndGetUpdatedPrice(
    currentPrice: number,
    cartItems: IItem[]
  ): number {
    const numberOfRuleItemInCart = cartItems.filter(
      (cartItem) => cartItem.sku === this.#item.sku
    ).length;

    let updatedPrice = currentPrice;

    const discountRuleApplies = numberOfRuleItemInCart >= this.#broughtInCount;

    const priceToReduceWhenDiscountApplies =
      (this.#broughtInCount - this.#viewAsCount) * this.#item.price;

    if (discountRuleApplies) {
      updatedPrice -= priceToReduceWhenDiscountApplies;
    }

    return updatedPrice;
  }
}

class BulkDiscountRuleModule implements IRuleModule {
  #item: IItem;
  #bulkNumber: number;
  #discountedPrice: number;

  constructor(item: IItem, bulkNumber: number, discountedPrice: number) {
    this.#item = item;
    this.#bulkNumber = bulkNumber;
    this.#discountedPrice = discountedPrice;
  }

  getName(): string {
    return `Bulk Discount for "${this.#item.name}" to have price of ${
      this.#discountedPrice
    } when buying more than ${this.#bulkNumber}`;
  }

  applyRuleAndGetUpdatedPrice(
    currentPrice: number,
    cartItems: IItem[]
  ): number {
    const numberOfRuleItemInCart = cartItems.filter(
      (cartItem) => cartItem.sku === this.#item.sku
    ).length;

    let updatedPrice = currentPrice;

    const discountRuleApplies = numberOfRuleItemInCart > this.#bulkNumber;

    const priceToReduceWhenDiscountApplies =
      (this.#item.price - this.#discountedPrice) * numberOfRuleItemInCart;

    if (discountRuleApplies) {
      updatedPrice -= priceToReduceWhenDiscountApplies;
    }

    return updatedPrice;
  }
}

export { IRuleModule, XForYRuleModule, BulkDiscountRuleModule };
