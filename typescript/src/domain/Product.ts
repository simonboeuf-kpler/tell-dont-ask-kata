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


  public computeTaxedPrice(): number {
    const taxAmount = Math.round(this.price / 100 * this.category.getTaxPercentage() * 100) / 100;
    return this.price + taxAmount;
  }
}

export default Product;

