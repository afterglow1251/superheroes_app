export interface Superhero {
  id: number;
  nickname: string;
  real_name: string;
  origin_description: string;
  superpowers: string[];
  catch_phrase: string;
  images: string[];
}

export interface PaginatedSuperheroesResponse {
  data: Superhero[];
  total: number;
  page: number;
  limit: number;
}
