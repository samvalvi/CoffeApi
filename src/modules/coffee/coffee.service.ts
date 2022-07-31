import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Coffee } from './coffee.entity';
import { CreateCoffeeDto, UpdateCoffeeDto } from './dto';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  async showCoffees(): Promise<Coffee[]> {
    return await this.coffeeRepository.findBy({ status: true });
  }

  async showCoffee(id: string): Promise<Coffee> {
    return await this.coffeeRepository.findOneBy({ id: id, status: true });
  }

  async showCoffeeByName(name: string): Promise<Coffee> {
    return await this.coffeeRepository.findOneBy({ name: name, status: true });
  }

  async addCoffee(coffee: CreateCoffeeDto): Promise<Coffee> {
    const coffeeDto: Coffee = this.coffeeRepository.create(coffee);
    return await this.coffeeRepository.save(coffeeDto);
  }

  async patchCoffee(id: string, coffee: UpdateCoffeeDto): Promise<Coffee> {
    const coffeeDto: Coffee = await this.coffeeRepository.preload({
      id,
      ...coffee,
    });
    return this.coffeeRepository.save(coffeeDto);
  }

  async changeCoffeeStatus(id: string): Promise<Coffee> {
    const coffeeDto: Coffee = await this.coffeeRepository.findOneBy({ id: id });
    coffeeDto.status = false;
    return this.coffeeRepository.save(coffeeDto);
  }
}
