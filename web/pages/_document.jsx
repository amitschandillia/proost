/* eslint-disable react/no-danger */

import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';
import JssProvider from 'react-jss/lib/JssProvider';

import { readFileSync } from 'fs';
import { join } from 'path';
import getPageContext from '../lib/getPageContext';


class InlineStylesHead extends Head {
  getCssLinks() {
    return this.__getInlineStyles();
  }

  __getInlineStyles() {
    const { assetPrefix, files } = this.context._documentProps;
    if (!files || files.length === 0) return null;

    return files.filter(file => /\.css$/.test(file)).map(file => (
      <style
        key={file}
        data-href={`${assetPrefix}/_next/${file}`}
        dangerouslySetInnerHTML={{
          __html: readFileSync(join(process.cwd(), '.build', file), 'utf-8'),
        }}
      />
    ));
  }
}


class MyDocument extends Document {
  render() {
    const { pageContext } = this.props;

    return (
      <Html lang="en" dir="ltr">
        <InlineStylesHead>
          {/* PWA primary color: Use either of the following 2 lines */}
          <meta name="theme-color" content="#ffcc66" />
          <meta name="theme-color" content={pageContext.theme.palette.primary.main} />
        </InlineStylesHead>
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
