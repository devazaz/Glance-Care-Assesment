import * as React from "react";
import { useRoutes } from "react-router";
import Movies from "../movies-ui/Movies";
import MovieDetailsCard from "../movies-ui/MovieDetailsCard";
import Statistics from "../movies-ui/Statistics";
const Routes = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <Movies />,
    },
    { path: "/movie-details/:id", element: <MovieDetailsCard /> },
    { path: "/statistics", element: <Statistics /> },
  ]);

  return element;
};

export default Routes;
