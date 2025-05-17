import { Superhero } from '../entities/superhero.entity';

export interface PaginatedSuperheroes {
  data: Pick<Superhero, 'id' | 'nickname' | 'images'>[];
  total: number;
  page: number;
  limit: number;
}
