import { IsString } from 'class-validator';

/**
 * Essa classe tera qual a estrutura que o metodo create ira receber.
 * Dto nao possui logica e nem metodos.
 */
export class CreateCourseDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsString({
        each: true
    })
    readonly tags: string[];
}
