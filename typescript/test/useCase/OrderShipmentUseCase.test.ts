import Order from '../../src/domain/Order/Order';
import {OrderStatus} from '../../src/domain/Order/OrderStatus';
import OrderCannotBeShippedException from '../../src/domain/Exceptions/OrderCannotBeShippedException';
import OrderCannotBeShippedTwiceException from '../../src/domain/Exceptions/OrderCannotBeShippedTwiceException';
import OrderShipmentUseCase from '../../src/useCase/OrderShipmentUseCase';
import TestOrderRepository from '../doubles/TestOrderRepository';
import TestShipmentService from '../doubles/TestShipmentService';
import TestOrderBuilder from '../doubles/TestOrderBuilder';

describe('OrderShipmentUseCase', () => {
  let orderRepository: TestOrderRepository;
  let shipmentService: TestShipmentService;
  let useCase: OrderShipmentUseCase;

  beforeEach( () => {
    orderRepository = new TestOrderRepository();
    shipmentService = new TestShipmentService();
    useCase = new OrderShipmentUseCase(orderRepository, shipmentService);
  });

  it('shipApprovedOrder', () => {
    const initialOrder: Order = new TestOrderBuilder()
      .setId(1)
      .setStatus(OrderStatus.APPROVED)
      .build();
    orderRepository.addOrder(initialOrder);

    const orderId = 1;
    useCase.run(orderId);

    expect(orderRepository.getSavedOrder().status).toBe(OrderStatus.SHIPPED);
    expect(shipmentService.getShippedOrder().id).toBe(initialOrder.id);
    expect(shipmentService.getShippedOrder().items).toBe(initialOrder.items);
    expect(shipmentService.getShippedOrder().status).toBe(OrderStatus.SHIPPED);
  });

  it('createdOrdersCannotBeShipped', () => {
    const initialOrder: Order = new TestOrderBuilder()
      .setId(2)
      .setStatus(OrderStatus.CREATED)
      .build();
    orderRepository.addOrder(initialOrder);

    const orderId: number = 2;

    expect(() => useCase.run(orderId)).toThrow(OrderCannotBeShippedException);
    expect(orderRepository.getSavedOrder()).toBe(null);
    expect(shipmentService.getShippedOrder()).toBe(null);
  });

  it('rejectedOrdersCannotBeShipped', () => {
    const initialOrder: Order = new TestOrderBuilder()
      .setId(3)
      .setStatus(OrderStatus.REJECTED)
      .build();
    orderRepository.addOrder(initialOrder);

    const orderId: number = 3;

    expect(() => useCase.run(orderId)).toThrow(OrderCannotBeShippedException);
    expect(orderRepository.getSavedOrder()).toBe(null);
    expect(shipmentService.getShippedOrder()).toBe(null);
  });

  it('shippedOrdersCannotBeShippedAgain', () => {
    const initialOrder: Order = new TestOrderBuilder()
      .setId(4)
      .setStatus(OrderStatus.SHIPPED)
      .build();
    orderRepository.addOrder(initialOrder);

    const orderId: number = 4;

    expect(() => useCase.run(orderId)).toThrow(OrderCannotBeShippedTwiceException);
    expect(orderRepository.getSavedOrder()).toBe(null);
    expect(shipmentService.getShippedOrder()).toBe(null);
  });
});
