import Product from './Product';

class OrderItem {

  constructor(
    private product: Product,
    private quantity: number
  ) {}

  public getProduct(): Product {
    return this.product;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  private computeTaxExcludedPrice(): number {
    return this.round(this.product.getPrice() * this.quantity);
  }

  public computeTaxIncludedPrice(): number {
    return this.round(this.product.computeTaxedPrice() * this.quantity);
  }

  public computeTax(): number {
    return this.round(this.computeTaxIncludedPrice() - this.computeTaxExcludedPrice());
  }

  private round(price: number): number {
    return Math.round(price * 100) / 100;
  }
}

export default OrderItem;

