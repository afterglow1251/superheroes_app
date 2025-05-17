import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('superheroes')
export class Superhero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  real_name: string;

  @Column({ type: 'text' })
  origin_description: string;

  @Column('simple-array')
  superpowers: string[];

  @Column({ type: 'text' })
  catch_phrase: string;

  @Column('simple-array')
  images: string[];
}
