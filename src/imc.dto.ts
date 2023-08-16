import { Contains, IsNumber, Max, Min } from 'class-validator';

export class CalcularIMCInput {
  @Contains('Rog')
  nome: string;

  @IsNumber()
  @Min(40)
  @Max(200)
  peso: number;
  altura: number;
}
