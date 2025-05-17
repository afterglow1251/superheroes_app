import { Module } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { SuperheroesController } from './superheroes.controller';
import { Superhero } from './entities/superhero.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Superhero])],
  controllers: [SuperheroesController],
  providers: [SuperheroesService],
  exports: [SuperheroesService],
})
export class SuperheroesModule {}
