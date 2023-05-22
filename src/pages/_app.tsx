import '../../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from '../store/index';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { WagmiConfig, createClient } from 'wagmi';
// import { mainnet, foundry, avalancheFuji, sepolia } from 'wagmi/chains';
import { sepolia } from 'wagmi/chains';
import { ConnectKitProvider, getDefaultClient, SIWEProvider } from 'connectkit';
import { siweConfig } from '@config/siwe';

// const chains = [sepolia, avalancheFuji, foundry, mainnet];
const chains = [sepolia];

let persistor = persistStore(store);

const alchemyId = process.env.ALCHEMY_ID;

const client = createClient(
  getDefaultClient({
    appName: 'Safekeep',
    alchemyId,
    chains,
  })
);

type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentType;
  };
};

function MyApp({ Component, pageProps }: ComponentWithPageLayout) {
  // Component.PageLayout = DashboardLayout;
  return (
    <Provider store={store}>
      <Toaster />
      <PersistGate loading={null} persistor={persistor}>
        <WagmiConfig client={client}>
          <SIWEProvider {...siweConfig}>
            <ConnectKitProvider mode="light">
              {Component.PageLayout ? (
                // @ts-ignore
                <Component.PageLayout>
                  <Component {...pageProps} />
                </Component.PageLayout>
              ) : (
                <Component {...pageProps} />
              )}
            </ConnectKitProvider>
          </SIWEProvider>
        </WagmiConfig>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
