import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.entity';

@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn()
    // eslint-disable-next-line indent
    id: number;

    @Column()
    // eslint-disable-next-line indent
    name: string;

    /**
     * O primeiro parametro eh o alvo.
     * Segundo parametro eh de que forma eu pego os dados da entidade inversa.
     */
    @ManyToMany(() => Course, (course: Course) => course.tags)
    // eslint-disable-next-line indent
    courses: Course[];
}