import { BrowserRouter, Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotFound } from "./shared/components/errors/NotFound";
import { SuperheroesListPage } from "./pages/superheroes/SuperheroesListPage";
import { Header } from "./components/layout/Header";
import { SuperheroDetailsPage } from "./pages/superheroes/SuperheroDetailsPage";
import { ROUTES } from "./shared/constants/routes.constants";
import { WithValidId } from "./shared/components/routing/WithValidId";
import { NotificationRenderer } from "./shared/components/ui/app-level/NotificationRenderer";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <NotificationRenderer />
          <Header />

          <main className="p-8">
            <Routes>
              <Route path={ROUTES.HOME} element={<SuperheroesListPage />} />
              <Route
                path={ROUTES.SUPERHEROES_LIST}
                element={<SuperheroesListPage />}
              />
              <Route
                path={ROUTES.SUPERHERO_DETAILS}
                element={
                  <WithValidId>
                    {(id) => <SuperheroDetailsPage id={id} />}
                  </WithValidId>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
