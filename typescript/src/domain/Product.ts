import Category from './Category';
import PriceRounder from './PriceRounder';

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
    const taxAmount = this.price * this.category.taxPercentage / 100;
    return new PriceRounder(this.price + taxAmount).compute();
  }
}

export default Product;

