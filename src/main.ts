import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    /**
     * O AppModule eh o modulo principal da aplicacao.
     */
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
        /**
       * Todas as propriedades enviadas no objeto que nao estiverem no modelo serao excluidas.
       */
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));
    await app.listen(3000);
}
bootstrap();
