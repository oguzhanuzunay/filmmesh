import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './styles';
import { Movie } from '..';

const MovieList = ({ movies, numberOfMovies }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={3}
    >
      {movies.results.slice(0, numberOfMovies).map((movie, index) => (
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
