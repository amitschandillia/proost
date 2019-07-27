/* eslint-disable react/no-danger */

import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import { readFileSync } from 'fs';
import { memoize } from 'lodash';
import { join } from 'path';
import mainTheme from '../themes/mainTheme';

const doGetContent = file => readFileSync(join(process.cwd(), '.build', file), 'utf8');
const getContent = process.env.NODE_ENV === 'production' ? memoize(doGetContent) : doGetContent;

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
        nonce={this.props.nonce}
        data-href={`${assetPrefix}/_next/${file}`}
        dangerouslySetInnerHTML={{
          __html: getContent(file),
        }}
      />
    ));
  }
}

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" dir="ltr">
        <InlineStylesHead>
          {/* PWA primary color: Use either of the following 2 lines */}
          <meta name="theme-color" content="#ffcc66" />
          <meta name="theme-color" content={mainTheme.palette.primary.main} />
        </InlineStylesHead>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: App => props => sheets.collect(<App {...props} />),
  });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>,
    ],
  };
};

export default MyDocument;
