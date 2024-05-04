import { Module } from '@nestjs/common';
import { OrderService } from './services';

@Module({
  providers: [ OrderService ],
  exports: [ OrderService ]
})
export class OrderModule {}
