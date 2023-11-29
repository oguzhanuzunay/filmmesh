import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Switch } from 'react-router-dom';

import useStyles from './styles';

import { Actors, MovieInformation, Movies, Profile, NavBar } from './index';

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route
            exact
            path={['/', '/approved']}
            component={Movies}
          />
          <Route
            path="/movie/:id"
            component={MovieInformation}
          />
          <Route
            path="/actors/:id"
            component={Actors}
          />
          <Route
            path="/profile/:id"
            component={Profile}
          />
        </Switch>
      </main>
    </div>
  );
};

export default App;
