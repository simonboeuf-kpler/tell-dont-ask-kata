import Order from '../domain/Order/Order';
import { OrderStatus } from '../domain/OrderStatus';
import OrderRepository from '../repository/OrderRepository';
import { ShipmentService } from '../service/ShipmentService';
import OrderCannotBeShippedException from './Exceptions/OrderCannotBeShippedException';
import OrderCannotBeShippedTwiceException from './Exceptions/OrderCannotBeShippedTwiceException';

class OrderShipmentUseCase {
  private readonly orderRepository: OrderRepository;
  private readonly shipmentService: ShipmentService;

  public constructor (orderRepository: OrderRepository, shipmentService: ShipmentService) {
    this.orderRepository = orderRepository;
    this.shipmentService = shipmentService;
  }

  public run(orderId: number): void {
    const order: Order = this.orderRepository.getById(orderId);

    if (order.getStatus() === OrderStatus.CREATED || order.getStatus() === OrderStatus.REJECTED) {
      throw new OrderCannotBeShippedException();
    }

    if (order.getStatus() === OrderStatus.SHIPPED) {
      throw new OrderCannotBeShippedTwiceException();
    }

    this.shipmentService.ship(order);

    order.ship();
    this.orderRepository.save(order);
  }
}

export default OrderShipmentUseCase;
