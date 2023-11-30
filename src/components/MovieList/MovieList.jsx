import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './styles';
import { Movie } from '..';

const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {
  const classes = useStyles();
  const startFrom = excludeFirst ? 1 : 0;

  return (
    <Grid
      container
      spacing={3}
    >
      {movies.results.slice(startFrom, numberOfMovies).map((movie, index) => (
        <Movie
          key={index}
          movie={movie}
          index={index}
          className={classes.moviesContainer}
        />
      ))}
    </Grid>
  );
};

export default MovieList;
