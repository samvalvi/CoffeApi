import { IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  readonly userId: number;
  readonly products: number[];
}
