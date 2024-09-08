import OrderItem from './OrderItem';
import {OrderStatus} from './OrderStatus';
import OrderApprovalRequest from '../OrderApprovalRequest/OrderApprovalRequest';
import ShippedOrdersCannotBeChangedException from '../Exceptions/ShippedOrdersCannotBeChangedException';
import RejectedOrderCannotBeApprovedException from '../Exceptions/RejectedOrderCannotBeApprovedException';
import ApprovedOrderCannotBeRejectedException from '../Exceptions/ApprovedOrderCannotBeRejectedException';
import OrderCannotBeShippedException from '../Exceptions/OrderCannotBeShippedException';
import OrderCannotBeShippedTwiceException from '../Exceptions/OrderCannotBeShippedTwiceException';

class Order {
  constructor(
    public readonly items: OrderItem[],
    public readonly status: OrderStatus,
    public readonly id: number
  ) {}

  public computeTaxIncludedPrice(): number {
    return this.items.reduce(
      (sum, item) => sum + item.computeTaxIncludedPrice(), 0
    );
  }

  public computeTaxAmount(): number {
    return this.items.reduce(
      (sum, item) => sum + item.computeTaxAmount(), 0
    );
  }

  public ship(): Order {
    if (this.status === OrderStatus.CREATED || this.status === OrderStatus.REJECTED) {
      throw new OrderCannotBeShippedException();
    }

    if (this.status === OrderStatus.SHIPPED) {
      throw new OrderCannotBeShippedTwiceException();
    }

    return new Order(this.items, OrderStatus.SHIPPED, this.id);
  }

  public handleApprovalRequest(request: OrderApprovalRequest): Order {
    if (this.status === OrderStatus.SHIPPED) {
      throw new ShippedOrdersCannotBeChangedException();
    }

    if (request.approved && this.status === OrderStatus.REJECTED) {
      throw new RejectedOrderCannotBeApprovedException();
    }

    if (!request.approved && this.status === OrderStatus.APPROVED) {
      throw new ApprovedOrderCannotBeRejectedException();
    }

    if(!request.approved) {
      return new Order(
        this.items,
        OrderStatus.REJECTED,
        this.id
      );
    }
    return new Order(
      this.items,
      OrderStatus.APPROVED,
      this.id
    );
  }
}

export default Order;

