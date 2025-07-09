# FocusFlow - Minimalist Focus Timer

A beautiful, SEO-optimized focus timer web application built with Next.js, Firebase, and Tailwind CSS.

## Features

- **Multiple Timer Modes**: Pomodoro (25 min), Deep Focus (50 min), Custom durations
- **User Authentication**: Google OAuth integration with Firebase Auth
- **Session Tracking**: Comprehensive history and analytics
- **Visual Analytics**: Charts and statistics for productivity insights
- **Data Export**: CSV export functionality
- **SEO Optimized**: Built for maximum search engine visibility
- **Responsive Design**: Works perfectly on mobile and desktop
- **PWA Ready**: Installable app experience

## Tech Stack

- **Frontend**: Next.js 13+ with App Router, TypeScript, Tailwind CSS
- **Backend**: Firebase (Auth + Firestore)
- **Charts**: Recharts
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/focusflow.git
   cd focusflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project
   - Enable Authentication and Firestore
   - Enable Google as a sign-in provider:
     - Go to Authentication → Sign-in method
     - Enable Google provider
     - Add your domain to authorized domains
   - Set up Firestore Database:
     - Go to Firestore Database → Create database
     - Start in test mode (you can configure security rules later)
     - Choose a location for your database
   - Copy your Firebase config

4. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in your Firebase configuration values.

5. **Run the development server**
   ```bash
   npm run dev
   ```

## Deployment

The app is configured for static export and can be deployed to:
- Vercel (recommended)
- Netlify
- Firebase Hosting
- Any static hosting provider

## SEO Features

- Server-side rendering with Next.js
- Dynamic meta tags and Open Graph
- Structured data (Schema.org)
- Sitemap and robots.txt
- Optimized for focus timer keywords

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.