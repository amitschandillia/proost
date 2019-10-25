import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import LinkTo from '../components/LinkTo';
import Layout from '../components/Layout';
import PageBody from '../components/PageBody';
import axios from 'axios';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(10, 2),
  },
  form: {},
  textField: {},
  button: {
    width: '100%',
  },
});

const pageURL = `${process.env.BASE_URL}/tweet`;

const Tweet = (props) => {
  const { classes } = props;
  const title = 'Tweet | Project Proost';
  const description = 'This is the description for the tweet page';

  const tweetThis = async (e) => {
    let { target: { message: { value: message }, password: { value: password } } } = e;
    const url = '/tweet';
    const res = await axios({
      method: 'post',
      url,
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      data: { message, password },
    });
    const {data} = res;
    const { success } = data;
    if(success) {
      console.log('TWEET SUCCESSFUL!');
    } else {
      console.log('COULD NOT TWEET');
    }
    return false;
  };

  return (
    <Layout
      title = {title}
      description = {description}
      pageURL = {pageURL}
    >
      <PageBody>
        <Grid container className={classes.root} justify="center" alignItems="center">
          <Grid item xs={11} md={4}>
            <form
              className={classes.form}
              onSubmit={(e) => { e.preventDefault(); tweetThis(e); }}
            >
              <TextField
                id="message"
                name="message"
                label="Message"
                placeholder="What's on your mind?"
                multiline
                rows={5}
                required
                fullWidth
                type="text"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="password"
                name="password"
                label="Password"
                placeholder="Enter your secret passphrase..."
                required
                fullWidth
                autoComplete="new-password"
                type="password"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                className={classes.button}
              >
                Tweet
              </Button>
            </form>
          </Grid>
        </Grid>
      </PageBody>
    </Layout>
  );
};

Tweet.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    paragraph: PropTypes.string,
  }).isRequired,
};

// Uncomment the following snippet to pass custom props to the component
// Tweet.getInitialProps = async ({
//   store, isServer, res, req,
// }) => ({ custom: 'Amit' });

export default withStyles(styles)(Tweet);
