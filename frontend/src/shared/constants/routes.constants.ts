export const ROUTES = {
  HOME: "/",
  SUPERHEROES_LIST: "/superheroes",
  SUPERHERO_DETAILS: "/superheroes/:id",
};

export const NAVIGATE_ROUTES = {
  home: () => ROUTES.HOME,
  superheroesList: () => ROUTES.SUPERHEROES_LIST,
  superheroDetails: (id: number) =>
    ROUTES.SUPERHERO_DETAILS.replace(":id", String(id)),
};
