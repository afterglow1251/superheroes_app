import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SuperheroesModule } from './superheroes/superheroes.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    SuperheroesModule,
  ],
})
export class AppModule {}
