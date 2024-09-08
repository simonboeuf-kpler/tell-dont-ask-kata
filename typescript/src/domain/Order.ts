import OrderItem from './OrderItem';
import {OrderStatus} from './OrderStatus';

class Order {
  private currency: string;
  private items: OrderItem[];
  private status: OrderStatus;
  private id: number;

  constructor({
    currency,
    items,
    status,
    id,
  }: {
    currency?: string;
    items?: OrderItem[];
    status?: OrderStatus;
    id?: number;
  } = {}) {
    this.currency = currency;
    this.items = items;
    this.status = status;
    this.id = id;
  }

  public getCurrency(): string {
    return this.currency;
  }

  public getItems(): OrderItem[] {
    return this.items;
  }

  public getStatus(): OrderStatus {
    return this.status;
  }

  public setStatus(status: OrderStatus): void {
    this.status = status;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
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

export class OrderBuilder {
  private currency: string;
  private items: OrderItem[];
  private status: OrderStatus;
  private id: number;

  constructor() {
    this.items = [];
    this.status = OrderStatus.CREATED;
    this.currency = 'EUR'; // bof
  }

  addItem(item: OrderItem): OrderBuilder {
    this.items = [...this.items, item];
    return this;
  }

  build(): Order {
    return new Order({
      currency: this.currency,
      items: this.items,
      status: this.status,
      id: this.id
    });
  }
}

export default Order;

