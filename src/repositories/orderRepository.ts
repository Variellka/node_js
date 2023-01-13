import { IOrderRepository } from '../types/types';

import OrderTypegooseRepository from './order/orderTypegooseRepository';
import OrderTypeOrmRepository from './order/orderTypeOrmRepository';

let OrderRepository: IOrderRepository;

function createOrderTypegooseRepository() {
  OrderRepository = new OrderTypegooseRepository();
}

function createOrderTypeOrmRepository() {
  OrderRepository = new OrderTypeOrmRepository();
}

export { createOrderTypegooseRepository, createOrderTypeOrmRepository, OrderRepository };
