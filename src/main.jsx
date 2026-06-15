import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <HelmetProvider>
      <Suspense
        fallback={
          <div
            className="min-h-screen bg-background flex items-center justify-center font-mono text-primary"
            role="status"
            aria-live="polite"
          >
            Loading DEV_CORE…
          </div>
        }
      >
        <App />
      </Suspense>
    </HelmetProvider>
  </StrictMode>
);
