import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PageKey, PAGES, LEGAL } from './content';
import { initVisitSource } from './whatsapp';
import { initGoogleTag } from './tracking';
import './tailwind.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const KNOWN_PAGES = new Set<string>([...Object.keys(PAGES), ...Object.keys(LEGAL), 'notFound']);
const requested = rootElement.dataset.page || 'home';
const page = (KNOWN_PAGES.has(requested) ? requested : 'notFound') as PageKey;

// Must run before the first render so every WhatsApp link carries the "Found you on" line.
initVisitSource();
initGoogleTag();

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App page={page} />
  </React.StrictMode>
);
