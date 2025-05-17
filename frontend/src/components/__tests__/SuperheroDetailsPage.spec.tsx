import { fireEvent, render, screen } from "@testing-library/react";
import { SuperheroDetailsPage } from "../../pages/superheroes/SuperheroDetailsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import { superheroService } from "../../shared/services/superhero.service";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../shared/services/superhero.service");
vi.mock("../../shared/hooks/notifications.hook", () => ({
  useAppNotification: () => ({
    contextHolder: null,
    openSuccess: vi.fn(),
    openError: vi.fn(),
  }),
}));

describe("SuperheroDetailsPage", () => {
  const mockSuperhero = {
    id: 1,
    nickname: "Spider-Man",
    real_name: "Peter Parker",
    origin_description: "Bitten by a radioactive spider",
    superpowers: ["Web-slinging", "Spider-sense"],
    catch_phrase: "With great power comes great responsibility",
    images: [
      "https://cdn.marvel.com/u/prod/marvel/i/mg/2/60/537bcaef0f6cf/standard_incredible.jpg",
    ],
  };

  it("should display superhero details", async () => {
    vi.mocked(superheroService.getSuperhero).mockResolvedValue(mockSuperhero);

    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter>
          <SuperheroDetailsPage id={1} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(await screen.findByText("Spider-Man"));
    expect(screen.getByText("Peter Parker"));
    expect(screen.getByText("Web-slinging"));
  });

  it("should handle superhero deletion", async () => {
    vi.mocked(superheroService.deleteSuperhero).mockResolvedValue(undefined);

    render(
      <QueryClientProvider client={new QueryClient()}>
        <MemoryRouter>
          <SuperheroDetailsPage id={1} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const deleteButton = await screen.findByText("Delete");
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByText("Yes");
    fireEvent.click(confirmButton);

    expect(superheroService.deleteSuperhero).toHaveBeenCalledWith(1);
  });
});
