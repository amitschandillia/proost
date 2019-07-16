import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../lib/getPageContext';

class MyDocument extends Document {
  render() {
    const { pageContext } = this.props;

    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content={
                            'user-scalable=0, initial-scale=1, '
                              + 'minimum-scale=1, width=device-width, height=device-height'
                          }
          />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="194x194" href="/favicon-194x194.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#663300" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
          {/* PWA primary color: Use either of the following 2 lines */}
          <meta name="theme-color" content="#ffcc66" />
          <meta name="theme-color" content={pageContext.theme.palette.primary[500]} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}



















MyDocument.getInitialProps = (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. page.getInitialProps
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the server with error:
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. page.getInitialProps
  // 3. page.render

  // Get the context of the page to collect side effects.
  const pageContext = getPageContext();
  const page = ctx.renderPage(Component => props => (
    <JssProvider
      registry={pageContext.sheetsRegistry}
      generateClassName={pageContext.generateClassName}
    >
      <Component pageContext={pageContext} {...props} />
    </JssProvider>
  ));

  return {
    ...page,
    pageContext,
    styles: (
      <style
        id="jss-server-side"
                // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
      />
    ),
  };
};

export default MyDocument;
