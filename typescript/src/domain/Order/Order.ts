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
    private status: OrderStatus,
    public readonly id: number
  ) {}

  public getStatus(): OrderStatus {
    return this.status;
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

  public ship(): void {
    if (this.status === OrderStatus.CREATED || this.status === OrderStatus.REJECTED) {
      throw new OrderCannotBeShippedException();
    }

    if (this.status === OrderStatus.SHIPPED) {
      throw new OrderCannotBeShippedTwiceException();
    }

    this.status = OrderStatus.SHIPPED;
  }

  public handleApprovalRequest(request: OrderApprovalRequest): void {
    if (this.status === OrderStatus.SHIPPED) {
      throw new ShippedOrdersCannotBeChangedException();
    }

    if (request.approved && this.status === OrderStatus.REJECTED) {
      throw new RejectedOrderCannotBeApprovedException();
    }

    if (!request.approved && this.status === OrderStatus.APPROVED) {
      throw new ApprovedOrderCannotBeRejectedException();
    }

    if(request.approved) {
      this.status = OrderStatus.APPROVED;
    } else {
      this.status = OrderStatus.REJECTED;
    }
  }
}

export default Order;

