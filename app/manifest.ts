import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FocusFlow - Focus Timer & Productivity Tracker',
    short_name: 'FocusFlow',
    description: 'Boost your productivity with our beautiful focus timer. Track sessions, view analytics, and build better focus habits.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#10b981',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['productivity', 'utilities', 'lifestyle'],
    lang: 'en-US',
    orientation: 'portrait',
  };
}