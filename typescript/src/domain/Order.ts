import OrderItem from './OrderItem';
import {OrderStatus} from './OrderStatus';

class Order {
  private total: number;
  private currency: string;
  private items: OrderItem[];
  private tax: number;
  private status: OrderStatus;
  private id: number;

  public getTotal(): number {
    return this.total;
  }

  public setTotal(total: number): void  {
    this.total = total;
  }

  public getCurrency(): string {
    return this.currency;
  }

  public setCurrency(currency: string): void {
    this.currency = currency;
  }

  public getItems(): OrderItem[] {
    return this.items;
  }

  public setItems(items: OrderItem[]): void {
    this.items = items;
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
}

export default Order;

