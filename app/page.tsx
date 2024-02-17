"use client";
import { MovieCard } from "@/components/movie-card";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR, { preload } from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const MOVIE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&include_video=false&sort_by=popularity.desc`;
const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en`;

const Page = () => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Preload next page
    preload(`${MOVIE_URL}&page=${page + 1}`, fetcher);
  }, [page]);

  const { data: movieData, error: movieError } = useSWR<TMBDMovieResponse>(
    `${MOVIE_URL}&page=${page}`,
    fetcher
  );
  const { data: genresData, error: genresError } = useSWR<{ genres: Genre[] }>(
    GENRE_URL,
    fetcher
  );

  const isLoading = !movieData || !genresData;
  const isError = movieError || genresError || !movieData?.results;

  const totalPages = movieData?.total_pages || 1;

  return (
    <main className="flex min-h-screen flex-col lg:flex-row items-center lg:items-start gap-4 lg:justify-center p-8 lg:p-16 xl:p-24">
      <div className="flex flex-col w-72 gap-3">
        <h1 className="text-2xl font-semibold">Popular movies</h1>
        <div className="flex flex-row gap-2">
          <button
            className={`w-1/2 py-2 rounded-md bg-black text-white text-sm ${
              page == 1 && "opacity-50"
            }`}
            disabled={page == 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <button
            className={`w-1/2 py-2 bg-black rounded-md text-white text-sm ${
              page == totalPages && "opacity-50"
            }`}
            disabled={page == totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
        <div className="w-full flex items-center justify-center text-sm">
          Page {page} of {totalPages}
        </div>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full">
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error loading data.</div>
        ) : (
          movieData.results.map((movie: ListMovie) => (
            <Link href={`/movie/${movie.id}`} key={movie.id}>
              <MovieCard movie={movie} genres={genresData.genres} />
            </Link>
          ))
        )}
      </ul>
    </main>
  );
};

export default Page;
