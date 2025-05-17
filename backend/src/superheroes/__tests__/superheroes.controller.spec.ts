import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesController } from '../superheroes.controller';
import { SuperheroesService } from '../superheroes.service';
import { CreateSuperheroDto } from '../dto/create-superhero.dto';
import { UpdateSuperheroDto } from '../dto/update-superhero.dto';
import { PaginationQueryDto } from '../dto/common/pagination-query.dto';
import { Superhero } from '../entities/superhero.entity';
import { PaginatedSuperheroes } from '../types/superhero.types';

describe('SuperheroesController', () => {
  let controller: SuperheroesController;
  let service: SuperheroesService;

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
      controllers: [SuperheroesController],
      providers: [
        {
          provide: SuperheroesService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockSuperhero),
            findAll: jest.fn().mockResolvedValue(mockPaginatedResult),
            findOne: jest.fn().mockResolvedValue(mockSuperhero),
            update: jest.fn().mockResolvedValue(mockSuperhero),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<SuperheroesController>(SuperheroesController);
    service = module.get<SuperheroesService>(SuperheroesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new superhero', async () => {
      const createDto: CreateSuperheroDto = {
        nickname: 'Batman',
        real_name: 'Bruce Wayne',
        origin_description: 'Parents got murdered',
        superpowers: ['rich', 'martial arts'],
        catch_phrase: 'I am Batman!',
        images: ['batman.jpg'],
      };

      const result = await controller.create(createDto);
      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockSuperhero);
    });
  });

  describe('findAll()', () => {
    it('should return paginated superheroes', async () => {
      const paginationDto: PaginationQueryDto = { page: 1, limit: 10 };
      const result = await controller.findAll(paginationDto);

      expect(service.findAll).toHaveBeenCalledWith(
        paginationDto.page,
        paginationDto.limit,
      );
      expect(result).toEqual(mockPaginatedResult);
    });
  });

  describe('findOne()', () => {
    it('should return a single superhero', async () => {
      const result = await controller.findOne(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockSuperhero);
    });
  });

  describe('update()', () => {
    it('should update a superhero', async () => {
      const updateDto: UpdateSuperheroDto = { nickname: 'Dark Knight' };
      const result = await controller.update(1, updateDto);

      expect(service.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual(mockSuperhero);
    });
  });

  describe('delete()', () => {
    it('should delete a superhero', async () => {
      await expect(controller.delete(1)).resolves.toBeUndefined();
      expect(service.delete).toHaveBeenCalledWith(1);
    });
  });
});
