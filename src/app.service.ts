import { Injectable } from '@nestjs/common';

/**
 * Com o @Injectable() significa que eu posso injetar essa classe em outra atraves de um atributo.
 * O @Injectable() tambem serve para definir uma classe como um servico.
 */
@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }
}
