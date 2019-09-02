import MuiLink from '@material-ui/core/Link';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

const LinkTo = (props) => {
  const { href, color, children } = props;
  return (
    <Link href={href} passHref>
      <MuiLink color={color}>
        {children}
      </MuiLink>
    </Link>
  );
};

LinkTo.propTypes = {
  href: PropTypes.string.isRequired,
  color: PropTypes.string,
  children: PropTypes.node,
};

LinkTo.defaultProps = {
  color: 'inherit',
  children: 'Anchor text',
};

export default LinkTo;
