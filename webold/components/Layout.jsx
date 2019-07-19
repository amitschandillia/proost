import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD',
};

export default function Layout(props) {
  const { children } = props;
  return (
    <Fragment>
      {/*<div style={layoutStyle}>*/}
        <Header />
        {children}
      {/*</div>*/}
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
