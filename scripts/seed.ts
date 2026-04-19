import mongoose from 'mongoose';
import Course from '../lib/models/Course';
import Lesson from '../lib/models/Lesson';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quant-trading';

const coursesData = [
  {
    title: 'Introduction to Quantitative Trading',
    slug: 'intro-quant-trading',
    description: 'Learn the fundamentals of algorithmic trading, including market structure, trading strategies, and risk management basics.',
    difficulty: 'beginner',
    estimatedHours: 8,
    modules: [
      {
        title: 'What is Quantitative Trading?',
        order: 0,
        lessons: [
          { title: 'Introduction to Algorithmic Trading', slug: 'intro-algo-trading', order: 0 },
          { title: 'History of Quant Trading', slug: 'history-quant-trading', order: 1 },
          { title: 'Key Players and Markets', slug: 'key-players-markets', order: 2 },
        ],
      },
      {
        title: 'Market Structure',
        order: 1,
        lessons: [
          { title: 'Understanding Market Orders', slug: 'market-orders', order: 0 },
          { title: 'Limit Orders and Order Books', slug: 'limit-orders', order: 1 },
          { title: 'Market Microstructure', slug: 'market-microstructure', order: 2 },
        ],
      },
      {
        title: 'Trading vs Investing',
        order: 2,
        lessons: [
          { title: 'Short-term vs Long-term Approaches', slug: 'short-vs-long-term', order: 0 },
          { title: 'Risk and Return Profiles', slug: 'risk-return-profiles', order: 1 },
          { title: 'Setting Your Trading Goals', slug: 'setting-trading-goals', order: 2 },
        ],
      },
    ],
  },
  {
    title: 'Python for Finance',
    slug: 'python-for-finance',
    description: 'Master Python programming for financial data analysis, including NumPy, Pandas, and data visualization.',
    difficulty: 'beginner',
    estimatedHours: 12,
    modules: [
      {
        title: 'Python Fundamentals',
        order: 0,
        lessons: [
          { title: 'Setting Up Your Environment', slug: 'setup-environment', order: 0 },
          { title: 'Python Basics for Traders', slug: 'python-basics', order: 1 },
          { title: 'Working with Data Types', slug: 'data-types', order: 2 },
        ],
      },
      {
        title: 'NumPy for Numerical Computing',
        order: 1,
        lessons: [
          { title: 'Introduction to NumPy', slug: 'numpy-intro', order: 0 },
          { title: 'Array Operations', slug: 'array-operations', order: 1 },
          { title: 'Mathematical Functions', slug: 'math-functions', order: 2 },
        ],
      },
      {
        title: 'Pandas for Data Analysis',
        order: 2,
        lessons: [
          { title: 'Introduction to Pandas', slug: 'pandas-intro', order: 0 },
          { title: 'DataFrame Operations', slug: ' dataframe-operations', order: 1 },
          { title: 'Time Series Data', slug: 'time-series-data', order: 2 },
        ],
      },
      {
        title: 'Data Visualization',
        order: 3,
        lessons: [
          { title: 'Plotting with Matplotlib', slug: 'matplotlib-plotting', order: 0 },
          { title: 'Financial Charts', slug: 'financial-charts', order: 1 },
          { title: 'Interactive Visualizations', slug: 'interactive-viz', order: 2 },
        ],
      },
    ],
  },
  {
    title: 'Strategy Development',
    slug: 'strategy-development',
    description: 'Learn to develop, test, and implement trading strategies using backtesting and performance analysis.',
    difficulty: 'intermediate',
    estimatedHours: 15,
    modules: [
      {
        title: 'Strategy Fundamentals',
        order: 0,
        lessons: [
          { title: 'Types of Trading Strategies', slug: 'strategy-types', order: 0 },
          { title: 'Momentum Strategies', slug: 'momentum-strategies', order: 1 },
          { title: 'Mean Reversion Strategies', slug: 'mean-reversion', order: 2 },
        ],
      },
      {
        title: 'Backtesting Basics',
        order: 1,
        lessons: [
          { title: 'Introduction to Backtesting', slug: 'backtesting-intro', order: 0 },
          { title: 'Building a Backtest Framework', slug: 'backtest-framework', order: 1 },
          { title: 'Common Backtesting Pitfalls', slug: 'backtesting-pitfalls', order: 2 },
        ],
      },
      {
        title: 'Performance Metrics',
        order: 2,
        lessons: [
          { title: 'Sharpe Ratio and Risk Metrics', slug: 'sharpe-ratio', order: 0 },
          { title: 'Maximum Drawdown', slug: 'max-drawdown', order: 1 },
          { title: 'Win Rate and Profit Factor', slug: 'win-rate', order: 2 },
        ],
      },
      {
        title: 'Risk Management',
        order: 3,
        lessons: [
          { title: 'Position Sizing', slug: 'position-sizing', order: 0 },
          { title: 'Stop Loss Strategies', slug: 'stop-loss', order: 1 },
          { title: 'Portfolio Risk Management', slug: 'portfolio-risk', order: 2 },
        ],
      },
    ],
  },
];

interface LessonContentData {
  content: string;
  codeExamples?: {
    title: string;
    language: string;
    code: string;
    explanation: string;
  }[];
  resources?: {
    title: string;
    url: string;
    type: string;
  }[];
}

