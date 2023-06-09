import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/entities/course.entity';
import { Tag } from 'src/entities/tag.entity';
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
        private readonly courseRepository: Repository<Course>,

        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ) { }
    
    findAll() {
        return this.courseRepository.find({
            relations: ['tags']
        });
    }

    findOne(id: string) {
        const course = this.courseRepository.findOne(id, {
            relations: ['tags']
        });
        /**
         * O NestJs possui ferramentas nativas para tratamento de erros.
         */
        if (!course) {
            throw new NotFoundException(`Course id ${id} not found`);
        }

        return course;
    }

    async create(createCourseDto: CreateCourseDto) {
        const tags = await Promise.all(
            createCourseDto.tags.map(name => this.preloadTagByName(name))
        );
        const course = await this.courseRepository.create({
            ...createCourseDto,
            tags,
        });
        return await this.courseRepository.save(course);
    }

    async update(id: string, updateCourseDto: UpdateCourseDto) {
        /**
         * Se foi enviado tags entao eh executado oque esta entre parenteses.
         */
        const tags = updateCourseDto.tags && (
            await Promise.all(
                updateCourseDto.tags.map(name => this.preloadTagByName(name))
            )
        );
        
        const course = await this.courseRepository.preload({
            id: Number(id),
            ...updateCourseDto,
            tags
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

    private async preloadTagByName(name: string): Promise<Tag> {
        const tag = await this.tagRepository.findOne({ name });

        if (tag) {
            return tag;
        }

        console.log(`Nomes das tags => ${name}`);

        return await this.tagRepository.create({ name });
    }
}
