import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const styles = (theme) => ({
  a: {
    color: theme.palette.link.default,
    textDecoration: 'none',
  },
  icon: {
    width: theme.spacing(1.5),
    marginLeft: theme.spacing(0.5),
    verticalAlign: 'middle',
    color: theme.palette.icon.default,
  },
});

const RenderedLink = ({rendererProps, classes}) => {
    const {href, children} = rendererProps;
    const domain = href
      .replace('http://','')
      .replace('https://','')
      .replace('www.','')
      .split(/[/?#]/)[0];
    let external;
    if(!(domain == process.env.THIS_DOMAIN_LONG)) {
      external = true;
    }
    return (
        <>
            <a
            href={href}
            className={classes.a}
            target={external ? "_blank" : false}
            rel={external ? "nofollow sponsored" : false}
            >
            {children}
            </a>
            {external && <OpenInNewIcon
            className={classes.icon}
            />}
        </>
    );
};

RenderedLink.propTypes = {
  classes: PropTypes.shape({
    a: PropTypes.string,
    icon: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(RenderedLink);
