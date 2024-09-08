import OrderItem from '../OrderItem';
import {OrderStatus} from '../OrderStatus';

class Order {
  constructor(
    private items: OrderItem[],
    private status: OrderStatus,
    private id: number
  ) {}

  public getItems(): OrderItem[] {
    return this.items;
  }

  public getStatus(): OrderStatus {
    return this.status;
  }

  public getId(): number {
    return this.id;
  }

  public ship(): void {
    this.status = OrderStatus.SHIPPED;
  }

  public isAlreadyShipped(): boolean {
    return this.status === OrderStatus.SHIPPED;
  }

  public isApproved(): boolean {
    return this.status === OrderStatus.APPROVED;
  }

  public isRejected(): boolean {
    return this.status === OrderStatus.REJECTED;
  }

  public approve(): void {
    this.status = OrderStatus.APPROVED;
  }

  public reject(): void {
    this.status = OrderStatus.REJECTED;
  }

  public computeTotal(): number {
    return this.items.reduce(
      (sum, item) => sum + item.computeTaxIncludedPrice(), 0
    );
  }

  public computeTaxAmount(): number {
    return this.items.reduce(
      (sum, item) => sum + item.computeTax(), 0
    );
  }
}

export default Order;

