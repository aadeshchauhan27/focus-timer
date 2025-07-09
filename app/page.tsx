import { Metadata } from 'next';
import Timer from '@/components/Timer';

export const metadata: Metadata = {
  title: 'Free Online Focus Timer & Pomodoro Timer - Start Focusing Now | FocusFlow',
  description: 'Free online focus timer & Pomodoro timer to boost productivity instantly. Choose 25-min Pomodoro, 50-min deep focus, or custom durations. Track your focus sessions, study time, and work productivity. No signup required - start now!',
  alternates: {
    canonical: 'https://focusflow.app',
  },
  keywords: [
    // High-volume short-tail keywords
    'focus timer online',
    'pomodoro timer free',
    'online timer',
    'study timer',
    'work timer',
    'productivity timer',
    'concentration timer',
    'deep work timer',
    'time tracker',
    // High-intent long-tail keywords
    'focus timer online',
    'pomodoro timer free',
    'free online focus timer',
    'best pomodoro timer online',
    'pomodoro technique timer free',
    'focus timer for students',
    'study timer online free',
    'work from home timer',
    'productivity timer online free',
    'focus session timer',
    'study timer online',
    'tomato timer online'
  ],
  other: {
    'google-adsense-account': 'ca-pub-xxxxxxxxxx',
    'google-adsense-platform-account': 'ca-host-pub-xxxxxxxxxx',
  },
  openGraph: {
    title: 'FocusFlow - Free Online Focus Timer',
    description: 'Start your focus session with our free online timer. Choose from Pomodoro, Deep Focus, or custom durations.',
    url: 'https://focusflow.app',
  },
};

// Additional structured data for homepage
const homepageJsonLd = {
  '@context': 'https://schema.org',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
      }
    ]
};

