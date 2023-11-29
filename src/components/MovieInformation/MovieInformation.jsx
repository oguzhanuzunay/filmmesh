import React, { useEffect, useState } from 'react';
import {
  Modal,
  Typography,
  Button,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
  ButtonGroup,
} from '@mui/material';
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import useStyles from './styles';
import genreIcons from '../../assets/genres';
import { useGetListQuery, useGetMovieQuery, useGetRecommendationQuery } from '../../services/TMDB';
import { MovieList } from '..';
import { userSelector } from '../../features/auth';

const MovieInformation = () => {
  const { id } = useParams();
  const { user } = useSelector(userSelector);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { data, isFetching, error } = useGetMovieQuery({ id });
  const { data: favoriteMovies } = useGetListQuery({
    listName: '/favorite/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });
  const { data: watchListMovies } = useGetListQuery({
    listName: 'watchlist/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });
  const { data: recommendations } = useGetRecommendationQuery({
    list: '/recommendations',
    movie_id: id,
  });

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchListed, setIsMovieWatchListed] = useState(false);

  useEffect(() => {
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === Number(data?.id)));
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchListed(
      !!watchListMovies?.results?.find((movie) => movie?.id === Number(data?.id)),
    );
  }, [watchListMovies, data]);

  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        process.env.REACT_APP_TMDB_API_KEY
      }&session_id=${localStorage.getItem('session_id')}`,
      { media_type: 'movie', media_id: id, favorite: !isMovieFavorited },
    );

    setIsMovieFavorited((prev) => !prev);
  };
  const addToWatchList = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        process.env.REACT_APP_TMDB_API_KEY
      }&session_id=${localStorage.getItem('session_id')}`,
      { media_type: 'movie', media_id: id, watchlist: !isMovieWatchListed },
    );

    setIsMovieWatchListed((prev) => !prev);
  };

  if (isFetching) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Link to="/"> Something has gone wrong - Go Back </Link>
      </Box>
    );
  }

  return (
    <Grid
      container
      className={classes.containerSpaceAround}
    >
      <Grid
        item
        sm={6}
        lg={4}
        style={{ display: 'flex', marginBottom: '30px' }}
      >
        <img
          className={classes.poster}
          src={
            data?.poster_path === null
              ? `https://via.placeholder.com/500x750?text=${'No Poster Available'}`
              : `https://image.tmdb.org/t/p/w500/${data?.poster_path}`
          }
          alt={data.title}
        />
      </Grid>
      <Grid
        item
        container
        direction="column"
        lg={7}
      >
        <Typography
          variant="h3"
          align="center"
          gutterBottom
        >
          {data?.title} ({data.release_date?.split('-')[0]})
        </Typography>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
        >
          {data?.tagline}
        </Typography>
        <Grid
          item
          className={classes.containerSpaceAround}
        >
          <Box
            display="flex"
            justifyContent="center"
          >
            <Rating
              readOnly
              value={data.vote_average / 2}
            />

            <Typography
              variant="subtitle1"
              style={{ marginLeft: '10px' }}
              gutterBottom
            >
              {data?.vote_average.toFixed(1)} /10
            </Typography>
          </Box>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
          >
            {data?.runtime}min | Language: {data?.spoken_languages[0].english_name}
          </Typography>
        </Grid>
        <Grid
          item
          className={classes.genresContainer}
        >
          {data?.genres?.map((genre) => (
            <Link
              key={genre.name}
              className={classes.links}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                className={classes.genreImage}
                height={30}
              />
              <Typography
                color="textPrimary"
                variant="subtitle1"
                gutterBottom
              >
                {genre.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography
          variant="h5"
          align="center"
          style={{ marginTop: '10px' }}
        >
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2rem' }}>{data?.overview}</Typography>
        <Typography
          variant="h5"
          gutterBottom
        >
          Top Cast
        </Typography>
        <Grid
          item
          container
          spacing={2}
          className={classes.containerSpaceAround}
        >
          {data &&
            data.credits?.cast?.slice(0, 6).map((character, index) => (
              <Grid
                item
                key={index}
                xs={4}
                md={2}
                component={Link}
                to={`/actors/${character.id}`}
                style={{ textDecoration: 'none' }}
              >
                <img
                  className={classes.castImage}
                  src={
                    character?.profile_path === null
                      ? `https://via.placeholder.com/500x750?text=${character?.name}`
                      : `https://image.tmdb.org/t/p/w500/${character?.profile_path}`
                  }
                  alt={character.name}
                />
                <Typography
                  color="textPrimary"
                  align="center"
                  variant="subtitle2"
                  className={classes.castName}
                >
                  {character?.name}
                </Typography>
                <Typography
                  color="textSecondary"
                  align="center"
                  variant="subtitle2"
                  className={classes.castName}
                >
                  {character?.character.split(' /')[0]}
                </Typography>
              </Grid>
            ))}
        </Grid>
        <Grid
          item
          container
          style={{ marginTop: '2rem' }}
        >
          <div className={classes.buttonsContainer}>
            <Grid
              item
              xs={12}
              md={6}
              className={classes.buttonsContainer}
            >
              <ButtonGroup
                size="medium"
                variant="outlined"
              >
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  href="#"
                  onClick={() => setOpen(true)}
                  endIcon={<Theaters />}
                  disabled={data?.videos?.results?.length === 0}
                >
                  {data?.videos?.results?.length === 0 ? 'No Trailer' : 'Trailer'}
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              className={classes.buttonsContainer}
            >
              <ButtonGroup
                size="medium"
                variant="outlined"
              >
                <Button
                  href="#"
                  onClick={addToFavorites}
                  variant={isMovieFavorited ? 'contained' : 'outlined'}
                  endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}
                >
                  {isMovieFavorited ? 'UnFavorite' : 'Favorite'}
                </Button>
                <Button
                  href="#"
                  onClick={addToWatchList}
                  variant={isMovieWatchListed ? 'contained' : 'outlined'}
                  endIcon={isMovieWatchListed ? <Remove /> : <PlusOne />}
                >
                  WatchList
                </Button>

                <Button
                  href="#"
                  sx={{ borderColor: 'primary.main text' }}
                  onClick={() => {}}
                  endIcon={<ArrowBack />}
                >
                  <Typography
                    color="inherit"
                    variant="subtitle2"
                    component={Link}
                    to="/"
                    style={{ textDecoration: 'none' }}
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box
        marginTop="5rem"
        width="100%"
      >
        <Typography
          variant="h5"
          gutterBottom
          align="center"
        >
          You Might Also Like
        </Typography>
        {recommendations ? (
          <MovieList
            movies={recommendations}
            numberOfMovies={12}
          />
        ) : (
          <Box>Sorry nothing was found</Box>
        )}
      </Box>
      {data?.videos?.results?.length > 0 && (
        <Modal
          closeAfterTransition
          className={classes.modal}
          open={open}
          onClose={() => setOpen(false)}
        >
          <iframe
            autoPlay
            className={classes?.video}
            style={{ border: 'none' }}
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos?.results[0]?.key}?autoplay=1&mute=1`}
            allow="autoplay"
          />
        </Modal>
      )}
    </Grid>
  );
};

export default MovieInformation;
