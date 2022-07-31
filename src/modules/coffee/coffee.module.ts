import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CoffeeService } from './coffee.service';
import { CoffeeController } from './coffee.controller';
import { Coffee } from './coffee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee])],
  providers: [CoffeeService],
  controllers: [CoffeeController],
})
export class CoffeeModule {}
