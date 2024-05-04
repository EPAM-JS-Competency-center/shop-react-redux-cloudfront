import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';


@Module({
  imports: [ OrderModule ],
  providers: [ CartService ],
  controllers: [ CartController ]
})
export class CartModule {}
