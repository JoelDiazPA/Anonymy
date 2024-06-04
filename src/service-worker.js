// src/service-worker.js

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Precaching los recursos
precacheAndRoute(self.__WB_MANIFEST);

// Configurar estrategias de caché para diferentes tipos de solicitudes
registerRoute(
    ({ request }) => request.destination === 'script' || request.destination === 'style',
    new StaleWhileRevalidate()
);
