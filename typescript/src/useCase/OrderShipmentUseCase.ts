import Order from '../domain/Order/Order';
import OrderRepository from '../repository/OrderRepository';
import { ShipmentService } from '../service/ShipmentService';

class OrderShipmentUseCase {
  private readonly orderRepository: OrderRepository;
  private readonly shipmentService: ShipmentService;

  public constructor (orderRepository: OrderRepository, shipmentService: ShipmentService) {
    this.orderRepository = orderRepository;
    this.shipmentService = shipmentService;
  }

  public run(orderId: number): void {
    const order: Order = this.orderRepository.getById(orderId);
    const updatedOrder = order.ship();

    this.shipmentService.ship(updatedOrder);
    this.orderRepository.save(updatedOrder);
  }
}

export default OrderShipmentUseCase;
