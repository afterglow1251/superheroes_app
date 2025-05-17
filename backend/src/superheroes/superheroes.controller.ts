import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { UpdateSuperheroDto } from './dto/update-superhero.dto';
import { PaginationQueryDto } from './dto/common/pagination-query.dto';

@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroService: SuperheroesService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createSuperheroDto: CreateSuperheroDto) {
    return this.superheroService.create(createSuperheroDto);
  }

  @Get()
  findAll(@Query() pagination: PaginationQueryDto) {
    const { page, limit } = pagination;
    return this.superheroService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.superheroService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSuperheroDto: UpdateSuperheroDto,
  ) {
    return this.superheroService.update(id, updateSuperheroDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.superheroService.delete(id);
  }
}
