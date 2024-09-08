import Product from './Product';

class OrderItem {

  constructor(
    private product: Product,
    private quantity: number
  ) {}

  public getProduct(): Product {
    return this.product;
  }

  public setProduct(product: Product): void {
    this.product = product;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  public computeTaxedAmount(): number {
    return this.product.computeTaxedAmount(this.quantity);
  }

  public computeTax(): number {
    return this.product.computeUnitaryTax() * this.quantity;
  }
}

export default OrderItem;

