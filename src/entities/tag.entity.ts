import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Course } from './course.entity';

@Entity('tags')
export class Tag {
    @PrimaryGeneratedColumn('uuid')
    // eslint-disable-next-line indent
    id: string;

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

    @CreateDateColumn({ type: 'timestamp' })
    // eslint-disable-next-line indent
    created_at: Date;

    @BeforeInsert()
    // eslint-disable-next-line indent
    generetedId() {
        if (this.id) {
            return;
        }

        this.id = uuidv4();
    }
}