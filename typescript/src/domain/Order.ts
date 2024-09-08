import OrderItem from './OrderItem';
import {OrderStatus} from './OrderStatus';

class Order {
  private total: number;
  private currency: string;
  private items: OrderItem[];
  private tax: number;
  private status: OrderStatus;
  private id: number;

  constructor({
    total,
    currency,
    items,
    tax,
    status,
    id,
  }: {
    total?: number;
    currency?: string;
    items?: OrderItem[];
    tax?: number;
    status?: OrderStatus;
    id?: number;
  } = {}) {
    this.total = total;
    this.currency = currency;
    this.items = items;
    this.tax = tax;
    this.status = status;
    this.id = id;
  }

  public getTotal(): number {
    return this.total;
  }

  public setTotal(total: number): void  {
    this.total = total;
  }

  public getCurrency(): string {
    return this.currency;
  }

  public getItems(): OrderItem[] {
    return this.items;
  }

  public getTax(): number {
    return this.tax;
  }

  public setTax(tax: number): void {
    this.tax = tax;
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

  public static create(): Order {
    return new Order({
      total: 0,
      tax: 0,
      currency: 'EUR',
      items: [],
      status: OrderStatus.CREATED
    });
  }
}

export default Order;

