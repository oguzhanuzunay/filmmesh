import React from 'react';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

import useStyles from './styles';

const Movie = ({ movie, index }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
      <Grow in key={index} timeout={250 * (index + 1)}>
        <Link className={classes.link} to={`/movie/${movie.id}`}>
          <img
            className={classes.image}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://www.movienewz.com/img/films/poster-holder.jpg'
            }
          />
          <Typography variant="h5" className={classes.title}>
            {movie.title}
          </Typography>
          <Tooltip
            disableTouchListener
            title={`${movie.vote_average.toFixed(1)}/10`}
            placement="top"
          >
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
};

export default Movie;
