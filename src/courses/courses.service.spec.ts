import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

describe('CourseService', () => {
    let service: CoursesService;

    /**
     * Funciona como um hook e sera executado antes de cada teste.
     * O beforeAll serve como uma variavel global para todos os testes.
     */
    beforeEach(async () => {
        /**
         * Cria um modulo para depois chamar o service que queremos testar.
         * Serve extamente para requerer o service que queremos testar atraves de injecao
         * de dependencia.
         * O createTestingModule recebe um objeto com a mesma estrutura do modulo que queremos
         * testar, nao eh necessario passar toda a estrutura do objeto, somente o necessario.
         */
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CoursesService,
                /**
                 * Podemos declarar um provedor para cada repositorio que necessitarmos.
                 */
                {
                    provide: Connection, useValue: {}
                },
                {
                    provide: getRepositoryToken(Course), useValue: {}
                },
                {
                    provide: getRepositoryToken(Tag), useValue: {}
                }
            ],
        }).compile();

        /**
         * Eu pego o service atraves do module com o metodo get
         */
        service = module.get<CoursesService>(CoursesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
