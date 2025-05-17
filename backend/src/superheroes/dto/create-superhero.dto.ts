import { IsString, IsArray, IsNotEmpty } from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  real_name: string;

  @IsString()
  @IsNotEmpty()
  origin_description: string;

  @IsArray()
  @IsString({ each: true })
  superpowers: string[];

  @IsString()
  @IsNotEmpty()
  catch_phrase: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];
}
