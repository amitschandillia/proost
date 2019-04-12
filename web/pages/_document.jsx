import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import flush from 'styled-jsx/server';
import { ServerStyleSheet } from 'styled-components';

class RootDocument extends Document {
  static async getInitialProps(ctx) {
    let pageContext;
    const page = ctx.renderPage(Component => {
      const WrappedComponent = props => {
        pageContext = props.pageContext;
        return <Component {...props} />;
      };
      WrappedComponent.propTypes = {
        pageContext: PropTypes.object.isRequired,
      };
      return WrappedComponent;
    });
    let css;
    if (pageContext) {
      css = pageContext.sheetsRegistry.toString();
    }
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
      })
      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        ...page,
        pageContext,
        styles: (
          <Fragment>
            <style
              id="jss-server-side"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: css }}
            />
            {initialProps.styles}{sheet.getStyleElement()}{flush() || null}
          </Fragment>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    const { pageContext } = this.props;
    return (
      <Html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="194x194" href="/favicon-194x194.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#663300" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
          <meta name="theme-color" content="#ffcc66" />
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default RootDocument
