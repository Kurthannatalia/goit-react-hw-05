import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import BackLink from "../../components/BackLink/BackLink";
import fetchDetails from "../../components/fetchDetails/fetchDetails";
import { useEffect, useState, lazy } from "react";
import css from "./MovieDetailsPage.module.css";
import { GiCharacter } from "react-icons/gi";
import { MdOutlineRateReview } from "react-icons/md";
import Error from "../../components/Error/Error";

const Loader = lazy(() => import("../../components/Loader/Loader"));

const MovieDetailsPage = ({ onLoad }) => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const location = useLocation();

  const backLink = location.state ?? "/";

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        onLoad(true);
        const details = await fetchDetails(movieId);
        setMovie(details);
        setError(false);
      } catch {
        setError(true);
      } finally {
        onLoad(false);
      }
    };
    loadMovieDetails();
  }, [movieId, onLoad]);

  if (error) return <Error />;
  if (!movie) return <Loader />;

  const { id, poster_path, title, vote_average, release_date, overview, genres } = movie;

  return (
    <section className={css.details}>
      <BackLink to={backLink}>Back</BackLink>
      <div className={css.container}>
        <div className={css.mainContainer} key={id}>
          <img
            className={css.paster}
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
          />
          <div className={css.container}>
            <h1 className={css.title}>{title}</h1>
            <p className={css.vote}>Vote Average: {vote_average}</p>
            <p className={css.genre}>Genre: {genres.map(genre => genre.name).join(", ")}</p>
          </div>
        </div>

        <div className={css.containerDesc}>
          <p className={css.release}>Release Date: {release_date}</p>
          <p className={css.overview}><span className={css.text}>Overview:</span> {overview}</p>
        </div>

        <ul className={css.list}>
          <li className={css.listItem}>
            <Link to="cast" state={backLink} className={css.listItem}>
              <GiCharacter className={css.icon} /> Cast
            </Link>
          </li>
          <li className={css.listItem}>
            <Link to="reviews" state={backLink} className={css.listItem}>
              <MdOutlineRateReview className={css.icon} /> Reviews
            </Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </section>
  );
};

export default MovieDetailsPage;
