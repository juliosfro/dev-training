import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({
    findOne: jest.fn(),
});

describe('CourseService', () => {
    let service: CoursesService;
    let courseRepository: MockRepository;

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
                    provide: getRepositoryToken(Course),
                    useValue: createMockRepository()
                },
                {
                    provide: getRepositoryToken(Tag),
                    useValue: createMockRepository()
                }
            ],
        }).compile();

        /**
         * Eu pego o service atraves do module com o metodo get
         */
        service = module.get<CoursesService>(CoursesService);
        courseRepository = module.get<MockRepository>(getRepositoryToken(Course));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    /**
     * Criacao de um novo bloco de testes.
     * Podemos colocar um describe dentro do outro.
     */
    describe('findOne', () => {
        describe('buscar curso pelo ID', () => {
            it('deve retornar o objeto Course', async () => {
                const courseId = '1';
                const expectedCourse = {};

                courseRepository.findOne.mockReturnValue(expectedCourse);

                const course = await service.findOne(courseId);
                expect(course).toEqual(expectedCourse);
                
            });

            it('deve retornar um NotFoundException', () => { });
            it('deve retornar um NotFoundException', async () => {
                const courseId = '1';
                courseRepository.findOne.mockReturnValue(undefined);

                try {
                    await service.findOne(courseId);
                } catch (error) {
                    expect(error).toBeInstanceOf(NotFoundException);
                    expect(error.message).toEqual(`Course ID ${courseId} not found`);
                }
            });
        });
    });
});
