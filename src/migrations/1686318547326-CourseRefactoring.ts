import { MigrationInterface, QueryRunner } from 'typeorm';

export class CourseRefactoring1686318547326 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE courses rename column name to course'
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'ALTER TABLE courses rename column course to name'
        );
    }

}
