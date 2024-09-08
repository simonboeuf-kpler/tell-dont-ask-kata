import Order from '../../src/domain/Order/Order';
import {OrderStatus} from '../../src/domain/OrderStatus';
import ApprovedOrderCannotBeRejectedException from '../../src/useCase/Exceptions/ApprovedOrderCannotBeRejectedException';
import OrderApprovalRequest from '../../src/domain/OrderApprovalRequest/OrderApprovalRequest';
import OrderApprovalUseCase from '../../src/useCase/OrderApprovalUseCase';
import RejectedOrderCannotBeApprovedException from '../../src/useCase/Exceptions/RejectedOrderCannotBeApprovedException';
import ShippedOrdersCannotBeChangedException from '../../src/useCase/Exceptions/ShippedOrdersCannotBeChangedException';
import TestOrderRepository from '../doubles/TestOrderRepository';
import OrderBuilder from '../../src/domain/Order/OrderBuilder';
import OrderApprovalRequestBuilder from '../../src/domain/OrderApprovalRequest/OrderApprovalRequestBuilder';

describe('OrderApprovalUseCase', () => {
  let orderRepository: TestOrderRepository;
  let useCase: OrderApprovalUseCase;

  beforeEach( () => {
    orderRepository = new TestOrderRepository();
    useCase = new OrderApprovalUseCase(orderRepository);
  });
  it('approvedExistingOrder', () => {
    const initialOrder: Order = new OrderBuilder()
      .setStatus(OrderStatus.CREATED)
      .setId(1)
      .build();
    orderRepository.addOrder(initialOrder);

    const request: OrderApprovalRequest = new OrderApprovalRequestBuilder()
      .setId(1)
      .approve()
      .build();

    useCase.run(request);

    const savedOrder: Order = orderRepository.getSavedOrder();
    expect(savedOrder.getStatus()).toBe(OrderStatus.APPROVED);
  });

  it('rejectedExistingOrder', () => {
    const initialOrder: Order = new OrderBuilder()
      .setStatus(OrderStatus.CREATED)
      .setId(1)
      .build();

    orderRepository.addOrder(initialOrder);

    const request: OrderApprovalRequest = new OrderApprovalRequestBuilder()
      .setId(1)
      .deny()
      .build();

    useCase.run(request);

    const savedOrder: Order = orderRepository.getSavedOrder();
    expect(savedOrder.getStatus()).toBe(OrderStatus.REJECTED);
  });

  it('cannotApproveRejectedOrder', () => {
    const initialOrder: Order = new OrderBuilder()
      .setStatus(OrderStatus.REJECTED)
      .setId(1)
      .build();
    orderRepository.addOrder(initialOrder);

    const request: OrderApprovalRequest = new OrderApprovalRequestBuilder()
      .setId(1)
      .approve()
      .build();

    expect(() => useCase.run(request)).toThrow(RejectedOrderCannotBeApprovedException);
    expect(orderRepository.getSavedOrder()).toBe(null);
  });

  it('cannotRejectApprovedOrder', () => {
    const initialOrder: Order = new OrderBuilder()
      .setStatus(OrderStatus.APPROVED)
      .setId(1)
      .build();
    orderRepository.addOrder(initialOrder);

    const request: OrderApprovalRequest = new OrderApprovalRequestBuilder()
      .setId(1)
      .deny()
      .build();

    expect(() =>  useCase.run(request)).toThrow(ApprovedOrderCannotBeRejectedException);
    expect(orderRepository.getSavedOrder()).toBe(null);
  });

  it('shippedOrdersCannotBeApproved', () => {
    const initialOrder: Order = new OrderBuilder()
      .setStatus(OrderStatus.SHIPPED)
      .setId(1)
      .build();
    orderRepository.addOrder(initialOrder);

    const request: OrderApprovalRequest = new OrderApprovalRequestBuilder()
      .setId(1)
      .approve()
      .build();

    expect(() => useCase.run(request)).toThrow(ShippedOrdersCannotBeChangedException);
    expect(orderRepository.getSavedOrder()).toBe(null);
  });

  it('shippedOrdersCannotBeRejected', () => {
    const initialOrder: Order = new OrderBuilder()
      .setStatus(OrderStatus.SHIPPED)
      .setId(1)
      .build();
    orderRepository.addOrder(initialOrder);

    const request: OrderApprovalRequest = new OrderApprovalRequestBuilder()
      .setId(1)
      .deny()
      .build();

    expect(() => useCase.run(request)).toThrow(ShippedOrdersCannotBeChangedException);
    expect(orderRepository.getSavedOrder()).toBe(null);
  });
});
