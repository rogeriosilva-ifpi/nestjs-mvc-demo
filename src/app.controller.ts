import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { AuthExceptionFilter } from './auth/auth-exceptions.filter';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { LoginGuard } from './auth/login.guard';
import { CalcularIMCInput } from './imc.dto';

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index')
  hello(@Query('nome') nome = 'Visitante') {
    const context = {
      nome,
      qtd_letras: nome.length,
    };
    return context;
  }

  @Get('/Login')
  @Render('login')
  form_login(@Req() req, @Res() res: Response) {
    if (req.isAuthenticated()) {
      res.redirect('/');
    }

    return;
  }

  @UseGuards(LoginGuard)
  @Post('/login')
  login(@Req() req, @Res() res: Response) {
    res.redirect('/');
  }

  @Get('/logout')
  logout(@Req() req, @Res() res: Response) {
    req.logout(() => res.redirect('/'));
  }

  @Get('form-imc')
  @Render('imc')
  @UseGuards(AuthenticatedGuard)
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
