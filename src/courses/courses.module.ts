import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

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
