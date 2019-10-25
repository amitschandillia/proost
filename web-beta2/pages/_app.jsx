/* eslint-disable max-len */

import '../static/styles/fonts.scss';
import '../static/styles/style.scss';
import '../static/styles/some.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import jwt from 'jsonwebtoken';
import withRedux from 'next-redux-wrapper';
import App, {
  Container,
} from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';

import makeStore from '../reducers';
import mainTheme from '../themes/main-theme';
import getSessIDFromCookies from '../utils/get-sessid-from-cookies';
import getLanguageFromCookies from '../utils/get-language-from-cookies';
import getUserTokenFromCookies from '../utils/get-user-token-from-cookies';
import removeFbHash from '../utils/remove-fb-hash';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let userToken;
    let sessID;
    let language;

    if (ctx.isServer) {
      ctx.store.dispatch({ type: 'UPDATEIP', payload: ctx.req.headers['x-real-ip'] });

      userToken = getUserTokenFromCookies(ctx.req);
      sessID = getSessIDFromCookies(ctx.req);
      language = getLanguageFromCookies(ctx.req);
      const dictionary = require(`../dictionaries/${language}`);
      ctx.store.dispatch({ type: 'SETLANGUAGE', payload: dictionary });
      if(ctx.res) {
        if(ctx.res.locals) {
          if(!ctx.res.locals.authenticated) {
            userToken = null;
            sessID = null;
          }
        }
      }
      if (userToken && sessID) { // TBD: validate integrity of sessID
        const userInfo = jwt.verify(userToken, process.env.JWT_SECRET);
        ctx.store.dispatch({ type: 'ADDUSERINFO', payload: userInfo });
      }
      ctx.store.dispatch({ type: 'ADDSESSION', payload: sessID }); // component will be able to read from store's state when rendered
    }
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    // Register serviceWorker
    if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/serviceWorker.js'); }

    // Handle FB's ugly redirect URL hash
    removeFbHash(window, document);
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Head>
          <meta name="viewport" content="user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height, shrink-to-fit=no" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="194x194" href="/favicon-194x194.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#663300" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        </Head>
        <ThemeProvider theme={mainTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(MyApp);
