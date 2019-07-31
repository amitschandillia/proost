/* eslint-disable max-len */

import React from 'react';
import App, {
  Container,
} from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withData from '../apollo';
import mainTheme from '../themes/mainTheme';
import '../static/styles/fonts.scss';
import '../static/styles/style.scss';
import '../static/styles/some.css';
import makeStore from '../reducers';
import getUserDataFromCookies from '../utils/getUserDataFromCookies';
import getSessIDFromCookies from '../utils/getSessIDFromCookies';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let userData;
    let sessID;
    if (ctx.isServer) {
      userData = getUserDataFromCookies(ctx.req);
      sessID = getSessIDFromCookies(ctx.req);
      // look up sessID on redis store
      ctx.store.dispatch({ type: 'ADDSESSION', payload: sessID }); // component will be able to read from store's state when rendered
      ctx.store.dispatch({ type: 'ADDUSER', payload: userData });
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

export default withRedux(makeStore)(withData(MyApp));
