import OrderItem from './OrderItem';
import {OrderStatus} from './OrderStatus';
import Order from './Order';

export default class OrderBuilder {
  private id: number;
  private readonly status: OrderStatus;
  private items: OrderItem[];

  constructor() {
    this.items = [];
    this.status = OrderStatus.CREATED;
  }

  addItem(item: OrderItem): OrderBuilder {
    this.items = [...this.items, item];
    return this;
  }

  build(): Order {
    return new Order(
      this.items,
      this.status,
      this.id
    );
  }
}
