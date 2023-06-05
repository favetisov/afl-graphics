import { ServerStyles, createStylesServer } from '@mantine/next';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

const stylesServer = createStylesServer();
export default class _Document extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    // resetServerContext();
    return {
      ...initialProps,
      styles: [initialProps.styles, <ServerStyles html={initialProps.html} server={stylesServer} key="styles" />],
    };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/icon/favicon.ico" />
          <link href="https://fonts.googleapis.com/css2?family=Days+One&family=Montserrat:wght@100;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Darker+Grotesque:wght@900&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
