## Frontend case

This is a small frontend case for Etimo. Task is to create a simple web application that display a list of popular movies as well as a new route for each movie displaying some additional data. The application should be built using React and the data should be fetched from the TMDb API.

Built with:

- TypeScript
- React
- Next.js

## How to run

Before running the application, you need to get an API key from TMDb. You can get one by creating an account at [https://www.themoviedb.org/](https://www.themoviedb.org/). Once you have an API key, you can add it to the `.env.local` file in the root of the project.

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Requirements

- Routing has to be managed
- API calls made should be saved to cache
- No component libraries

##### Routing

Routing is managed with Next.js. The application has two routes: `/` and `/movie/[id]`. The first route displays a list of popular movies with pagination and the second route displays additional data for a specific movie.

##### API calls

The latest Next.js version (14) is used and React Server Components (RSC) is utilized for `movie/[id]` route. In the latest versions of Next, API calls using fetch are cached by default.

The `/` is a client component so RSC cannot be used. Instead the `swr` library is used which is a library developed by the Next team and is recommended for data fetching for client components. SWR caches the data by default. We also have pagination for the `/` route, and for each new page the following page is preloaded using SWR.

##### Component libraries

No component libraries are used, only Tailwind is used for styling.
