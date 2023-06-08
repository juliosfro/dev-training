import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entities/course.entity';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

/**
 * O decorator serve para definir uma classe como um modulo.
 */
@Module({
    imports: [TypeOrmModule.forFeature([
        Course
    ])],
    controllers: [CoursesController],
    providers: [CoursesService],
})
export class CoursesModule { }
