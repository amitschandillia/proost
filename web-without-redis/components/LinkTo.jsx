import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import MuiLink from '@material-ui/core/Link';
import Link from 'next/link';

class LinkTo extends PureComponent {
  render() {
    const { props } = this;
    return (
      <Link href={props.href} passHref>
        <MuiLink
          color={props.color}
        >
          {props.children}
        </MuiLink>
      </Link>
    );
  }
}

LinkTo.propTypes = {
  href: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
};

LinkTo.defaultProps = {
  href: '/',
  color: 'inherit',
  children: 'Anchor text',
};

export default LinkTo;
