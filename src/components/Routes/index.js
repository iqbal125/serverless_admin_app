import React from 'react';
import { Router } from '@reach/router';
import { navigate } from 'gatsby';
import Profile from '../Profile';
import SideBar from '../SideBar';

import styles from './routes.module.css';

const Routes = () => {
  //check token expires time on private routes
  const isTokenValid = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expiresIn'));
    return new Date().getTime() < expiresAt;
  };

  const PrivateRoute = ({ component: Component, location, ...rest }) => {
    if (!isTokenValid()) {
      navigate('/app/login');
      return null;
    } else {
      return <Component {...rest} />;
    }
  };

  return (
    <div className={styles.main}>
      <SideBar />
      <Router>
        {/*<PrivateRoute path="/app/profile" component={Profile} />*/}
        <Profile path="/app/profile" />
      </Router>
    </div>
  );
};

export default Routes;
