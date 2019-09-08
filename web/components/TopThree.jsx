/* eslint no-dupe-keys: 0 */

import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import ThreePicsItem from './ThreePicsItem';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PersonIcon from '@material-ui/icons/Person';

const thumbnail1 = '/_f/images/home/row1/a.jpg';
const thumbnail2 = '/_f/images/home/row1/b.jpg';
const thumbnail3 = '/_f/images/home/row1/c.jpg';

const title1 = 'Lorem Ipsum Dolor Sit Amet, Consectetuer Adipiscing Eli';
const title2 = 'Lorem Ipsum Dolor Sit Amet, Consectetuer Adipiscing Eli';
const title3 = 'Lorem Ipsum Dolor Sit Amet, Consectetuer Adipiscing Eli';

const subtitle1 = 'Sed Ut Perspiciatis Unde Omnis Iste Natus Error Sit Voluptatem Accusantium Doloremque Laudantium, Totam Rem Ap';
const subtitle2 = 'Sed Ut Perspiciatis Unde Omnis Iste Natus Error Sit Voluptatem Accusantium Doloremque Laudantium, Totam Rem Ap';
const subtitle3 = 'Sed Ut Perspiciatis Unde Omnis Iste Natus Error Sit Voluptatem Accusantium Doloremque Laudantium, Totam Rem Ap';

const author1 = 'Amit Schandillia';
const author2 = 'Amit Schandillia';
const author3 = 'Amit Schandillia';

const readTime1 = 5;
const minute1 = readTime1 > 1 ? 'minutes' : 'minute';
const readTime2 = 1;
const minute2 = readTime2 > 1 ? 'minutes' : 'minute';
const readTime3 = 10;
const minute3 = readTime3 > 1 ? 'minutes' : 'minute';

const styles = (theme) => ({
  root: {},
  title: {},
  subTitle: {
    lineHeight: 'inherit',
  },
  iconText: {
    marginLeft: theme.spacing(1),
  },
});

const TopThree = (props) => {
  const {
    classes,
  } = props;
  return (
    <Grid container direction="row">
      <ThreePicsItem picture={thumbnail1}>
        <Typography variant="h5" className={classes.title}>{title1}</Typography>
        <Typography variant="subtitle1" className={classes.subTitle}>{subtitle1}</Typography>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <Grid item><AccessTimeIcon /></Grid>
              <Grid item><Typography gutterBottom variant="body2" className={classes.iconText}>{readTime1} {minute1}</Typography></Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <Grid item><PersonIcon /></Grid>
              <Grid item><Typography gutterBottom variant="body2" className={classes.iconText}>{author1}</Typography></Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThreePicsItem>
      <ThreePicsItem picture={thumbnail2}>
        <Typography variant="h5" className={classes.title}>{title2}</Typography>
        <Typography variant="subtitle1" className={classes.subTitle}>{subtitle2}</Typography>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <Grid item><AccessTimeIcon /></Grid>
              <Grid item><Typography gutterBottom variant="body2" className={classes.iconText}>{readTime2} {minute2}</Typography></Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <Grid item><PersonIcon /></Grid>
              <Grid item><Typography gutterBottom variant="body2" className={classes.iconText}>{author2}</Typography></Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThreePicsItem>
      <ThreePicsItem picture={thumbnail3}>
        <Typography variant="h5" className={classes.title}>{title3}</Typography>
        <Typography variant="subtitle1" className={classes.subTitle}>{subtitle3}</Typography>
        <Grid container direction="row" justify="space-between" alignItems="center">
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <Grid item><AccessTimeIcon /></Grid>
              <Grid item><Typography gutterBottom variant="body2" className={classes.iconText}>{readTime3} {minute3}</Typography></Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction="row" alignItems="center">
              <Grid item><PersonIcon /></Grid>
              <Grid item><Typography gutterBottom variant="body2" className={classes.iconText}>{author3}</Typography></Grid>
            </Grid>
          </Grid>
        </Grid>
      </ThreePicsItem>
    </Grid>
  );
};

TopThree.propTypes = {
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    nameToAddress: PropTypes.string,
  }).isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    paragraph: PropTypes.string,
    menuButton: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default connect(
  null,
  null,
)(withStyles(styles)(TopThree));
