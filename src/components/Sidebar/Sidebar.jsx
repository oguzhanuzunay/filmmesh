import React, { useEffect } from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useStyles from './styles';

const demoCategories = [
  { label: 'Comedy', value: 'comedy' },
  { label: 'Horror', value: 'horror' },
  { label: 'Action', value: 'action' },
  { label: 'Drama', value: 'drama' },
];
const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const redLogo =
  'https://fontmeme.com/permalink/231127/885436a73a0a200a7cbb830890a99531.png';

const blueLogo =
  'https://fontmeme.com/permalink/231127/8ac5a40396ad5f32f62199a5df547b20.png';

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          src={theme.palette.mode === 'dark' ? redLogo : blueLogo}
          alt="FilmMesh LL"
          className={classes.image}
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader> Categories </ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.link} to="/">
            <ListItem button onClick={() => {}}>
              <ListItemIcon>
                <img
                  // src={redLogo}
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader> Genres </ListSubheader>
        {demoCategories.map(({ label, value }) => (
          <Link key={value} className={classes.link} to="/">
            <ListItem button onClick={() => {}}>
              <ListItemIcon>
                <img
                  // src={redLogo}
                  className={classes.genreImages}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </>
  );
};

export default Sidebar;
