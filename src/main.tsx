import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { TON_CONNECT_CONFIG } from './config/tonconnect';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TonConnectUIProvider manifestUrl={TON_CONNECT_CONFIG.manifestUrl}>
      <App />
    </TonConnectUIProvider>
  </StrictMode>
);