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

  public computeUnitaryTax(): number {
    return Math.round(this.price / 100 * this.category.getTaxPercentage() * 100) / 100;
  }

  public computeTaxedAmount(quantity: number): number {
    const unitaryTaxedAmount = this.price + this.computeUnitaryTax();
    return Math.round(unitaryTaxedAmount * quantity * 100) / 100;
  }
}

export default Product;

