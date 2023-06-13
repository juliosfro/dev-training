/* eslint-disable indent */
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Tag } from './tag.entity';

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    name: string;
    
    @Column()
    description: string;
    
    /**
     * O @JoinTable() deve estar do lado principal da relacao.
     */
    @JoinTable({ name: 'courses_tags' })
    @ManyToMany(() => Tag, (tag: Tag) => tag.courses, {
        cascade: true
    })
    tags: Tag[];

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @BeforeInsert()
    generetedId() {
        if (this.id) {
            return;
        }

        this.id = uuidv4();
    }
}