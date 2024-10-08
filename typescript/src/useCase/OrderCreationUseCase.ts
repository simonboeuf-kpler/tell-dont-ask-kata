import OrderItem from '../domain/Order/OrderItem';
import Product from '../domain/Product';
import OrderRepository from '../repository/OrderRepository';
import { ProductCatalog } from '../repository/ProductCatalog';
import UnknownProductException from '../domain/Exceptions/UnknownProductException';

import OrderBuilder from '../domain/Order/OrderBuilder';
import SellItemRequest from '../domain/SellItemRequest';

class OrderCreationUseCase {
  private readonly orderRepository: OrderRepository;
  private readonly productCatalog: ProductCatalog;

  public constructor(orderRepository: OrderRepository, productCatalog: ProductCatalog) {
    this.orderRepository = orderRepository;
    this.productCatalog = productCatalog;
  }

  public run(request: SellItemRequest[]): void {
    const orderBuilder = new OrderBuilder();

    for (const itemRequest of request) {
      const product: Product = this.productCatalog.getByName(itemRequest.productName);

      if (product === undefined) {
        throw new UnknownProductException();
      }

      else {
        const orderItem: OrderItem = new OrderItem(product, itemRequest.quantity);
        orderBuilder.addItem(orderItem);
      }
    }

    this.orderRepository.save(orderBuilder.build());
  }
}

export default OrderCreationUseCase;
