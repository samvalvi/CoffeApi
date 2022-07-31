import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('order')
export class OrderController {
  @Get()
  getOrders() {}

  @Get('/:id')
  getOrder() {}

  @Post()
  createOrder() {}

  @Patch('/:id')
  updateOrder() {}

  @Delete('/:id')
  deleteOrder() {}
}
