import Product from '../Product';
import PriceRounder from '../PriceRounder';

class OrderItem {

  constructor(
    public readonly product: Product,
    public readonly quantity: number
  ) {}

  private computeTaxExcludedPrice(): number {
    return new PriceRounder(this.product.getPrice() * this.quantity).compute();
  }

  public computeTaxIncludedPrice(): number {
    return new PriceRounder(this.product.computeTaxedPrice() * this.quantity).compute();
  }

  public computeTax(): number {
    return new PriceRounder(this.computeTaxIncludedPrice() - this.computeTaxExcludedPrice()).compute();
  }
}

export default OrderItem;

