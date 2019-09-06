import MuiLink from '@material-ui/core/Link';
import withStyles from '@material-ui/core/styles/withStyles';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

const styles = (theme) => ({
  hoverDotted: {
    '&:hover': {
      textDecorationStyle: 'dotted',
    },
  },
  hoverNone: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
});

const LinkTo = (props) => {
  const {
    classes,
    hoverDotted = false,
    hoverNone = false,
    href,
    color,
    children,
  } = props;
  let linkStyle;
  if(hoverDotted) { linkStyle = classes.hoverDotted; }
  if(hoverNone) { linkStyle = classes.hoverNone; }
  return (
    <Link href={href} passHref>
      <MuiLink
        color={color}
        className={linkStyle}
      >
        {children}
      </MuiLink>
    </Link>
  );
};

LinkTo.propTypes = {
  href: PropTypes.string.isRequired,
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
};

LinkTo.defaultProps = {
  color: 'inherit',
};

export default withStyles(styles)(LinkTo);
