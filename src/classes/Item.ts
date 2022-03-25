interface IItem {
  sku: string;
  name: string;
  price: number;
}

class Item implements IItem {
  sku: string;
  name: string;
  price: number;

  constructor(sku: string, name: string, price: number) {
    this.sku = sku;
    this.name = name;
    this.price = price;
  }
}

export { IItem, Item };
