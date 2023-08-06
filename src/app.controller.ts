import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { CalcularIMCInput } from './imc.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  hello(@Query('nome') nome: string) {
    const context = {
      name: nome || 'Rogério',
    };

    return context;
  }

  @Get('form-imc')
  @Render('imc')
  formIMC(@Query('imc') imc: string) {
    const registros = this.appService.obterRegistrosIMC();
    const context = { imc, registros };
    return context;
  }

  @Post('calcular-imc')
  calcularIMC(@Res() res: Response, @Body() input: CalcularIMCInput) {
    const imc = this.appService.calcularIMC(input);
    res.redirect(`/form-imc?imc=${imc}`);
  }
}
