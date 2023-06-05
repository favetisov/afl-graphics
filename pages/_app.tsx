import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import './global.scss';
import { RootStoreProvider } from '@/shared/shared-frontend/providers/RootStoreProvider';
import { Language, userState } from 'ftb-models';

function LflAdminApp({ Component, pageProps }: AppProps) {
  userState.language = Language.ru;
  return (
    <>
      <Head>
        <title>AFL Admin</title>
        <meta name="description" content="AFL Admin panel" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ fontFamily: 'Montserrat', primaryColor: 'blue' }}>
        <RootStoreProvider hydrationData={pageProps?.hydrationData || {}}>
          <NotificationsProvider>{<Component {...pageProps} />}</NotificationsProvider>
        </RootStoreProvider>
      </MantineProvider>
    </>
  );
}

export default LflAdminApp;
