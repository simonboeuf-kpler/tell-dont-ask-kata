import Order from '../domain/Order/Order';
import OrderRepository from '../repository/OrderRepository';
import OrderApprovalRequest from '../domain/OrderApprovalRequest/OrderApprovalRequest';

class OrderApprovalUseCase {
  private readonly orderRepository: OrderRepository;

  public constructor(orderRepository: OrderRepository){
    this.orderRepository = orderRepository;
  }

  public run(request: OrderApprovalRequest): void {
    const order: Order = this.orderRepository.getById(request.orderId);
    const updatedOrder = order.handleApprovalRequest(request);

    this.orderRepository.save(updatedOrder);
  }
}

export default OrderApprovalUseCase;
