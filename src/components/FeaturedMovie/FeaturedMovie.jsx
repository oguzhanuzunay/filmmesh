import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Rating, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const FeaturedMovie = ({ movie }) => {
  const classes = useStyles();

  if (!movie) return null;

  console.log(movie);

  return (
    <Box
      component={Link}
      to={`/movie/${movie.id}`}
      className={classes.featuredCardContainer}
    >
      <Card
        className={classes.card}
        classes={{ root: classes.cardRoot }}
      >
        <CardMedia
          media="picture"
          alt={movie.title}
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          title={movie.title}
          className={classes.cardMedia}
        />
        <Box padding="20px">
          <CardContent
            className={classes.CardContent}
            classes={{ root: classes.cardContentRoot }}
          >
            <Typography
              variant="h5"
              color="textPrimary"
              gutterBottom
            >
              {movie.title}
            </Typography>
            <Typography
              variant="body2"
              color="textPrimary"
              gutterBottom
            >
              {movie.overview}
            </Typography>
            <Box
              display="flex"
              displayDirection="column"
            >
              <Tooltip
                disableTouchListener
                title={`${movie.vote_average.toFixed(1)}/10`}
                placement="top"
              >
                <div>
                  <Rating
                    readOnly
                    value={movie.vote_average / 2}
                    precision={0.1}
                  />
                </div>
              </Tooltip>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
