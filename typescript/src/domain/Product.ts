import Category from './Category';

class Product {
  constructor(
    private name: string,
    private price: number,
    private category: Category
  ) {
  }

  public getName(): string {
    return this.name;
  }

  public getPrice(): number {
    return this.price;
  }

  public getCategory(): Category {
    return this.category;
  }
}

export default Product;

