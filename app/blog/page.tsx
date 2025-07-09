import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, Target, Brain, Coffee, BookOpen, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Focus Timer Tips & Productivity Blog - Improve Your Focus Habits',
  description: 'Learn how to use focus timers effectively, master the Pomodoro technique, and boost your productivity. Expert tips for better focus, study habits, and time management.',
  keywords: [
    'pomodoro technique guide',
    'focus timer tips',
    'productivity tips',
    'time management techniques',
    'study tips',
    'deep work strategies',
    'concentration techniques',
    'work from home productivity',
    'focus habits',
    'productivity hacks'
  ],
  openGraph: {
    title: 'Focus Timer Tips & Productivity Blog - FocusFlow',
    description: 'Learn how to use focus timers effectively and boost your productivity with expert tips and techniques.',
    url: 'https://focusflow.app/blog',
  },
};

const blogPosts = [
  {
    title: 'The Complete Guide to Pomodoro Technique in 2024',
    description: 'Master the Pomodoro technique with our comprehensive guide. Learn the 25-minute work intervals, break schedules, and advanced tips for maximum productivity.',
    icon: <Coffee className="h-6 w-6" />,
    readTime: '8 min read',
    category: 'Technique'
  },
  {
    title: 'Deep Focus Sessions: How to Work for 50+ Minutes Straight',
    description: 'Discover the secrets of extended focus sessions. Learn how to maintain concentration for deep work and tackle complex projects effectively.',
    icon: <Brain className="h-6 w-6" />,
    readTime: '6 min read',
    category: 'Deep Work'
  },
  {
    title: 'Study Timer Best Practices for Students',
    description: 'Optimize your study sessions with proven timer techniques. Learn how to balance focused study time with effective breaks for better retention.',
    icon: <BookOpen className="h-6 w-6" />,
    readTime: '5 min read',
    category: 'Study Tips'
  },
  {
    title: 'Work from Home: Using Focus Timers for Remote Productivity',
    description: 'Stay productive while working remotely with focus timer strategies. Create structure, minimize distractions, and maintain work-life balance.',
    icon: <Target className="h-6 w-6" />,
    readTime: '7 min read',
    category: 'Remote Work'
  },
  {
    title: 'Breaking Bad Habits: How Focus Timers Improve Concentration',
    description: 'Transform your focus habits with timer-based techniques. Learn how structured time blocks can help overcome procrastination and distractions.',
    icon: <Zap className="h-6 w-6" />,
    readTime: '4 min read',
    category: 'Habits'
  },
  {
    title: 'Custom Timer Durations: Finding Your Perfect Focus Length',
    description: 'Discover your optimal focus duration beyond the standard 25-minute Pomodoro. Learn how to customize timer lengths for different tasks and energy levels.',
    icon: <Clock className="h-6 w-6" />,
    readTime: '5 min read',
    category: 'Customization'
  }
];

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl -z-10"></div>
        
        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-emerald-200/50 shadow-lg mb-6">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Expert productivity insights</span>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="gradient-text">Focus Timer</span>
          <span className="text-gray-800"> Tips & Guides</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Master the art of focused work with our expert guides on Pomodoro technique, deep work strategies, and productivity optimization.
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {blogPosts.map((post, index) => (
          <article
            key={index}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 card-hover"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl text-emerald-600">
                {post.icon}
              </div>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-4 leading-tight">
              {post.title}
            </h2>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              {post.description}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 font-medium">{post.readTime}</span>
              <Link
                href="#"
                className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm transition-colors"
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* SEO Content Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50 mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Master Your Focus with Expert Techniques</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">🍅 Pomodoro Technique Mastery</h3>
            <p className="text-gray-600 mb-4">
              Learn the proven 25-minute work intervals that have helped millions boost their productivity. Our comprehensive guides cover everything from basic setup to advanced Pomodoro variations.
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• Traditional 25-minute Pomodoro sessions</li>
              <li>• Optimal break timing and activities</li>
              <li>• Advanced Pomodoro variations</li>
              <li>• Common mistakes to avoid</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">🎯 Deep Work Strategies</h3>
            <p className="text-gray-600 mb-4">
              Discover how to maintain focus for extended periods with our deep work guides. Perfect for complex projects, creative work, and intensive study sessions.
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>• Extended 50+ minute focus sessions</li>
              <li>• Environment optimization tips</li>
              <li>• Distraction elimination techniques</li>
              <li>• Energy management strategies</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="text-center bg-gradient-to-r from-emerald-50/80 to-teal-50/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-emerald-200/50">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Get Weekly Productivity Tips</h3>
        <p className="text-gray-600 mb-6">Join our newsletter for the latest focus techniques, productivity hacks, and timer optimization strategies.</p>
        <div className="flex max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-l-xl border-2 border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-r-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}