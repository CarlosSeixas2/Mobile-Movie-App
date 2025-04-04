export const TMDB_CONFIG = {
  base_url: "https://api.themoviedb.org/3",
  api_key: process.env.EXPO_PUBLIC_TMDB_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_API_KEY}`,
  },
};

export const fetchPopularMovies = async ({ query }: { query?: string }) => {
  if (!TMDB_CONFIG.headers.Authorization) {
    throw new Error("API Key or Bearer Token is missing");
  }

  const endpoint = query
    ? `${TMDB_CONFIG.base_url}/search/movie?query=${encodeURIComponent(
        query
      )}&language=pt-BR`
    : `${TMDB_CONFIG.base_url}/discover/movie?sort_by=popularity.desc&language=pt-BR`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    // @ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }

  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.base_url}/movie/${movieId}?api_key=${TMDB_CONFIG.api_key}&language=pt-BR`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
