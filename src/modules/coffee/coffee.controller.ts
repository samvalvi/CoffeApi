import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CoffeeService } from './coffee.service';
import { CoffeeDto, CreateCoffeeDto, UpdateCoffeeDto } from './dto';

@Controller('coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Get()
  async getCoffees(): Promise<CoffeeDto[]> {
    return await this.coffeeService.showCoffees();
  }

  @Get('/:id')
  async getCoffee(id: string): Promise<CoffeeDto> {
    const coffee = await this.coffeeService.showCoffee(id);

    if (!coffee) {
      throw new HttpException('Coffee not found', HttpStatus.NOT_FOUND);
    }

    return coffee;
  }

  @Post()
  async createCoffee(@Body() coffee: CreateCoffeeDto): Promise<CoffeeDto> {
    const exist = await this.coffeeService.showCoffeeByName(coffee.name);
    if (exist) {
      throw new HttpException('Coffee already exists', HttpStatus.CONFLICT);
    }

    const result = await this.coffeeService.addCoffee(coffee);

    if (!result) {
      throw new HttpException('Coffee not created', HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Patch('/:id')
  async updateCoffee(@Param('id') id: string, @Body() coffee: UpdateCoffeeDto) {
    const exist = await this.coffeeService.showCoffee(id);
    if (!exist) {
      throw new HttpException('Coffee not found', HttpStatus.NOT_FOUND);
    }

    const result = await this.coffeeService.patchCoffee(id, coffee);

    if (!result) {
      throw new HttpException('Coffee not updated', HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Delete('/:id')
  async deleteCoffee(@Param('id') id: string): Promise<CoffeeDto> {
    const coffee = await this.coffeeService.showCoffee(id);

    if (!coffee) {
      throw new HttpException('Coffee not found', HttpStatus.NOT_FOUND);
    }

    const result = await this.coffeeService.changeCoffeeStatus(id);

    if (!result) {
      throw new HttpException('Coffee not deleted', HttpStatus.BAD_REQUEST);
    }

    return result;
  }
}
