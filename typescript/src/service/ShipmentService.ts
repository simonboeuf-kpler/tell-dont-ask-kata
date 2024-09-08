import Order from '../domain/Order/Order';

export interface ShipmentService {
  ship(order: Order): void;
}
