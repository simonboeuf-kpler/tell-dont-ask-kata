import OrderItem from '../OrderItem';
import {OrderStatus} from '../OrderStatus';
import Order from './Order';

export default class OrderBuilder {
  private items: OrderItem[];
  private status: OrderStatus;
  private id: number;

  constructor() {
    this.items = [];
    this.status = OrderStatus.CREATED;
  }

  addItem(item: OrderItem): OrderBuilder {
    this.items = [...this.items, item];
    return this;
  }

  setStatus(status: OrderStatus): OrderBuilder {
    this.status = status;
    return this;
  }

  setId(id: number): OrderBuilder {
    this.id = id;
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
