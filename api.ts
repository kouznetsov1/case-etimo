export async function getMovie(id: string) {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json() as Promise<Movie>;
}
