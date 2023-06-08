import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

/**
 * O prefixo courses se refere ao end-point por onde receberemos a requisicao.
 */
@Controller('courses')
export class CoursesController {
    /**
     * O atributo dentro do construtor eh o responsavel por receber a instancia do servico.
     * Nao eh necessario implementar nada no construtor, apenas declarar o atributo.
     * Todos os metodos do servico ficarao disponiveis dentro do controller.
     * O controller passa para o servico a responsabilidade de lidar com as regras de negocio.
     */
    constructor(private readonly coursesService: CoursesService) {} 

  /**
   * Exemplo de como ficara a rota: http://localhost:3000/courses/list
   */
  @Get('list')
    async findAll(@Res() response) {
        const courses = await this.coursesService.findAll();
        response.status(200).send(courses);
    }
  /**
   * O :id significa que queremos pegar um parametro dinamico na rota.
   * A rota ficara: http://localhost:3000/courses/:id
   */
  @Get(':id') // Podemos receber um ou mais parametros.
  async findOne(@Param() params, @Res() response) {
      const course = await this.coursesService.findOne(params.id);
      response.status(200).send(course);
  }

  @Get(':idCourse')
  // Podemos usar desestruturacao para pegar parametros pelo nome em especifico.
  async findCourseById(@Param('idCourse') idCourse: string, @Res() response) {
      const course = await this.coursesService.findOne(idCourse);
      response.status(200).send(course);
  }

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto, @Res() response) {
      const course = await this.coursesService.create(createCourseDto);
      response.status(201).send(course);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
      return await this.coursesService.update(id, updateCourseDto);
  }
    
  @Delete(':id') // Podemos receber um ou mais parametros.
  async remove(@Param('id') id: string) {
      return await this.coursesService.remove(id);
  }

}
