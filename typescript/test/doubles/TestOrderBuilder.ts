import OrderItem from '../../src/domain/Order/OrderItem';
import {OrderStatus} from '../../src/domain/Order/OrderStatus';
import Order from '../../src/domain/Order/Order';

export default class TestOrderBuilder {
  private items: OrderItem[];
  private status: OrderStatus;
  private id: number;

  constructor() {
    this.items = [];
    this.status = OrderStatus.CREATED;
  }

  addItem(item: OrderItem): TestOrderBuilder {
    this.items = [...this.items, item];
    return this;
  }

  setStatus(status: OrderStatus): TestOrderBuilder {
    this.status = status;
    return this;
  }

  setId(id: number): TestOrderBuilder {
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
