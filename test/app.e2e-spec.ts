import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
    let app: INestApplication;

    /**
     * Significa que fara uma unica vez antes de tudo.
     */
    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        /**
          * Serve para instanciar a aplicacao como um todo.
          * Atraves da instancia do app podemos simular toda a execucao da aplicacao.
          */
        app = moduleFixture.createNestApplication();
        await app.init();
    });
  
    /**
     * Significa que fara uma unica vez depois de tudo.
     */
    afterAll(async () => {
        /**
         * Vai fechar a conexao com o banco de dados.
         */
        await app.close();
    });

    it('/ (GET)', () => {
        /**
         * Estamos simulando uma requisicao http com auxilio da biblioteca supertest.
         * O supertest serve para testar solicitacoes http.
         */
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!');
    });
});
