import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './courses/courses.module';

@Module({
    /**
     * Modulos normalmente contem uma controller e um service.
     * Um modulo pode importar outros modulos para dentro de si, como o app.module que eh o raiz.
     */
    imports: [CoursesModule, TypeOrmModule.forRoot({
        type: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        entities: [
            __dirname + '/**/*.entity.js'
        ],
        /**
         * Serve para buscar as informacoes referentes as entidades.
         */
        autoLoadEntities: false,
        /**
         * Nao eh recomendado usar em producao.
         */
        synchronize: false
    })],
    controllers: [AppController],
    /**
     * providers sao os provedores de servicos e sao decorados com o @Injectable
     */
    providers: [AppService],
})
export class AppModule {}
