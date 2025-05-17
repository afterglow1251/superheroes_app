import { HttpService } from "./http.service";
import type {
  PaginatedSuperheroesResponse,
  Superhero,
} from "../types/superheroes/superheroes.types";
import { SUPERHEROES_PER_PAGE } from "../constants/pagination.constants";

export class SuperheroService {
  private readonly http: HttpService;

  constructor() {
    this.http = new HttpService();
  }

  async createSuperhero(superhero: Omit<Superhero, "id">) {
    const res = await this.http.post<Superhero>({
      url: "superheroes",
      data: superhero,
    });
    return res.data;
  }

  async getSuperhero(id: number) {
    const res = await this.http.get<Superhero>({ url: `superheroes/${id}` });
    return res.data;
  }

  async getSuperheroes(page = 1) {
    const res = await this.http.get<PaginatedSuperheroesResponse>({
      url: `superheroes?page=${page}&limit=${SUPERHEROES_PER_PAGE}`,
    });
    return res.data;
  }

  async updateSuperhero(id: number, updatedData: Partial<Superhero>) {
    const res = await this.http.patch<Superhero>({
      url: `superheroes/${id}`,
      data: updatedData,
    });
    return res.data;
  }

  async deleteSuperhero(id: number): Promise<void> {
    await this.http.delete<void>({ url: `superheroes/${id}` });
  }
}

export const superheroService = new SuperheroService();
