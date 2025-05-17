import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Superhero } from './entities/superhero.entity';
import { Repository } from 'typeorm';
import { PaginatedSuperheroes } from './types/superhero.types';

@Injectable()
export class SuperheroesService {
  constructor(
    @InjectRepository(Superhero)
    private superheroRepository: Repository<Superhero>,
  ) {}

  async create(createSuperheroDto: CreateSuperheroDto) {
    const superhero = this.superheroRepository.create(createSuperheroDto);
    return this.superheroRepository.save(superhero);
  }

  async findAll(page: number, limit: number): Promise<PaginatedSuperheroes> {
    const offset = (page - 1) * limit;
    const [data, total] = await this.superheroRepository.findAndCount({
      skip: offset,
      take: limit,
      select: ['id', 'nickname', 'images'],
      order: {
        id: 'ASC',
      },
    });

    return { data, total, page, limit };
  }

  async findOne(id: number): Promise<Superhero> {
    const superhero = await this.superheroRepository.findOneBy({ id });
    if (!superhero) {
      throw new NotFoundException(`Superhero with ID ${id} not found`);
    }
    return superhero;
  }

  async update(
    id: number,
    updateSuperheroDto: UpdateSuperheroDto,
  ): Promise<Superhero> {
    const superhero = await this.findOne(id);
    const updatedSuperhero = this.superheroRepository.merge(
      superhero,
      updateSuperheroDto,
    );
    return this.superheroRepository.save(updatedSuperhero);
  }

  async delete(id: number): Promise<void> {
    const result = await this.superheroRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Superhero with ID ${id} not found`);
    }
  }
}
