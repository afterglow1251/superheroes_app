import type { Superhero } from "../../shared/types/superheroes/superheroes.types";

interface SuperheroCardProps {
  superhero: Superhero;
  onClick?: () => void;
}

export function SuperheroCard({ superhero, onClick }: SuperheroCardProps) {
  const { nickname, images } = superhero;

  return (
    <div
      onClick={onClick}
      className="w-[250px] aspect-[250/445] flex flex-col cursor-pointer group overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
    >
      <div className="h-[55%] relative overflow-hidden">
        <img
          src={images[0]}
          alt={nickname}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="h-[5px] bg-red-600" />

      <div className="h-[45%] relative bg-neutral-800 flex flex-col overflow-hidden p-4">
        <div className="absolute inset-0 bg-red-600 origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 z-0" />
        <h2 className="relative z-10 text-xl font-bold text-white text-left">
          {nickname}
        </h2>
      </div>
    </div>
  );
}
