import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import './index.css';

// Guard against third-party extension injection rejections (e.g. MetaMask, wallet extensions)
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event?.reason;
    const msg = String(reason?.message || reason?.stack || reason || '');
    if (
      msg.includes('MetaMask') ||
      msg.includes('metamask') ||
      msg.includes('ethereum') ||
      msg.includes('Failed to connect to MetaMask') ||
      msg.includes('Extension context invalidated')
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
);

