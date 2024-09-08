import Category from '../../src/domain/Category';
import Order from '../../src/domain/Order/Order';
import { OrderStatus } from '../../src/domain/OrderStatus';
import Product from '../../src/domain/Product';
import { ProductCatalog } from '../../src/repository/ProductCatalog';
import OrderCreationUseCase from '../../src/useCase/OrderCreationUseCase';
import SellItemRequest from '../../src/domain/SellItemRequest';
import UnknownProductException from '../../src/useCase/Exceptions/UnknownProductException';
import InMemoryProductCatalog from '../doubles/InMemoryProductCatalog';
import TestOrderRepository from '../doubles/TestOrderRepository';

describe('OrderApprovalUseCase', () => {
  const orderRepository: TestOrderRepository = new TestOrderRepository();
  const food: Category = new Category('foo', 10);

  const saladProduct = new Product('salad', 3.56, food);
  const tomatoProduct = new Product('tomato', 4.65, food);
  const productCatalog: ProductCatalog = new InMemoryProductCatalog([ saladProduct, tomatoProduct]);
  const useCase: OrderCreationUseCase = new OrderCreationUseCase(orderRepository, productCatalog);

  it('sellMultipleItems', () => {
    const saladRequest: SellItemRequest = new SellItemRequest('salad', 2);
    const tomatoRequest: SellItemRequest = new SellItemRequest('tomato', 3);

    const request: SellItemRequest[] = [saladRequest, tomatoRequest];

    useCase.run(request);

    const insertedOrder: Order = orderRepository.getSavedOrder();
    expect(insertedOrder.getStatus()).toBe(OrderStatus.CREATED);
    expect(insertedOrder.computeTotal()).toBe(23.20);
    expect(insertedOrder.computeTaxAmount()).toBe((2.13));
    expect(insertedOrder.getItems().length).toBe(2);
    expect(insertedOrder.getItems()[0].getProduct().getName()).toBe('salad');
    expect(insertedOrder.getItems()[0].getProduct().getPrice()).toBe(3.56);
    expect(insertedOrder.getItems()[0].getQuantity()).toBe(2);
    expect(insertedOrder.getItems()[0].computeTaxIncludedPrice()).toBe(7.84);
    expect(insertedOrder.getItems()[0].computeTax()).toBe(0.72);
    expect(insertedOrder.getItems()[1].getProduct().getName()).toBe('tomato');
    expect(insertedOrder.getItems()[1].getProduct().getPrice()).toBe(4.65);
    expect(insertedOrder.getItems()[1].getQuantity()).toBe(3);
    expect(insertedOrder.getItems()[1].computeTaxIncludedPrice()).toBe(15.36);
    expect(insertedOrder.getItems()[1].computeTax()).toBe(1.41);
  });

  it('unknownProduct', () => {
    const unknownProductRequest: SellItemRequest = new SellItemRequest('unknown product', 1);

    const request: SellItemRequest[] = [unknownProductRequest];

    expect(() => useCase.run(request)).toThrow(UnknownProductException);
  });
});
