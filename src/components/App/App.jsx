import { lazy, Suspense, useState } from "react";
import Navigation from "../Navigation/Navigation";
import Loader from "../Loader/Loader";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("/src/pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const NoteFoundPage = lazy(() => import("../../pages/NoteFoundPage/NoteFoundPage"));
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage/MovieDetailsPage"));
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));

export default function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoad = (loadingStatus) => {
    setIsLoading(loadingStatus);
  };

  return (
    <>
      <header>
        <div>
          <Navigation />
        </div>
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage onLoad={handleLoad} />} />
            <Route path="/movies" element={<MoviesPage onLoad={handleLoad} />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage onLoad={handleLoad} />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NoteFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}
