import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { PaginatedSuperheroesResponse } from "../../shared/types/superheroes/superheroes.types";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import { Spinner } from "../../shared/components/ui/Spinner";
import { useNavigate, useSearchParams } from "react-router";
import { SuperheroCard } from "../../components/superheroes/SuperheroCard";
import { NoData } from "../../shared/components/common/NoData";
import { NAVIGATE_ROUTES } from "../../shared/constants/routes.constants";
import { superheroService } from "../../shared/services/superhero.service";
import { SUPERHEROES_PER_PAGE } from "../../shared/constants/pagination.constants";

const fetchSuperheroes = async (page: number) => {
  return await superheroService.getSuperheroes(page);
};

export function SuperheroesListPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = parseInt(searchParams.get("page") ?? "1", 10) || 1;
  const [page, setPage] = useState<number>(pageFromUrl);

  const { data, isPending, error } = useQuery<
    PaginatedSuperheroesResponse,
    Error
  >({
    queryKey: ["superheroes", page],
    queryFn: () => fetchSuperheroes(page),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!data) return;

    const totalPages = Math.max(
      1,
      Math.ceil(data.total / SUPERHEROES_PER_PAGE)
    );
    if (page > totalPages) {
      setPage(totalPages);
      setSearchParams({ page: totalPages.toString() });
    }
  }, [data, page, setSearchParams]);

  const navigate = useNavigate();

  if (isPending) return <Spinner />;
  if (error) return <div>{error.message}</div>;
  if (data.data.length === 0) return <NoData />;

  const totalElems = data.total;

  const onPageChange = (page: number) => {
    setPage(page);
    setSearchParams({ page: page.toString() });
  };

  const handleClickCard = (id: number) => {
    navigate(NAVIGATE_ROUTES.superheroDetails(id), {
      state: { from: location.pathname + location.search },
    });
  };

  return (
    <>
      <div className="flex flex-row flex-wrap justify-center gap-11 mt-8">
        {data.data.map((superhero) => (
          <SuperheroCard
            key={superhero.id}
            superhero={superhero}
            onClick={() => handleClickCard(superhero.id)}
          />
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Pagination
          current={page}
          total={totalElems}
          pageSize={SUPERHEROES_PER_PAGE}
          onChange={onPageChange}
          showSizeChanger={false}
        />
      </div>
    </>
  );
}
