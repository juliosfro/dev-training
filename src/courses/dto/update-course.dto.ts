import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';

/**
 * Os campos sao definidos como opcionais pois o usuario pode nao querer atualizar 
 * todos os campos ao mesmo tempo.
 */
export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
