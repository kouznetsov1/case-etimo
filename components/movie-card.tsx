export const MovieCard = ({
  movie,
  genres,
}: {
  movie: ListMovie;
  genres: Genre[];
}) => {
  return (
    <div className="rounded-lg flex flex-col gap-2 group shadow-xl duration-150 transition-all h-full">
      <div className="w-full rounded-t-lg max-h-[400px] overflow-hidden flex items-center justify-center aspect-[9/16]">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} poster`}
          className="group-hover:scale-105 rounded-t-lg overflow-hidden w-full transition-all duration-150 object-contain"
        />
      </div>
      <div className="flex flex-col gap-4 p-4">
        <span className="text-xl font-bold">{movie.title}</span>
        <div className="flex flex-row flex-wrap gap-1">
          {movie.genre_ids.map((id) => {
            const genre = genres.find((genre) => genre.id === id);
            return (
              <span
                key={id}
                className="text-xs text-gray-100 py-1 px-2 rounded-full bg-gray-900"
              >
                {genre?.name}
              </span>
            );
          })}
        </div>
        <div className="flex flex-row justify-between gap-2 items-center">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-600">Release</span>
            <span className="text-sm">{movie.release_date}</span>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <span className="text-xs text-gray-600">Rating</span>
            <span className="text-sm">
              {movie.vote_average.toPrecision(2)}/10
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
