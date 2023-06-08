import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Para a classe ser tratada como um controller eh necessario usar o decorator @Controller()
 */
@Controller()
export class AppController {
  /**
   * O appService eh recebido no construtor atraves de injecao de dependencia.
   */
  constructor(private readonly appService: AppService) {}

  /**
   * O metodo http a ser utilizado eh definido por meio de decorator.
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
