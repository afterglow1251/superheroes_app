import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuperheroesService } from '../superheroes.service';
import { Superhero } from '../entities/superhero.entity';
import { CreateSuperheroDto } from '../dto/create-superhero.dto';
import { UpdateSuperheroDto } from '../dto/update-superhero.dto';
import { NotFoundException } from '@nestjs/common';
import { PaginatedSuperheroes } from '../types/superhero.types';

describe('SuperheroesService', () => {
  let service: SuperheroesService;
  let repository: Repository<Superhero>;

  const mockSuperhero: Superhero = {
    id: 1,
    nickname: 'Batman',
    real_name: 'Bruce Wayne',
    origin_description: 'Parents got murdered',
    superpowers: ['rich', 'martial arts'],
    catch_phrase: 'I am Batman!',
    images: ['batman.jpg'],
  };

  const mockPaginatedResult: PaginatedSuperheroes = {
    data: [mockSuperhero],
    total: 1,
    page: 1,
    limit: 10,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SuperheroesService,
        {
          provide: getRepositoryToken(Superhero),
          useValue: {
            create: jest.fn().mockReturnValue(mockSuperhero),
            save: jest.fn().mockResolvedValue(mockSuperhero),
            findAndCount: jest.fn().mockResolvedValue([[mockSuperhero], 1]),
            findOneBy: jest.fn().mockResolvedValue(mockSuperhero),
            merge: jest.fn().mockReturnValue(mockSuperhero),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<SuperheroesService>(SuperheroesService);
    repository = module.get<Repository<Superhero>>(
      getRepositoryToken(Superhero),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully create a superhero', async () => {
      const createDto: CreateSuperheroDto = {
        nickname: 'Batman',
        real_name: 'Bruce Wayne',
        origin_description: 'Parents got murdered',
        superpowers: ['rich', 'martial arts'],
        catch_phrase: 'I am Batman!',
        images: ['batman.jpg'],
      };

      const result = await service.create(createDto);
      expect(repository.create).toHaveBeenCalledWith(createDto);
      expect(repository.save).toHaveBeenCalled();
      expect(result).toEqual(mockSuperhero);
    });
  });

  describe('findAll()', () => {
    it('should return paginated superheroes', async () => {
      const result = await service.findAll(1, 10);
      expect(repository.findAndCount).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        select: ['id', 'nickname', 'images'],
        order: { id: 'ASC' },
      });
      expect(result).toEqual(mockPaginatedResult);
    });
  });

  describe('findOne()', () => {
    it('should return a single superhero', async () => {
      const result = await service.findOne(1);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(mockSuperhero);
    });

    it('should throw NotFoundException if superhero not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update()', () => {
    it('should update a superhero', async () => {
      const updateDto: UpdateSuperheroDto = { nickname: 'Dark Knight' };
      const result = await service.update(1, updateDto);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(repository.merge).toHaveBeenCalledWith(mockSuperhero, updateDto);
      expect(repository.save).toHaveBeenCalledWith(mockSuperhero);
      expect(result).toEqual(mockSuperhero);
    });

    it('should throw NotFoundException if superhero not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);
      await expect(service.update(999, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete()', () => {
    it('should delete a superhero', async () => {
      await service.delete(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if superhero not found', async () => {
      jest
        .spyOn(repository, 'delete')
        .mockResolvedValue({ affected: 0 } as any);
      await expect(service.delete(999)).rejects.toThrow(NotFoundException);
    });
  });
});
