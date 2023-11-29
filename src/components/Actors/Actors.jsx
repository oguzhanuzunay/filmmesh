import React, { useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useGetActorDetailQuery, useGetMoviesByActorQuery } from '../../services/TMDB';
import { Pagination, MovieList } from '..';

import useStyles from './styles';

const Actors = () => {
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();
  const [page, setPage] = useState(1);

  const { data, error, isFetching } = useGetActorDetailQuery({ id });
  const { data: movies, isFetching: moviesFetching } = useGetMoviesByActorQuery({
    id,
    page,
  });

  if (isFetching || moviesFetching) {
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
        <Button
          startIcon=<ArrowBack />
          to="/"
          onClick={() => history.goBack()}
          color="primary"
        >
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <Grid
      container
      spacing={3}
    >
      <Grid
        item
        lg={5}
        xl={4}
      >
        <img
          className={classes.image}
          src={
            data?.profile_path
              ? `https://image.tmdb.org/t/p/w500/${data?.profile_path}`
              : 'https://via.placeholder.com/500x750'
          }
          alt={data.name}
        />
      </Grid>
      <Grid
        item
        container
        direction="column"
        lg={7}
        xl={8}
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          marginTop: '20px',
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
        >
          {data?.name}
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
        >
          {`Born: ${new Date(data?.birthday).toDateString()}`}
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          paragraph
        >
          {data?.biography || 'No biography available'}
        </Typography>
      </Grid>
      <Box
        marginTop="2rem"
        display="flex"
        className={classes.buttonsContainer}
      >
        <Button
          variant="contained"
          color="primary"
          target="_blank"
          rel="noopener noreferrer"
          href={`http://www.imdb.com/name/${data?.imdb_id}`}
        >
          IMDB
        </Button>
        <Button
          href="#"
          color="primary"
          onClick={() => history.goBack()}
          startIcon={<ArrowBack />}
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
      </Box>
      <Box margin="2rem 0">
        <Typography
          variant="h2"
          gutterBottom
          align="center"
        >
          You Might Also Like
        </Typography>
        {movies ? (
          <MovieList
            movies={movies}
            numberOfMovies={12}
          />
        ) : (
          <Box>Sorry nothing was found</Box>
        )}
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPages={movies?.total_pages}
        />
      </Box>
    </Grid>
  );
};

export default Actors;