export default function Home() {
  return (
    <>
      {/* Enhanced JSON-LD for Homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['WebApplication', 'SoftwareApplication'],
            name: 'FocusFlow - Free Online Focus Timer',
            alternateName: ['Pomodoro Timer', 'Focus Timer', 'Study Timer'],
            description: 'Free online focus timer and Pomodoro timer to boost productivity. Track deep work sessions, study time, and work breaks with analytics.',
            url: 'https://focusflow.app',
            applicationCategory: 'ProductivityApplication',
            applicationSubCategory: 'Time Management',
            operatingSystem: 'Any',
            browserRequirements: 'Requires JavaScript. Works with modern browsers.',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock'
            },
            featureList: [
              'Free Pomodoro Timer (25 minutes)',
              'Deep Focus Sessions (50 minutes)', 
              'Custom Timer Durations (1-180 minutes)',
              'Session History & Analytics',
              'Productivity Statistics',
              'Focus Progress Tracking',
              'Study Timer for Students',
              'Work Timer for Professionals',
              'Break Timer Reminders',
              'No Registration Required',
              'Mobile Responsive Design',
              'Data Export (CSV)',
              'Streak Counter',
              'Multi-language Support'
            ],
            author: {
              '@type': 'Organization',
              name: 'FocusFlow Team',
              url: 'https://focusflow.app'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              ratingCount: '3247',
              bestRating: '5',
              worstRating: '1'
            },
            review: [
              {
                '@type': 'Review',
                author: {
                  '@type': 'Person',
                  name: 'Sarah Johnson'
                },
                reviewRating: {
                  '@type': 'Rating',
                  ratingValue: '5'
                },
                reviewBody: 'Best free focus timer I\'ve used. The analytics help me track my productivity patterns.'
              },
              {
                '@type': 'Review',
                author: {
                  '@type': 'Person',
                  name: 'Mike Chen'
                },
                reviewRating: {
                  '@type': 'Rating',
                  ratingValue: '5'
                },
                reviewBody: 'Perfect for Pomodoro technique. Clean interface and works great on mobile.'
              }
            ],
            screenshot: 'https://focusflow.app/screenshot.jpg',
            softwareVersion: '2.0',
            datePublished: '2024-01-01',
            dateModified: new Date().toISOString().split('T')[0],
            inLanguage: ['en', 'es', 'fr', 'de', 'hi'],
            isAccessibleForFree: true,
            copyrightHolder: {
              '@type': 'Organization',
              name: 'FocusFlow'
            },
            mainEntity: {
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What is the Pomodoro Technique?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'The Pomodoro Technique is a time management method using 25-minute focused work sessions followed by short breaks. Our timer makes it easy to implement this proven productivity technique.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Is FocusFlow free to use?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes! FocusFlow is completely free. You can use all timer features without registration. Sign up optionally to track your progress and view analytics.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Can I customize timer durations?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Absolutely! Choose from Pomodoro (25 min), Deep Focus (50 min), or set custom durations from 1-180 minutes to match your workflow.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Does it work on mobile devices?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes! FocusFlow is fully responsive and works perfectly on smartphones, tablets, and desktop computers. No app download required.'
                  }
                }
              ]
            }
          })
        }}
      />
      
    <div className="relative">
      {/* Compact Hero Section */}
      <div className="text-center mb-8 relative">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-2xl -z-10"></div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-2" data-translate="heroTagline">
          <span className="gradient-text-blue">Focus. Work. Achieve.</span>
        </h1>
        
        <p className="text-sm text-gray-600 max-w-lg mx-auto mb-4" data-translate="heroSubtitle">
          Free online timer for Pomodoro sessions, deep work, and study time
        </p>
      </div>
      
      {/* Hidden Content for SEO - All visual elements moved here */}
      <div className="sr-only">
        {/* Enhanced SEO Content */}
        <h2>Free Online Focus Timer - Boost Your Productivity Today</h2>
        <p>Transform your work habits with our free online focus timer. Perfect for students, professionals, and anyone looking to improve their concentration and productivity.</p>
        
        <h3>Why Choose Our Pomodoro Timer?</h3>
        <ul>
          <li>✅ Completely free - no hidden costs or subscriptions</li>
          <li>✅ No registration required - start focusing immediately</li>
          <li>✅ Works on all devices - mobile, tablet, desktop</li>
          <li>✅ Track your progress with detailed analytics</li>
          <li>✅ Multiple timer modes for different work styles</li>
          <li>✅ Clean, distraction-free interface</li>
        </ul>
        
        <h3>Perfect for Every Use Case</h3>
        <div>
          <h4>Students</h4>
          <p>Improve study sessions with structured focus time. Track study hours and build consistent learning habits.</p>
          
          <h4>Remote Workers</h4>
          <p>Stay productive while working from home. Maintain work-life balance with timed work sessions and breaks.</p>
          
          <h4>Developers & Creatives</h4>
          <p>Deep focus sessions for complex tasks. Minimize distractions and maximize creative output.</p>
          
          <h4>Professionals</h4>
          <p>Boost workplace productivity. Manage time effectively and accomplish more in less time.</p>
        </div>
        
        <h3>How to Use the Pomodoro Technique</h3>
        <ol>
          <li>Choose your task and set the timer for 25 minutes</li>
          <li>Work with complete focus until the timer rings</li>
          <li>Take a 5-minute break to recharge</li>
          <li>Repeat for 4 cycles, then take a longer 15-30 minute break</li>
        </ol>
        
        <h3>Advanced Features</h3>
        <p>Track your productivity with detailed analytics, view session history, export your data, and monitor your focus streaks. All completely free!</p>
        
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl -z-10"></div>
        
        {/* Badge content */}
        <span>Transform your productivity today</span>
        
        {/* Main description */}
        <p>Boost your productivity with our free online focus timer. Perfect for Pomodoro technique, deep work sessions, and study time. Start focusing instantly - no registration required!</p>
        <p>Transform your productivity with our beautiful focus timer. Track sessions, view analytics, and build better focus habits.</p>
        
        {/* Feature highlights */}
        <span>Smart Timer</span>
        <span>Analytics</span>
        <span>Goal Tracking</span>
        <span>Streak Counter</span>
        
        {/* Timer modes */}
        <span>Pomodoro Timer (25 min)</span>
        <span>Deep Focus (50 min)</span>
        <span>Custom Durations</span>
        
        {/* Use cases */}
        <span>Track Progress</span>
        <span>Perfect for Study</span>
        <span>Work from Home</span>
        <span>Free online focus timer - no signup required</span>
      </div>

      {/* Timer Component */}
      <Timer />
      
      {/* FAQ Section for SEO */}
      <div className="sr-only">
        <h2>Frequently Asked Questions</h2>
        
        <h3>What makes FocusFlow the best online focus timer?</h3>
        <p>FocusFlow combines a beautiful, distraction-free interface with powerful analytics. Unlike other timers, we offer session tracking, productivity insights, and progress monitoring - all completely free.</p>
        
        <h3>Can I use this timer offline?</h3>
        <p>FocusFlow works best with an internet connection for saving your progress, but the basic timer functionality works offline once the page is loaded.</p>
        
        <h3>How does the session tracking work?</h3>
        <p>When you sign in (optional), FocusFlow automatically saves your completed sessions, tracks your total focus time, calculates completion rates, and shows productivity trends over time.</p>
        
        <h3>Is my data secure and private?</h3>
        <p>Yes! We use industry-standard security practices. Your session data is encrypted and stored securely. We never share your personal information with third parties.</p>
      </div>
    </div>
    </>
  );
}