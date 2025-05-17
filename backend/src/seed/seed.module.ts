import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SuperheroesModule } from 'src/superheroes/superheroes.module';
import { DatabaseModule } from 'src/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, SuperheroesModule],
  providers: [SeedService],
})
export class SeedModule {}
