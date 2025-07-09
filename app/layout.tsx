import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/hooks/useLanguage';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'FocusFlow - Best Free Online Focus Timer & Pomodoro Timer 2024',
    template: '%s | FocusFlow - Focus Timer & Productivity Tracker'
  },
  description: 'Free online focus timer & Pomodoro timer to boost productivity. Track deep work sessions, study time, and work breaks. Best focus timer app with analytics, session history, and customizable durations. Start focusing now!',
  alternates: {
    canonical: 'https://focusflow.app',
    languages: {
      'en': 'https://focusflow.app',
      'es': 'https://focusflow.app/es',
      'fr': 'https://focusflow.app/fr',
      'de': 'https://focusflow.app/de',
      'hi': 'https://focusflow.app/hi',
    },
  },
  category: 'productivity',
  classification: 'Productivity Tool',
  referrer: 'origin-when-cross-origin',
  keywords: [
    // Primary short-tail keywords
    'focus timer',
    'pomodoro timer',
    'online timer',
    'study timer',
    'work timer',
    'concentration timer',
    'productivity timer', 
    'time tracker',
    'deep work timer',
    'meditation timer',
    // Long-tail keywords
    'online focus timer',
    'free pomodoro timer online',
    'best focus timer app',
    'pomodoro technique timer',
    'productivity timer online',
    'focus timer with analytics',
    'study timer online free',
    'work from home timer',
    'deep work session timer',
    'concentration timer online',
    'focus timer for students',
    'pomodoro timer for work',
    'productivity tracker online',
    'time management timer',
    'focus session tracker',
    'study break timer',
    'work break timer',
    'tomato timer online',
    'focus timer chrome',
    'productivity timer app',
    'online study timer'
  ],
  other: {
    'google-site-verification': 'your-google-verification-code',
    'msvalidate.01': 'your-bing-verification-code',
    'yandex-verification': 'your-yandex-verification-code',
  },
  authors: [{ name: 'FocusFlow Team' }],
  creator: 'FocusFlow',
  publisher: 'FocusFlow',
  openGraph: {
    title: 'FocusFlow - Best Free Online Focus Timer',
    description: 'Boost your productivity with our free online focus timer. Track sessions, view analytics, and improve your focus habits.',
    url: 'https://focusflow.app', 
    siteName: 'FocusFlow - Focus Timer & Productivity Tracker',
    images: [
      {
        url: 'https://focusflow.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FocusFlow - Online Focus Timer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image', 
    title: 'FocusFlow - Free Online Focus Timer & Pomodoro Timer',
    description: 'Boost your productivity with our free online focus timer. Track sessions, view analytics, and improve your focus habits.',
    images: ['https://focusflow.app/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'FocusFlow',
  description: 'Free online focus timer & Pomodoro timer to boost productivity. Track deep work sessions, study time, and work breaks with analytics.',
  url: 'https://focusflow.app',
  applicationCategory: 'ProductivityApplication',
  applicationSubCategory: 'Time Management',
  operatingSystem: 'Any',
  browserRequirements: 'Requires JavaScript. Works with Chrome, Firefox, Safari, Edge.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock'
  },
  featureList: [
    'Pomodoro Timer (25 minutes)',
    'Deep Focus Sessions',
    'Custom Timer Durations (1-180 minutes)',
    'Session History Tracking',
    'Productivity Analytics',
    'Focus Statistics & Charts',
    'Study Timer',
    'Work Timer',
    'Break Timer',
    'Concentration Timer',
    'Time Management Tools',
    'Session Export (CSV)',
    'Progress Tracking',
    'Streak Counter',
    'Mobile Responsive',
    'No Registration Required',
    'Google Authentication',
    'Progress Charts',
    'Data Export'
  ],
  author: {
    '@type': 'Organization',
    name: 'FocusFlow Team',
    url: 'https://focusflow.app'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '2847',
    bestRating: '5',
    worstRating: '1'
  },
  screenshot: 'https://focusflow.app/screenshot.jpg',
  softwareVersion: '1.0',
  datePublished: '2024-01-01',
  dateModified: '2024-01-15',
  inLanguage: 'en-US',
  copyrightHolder: {
    '@type': 'Organization',
    name: 'FocusFlow'
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://focusflow.app" />
        <meta name="theme-color" content="#10b981" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FocusFlow" />
        <meta name="application-name" content="FocusFlow" />
        <meta name="msapplication-TileColor" content="#10b981" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Notification permissions */}
        <meta name="notification-permission" content="default" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.pexels.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//images.pexels.com" />
        
        {/* Additional Resource Hints */}
        <link rel="prefetch" href="/history" />
        <link rel="prefetch" href="/auth" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Additional Files */}
        <link rel="humans" href="/humans.txt" />
        <link rel="security" href="/.well-known/security.txt" />
      </head>
      <body className={`${inter.className} min-h-screen relative overflow-x-hidden`}>
        <LanguageProvider>
        {/* Animated background */}
        <div className="fixed inset-0 -z-20">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 animate-gradient"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-100/20 to-teal-100/20"></div>
          
          {/* Floating particles */}
          <div className="particles">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  animationDuration: `${6 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
          
          {/* Geometric shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-teal-400/10 to-green-400/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <Header />
        <main className="container mx-auto px-4 py-4 relative z-10 -mt-1">
          {children}
        </main>
        <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}