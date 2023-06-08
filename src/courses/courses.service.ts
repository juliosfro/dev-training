import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from 'src/entities/course.entity';

/**
 * Declaracao do service com o decorator @Injectable()
 * Os servicos sao responsaveis pela regra de negocio da aplicacao
 */
@Injectable()
export class CoursesService {
    private courses: Course[] = [
        {
            id: 1,
            name: 'Fundamentos do framework NestJs',
            description: 'Fundamentos do framework NestJs',
            tags: ['node.js', 'nestjs', 'typescript']
        }
    ];

    findAll() {
        return this.courses;
    }

    findOne(id: string) {
        const course = this.courses.find((course: Course) => course.id === Number(id));
        /**
         * O NestJs possui ferramentas nativas para tratamento de erros.
         */
        if (!course) {
            throw new HttpException(`Course id ${id} not found`, HttpStatus.NOT_FOUND);
        }

        return course;
    }

    create(createCourseDto) {
        this.courses.push(createCourseDto);
        return createCourseDto;
    }

    update(id: string, updateCourseDto) {
        const indexCourse = this.courses.findIndex((course: Course) => course.id === Number(id));
        this.courses[indexCourse] = updateCourseDto;
    }

    remove(id: string) {
        const indexCourse = this.courses.findIndex((course: Course) => course.id === Number(id));
        if (indexCourse >= 0) {
            this.courses.splice(indexCourse, 1);
        }      
    }
}
