import { Injectable } from '@nestjs/common';
import { CalcularIMCInput } from './imc.dto';

export interface IMC {
  nome: string;
  peso: number;
  altura: number;
  imc: string;
}

const registros: IMC[] = [];

@Injectable()
export class AppService {
  calcularIMC({ nome, peso, altura }: CalcularIMCInput) {
    const imc = peso / altura ** 2;

    registros.push({ nome, peso, altura, imc: imc.toFixed(2) });

    return imc.toFixed(2);
  }

  obterRegistrosIMC() {
    return registros;
  }
}