const lessonsContent: Record<string, LessonContentData> = {
  'intro-algo-trading': {
    content: `# Introduction to Algorithmic Trading

Algorithmic trading, also known as algo trading or automated trading, uses computer programs to execute trades automatically based on predefined rules and strategies.

## What You'll Learn

In this course, you'll discover how computers can analyze market data, identify trading opportunities, and execute trades faster and more efficiently than human traders.

## Key Concepts

1. **Automation**: Trading decisions are made by algorithms without human intervention
2. **Speed**: Algorithms can process data and execute trades in milliseconds
3. **Consistency**: Algorithms follow rules exactly, eliminating emotional decisions
4. **Scale**: Algorithms can monitor and trade multiple markets simultaneously

## Why Algorithmic Trading?

- Removes emotional bias from trading decisions
- Enables faster execution of complex strategies
- Can process vast amounts of data efficiently
- Allows for backtesting strategies on historical data

## Next Steps

Continue to the next lesson to learn about the history of quantitative trading and how it has evolved over the decades.`,
    codeExamples: [
      {
        title: 'Simple Moving Average Crossover Signal',
        language: 'python',
        code: `import pandas as pd

def generate_signals(prices, short_window=10, long_window=30):
    """
    Generate buy/sell signals based on moving average crossover.
    """
    signals = pd.DataFrame(index=prices.index)
    signals['price'] = prices
    signals['short_ma'] = prices.rolling(window=short_window).mean()
    signals['long_ma'] = prices.rolling(window=long_window).mean()
    signals['signal'] = 0
    
    # Buy when short MA crosses above long MA
    signals.loc[signals['short_ma'] > signals['long_ma'], 'signal'] = 1
    
    # Sell when short MA crosses below long MA  
    signals.loc[signals['short_ma'] < signals['long_ma'], 'signal'] = -1
    
    return signals`,
        explanation: 'This function generates trading signals based on a simple moving average crossover strategy. Buy signals are generated when the short-term moving average crosses above the long-term moving average.',
      },
    ],
    resources: [
      { title: 'Introduction to Algorithmic Trading', url: 'https://www.investopedia.com/terms/a/algorithmictrading.asp', type: 'article' },
    ],
  },
  'history-quant-trading': {
    content: `# History of Quantitative Trading

Quantitative trading has evolved significantly over the past decades, transforming from manual calculations to sophisticated computer-driven strategies.

## Timeline of Key Developments

### 1970s - The Beginning
- Black-Scholes model revolutionized options pricing
- Early computerized trading systems emerged

### 1980s - Program Trading
- Index arbitrage strategies became popular
- Portfolio insurance was developed

### 1990s - Electronic Markets
- Electronic communication networks (ECNs) emerged
- Direct market access became available

### 2000s - High-Frequency Trading
- Co-location of servers near exchanges
- Millisecond-level trading became possible

### 2010s - Machine Learning
- AI and ML techniques applied to trading
- Alternative data sources integrated

## Famous Quant Strategies

1. **Statistical Arbitrage**: Exploiting statistical mispricings
2. **Trend Following**: Identifying and following market trends
3. **Market Making**: Providing liquidity for profit
4. **Momentum Strategies**: Riding price momentum

## The Rise of Quant Funds

Firms like Renaissance Technologies, Two Sigma, and D.E. Shaw pioneered the use of mathematical models and computational methods in trading.`,
    resources: [
      { title: 'The Quants Book', url: 'https://www.amazon.com/Quants-Whiz-Whizzes-Conquered-Revolution/dp/1416599795', type: 'book' },
    ],
  },
  'setup-environment': {
    content: `# Setting Up Your Python Environment

Before we start coding, let's set up a proper Python environment for quantitative trading.

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- A code editor (VS Code, PyCharm, or similar)

## Step 1: Install Python

Download Python from the official website: python.org

Verify your installation:
\`\`\`bash
python --version
\`\`\`

## Step 2: Create a Virtual Environment

Virtual environments keep your project dependencies isolated:

\`\`\`bash
python -m venv quant_env
source quant_env/bin/activate  # On macOS/Linux
quant_env\\Scripts\\activate     # On Windows
\`\`\`

## Step 3: Install Required Packages

Install the core packages we'll use:

\`\`\`bash
pip install numpy pandas matplotlib yfinance
\`\`\``,
    codeExamples: [
      {
        title: 'Verify Your Installation',
        language: 'python',
        code: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

print("NumPy version:", np.__version__)
print("Pandas version:", pd.__version__)

# Quick test
data = np.random.randn(100)
print("Random data mean:", data.mean())`,
        explanation: 'Run this script to verify all packages are installed correctly and working.',
      },
    ],
  },
};

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Course.deleteMany({});
    await Lesson.deleteMany({});
    console.log('Cleared existing data');

    // Insert courses
    for (const courseData of coursesData) {
      const course = await Course.create(courseData);
      console.log('Created course:', course.title);

      // Insert lessons for each course
      for (const courseModule of courseData.modules) {
        for (const lessonInfo of courseModule.lessons) {
          const lessonContent = lessonsContent[lessonInfo.slug] || {
            content: `# ${lessonInfo.title}\n\nThis lesson covers ${lessonInfo.title}.\n\nContent will be added soon.`,
            codeExamples: [],
            resources: [],
          };

          await Lesson.create({
            title: lessonInfo.title,
            slug: lessonInfo.slug,
            courseSlug: courseData.slug,
            moduleIndex: courseModule.order,
            order: lessonInfo.order,
            content: lessonContent.content,
            codeExamples: lessonContent.codeExamples || [],
            resources: lessonContent.resources || [],
          });
          console.log('Created lesson:', lessonInfo.title);
        }
      }
    }

    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();