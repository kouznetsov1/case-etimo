import { getMovie } from "@/api";
import Link from "next/link";

const Page = async ({ params }: { params: { id: string } }) => {
  const movie = await getMovie(params.id);

  return (
    <main className="flex min-h-screen flex-col gap-4 p-8 border md:p-16 lg:p-36 xl:p-48">
      <Link
        href="/"
        className="rounded-md bg-gray-800 text-gray-50 hover:bg-gray-950 w-fit py-2 px-4"
      >
        Back to movies
      </Link>
      <div className="h-full w-full flex-col justify-between flex gap-4 lg:flex-row">
        <div className="lg:w-1/2 flex justify-center flex-col gap-2">
          <span className="text-4xl font-bold">{movie.title}</span>
          <span className="max-w-xl">{movie.overview}</span>
          <div className="flex flex-row flex-wrap gap-1">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="text-gray-100 text-xs py-1 px-2 rounded-full bg-gray-800 hover:bg-gray-950"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <a
            href={`https://www.imdb.com/title/${movie.imdb_id}`}
            target="_blank"
            className="mt-6 size-fit"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
              alt="IMDB logo"
              className="w-24 opacity-90 hover:opacity-100 transition-all duration-150 hover:shadow-lg"
            />
          </a>
        </div>
        <div className="lg:w-1/2 h-full rounded-lg flex items-center justify-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} poster`}
            className="rounded-2xl w-auto h-full max-h-[60vh] border object-contain shadow-2xl"
          />
        </div>
      </div>
    </main>
  );
};
export default Page;
