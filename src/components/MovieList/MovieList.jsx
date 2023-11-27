/* eslint-disable import/no-cycle */
import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './styles';
import { Movie } from '..';

const MovieList = ({ movies }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      {movies.results.map((movie, index) => (
        <Movie key={index} movie={movie} index={index} />
      ))}
    </Grid>
  );
};

export default MovieList;
