import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn()
    // eslint-disable-next-line indent
    id: number;
    
    @Column()
    // eslint-disable-next-line indent
    name: string;
    
    @Column()
    // eslint-disable-next-line indent
    description: string;
    
    @Column('json', { nullable: true })
    // eslint-disable-next-line indent
    tags: string[];
}