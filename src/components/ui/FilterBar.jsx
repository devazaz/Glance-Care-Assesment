import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  useFetchMoviesByFiltersQuery,
  useFetchGenresQuery,
} from "../../features/movieApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setMovies, appendMovies, setPage } from "../../features/movieSlice";

const FilterBar = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.movies.page);

  // Initial values for the form
  const initialValues = {
    startDate: "",
    endDate: "",
    minScore: "",
    sortBy: "popularity.desc",
    selectedGenres: [18],
  };

  // State to track current filters
  const [filters, setFilters] = useState(initialValues);

  // Fetch movies based on filters and page
  const { data, error, isLoading, isSuccess } = useFetchMoviesByFiltersQuery({
    ...filters,
    page,
  });

  // Fetch available genres
  const {
    data: genresData,
    error: genresError,
    isLoading: genresIsLoading,
    isSuccess: genresIsSuccess,
  } = useFetchGenresQuery();

  // Validation schema for form inputs
  const validationSchema = Yup.object({
    startDate: Yup.date().nullable(),
    endDate: Yup.date().nullable(),
    minScore: Yup.number()
      .min(0, "Score must be at least 0")
      .max(10, "Score cannot exceed 10")
      .nullable(),
    sortBy: Yup.string().required("Sort option is required"),
    selectedGenres: Yup.array().of(Yup.number()),
  });

  // Handle form submission
  const handleSubmit = (values) => {
    dispatch(setPage(1)); // Reset page to 1 when filters change
    setFilters(values);
  };

  // Fetch and manage movies in the Redux store
  useEffect(() => {
    if (data && isSuccess && !isLoading) {
      if (page > 1) {
        dispatch(appendMovies({ movies: data.results }));
      } else {
        dispatch(setMovies({ movies: data.results }));
      }
    }
  }, [data, isLoading, error, isSuccess, dispatch, page]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="bg-gray-100 p-4 rounded shadow mb-10 space-y-4">
          {/* Filters Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Start Date */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Start Date</label>
              <Field
                name="startDate"
                type="date"
                className="border px-2 py-1 rounded"
              />
              <ErrorMessage
                name="startDate"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* End Date */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">End Date</label>
              <Field
                name="endDate"
                type="date"
                className="border px-2 py-1 rounded"
              />
              <ErrorMessage
                name="endDate"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Minimum Score */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Min Score</label>
              <Field
                name="minScore"
                type="number"
                className="border px-2 py-1 rounded"
              />
              <ErrorMessage
                name="minScore"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            {/* Sort By */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Sort By</label>
              <Field
                as="select"
                name="sortBy"
                className="border px-2 py-1 rounded"
              >
                <option value="popularity.desc">Popularity (Desc)</option>
                <option value="popularity.asc">Popularity (Asc)</option>
                <option value="vote_average.desc">Score (Desc)</option>
                <option value="vote_average.asc">Score (Asc)</option>
                <option value="primary_release_date.desc">
                  Release Date (Desc)
                </option>
                <option value="primary_release_date.asc">
                  Release Date (Asc)
                </option>
              </Field>
              <ErrorMessage
                name="sortBy"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
          </div>

          {/* Genres Section */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Select Genres:
            </label>
            <div className="flex gap-2 items-center flex-wrap">
              {genresData?.genres.map((genre) => (
                <button
                  type="button"
                  key={genre.id}
                  onClick={() => {
                    const updatedGenres = values.selectedGenres.includes(genre.id)
                      ? values.selectedGenres.filter((id) => id !== genre.id)
                      : [...values.selectedGenres, genre.id];
                    setFieldValue("selectedGenres", updatedGenres);
                  }}
                  className={`border shadow-sm px-4 py-2 rounded text-center cursor-pointer transition-colors duration-200 
                    ${
                      values.selectedGenres.includes(genre.id)
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600"
                    }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Search
            </button>
            <button
              type="reset"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Reset
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FilterBar;
