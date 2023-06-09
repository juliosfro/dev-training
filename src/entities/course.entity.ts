/* eslint-disable indent */
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from './tag.entity';

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    description: string;
    
    /**
     * O @JoinTable() deve estar do lado principal da relacao.
     */
    @JoinTable()
    @ManyToMany(() => Tag, (tag: Tag) => tag.courses, {
        cascade: true
    })
    tags: Tag[];
}