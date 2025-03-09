import groq from "groq";

export const AllMovieQuery = groq`*[_type == 'movie']`
