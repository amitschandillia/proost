import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import Layout from '../components/Layout';
import withData from '../apollo';
import '../static/styles/fonts.scss';
import '../static/styles/style.scss';
import '../static/styles/some.css';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <meta
            name="viewport"
            content={
                            'user-scalable=0, initial-scale=1, '
                              + 'minimum-scale=1, width=device-width, height=device-height'
                          }
          />
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
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}
export default withData(MyApp);
