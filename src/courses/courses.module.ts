import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entities/course.entity';
import { Tag } from 'src/entities/tag.entity';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

/**
 * O decorator serve para definir uma classe como um modulo.
 */
@Module({
    imports: [TypeOrmModule.forFeature([
        /**
         * Aqui estao declaradas todas as entidades que o modulo de cursos pode manipular.
         */
        Course,
        Tag
    ])],
    controllers: [CoursesController],
    providers: [CoursesService],
})
export class CoursesModule { }
