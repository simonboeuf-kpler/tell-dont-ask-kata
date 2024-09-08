import Order from '../../src/domain/Order/Order';
import {OrderStatus} from '../../src/domain/Order/OrderStatus';
import ApprovedOrderCannotBeRejectedException from '../../src/domain/Exceptions/ApprovedOrderCannotBeRejectedException';
import OrderApprovalRequest from '../../src/domain/OrderApprovalRequest/OrderApprovalRequest';
import OrderApprovalUseCase from '../../src/useCase/OrderApprovalUseCase';
import RejectedOrderCannotBeApprovedException from '../../src/domain/Exceptions/RejectedOrderCannotBeApprovedException';
import ShippedOrdersCannotBeChangedException from '../../src/domain/Exceptions/ShippedOrdersCannotBeChangedException';
import TestOrderRepository from '../doubles/TestOrderRepository';
import TestOrderBuilder from '../doubles/TestOrderBuilder';

describe('OrderApprovalUseCase', () => {
  let orderRepository: TestOrderRepository;
  let useCase: OrderApprovalUseCase;

  beforeEach( () => {
    orderRepository = new TestOrderRepository();
    useCase = new OrderApprovalUseCase(orderRepository);
  });
  it('approvedExistingOrder', () => {
    const initialOrder: Order = new TestOrderBuilder()
      .setStatus(OrderStatus.CREATED)
      .setId(1)
      .build();
    orderRepository.addOrder(initialOrder);

    const request: OrderApprovalRequest = new OrderApprovalRequest(1, true);

    useCase.run(request);

    const savedOrder: Order = orderRepository.getSavedOrder();
    expect(savedOrder.status).toBe(OrderStatus.APPROVED);
  });

  it('rejectedExistingOrder', () => {
    const initialOrder: Order = new TestOrderBuilder()
      .setStatus(OrderStatus.CREATED)
      .setId(1)
      .build();

    orderRepository.addOrder(initialOrder);

    const request: OrderApprovalRequest = new OrderApprovalRequest(1, false);

    useCase.run(request);

    const savedOrder: Order = orderRepository.getSavedOrder();
    expect(savedOrder.status).toBe(OrderStatus.REJECTED);
  });

  it('cannotApproveRejectedOrder', () => {
    const initialOrder: Order = new TestOrderBuilder()
      .setStatus(OrderStatus.REJECTED)
      .setId(1)
      .build();
    orderRepository.addOrder(initialOrder);

    const request: OrderApprovalRequest = new OrderApprovalRequest(1, true);

    expect(() => useCase.run(request)).toThrow(RejectedOrderCannotBeApprovedException);
    expect(orderRepository.getSavedOrder()).toBe(null);
  });

  it('cannotRejectApprovedOrder', () => {
    const initialOrder: Order = new TestOrderBuilder()
      .setStatus(OrderStatus.APPROVED)
      .setId(1)
      .build();
    orderRepository.addOrder(initialOrder);

    const request: OrderApprovalRequest = new OrderApprovalRequest(1, false);

    expect(() =>  useCase.run(request)).toThrow(ApprovedOrderCannotBeRejectedException);
    expect(orderRepository.getSavedOrder()).toBe(null);
  });

  it('shippedOrdersCannotBeApproved', () => {
    const initialOrder: Order = new TestOrderBuilder()
      .setStatus(OrderStatus.SHIPPED)
      .setId(1)
      .build();
    orderRepository.addOrder(initialOrder);

    const request: OrderApprovalRequest = new OrderApprovalRequest(1, true);

    expect(() => useCase.run(request)).toThrow(ShippedOrdersCannotBeChangedException);
    expect(orderRepository.getSavedOrder()).toBe(null);
  });

  it('shippedOrdersCannotBeRejected', () => {
    const initialOrder: Order = new TestOrderBuilder()
      .setStatus(OrderStatus.SHIPPED)
      .setId(1)
      .build();
    orderRepository.addOrder(initialOrder);

    const request: OrderApprovalRequest = new OrderApprovalRequest(1, false);

    expect(() => useCase.run(request)).toThrow(ShippedOrdersCannotBeChangedException);
    expect(orderRepository.getSavedOrder()).toBe(null);
  });
});
