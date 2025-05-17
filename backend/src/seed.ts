import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed/seed.module';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(SeedModule);
  const seedService = appContext.get(SeedService);

  await seedService.seed();
  await appContext.close();

  console.log('✅ Seeding completed!');
}

bootstrap();
