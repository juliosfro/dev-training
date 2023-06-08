import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

/**
 * O decorator serve para definir uma classe como um modulo.
 */
@Module({
    controllers: [CoursesController],
    providers: [CoursesService],
})
export class CoursesModule {}
