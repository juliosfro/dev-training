import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/entities/course.entity';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

/**
 * Declaracao do service com o decorator @Injectable()
 * Os servicos sao responsaveis pela regra de negocio da aplicacao
 */
@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>
    ) { }
    
    findAll() {
        return this.courseRepository.find();
    }

    findOne(id: string) {
        const course = this.courseRepository.findOne(id);
        /**
         * O NestJs possui ferramentas nativas para tratamento de erros.
         */
        if (!course) {
            throw new NotFoundException(`Course id ${id} not found`);
        }

        return course;
    }

    create(createCourseDto: CreateCourseDto) {
        const course = this.courseRepository.create(createCourseDto);
        return this.courseRepository.save(course);
    }

    async update(id: string, updateCourseDto: UpdateCourseDto) {
        const course = await this.courseRepository.preload({
            id: Number(id),
            ...updateCourseDto
        });
        
        if (!course) {
            throw new NotFoundException(`Course id ${id} not found`);
        }

        return this.courseRepository.save(course);
    }

    async remove(id: string) {
        const course = await this.courseRepository.findOne(id);

        if (!course) {
            throw new NotFoundException(`Course id ${id} not found`);
        }

        return this.courseRepository.remove(course);
    }
}
