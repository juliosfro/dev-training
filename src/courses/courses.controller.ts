import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
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
    findAll(@Res() response) {
        const courses = this.coursesService.findAll();
        response.status(200).send(courses);
    }
  /**
   * O :id significa que queremos pegar um parametro dinamico na rota.
   * A rota ficara: http://localhost:3000/courses/:id
   */
  @Get(':id') // Podemos receber um ou mais parametros.
  findOne(@Param() params, @Res() response) {
      const course = this.coursesService.findOne(params.id);
      response.status(200).send(course);
  }

  @Get(':idCourse')
  // Podemos usar desestruturacao para pegar parametros pelo nome em especifico.
  findCourseById(@Param('idCourse') idCourse: string, @Res() response) {
      const course = this.coursesService.findOne(idCourse);
      response.status(200).send(course);
  }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto, @Res() response) {
      const course = this.coursesService.create(createCourseDto);
      response.status(201).send(course);
  }

  @Post('name')
  @HttpCode(HttpStatus.CREATED) // Para definir o status http que sera retornado.
  // Podemos usar desestruturacao para pegar infos do body pelo nome em especifico.
  createName(@Body('name') body) {
      return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
      return this.coursesService.update(id, updateCourseDto);
  }
    
  @Delete(':id') // Podemos receber um ou mais parametros.
  remove(@Param('id') id: string) {
      return this.coursesService.remove(id);
  }

}
