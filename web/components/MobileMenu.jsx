/* eslint-disable no-unused-vars */

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import BuildIcon from '@material-ui/icons/Build';
import PersonIcon from '@material-ui/icons/Person';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LabelIcon from '@material-ui/icons/Label';
import CategoryIcon from '@material-ui/icons/Category';
import Link from 'next/link';
import ListSubheader from '@material-ui/core/ListSubheader';
import InfoIcon from '@material-ui/icons/Info';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const styles = (theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  list: {
      marginTop: theme.spacing(2),
      color: theme.palette.text.secondary,
  },
  listItem: {
    paddingRight: theme.spacing(6),
    paddingLeft: theme.spacing(2),
  },
  icon: {
      // marginRight: theme.spacing(4),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
});

const MobileMenu = (props) => {
  const {
    classes,
    language,
    pageURL,
    userInfo,
  } = props;

  const [iState, setiState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [mOpen, setmOpen] = React.useState(true);

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setiState({ ...iState, [side]: open });
  };
  const handleClick = () => {
    setmOpen(!mOpen);
  };

  // Contents of side-drawer start
  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
    >
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Schandillia
            </ListSubheader>
          }
        >
            <Link
               href="/"
               as="/"
               onClick={toggleDrawer(side, false)}
               onKeyDown={toggleDrawer(side, false)}
            >
              <ListItem button component="a" key="Home" className={classes.listItem}>
                  <ListItemIcon>
                    <HomeIcon className={classes.icon} />
                  </ListItemIcon>
                  <ListItemText primary={language.lexicon.home} />
              </ListItem>
            </Link>
            <Divider />
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary={language.lexicon.blog} />
                {mOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={mOpen} timeout="auto" unmountOnExit onClick={toggleDrawer(side, false)} onKeyDown={toggleDrawer(side, false)}>
              <List component="div" disablePadding>
                <Link
                  href="/blog"
                  as="/blog"
                  onClick={toggleDrawer(side, false)}
                  onKeyDown={toggleDrawer(side, false)}
                >
                  <ListItem button className={classes.nested}>
                    <ListItemIcon><MenuBookIcon /></ListItemIcon>
                    <ListItemText primary={language.lexicon.posts} />
                  </ListItem>
                </Link>
                <Link
                  href="/blog/authors"
                  as="/blog/authors"
                  onClick={toggleDrawer(side, false)}
                  onKeyDown={toggleDrawer(side, false)}
                >
                  <ListItem button className={classes.nested}>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText primary={language.lexicon.authors} />
                  </ListItem>
                </Link>
                <Link
                  href="/blog/categories"
                  as="/blog/categories"
                  onClick={toggleDrawer(side, false)}
                  onKeyDown={toggleDrawer(side, false)}
                >
                  <ListItem button className={classes.nested}>
                    <ListItemIcon><CategoryIcon /></ListItemIcon>
                    <ListItemText primary={language.lexicon.categories} />
                  </ListItem>
                </Link>
                <Link
                  href="/blog/tags"
                  as="/blog/tags"
                  onClick={toggleDrawer(side, false)}
                  onKeyDown={toggleDrawer(side, false)}
                >
                  <ListItem button className={classes.nested}>
                    <ListItemIcon><LabelIcon /></ListItemIcon>
                    <ListItemText primary={language.lexicon.tags} />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
        </List>
        <Divider />
        <Link
            href="/"
            as="/"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
          <ListItem button component="a" key="Tools" className={classes.listItem}>
              <ListItemIcon>
                <BuildIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary={language.lexicon.tools} />
          </ListItem>
        </Link>
        <Link
            href="/"
            as="/"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
          <ListItem button component="a" key="Store" className={classes.listItem}>
              <ListItemIcon>
                <StoreIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary={language.lexicon.store} />
          </ListItem>
        </Link>
        <Link
            href="/"
            as="/"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
          <ListItem button component="a" key="Cart" className={classes.listItem}>
              <ListItemIcon>
                <ShoppingCartIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary={language.lexicon.cart} />
          </ListItem>
        </Link>
        <Link
            href="/about"
            as="/about"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
          <ListItem button component="a" key="About" className={classes.listItem}>
              <ListItemIcon>
                <InfoIcon className={classes.icon} />
              </ListItemIcon>
              <ListItemText primary={language.lexicon.about} />
          </ListItem>
        </Link>
    </div>
  );
  // Contents of side-drawer end

  return (
    <div className={classes.root}>
        <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer('left', true)}
        >
            <MenuIcon />
        </IconButton>
        <SwipeableDrawer
            open={iState.left}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
        >
            {sideList('left')}
        </SwipeableDrawer>
    </div>
  );
};

MobileMenu.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    paragraph: PropTypes.string,
    menuButton: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    nameToAddress: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
    language: state.language,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(MobileMenu));
