import mongoose from 'mongoose';
import Course from '../lib/models/Course';
import Lesson from '../lib/models/Lesson';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/quant-trading';

const coursesData = [
  {
    title: 'Introduction to Quantitative Trading',
    slug: 'intro-quant-trading',
    description: 'Learn the fundamentals of algorithmic trading from the ground up.',
    difficulty: 'beginner',
    estimatedHours: 6,
    modules: [
      { title: 'What is Quantitative Trading?', order: 0, lessons: [
        { title: 'What is Algorithmic Trading', slug: 'what-is-algo-trading', order: 0 },
        { title: 'History & Evolution', slug: 'history-evolution', order: 1 },
        { title: 'Quant vs Traditional Trading', slug: 'quant-vs-traditional', order: 2 },
        { title: 'Key Players & Firms', slug: 'key-players-firms', order: 3 },
        { title: 'Career Paths in Quant Trading', slug: 'career-paths', order: 4 },
      ]},
      { title: 'Market Fundamentals', order: 1, lessons: [
        { title: 'Stock Markets 101', slug: 'stock-markets-101', order: 0 },
        { title: 'Order Types Explained', slug: 'order-types', order: 1 },
        { title: 'Order Books & Liquidity', slug: 'order-books', order: 2 },
        { title: 'Market Participants', slug: 'market-participants', order: 3 },
        { title: 'Price Discovery', slug: 'price-discovery', order: 4 },
      ]},
      { title: 'Trading Basics', order: 2, lessons: [
        { title: 'Timeframes & Trading Styles', slug: 'timeframes-styles', order: 0 },
        { title: 'Risk/Reward Concepts', slug: 'risk-reward', order: 1 },
        { title: 'Trading vs Investing', slug: 'trading-vs-investing', order: 2 },
        { title: 'Setting Your Goals', slug: 'setting-goals', order: 3 },
        { title: 'Getting Started Checklist', slug: 'getting-started', order: 4 },
      ]},
    ],
  },
  {
    title: 'Python for Finance',
    slug: 'python-for-finance',
    description: 'Master Python programming for financial data analysis.',
    difficulty: 'beginner',
    estimatedHours: 10,
    modules: [
      { title: 'Getting Started', order: 0, lessons: [
        { title: 'Installation & Setup', slug: 'python-installation', order: 0 },
        { title: 'Python Basics', slug: 'python-basics', order: 1 },
        { title: 'Variables & Data Types', slug: 'variables-data-types', order: 2 },
        { title: 'Control Flow', slug: 'control-flow', order: 3 },
        { title: 'Functions', slug: 'python-functions', order: 4 },
      ]},
      { title: 'NumPy Essentials', order: 1, lessons: [
        { title: 'Arrays & Shapes', slug: 'numpy-arrays', order: 0 },
        { title: 'Indexing & Slicing', slug: 'numpy-indexing', order: 1 },
        { title: 'Mathematical Operations', slug: 'numpy-math', order: 2 },
        { title: 'Random Numbers', slug: 'numpy-random', order: 3 },
        { title: 'Performance Tips', slug: 'numpy-performance', order: 4 },
      ]},
      { title: 'Pandas for Data', order: 2, lessons: [
        { title: 'Series & DataFrames', slug: 'pandas-series-df', order: 0 },
        { title: 'Loading Data', slug: 'pandas-loading', order: 1 },
        { title: 'Filtering & Selection', slug: 'pandas-filtering', order: 2 },
        { title: 'Grouping & Aggregation', slug: 'pandas-grouping', order: 3 },
        { title: 'Merging Data', slug: 'pandas-merging', order: 4 },
      ]},
      { title: 'Time Series', order: 3, lessons: [
        { title: 'Date Handling', slug: 'pandas-dates', order: 0 },
        { title: 'Resampling', slug: 'pandas-resampling', order: 1 },
        { title: 'Rolling Windows', slug: 'pandas-rolling', order: 2 },
        { title: 'Shift & Lag', slug: 'pandas-shift', order: 3 },
        { title: 'Handling Missing Data', slug: 'pandas-missing', order: 4 },
      ]},
      { title: 'Visualization', order: 4, lessons: [
        { title: 'Matplotlib Basics', slug: 'matplotlib-basics', order: 0 },
        { title: 'Financial Charts', slug: 'financial-charts', order: 1 },
        { title: 'Candlestick Plots', slug: 'candlestick-plots', order: 2 },
        { title: 'Interactive Plots', slug: 'interactive-plots', order: 3 },
        { title: 'Plotting Best Practices', slug: 'plotting-best-practices', order: 4 },
      ]},
    ],
  },
  {
    title: 'Financial Data Basics',
    slug: 'financial-data-basics',
    description: 'Learn how to source, access, and clean financial market data.',
    difficulty: 'beginner',
    estimatedHours: 6,
    modules: [
      { title: 'Data Sources', order: 0, lessons: [
        { title: 'Market Data Types', slug: 'market-data-types', order: 0 },
        { title: 'Free Data Sources', slug: 'free-data-sources', order: 1 },
        { title: 'Premium Data Sources', slug: 'premium-data', order: 2 },
        { title: 'API Overview', slug: 'api-overview', order: 3 },
        { title: 'Data Costs', slug: 'data-costs', order: 4 },
      ]},
      { title: 'Working with APIs', order: 1, lessons: [
        { title: 'yfinance Basics', slug: 'yfinance-basics', order: 0 },
        { title: 'API Authentication', slug: 'api-auth', order: 1 },
        { title: 'Rate Limits', slug: 'rate-limits', order: 2 },
        { title: 'Error Handling', slug: 'api-error-handling', order: 3 },
        { title: 'Batch Requests', slug: 'batch-requests', order: 4 },
      ]},
      { title: 'Data Quality', order: 2, lessons: [
        { title: 'Data Cleaning', slug: 'data-cleaning', order: 0 },
        { title: 'Missing Values', slug: 'missing-values', order: 1 },
        { title: 'Outliers', slug: 'outliers', order: 2 },
        { title: 'Adjusted Data', slug: 'adjusted-data', order: 3 },
        { title: 'Data Validation', slug: 'data-validation', order: 4 },
      ]},
    ],
  },
  {
    title: 'Technical Analysis Fundamentals',
    slug: 'technical-analysis',
    description: 'Understand technical analysis concepts and popular indicators.',
    difficulty: 'beginner',
    estimatedHours: 6,
    modules: [
      { title: 'Price Action', order: 0, lessons: [
        { title: 'Support & Resistance', slug: 'support-resistance', order: 0 },
        { title: 'Trends & Channels', slug: 'trends-channels', order: 1 },
        { title: 'Candlestick Patterns', slug: 'candlestick-patterns', order: 2 },
        { title: 'Chart Patterns', slug: 'chart-patterns', order: 3 },
        { title: 'Volume Analysis', slug: 'volume-analysis', order: 4 },
      ]},
      { title: 'Moving Averages', order: 1, lessons: [
        { title: 'SMA & EMA', slug: 'sma-ema', order: 0 },
        { title: 'MA Crossovers', slug: 'ma-crossovers', order: 1 },
        { title: 'MA Support', slug: 'ma-support', order: 2 },
        { title: 'Multiple Timeframes', slug: 'multiple-timeframes', order: 3 },
        { title: 'MA Strategies', slug: 'ma-strategies', order: 4 },
      ]},
      { title: 'Indicators', order: 2, lessons: [
        { title: 'RSI Basics', slug: 'rsi-basics', order: 0 },
        { title: 'MACD', slug: 'macd', order: 1 },
        { title: 'Bollinger Bands', slug: 'bollinger-bands', order: 2 },
        { title: 'Stochastic', slug: 'stochastic', order: 3 },
        { title: 'ATR & Volatility', slug: 'atr-volatility', order: 4 },
      ]},
      { title: 'Generating Signals', order: 3, lessons: [
        { title: 'Signal Logic', slug: 'signal-logic', order: 0 },
        { title: 'Combining Indicators', slug: 'combining-indicators', order: 1 },
        { title: 'Entry/Exit Rules', slug: 'entry-exit-rules', order: 2 },
        { title: 'Signal Filtering', slug: 'signal-filtering', order: 3 },
        { title: 'Backtest Preview', slug: 'backtest-preview', order: 4 },
      ]},
    ],
  },
  {
    title: 'Trading Strategy Development',
    slug: 'strategy-development',
    description: 'Build and implement trading strategies from scratch.',
    difficulty: 'intermediate',
    estimatedHours: 12,
    modules: [
      { title: 'Strategy Framework', order: 0, lessons: [
        { title: 'Strategy Components', slug: 'strategy-components', order: 0 },
        { title: 'Hypothesis Formation', slug: 'hypothesis-formation', order: 1 },
        { title: 'Strategy Types', slug: 'strategy-types', order: 2 },
        { title: 'Strategy Lifecycle', slug: 'strategy-lifecycle', order: 3 },
        { title: 'Strategy Documentation', slug: 'strategy-docs', order: 4 },
      ]},
      { title: 'Momentum Strategies', order: 1, lessons: [
        { title: 'Trend Following', slug: 'trend-following', order: 0 },
        { title: 'Price Momentum', slug: 'price-momentum', order: 1 },
        { title: 'Volume Momentum', slug: 'volume-momentum', order: 2 },
        { title: 'Breakout Strategies', slug: 'breakout-strategies', order: 3 },
        { title: 'Momentum Implementation', slug: 'momentum-impl', order: 4 },
      ]},
      { title: 'Mean Reversion', order: 2, lessons: [
        { title: 'Mean Reversion Concept', slug: 'mean-reversion-concept', order: 0 },
        { title: 'RSI Reversion', slug: 'rsi-reversion', order: 1 },
        { title: 'Bollinger Reversion', slug: 'bollinger-reversion', order: 2 },
        { title: 'Pairs Trading Intro', slug: 'pairs-intro', order: 3 },
        { title: 'Reversion Implementation', slug: 'reversion-impl', order: 4 },
      ]},
      { title: 'Signal Generation', order: 3, lessons: [
        { title: 'Entry Signals', slug: 'entry-signals', order: 0 },
        { title: 'Exit Signals', slug: 'exit-signals', order: 1 },
        { title: 'Stop Loss Logic', slug: 'stop-loss-logic', order: 2 },
        { title: 'Position Sizing', slug: 'position-sizing-signals', order: 3 },
        { title: 'Signal Optimization', slug: 'signal-optimization', order: 4 },
      ]},
      { title: 'Strategy Examples', order: 4, lessons: [
        { title: 'MA Crossover Complete', slug: 'ma-crossover-complete', order: 0 },
        { title: 'RSI Strategy', slug: 'rsi-strategy', order: 1 },
        { title: 'Dual Thrust', slug: 'dual-thrust', order: 2 },
        { title: 'Turtle Trading', slug: 'turtle-trading', order: 3 },
        { title: 'Custom Strategy', slug: 'custom-strategy', order: 4 },
      ]},
    ],
  },
  {
    title: 'Backtesting Essentials',
    slug: 'backtesting',
    description: 'Learn how to properly backtest trading strategies.',
    difficulty: 'intermediate',
    estimatedHours: 8,
    modules: [
      { title: 'Backtest Basics', order: 0, lessons: [
        { title: 'What is Backtesting', slug: 'what-is-backtesting', order: 0 },
        { title: 'Backtest Framework', slug: 'backtest-framework', order: 1 },
        { title: 'Data Requirements', slug: 'backtest-data', order: 2 },
        { title: 'Simulation Logic', slug: 'simulation-logic', order: 3 },
        { title: 'First Backtest', slug: 'first-backtest', order: 4 },
      ]},
      { title: 'Performance Metrics', order: 1, lessons: [
        { title: 'Total Return', slug: 'total-return', order: 0 },
        { title: 'Sharpe Ratio', slug: 'sharpe-ratio', order: 1 },
        { title: 'Sortino Ratio', slug: 'sortino-ratio', order: 2 },
        { title: 'Maximum Drawdown', slug: 'max-drawdown', order: 3 },
        { title: 'Win Rate', slug: 'win-rate', order: 4 },
      ]},
      { title: 'Backtest Quality', order: 2, lessons: [
        { title: 'Look-ahead Bias', slug: 'lookahead-bias', order: 0 },
        { title: 'Survivorship Bias', slug: 'survivorship-bias', order: 1 },
        { title: 'Overfitting', slug: 'overfitting', order: 2 },
        { title: 'Transaction Costs', slug: 'transaction-costs', order: 3 },
        { title: 'Slippage', slug: 'slippage', order: 4 },
      ]},
      { title: 'Validation', order: 3, lessons: [
        { title: 'Train/Test Split', slug: 'train-test-split', order: 0 },
        { title: 'Walk-Forward', slug: 'walk-forward', order: 1 },
        { title: 'Monte Carlo', slug: 'monte-carlo', order: 2 },
        { title: 'Out-of-Sample', slug: 'out-of-sample', order: 3 },
      ]},
    ],
  },
  {
    title: 'Portfolio Basics',
    slug: 'portfolio-basics',
    description: 'Understand portfolio theory and asset allocation.',
    difficulty: 'intermediate',
    estimatedHours: 6,
    modules: [
      { title: 'Portfolio Theory', order: 0, lessons: [
        { title: 'Diversification', slug: 'diversification', order: 0 },
        { title: 'Correlation', slug: 'correlation-covariance', order: 1 },
        { title: 'Efficient Frontier', slug: 'efficient-frontier', order: 2 },
        { title: 'CAPM', slug: 'capm', order: 3 },
        { title: 'Risk-Return', slug: 'risk-return', order: 4 },
      ]},
      { title: 'Portfolio Construction', order: 1, lessons: [
        { title: 'Asset Allocation', slug: 'asset-allocation', order: 0 },
        { title: 'Position Sizing', slug: 'position-sizing', order: 1 },
        { title: 'Equal Weight', slug: 'equal-weight', order: 2 },
        { title: 'Risk Parity', slug: 'risk-parity', order: 3 },
        { title: 'Kelly Criterion', slug: 'kelly-criterion', order: 4 },
      ]},
      { title: 'Portfolio Management', order: 2, lessons: [
        { title: 'Rebalancing', slug: 'rebalancing', order: 0 },
        { title: 'Monitoring', slug: 'portfolio-monitoring', order: 1 },
        { title: 'Attribution', slug: 'performance-attribution', order: 2 },
        { title: 'Constraints', slug: 'portfolio-constraints', order: 3 },
      ]},
    ],
  },
  {
    title: 'Statistics for Traders',
    slug: 'statistics-traders',
    description: 'Learn statistical methods essential for trading analysis.',
    difficulty: 'intermediate',
    estimatedHours: 8,
    modules: [
      { title: 'Descriptive Statistics', order: 0, lessons: [
        { title: 'Mean Median Mode', slug: 'mean-median-mode', order: 0 },
        { title: 'Variance Std Dev', slug: 'variance-stddev', order: 1 },
        { title: 'Skewness Kurtosis', slug: 'skewness-kurtosis', order: 2 },
        { title: 'Distributions', slug: 'distributions', order: 3 },
        { title: 'Histograms', slug: 'histograms', order: 4 },
      ]},
      { title: 'Correlation Analysis', order: 1, lessons: [
        { title: 'Correlation Coefficient', slug: 'correlation-coefficient', order: 0 },
        { title: 'Rolling Correlation', slug: 'rolling-correlation', order: 1 },
        { title: 'Correlation Matrix', slug: 'correlation-matrix', order: 2 },
        { title: 'Lead-Lag', slug: 'lead-lag', order: 3 },
      ]},
      { title: 'Regression', order: 2, lessons: [
        { title: 'Linear Regression', slug: 'linear-regression', order: 0 },
        { title: 'Multiple Regression', slug: 'multiple-regression', order: 1 },
        { title: 'Regression Trading', slug: 'regression-trading', order: 2 },
        { title: 'Residuals', slug: 'residual-analysis', order: 3 },
      ]},
      { title: 'Time Series', order: 3, lessons: [
        { title: 'Stationarity', slug: 'stationarity', order: 0 },
        { title: 'Autocorrelation', slug: 'autocorrelation', order: 1 },
        { title: 'AR/MA Models', slug: 'ar-ma-models', order: 2 },
        { title: 'Seasonality', slug: 'seasonality', order: 3 },
        { title: 'Time Series Testing', slug: 'timeseries-testing', order: 4 },
      ]},
      { title: 'Hypothesis Testing', order: 4, lessons: [
        { title: 'T-Tests', slug: 't-tests', order: 0 },
        { title: 'P-Values', slug: 'p-values', order: 1 },
        { title: 'Significance', slug: 'significance-testing', order: 2 },
        { title: 'Multiple Testing', slug: 'multiple-testing', order: 3 },
      ]},
    ],
  },
  {
    title: 'Machine Learning for Trading',
    slug: 'ml-trading',
    description: 'Apply machine learning techniques to trading.',
    difficulty: 'advanced',
    estimatedHours: 12,
    modules: [
      { title: 'ML Basics', order: 0, lessons: [
        { title: 'ML Overview', slug: 'ml-overview', order: 0 },
        { title: 'Supervised Unsupervised', slug: 'supervised-unsupervised', order: 1 },
        { title: 'Train Test', slug: 'ml-training-testing', order: 2 },
        { title: 'Feature Engineering', slug: 'feature-engineering-intro', order: 3 },
        { title: 'Model Selection', slug: 'model-selection', order: 4 },
      ]},
      { title: 'Classification', order: 1, lessons: [
        { title: 'Decision Trees', slug: 'decision-trees', order: 0 },
        { title: 'Random Forest', slug: 'random-forest', order: 1 },
        { title: 'XGBoost', slug: 'xgboost', order: 2 },
        { title: 'Logistic Regression', slug: 'logistic-regression', order: 3 },
        { title: 'Classification Trading', slug: 'classification-trading', order: 4 },
      ]},
      { title: 'Regression Models', order: 2, lessons: [
        { title: 'Linear ML', slug: 'linear-regression-ml', order: 0 },
        { title: 'Ridge Lasso', slug: 'ridge-lasso', order: 1 },
        { title: 'SVR', slug: 'svr', order: 2 },
        { title: 'Neural Networks', slug: 'neural-networks', order: 3 },
        { title: 'Price Prediction', slug: 'price-prediction', order: 4 },
      ]},
      { title: 'Feature Engineering', order: 3, lessons: [
        { title: 'Technical Features', slug: 'technical-features', order: 0 },
        { title: 'Fundamental Features', slug: 'fundamental-features', order: 1 },
        { title: 'Alternative Data', slug: 'alternative-data', order: 2 },
        { title: 'Feature Selection', slug: 'feature-selection', order: 3 },
        { title: 'Feature Importance', slug: 'feature-importance', order: 4 },
      ]},
      { title: 'Model Evaluation', order: 4, lessons: [
        { title: 'Cross Validation', slug: 'cross-validation', order: 0 },
        { title: 'Overfitting Prevention', slug: 'overfitting-prevention', order: 1 },
        { title: 'Hyperparameter', slug: 'hyperparameter-tuning', order: 2 },
        { title: 'Ensemble', slug: 'ensemble-methods', order: 3 },
        { title: 'Production ML', slug: 'production-ml', order: 4 },
      ]},
    ],
  },
  {
    title: 'Advanced Strategies',
    slug: 'advanced-strategies',
    description: 'Explore advanced trading strategies.',
    difficulty: 'advanced',
    estimatedHours: 10,
    modules: [
      { title: 'Stat Arb', order: 0, lessons: [
        { title: 'Stat Arb Overview', slug: 'stat-arb-overview', order: 0 },
        { title: 'Pairs Selection', slug: 'pairs-selection', order: 1 },
        { title: 'Cointegration', slug: 'cointegration', order: 2 },
        { title: 'Spread Trading', slug: 'spread-trading', order: 3 },
        { title: 'Stat Arb Implementation', slug: 'stat-arb-impl', order: 4 },
      ]},
      { title: 'Factor Models', order: 1, lessons: [
        { title: 'Factor Investing', slug: 'factor-investing', order: 0 },
        { title: 'Fama French', slug: 'fama-french', order: 1 },
        { title: 'Momentum Factor', slug: 'momentum-factor', order: 2 },
        { title: 'Quality Factor', slug: 'quality-factor', order: 3 },
        { title: 'Multi Factor', slug: 'multi-factor', order: 4 },
      ]},
      { title: 'Options', order: 2, lessons: [
        { title: 'Options Basics', slug: 'options-basics', order: 0 },
        { title: 'Greeks', slug: 'greeks', order: 1 },
        { title: 'Delta Hedging', slug: 'delta-hedging', order: 2 },
        { title: 'Volatility', slug: 'volatility-strategies', order: 3 },
        { title: 'Options Quant', slug: 'options-quant', order: 4 },
      ]},
      { title: 'Intraday', order: 3, lessons: [
        { title: 'Intraday Patterns', slug: 'intraday-patterns', order: 0 },
        { title: 'Opening Range', slug: 'opening-range', order: 1 },
        { title: 'VWAP', slug: 'vwap-strategies', order: 2 },
        { title: 'Microstructure', slug: 'market-micro', order: 3 },
        { title: 'HFT Concepts', slug: 'hft-concepts', order: 4 },
      ]},
    ],
  },
  {
    title: 'Risk Management Professional',
    slug: 'risk-management',
    description: 'Master professional risk management techniques.',
    difficulty: 'advanced',
    estimatedHours: 8,
    modules: [
      { title: 'Risk Metrics', order: 0, lessons: [
        { title: 'VaR Methods', slug: 'var-methods', order: 0 },
        { title: 'CVaR', slug: 'cvar', order: 1 },
        { title: 'Risk Budgeting', slug: 'risk-budgeting', order: 2 },
        { title: 'Tail Risk', slug: 'tail-risk', order: 3 },
        { title: 'Risk Reporting', slug: 'risk-reporting', order: 4 },
      ]},
      { title: 'Position Risk', order: 1, lessons: [
        { title: 'Position Limits', slug: 'position-limits', order: 0 },
        { title: 'Stop Loss Design', slug: 'stop-loss-design', order: 1 },
        { title: 'Take Profit', slug: 'take-profit', order: 2 },
        { title: 'Risk Per Trade', slug: 'risk-per-trade', order: 3 },
        { title: 'Portfolio Limits', slug: 'portfolio-limits', order: 4 },
      ]},
      { title: 'Portfolio Risk', order: 2, lessons: [
        { title: 'Correlation Risk', slug: 'correlation-risk', order: 0 },
        { title: 'Concentration', slug: 'concentration-risk', order: 1 },
        { title: 'Liquidity', slug: 'liquidity-risk', order: 2 },
        { title: 'Drawdown', slug: 'drawdown-control', order: 3 },
        { title: 'Risk Parity Advanced', slug: 'risk-parity-advanced', order: 4 },
      ]},
      { title: 'Advanced Risk', order: 3, lessons: [
        { title: 'Stress Testing', slug: 'stress-testing', order: 0 },
        { title: 'Scenario Analysis', slug: 'scenario-analysis', order: 1 },
        { title: 'Black Swan', slug: 'black-swan', order: 2 },
        { title: 'Counterparty', slug: 'counterparty-risk', order: 3 },
        { title: 'Operational', slug: 'operational-risk', order: 4 },
      ]},
    ],
  },
  {
    title: 'Building Production Systems',
    slug: 'production-systems',
    description: 'Build and deploy production trading systems.',
    difficulty: 'advanced',
    estimatedHours: 6,
    modules: [
      { title: 'Execution', order: 0, lessons: [
        { title: 'Order Management', slug: 'order-management', order: 0 },
        { title: 'Execution Algos', slug: 'execution-algos', order: 1 },
        { title: 'Smart Routing', slug: 'smart-order-routing', order: 2 },
        { title: 'Latency', slug: 'latency', order: 3 },
      ]},
      { title: 'Infrastructure', order: 1, lessons: [
        { title: 'Cloud Setup', slug: 'cloud-setup', order: 0 },
        { title: 'Database', slug: 'database-design', order: 1 },
        { title: 'API Integration', slug: 'api-integration', order: 2 },
        { title: 'Monitoring', slug: 'monitoring-logging', order: 3 },
        { title: 'Alerting', slug: 'alerting', order: 4 },
      ]},
      { title: 'Going Live', order: 2, lessons: [
        { title: 'Paper Trading', slug: 'paper-trading', order: 0 },
        { title: 'Rollout', slug: 'gradual-rollout', order: 1 },
        { title: 'Performance', slug: 'perf-monitoring', order: 2 },
        { title: 'Debugging', slug: 'debugging-production', order: 3 },
        { title: 'Scaling', slug: 'scaling-up', order: 4 },
      ]},
    ],
  },
];

interface LessonContentData {
  content: string;
  codeExamples?: { title: string; language: string; code: string; explanation: string }[];
  resources?: { title: string; url: string; type: string }[];
}

const lessonsContent: Record<string, LessonContentData> = {
  'what-is-algo-trading': {
    content: 'What is Algorithmic Trading\n\nAlgorithmic trading uses computer programs to execute trades automatically based on predefined rules.\n\nKey Concepts:\n- Automation: Trading decisions are made by algorithms without human intervention\n- Speed: Algorithms can process data and execute trades in milliseconds\n- Consistency: Algorithms follow rules exactly, eliminating emotional decisions\n- Scale: Monitor multiple markets simultaneously\n\nWhy Algorithmic Trading?\n- Removes emotional bias from trading decisions\n- Enables faster execution of complex strategies\n- Processes vast amounts of data efficiently\n- Allows for backtesting strategies on historical data\n\nTypes of Algorithmic Trading:\n1. Execution Algorithms - Optimize order execution (TWAP, VWAP)\n2. Strategy-Based Algorithms - Trade based on market signals\n3. High-Frequency Trading - Ultra-fast trading exploiting small price differences\n4. Market Making - Provide liquidity for profit',
    codeExamples: [{
      title: 'Simple Moving Average Crossover Signal',
      language: 'python',
      code: 'import pandas as pd\n\ndef generate_signals(prices, short_window=10, long_window=30):\n    signals = pd.DataFrame(index=prices.index)\n    signals["short_ma"] = prices.rolling(window=short_window).mean()\n    signals["long_ma"] = prices.rolling(window=long_window).mean()\n    signals["signal"] = 0\n    signals.loc[signals["short_ma"] > signals["long_ma"], "signal"] = 1\n    signals.loc[signals["short_ma"] < signals["long_ma"], "signal"] = -1\n    return signals',
      explanation: 'This generates trading signals based on moving average crossover. Buy when short MA crosses above long MA.',
    }],
    resources: [{ title: 'Algorithmic Trading Introduction', url: 'https://www.investopedia.com/terms/a/algorithmictrading.asp', type: 'article' }],
  },
  'history-evolution': {
    content: 'History & Evolution of Quantitative Trading\n\nQuantitative trading has evolved significantly over the past decades.\n\nTimeline of Key Developments:\n\n1970s - The Beginning\n- Black-Scholes model revolutionized options pricing (1973)\n- Early computerized trading systems emerged\n- First quantitative hedge funds founded\n\n1980s - Program Trading\n- Index arbitrage strategies became popular\n- Portfolio insurance was developed\n- Futures and options markets expanded\n\n1990s - Electronic Markets\n- Electronic communication networks (ECNs) emerged\n- Direct market access became available\n- Internet enabled real-time data access\n\n2000s - High-Frequency Trading\n- Co-location of servers near exchanges\n- Millisecond-level trading became possible\n- Algorithmic execution became standard\n\n2010s - Machine Learning Era\n- AI and ML techniques applied to trading\n- Alternative data sources integrated\n- Natural language processing for news analysis\n\n2020s - Current Trends\n- Deep learning for pattern recognition\n- Crypto and digital asset trading\n- Democratization of quant tools',
    resources: [{ title: 'The Quants Book', url: 'https://www.amazon.com/Quants-Whiz-Whizzes-Conquered-Revolution/dp/1416599795', type: 'book' }],
  },
  'quant-vs-traditional': {
    content: 'Quantitative vs Traditional Trading\n\nUnderstanding the key differences between quantitative and traditional trading approaches.\n\nTraditional Trading:\n- Human decision-making based on analysis\n- Subjective interpretation of charts and news\n- Slower reaction to market changes\n- Limited to monitoring a few assets\n- Prone to emotional biases\n\nQuantitative Trading:\n- Computer-driven decision-making\n- Objective, rule-based execution\n- Fast reaction to market changes\n- Can monitor thousands of assets\n- Eliminates emotional biases\n\nKey Comparisons:\n\nDecision Process:\n- Traditional: Trader analyzes, decides, executes\n- Quantitative: Algorithm detects signal, executes automatically\n\nSpeed:\n- Traditional: Seconds to minutes\n- Quantitative: Microseconds to milliseconds\n\nConsistency:\n- Traditional: Varies based on trader mood, fatigue\n- Quantitative: Always follows same rules\n\nScalability:\n- Traditional: Limited by human capacity\n- Quantitative: Can scale across many markets\n\nHybrid Approaches:\nMany successful traders combine both approaches - using quantitative tools to support human decisions.',
    codeExamples: [{
      title: 'Automated vs Manual Signal Comparison',
      language: 'python',
      code: 'import pandas as pd\nimport yfinance as yf\n\ndata = yf.Ticker("AAPL").history(period="1mo")\n\n# Quantitative: Automated MA crossover signal\nma_signal = 1 if data["Close"].iloc[-1] > data["Close"].rolling(20).mean().iloc[-1] else 0\n\n# Traditional: Would require manual chart analysis\nprint("Quant Signal:", ma_signal)',
      explanation: 'Quantitative approach generates signals automatically based on predefined rules.',
    }],
  },
  'key-players-firms': {
    content: 'Key Players & Firms in Quantitative Trading\n\nThe quantitative trading industry has several key participants.\n\nTop Quantitative Hedge Funds:\n\n1. Renaissance Technologies\n- Founded by Jim Simons (1982)\n- Medallion Fund: ~66% annual returns\n- Uses mathematical models and statistical analysis\n- Most successful quant fund historically\n\n2. Two Sigma\n- Founded 2001\n- Uses AI, ML, and distributed computing\n- ~60 billion AUM\n\n3. D.E. Shaw\n- Founded 1988\n- Pioneer in computational finance\n- Multi-strategy approach\n\n4. Citadel\n- Founded by Ken Griffin (1990)\n- Largest market maker in US equities\n- ~50 billion AUM\n\n5. AQR Capital Management\n- Founded 1998\n- Focus on factor investing\n- Academic research-driven\n\nMarket Participants:\n- Investment Banks: Goldman Sachs, Morgan Stanley\n- Prop Trading Firms: Jump Trading, Tower Research\n- Quant Funds: Listed above\n- Retail Traders: Growing participation\n\nKey Roles:\n- Quantitative Researcher: Develops models\n- Portfolio Manager: Implements strategies\n- Software Engineer: Builds infrastructure\n- Risk Manager: Monitors exposure',
    resources: [{ title: 'Jim Simons Interview', url: 'https://www.youtube.com/watch?v=gjBui6wZfRw', type: 'video' }],
  },
  'career-paths': {
    content: 'Career Paths in Quantitative Trading\n\nMultiple pathways to enter the quantitative trading industry.\n\nEducational Background:\n\nCommon Degrees:\n- Mathematics, Statistics, Physics\n- Computer Science, Engineering\n- Financial Engineering, Quant Finance\n- Economics with strong math focus\n\nPhD vs Masters:\n- PhD: Research roles, higher starting pay\n- Masters: Implementation roles, faster entry\n- Bachelor + Skills: Possible with strong portfolio\n\nCareer Tracks:\n\n1. Quantitative Researcher\n- Develops trading models and strategies\n- Researches market inefficiencies\n- Typical: PhD in math/physics/stats\n\n2. Quantitative Developer\n- Implements strategies in code\n- Builds trading infrastructure\n- Typical: Computer Science background\n\n3. Portfolio Manager\n- Manages trading strategies\n- Responsible for P&L\n- Often promoted from quant researcher\n\n4. Risk Analyst\n- Monitors portfolio risk\n- Develops risk models\n- Background in statistics\n\n5. Data Scientist\n- Alternative data analysis\n- Feature engineering\n- ML model development\n\nSkills to Develop:\n- Programming: Python, C++, SQL\n- Mathematics: Statistics, Linear Algebra\n- Finance: Markets, derivatives, risk\n- ML/AI: Supervised learning, time series\n\nEntry Points:\n- Graduate programs at quant firms\n- Investment bank quant teams\n- Prop trading firms\n- FinTech companies',
    resources: [{ title: 'Quant Career Guide', url: 'https://www.quantstart.com/articles/How-to-Become-a-Quantitative-Trader', type: 'article' }],
  },
  'stock-markets-101': {
    content: 'Stock Markets 101\n\nUnderstanding the basics of stock market structure.\n\nWhat is a Stock Market?\nA stock market is where shares of public companies are bought and sold. It provides liquidity, price discovery, and capital formation.\n\nMajor Stock Exchanges:\n\nUnited States:\n- NYSE (New York Stock Exchange) - Largest, traditional auction market\n- NASDAQ - Electronic exchange, tech-heavy\n\nInternational:\n- LSE (London Stock Exchange)\n- TSE (Tokyo Stock Exchange)\n- HKEX (Hong Kong)\n- SSE (Shanghai)\n\nMarket Hours:\n- US Markets: 9:30 AM - 4:00 PM ET\n- Pre-market: 4:00 AM - 9:30 AM\n- After-hours: 4:00 PM - 8:00 PM\n\nMarket Indices:\n- S&P 500: 500 large US companies\n- Dow Jones: 30 blue chip stocks\n- NASDAQ Composite: Tech-focused\n- Russell 2000: Small-cap stocks\n\nTrading Sessions:\n1. Opening: 9:30-10:00 AM (high volatility)\n2. Mid-day: 10:00 AM-3:00 PM (lower activity)\n3. Closing: 3:00-4:00 PM (increased activity)\n\nMarket Participants:\n- Retail investors\n- Institutional investors (mutual funds, hedge funds)\n- Market makers\n- Proprietary traders',
    resources: [{ title: 'NYSE Overview', url: 'https://www.nyse.com', type: 'article' }],
  },
  'order-types': {
    content: 'Order Types Explained\n\nUnderstanding different order types is essential for trading.\n\nBasic Order Types:\n\n1. Market Order\n- Execute immediately at best available price\n- No price guarantee\n- Fast execution\n- Use: When speed matters more than price\n\n2. Limit Order\n- Execute at specified price or better\n- May not execute if price not reached\n- Price guaranteed\n- Use: When price precision matters\n\n3. Stop Order (Stop-Loss)\n- Becomes market order when price hits stop level\n- Used to limit losses\n- Example: Stop at $95 means sell if price drops to $95\n\n4. Stop-Limit Order\n- Becomes limit order when stop price reached\n- Combines stop trigger with limit execution\n- May not execute in fast markets\n\nAdvanced Order Types:\n\n5. All-or-None (AON)\n- Execute entire order or none\n- Prevents partial fills\n\n6. Fill-or-Kill (FOK)\n- Execute entire order immediately or cancel\n\n7. Immediate-or-Cancel (IOC)\n- Execute as much as possible immediately\n- Cancel remaining\n\n8. Good-Till-Cancelled (GTC)\n- Order remains active until filled or cancelled\n\n9. Day Order\n- Active only for current trading day\n\nTime-in-Force:\n- GTC: Good till cancelled\n- DAY: Valid for one day\n- IOC: Immediate or cancel\n- FOK: Fill or kill',
    codeExamples: [{
      title: 'Understanding Order Types',
      language: 'python',
      code: '# Example: Simulating order execution logic\n\ncurrent_price = 100\nlimit_price = 98\nstop_price = 95\n\n# Market Order: Execute at current price\nmarket_execution = current_price\n\n# Limit Order: Execute only if price <= limit\nlimit_execution = current_price if current_price <= limit_price else None\n\n# Stop Order: Activate if price drops to stop\nstop_triggered = current_price <= stop_price\n\nprint("Market:", market_execution)\nprint("Limit:", limit_execution)\nprint("Stop Triggered:", stop_triggered)',
      explanation: 'Understanding how different order types execute based on market conditions.',
    }],
  },
  'order-books': {
    content: 'Order Books & Liquidity\n\nThe order book is central to understanding market mechanics.\n\nWhat is an Order Book?\nAn order book is a real-time list of buy and sell orders for a security. It shows:\n- Price levels\n- Order sizes\n- Order types\n- Time priority\n\nOrder Book Structure:\n\nBid Side (Buyers):\n- Highest bid price at top\n- Shows what buyers will pay\n- Example: Bid $100.00 x 500 shares\n\nAsk Side (Sellers):\n- Lowest ask price at top\n- Shows what sellers want\n- Example: Ask $100.05 x 400 shares\n\nSpread:\n- Difference between best bid and ask\n- Tight spread: High liquidity\n- Wide spread: Low liquidity\n\nExample Order Book:\n\nBid         |      Ask\n$100.00 x500| $100.05 x400\n$99.98 x300 | $100.10 x600\n$99.95 x200 | $100.15 x300\n\nLiquidity Concepts:\n\nLiquidity Depth:\n- How much can be traded without major price impact\n- Deeper book = More liquidity\n\nMarket Impact:\n- Large orders move prices\n- More impact in thin markets\n\nLiquidity Providers:\n- Market makers post bids/asks\n- Provide liquidity, earn spread\n\nTime Priority:\n- First order at a price gets first execution\n- FIFO (First In, First Out) matching',
    codeExamples: [{
      title: 'Simulating Order Book',
      language: 'python',
      code: 'import pandas as pd\n\n# Simulated order book\norder_book = pd.DataFrame({\n    "bid_price": [100.00, 99.98, 99.95, 99.90],\n    "bid_size": [500, 300, 200, 400],\n    "ask_price": [100.05, 100.10, 100.15, 100.20],\n    "ask_size": [400, 600, 300, 500]\n})\n\nspread = order_book["ask_price"].iloc[0] - order_book["bid_price"].iloc[0]\nprint("Best Bid:", order_book["bid_price"].iloc[0])\nprint("Best Ask:", order_book["ask_price"].iloc[0])\nprint("Spread:", spread)',
      explanation: 'Order book shows available bids and asks at different price levels.',
    }],
  },
  'market-participants': {
    content: 'Market Participants\n\nUnderstanding who trades in the markets.\n\nTypes of Participants:\n\n1. Retail Traders\n- Individual investors\n- Small order sizes\n- Often use brokers\n- Limited market impact\n\n2. Institutional Investors\n- Mutual Funds\n- Pension Funds\n- Insurance Companies\n- ETFs\n- Large order sizes\n- Professional management\n\n3. Hedge Funds\n- Private investment funds\n- Various strategies\n- Quantitative, discretionary\n- Can be large market movers\n\n4. Market Makers\n- Provide liquidity\n- Post continuous bids/asks\n- Earn bid-ask spread\n- Examples: Citadel, Virtu\n\n5. Proprietary Trading Firms\n- Trade own capital\n- High-frequency trading\n- Statistical arbitrage\n- Examples: Jump, Tower\n\n6. Investment Banks\n- Client execution\n- Own trading desks\n- Research and advisory\n\nParticipant Behavior:\n\nRetail:\n- Often trend-following\n- Emotional trading\n- Technical analysis\n\nInstitutional:\n- Long-term focus\n- Fundamental analysis\n- Large block trades\n\nQuant Funds:\n- Model-driven\n- Fast execution\n- Systematic strategies\n\nMarket Makers:\n- Spread capture\n- Inventory management\n- Risk hedging\n\nImpact on Markets:\n- Each participant affects prices differently\n- Understanding helps predict market behavior',
  },
  'price-discovery': {
    content: 'Price Discovery\n\nHow market prices are determined.\n\nWhat is Price Discovery?\nThe process by which markets determine the fair price of a security through the interaction of buyers and sellers.\n\nMechanisms:\n\n1. Continuous Auction\n- Real-time matching of orders\n- NYSE, NASDAQ operate this way\n- Prices update constantly\n\n2. Call Auction\n- Batch orders matched at specific times\n- Opening and closing auctions\n- All orders matched at single price\n\n3. Dealer Markets\n- Dealers quote prices\n- OTC markets\n- Negotiated prices\n\nPrice Discovery Factors:\n\nSupply and Demand:\n- More buyers = Higher prices\n- More sellers = Lower prices\n\nInformation:\n- News impacts expectations\n- Analyst reports\n- Company announcements\n\nOrder Flow:\n- Buy pressure pushes up\n- Sell pressure pushes down\n\nVolatility:\n- Uncertainty causes price swings\n- New information creates volatility\n\nOpening Price Discovery:\n- Pre-market orders accumulated\n- Opening auction at 9:30 AM\n- Single opening price determined\n\nClosing Price Discovery:\n- Market-on-Close orders\n- Closing auction at 4:00 PM\n- Important for index calculations\n\nEfficient Price Discovery:\n- More participants = Better discovery\n- Tighter spreads = More efficient\n- Faster execution = Real-time prices',
    resources: [{ title: 'Price Discovery Mechanism', url: 'https://www.investopedia.com/terms/p/pricediscovery.asp', type: 'article' }],
  },
  'timeframes-styles': {
    content: 'Timeframes & Trading Styles\n\nDifferent trading approaches based on holding period.\n\nTrading Styles:\n\n1. Scalping\n- Seconds to minutes\n- Many trades per day\n- Small profits per trade\n- Requires fast execution\n\n2. Day Trading\n- Minutes to hours\n- Close all positions by end of day\n- No overnight risk\n- Requires focus and speed\n\n3. Swing Trading\n- Days to weeks\n- Capture short-term trends\n- Some overnight positions\n- Moderate risk\n\n4. Position Trading\n- Weeks to months\n- Follow major trends\n- Lower frequency\n- More analysis time\n\n5. Investing\n- Years to decades\n- Fundamental focus\n- Long-term value\n- Lowest activity\n\nTimeframe Selection:\n\nConsider:\n- Time available for trading\n- Risk tolerance\n- Capital size\n- Personality\n\nQuantitative Trading Styles:\n\nHigh-Frequency Trading (HFT):\n- Microseconds to seconds\n- Statistical arbitrage\n- Market making\n- Requires low latency infrastructure\n\nIntra-day Quant:\n- Minutes to hours\n- Momentum, mean reversion\n- Multiple signals per day\n\nSystematic Medium-term:\n- Days to weeks\n- Factor-based strategies\n- Trend following\n\nChoosing Your Style:\n\nBeginners:\n- Start with longer timeframes\n- Less stress, more analysis time\n\nAdvanced:\n- Can handle faster trading\n- More sophisticated strategies',
  },
  'risk-reward': {
    content: 'Risk/Reward Concepts\n\nUnderstanding the fundamental relationship between risk and return.\n\nKey Principle:\nHigher potential returns come with higher risk. This is the foundation of investing.\n\nRisk Types:\n\n1. Market Risk\n- Prices move against position\n- Systematic risk\n- Cannot diversify away\n\n2. Specific Risk\n- Company-specific events\n- Unsystematic risk\n- Can diversify\n\n3. Liquidity Risk\n- Cannot exit position quickly\n- Wide spreads\n- Market impact\n\n4. Operational Risk\n- System failures\n- Human errors\n- Process breakdowns\n\nRisk Measures:\n\nStandard Deviation:\n- Measures price volatility\n- Higher = More risk\n\nBeta:\n- Measures market sensitivity\n- Beta > 1: More volatile than market\n\nVaR (Value at Risk):\n- Maximum expected loss\n- At given confidence level\n\nReward Measures:\n\nExpected Return:\n- Average anticipated gain\n\nSharpe Ratio:\n- Return per unit of risk\n- Sharpe = (Return - RiskFree) / StdDev\n\nRisk-Adjusted Return:\nCompare returns considering risk taken.\n\nExample:\nStrategy A: 20% return, 30% volatility\nStrategy B: 15% return, 10% volatility\n\nSharpe A: (20-2)/30 = 0.6\nSharpe B: (15-2)/10 = 1.3\n\nStrategy B has better risk-adjusted return!\n\nPosition Sizing:\n- Risk per trade: Typically 1-2% of capital\n- Larger risk = Larger potential loss\n- Proper sizing limits downside',
    codeExamples: [{
      title: 'Calculating Risk-Reward',
      language: 'python',
      code: 'import numpy as np\n\nreturns = np.array([0.05, -0.03, 0.08, -0.02, 0.10])\n\nmean_return = returns.mean()\nstd_dev = returns.std()\nsharpe = (mean_return - 0.02) / std_dev\n\nprint("Return:", round(mean_return*100, 2), "%")\nprint("Risk (StdDev):", round(std_dev*100, 2), "%")\nprint("Sharpe:", round(sharpe, 2))',
      explanation: 'Higher returns without considering risk may be misleading. Sharpe ratio helps compare.',
    }],
  },
  'trading-vs-investing': {
    content: 'Trading vs Investing\n\nUnderstanding the differences between trading and investing approaches.\n\nTrading:\n\nDefinition:\n- Buying and selling for short-term profits\n- Focus on price movements\n- Active management\n\nCharacteristics:\n- Short holding periods\n- High frequency activity\n- Technical analysis focus\n- Market timing important\n\nTypes:\n- Day trading\n- Swing trading\n- Quantitative trading\n\nPros:\n- Potential for quick profits\n- Active engagement\n- Can profit in any market direction\n\nCons:\n- Higher transaction costs\n- More stress\n- Requires constant attention\n- Higher risk\n\nInvesting:\n\nDefinition:\n- Buying for long-term value appreciation\n- Focus on fundamentals\n- Passive or semi-active management\n\nCharacteristics:\n- Long holding periods\n- Low frequency activity\n- Fundamental analysis focus\n- Time in market important\n\nTypes:\n- Value investing\n- Growth investing\n- Dividend investing\n\nPros:\n- Lower transaction costs\n- Less daily stress\n- Compounding benefits\n- Tax advantages\n\nCons:\n- Requires patience\n- Cannot react quickly\n- Long-term commitment\n\nKey Differences:\n\nTime Horizon:\n- Trading: Minutes to months\n- Investing: Years to decades\n\nAnalysis:\n- Trading: Charts, patterns, signals\n- Investing: Financials, business quality\n\nFrequency:\n- Trading: Many transactions\n- Investing: Few transactions\n\nQuantitative Approach:\nCan apply to both:\n- Quantitative trading: Short-term signals\n- Quantitative investing: Factor models, portfolio optimization',
  },
  'setting-goals': {
    content: 'Setting Your Trading Goals\n\nEstablishing clear objectives for your trading journey.\n\nGoal Types:\n\n1. Learning Goals\n- Understand market mechanics\n- Learn programming skills\n- Master strategy development\n\n2. Performance Goals\n- Target returns\n- Risk limits\n- Sharpe ratio targets\n\n3. Process Goals\n- Daily research routine\n- Weekly strategy reviews\n- Monthly performance analysis\n\nSetting SMART Goals:\n\nSpecific:\n- "Achieve 20% annual return"\n- Not: "Make money trading"\n\nMeasurable:\n- Track returns, Sharpe, win rate\n- Define metrics clearly\n\nAchievable:\n- Based on realistic expectations\n- Consider your skills and capital\n\nRelevant:\n- Align with your interests\n- Fit your lifestyle\n\nTime-bound:\n- Set deadlines\n- Review periodically\n\nExample Goals:\n\nBeginner (First Year):\n- Learn Python and pandas\n- Complete 3 courses\n- Build first backtest\n- Understand risk management\n\nIntermediate (Year 2):\n- Develop first strategy\n- Achieve positive returns\n- Sharpe ratio > 0.5\n- Proper position sizing\n\nAdvanced (Year 3+):\n- Multiple strategies\n- Sharpe > 1.0\n- Automate execution\n- Manage portfolio risk\n\nGoal Tracking:\n- Daily journal\n- Weekly metrics review\n- Monthly goal assessment\n- Annual comprehensive review\n\nCommon Mistakes:\n- Unrealistic return expectations\n- Ignoring risk\n- No time commitment\n- Switching strategies too often',
  },
  'getting-started': {
    content: 'Getting Started Checklist\n\nA comprehensive guide to begin your quantitative trading journey.\n\nStep 1: Education\n\nFoundation:\n- Complete Introduction to Quant Trading course\n- Learn Python fundamentals\n- Study statistics basics\n- Understand market structure\n\nRecommended Order:\n1. This course (Introduction)\n2. Python for Finance\n3. Technical Analysis\n4. Strategy Development\n\nStep 2: Technical Setup\n\nEnvironment:\n- Install Python 3.8+\n- Set up virtual environment\n- Install packages: pandas, numpy, yfinance\n- Choose IDE: VS Code, Jupyter\n\nData Access:\n- Free: yfinance, Alpha Vantage\n- Consider premium sources later\n\nStep 3: First Strategy\n\nSimple Start:\n- Moving average crossover\n- Single asset (e.g., SPY ETF)\n- Daily timeframe\n- Paper trade first\n\nStep 4: Backtesting\n\nLearn:\n- Create simple backtest framework\n- Calculate returns, Sharpe\n- Understand common pitfalls\n- Avoid overfitting\n\nStep 5: Paper Trading\n\nPractice:\n- Test strategy without real money\n- Track performance\n- Learn execution mechanics\n- Build confidence\n\nStep 6: Risk Management\n\nImplement:\n- Position sizing (1-2% per trade)\n- Stop losses\n- Portfolio limits\n- Track risk metrics\n\nStep 7: Gradual Capital\n\nGo Live:\n- Start with small capital\n- One strategy at first\n- Monitor closely\n- Scale slowly\n\nChecklist Summary:\n[ ] Python installed and tested\n[ ] First course completed\n[ ] Data source working\n[ ] First strategy coded\n[ ] Backtest shows positive results\n[ ] Paper traded for 1 month\n[ ] Risk rules defined\n[ ] Ready for small live trading\n\nTime Expectations:\n- Education: 2-3 months\n- First strategy: 1-2 months\n- Paper trading: 1-3 months\n- Live trading: Start small, scale up',
    resources: [{ title: 'QuantStart Getting Started', url: 'https://www.quantstart.com/articles/Beginners-Guide-to-Quantitative-Trading', type: 'article' }],
  },
  'python-installation': {
    content: 'Installation & Setup\n\nPrerequisites:\n- Python 3.8 or higher\n- pip package manager\n- Code editor (VS Code recommended)\n\nSteps:\n1. Download Python from python.org\n2. Create virtual environment: python -m venv quant_env\n3. Activate: source quant_env/bin/activate\n4. Install packages: pip install numpy pandas matplotlib yfinance',
    codeExamples: [{
      title: 'Verify Installation',
      language: 'python',
      code: 'import numpy as np\nimport pandas as pd\n\nprint("NumPy:", np.__version__)\nprint("Pandas:", pd.__version__)\n\ndata = np.random.randn(100)\nprint("Mean:", data.mean())',
      explanation: 'Verify all packages are installed correctly.',
    }],
  },
  'numpy-arrays': {
    content: 'Arrays & Shapes\n\nNumPy arrays are efficient for numerical operations.\n\nCreating Arrays:\n- np.array([1, 2, 3])\n- np.arange(0, 10)\n- np.zeros(5), np.ones(5)\n\nShapes:\n- 1D: (n,) - single dimension\n- 2D: (m, n) - rows, columns\n- 3D: (m, n, k) - cubes\n\nReshape: arr.reshape(3, 4)',
    codeExamples: [{
      title: 'Working with Array Shapes',
      language: 'python',
      code: 'import numpy as np\n\nprices = np.array([100, 102, 105, 103, 107])\nprint("Shape:", prices.shape)\n\nreturns = np.random.randn(5, 3)\nprint("Matrix shape:", returns.shape)\n\nflat = np.arange(12)\nmatrix = flat.reshape(3, 4)\nprint("Reshaped:", matrix.shape)',
      explanation: 'Understanding array shapes is crucial for data manipulation.',
    }],
  },
  'pandas-series-df': {
    content: 'Series & DataFrames\n\nSeries: 1D labeled array\nDataFrame: 2D labeled structure\n\nKey Properties:\n- df.shape: rows, columns\n- df.columns: column names\n- df.index: row labels',
    codeExamples: [{
      title: 'Creating Financial DataFrames',
      language: 'python',
      code: 'import pandas as pd\n\ndf = pd.DataFrame({\n    "date": pd.date_range("2024-01-01", periods=5),\n    "open": [100, 102, 101, 103, 105],\n    "close": [102, 101, 103, 105, 104],\n    "volume": [1000, 1200, 1100, 1500, 1300]\n})\n\nprint(df)\nprint("Shape:", df.shape)',
      explanation: 'DataFrames are the primary structure for financial data.',
    }],
  },
  'yfinance-basics': {
    content: 'yfinance Basics\n\nyfinance downloads market data from Yahoo Finance.\n\nBasic Usage:\n- yf.Ticker("AAPL").history(period="1mo")\n- yf.download(["AAPL", "GOOGL"], start="2023-01-01")\n\nAvailable Data: Open, High, Low, Close, Volume, Adjusted Close',
    codeExamples: [{
      title: 'Downloading Stock Data',
      language: 'python',
      code: 'import yfinance as yf\n\naapl = yf.Ticker("AAPL")\nhist = aapl.history(period="1y")\n\nprint(hist.head())\nprint("Days:", len(hist))\n\nreturns = hist["Close"].pct_change()\nprint("Mean return:", returns.mean())',
      explanation: 'yfinance provides free access to historical market data.',
    }],
    resources: [{ title: 'yfinance Docs', url: 'https://github.com/ranaroussi/yfinance', type: 'documentation' }],
  },
  'sma-ema': {
    content: 'SMA & EMA\n\nSimple Moving Average (SMA): Equal weight to all points\n- prices.rolling(window=20).mean()\n\nExponential Moving Average (EMA): More weight to recent\n- prices.ewm(span=20).mean()\n\nDifferences:\n- SMA: Slower, more smoothing\n- EMA: Faster, less smoothing',
    codeExamples: [{
      title: 'Calculating Moving Averages',
      language: 'python',
      code: 'import pandas as pd\nimport yfinance as yf\n\ndata = yf.Ticker("AAPL").history(period="3mo")\n\ndata["SMA_20"] = data["Close"].rolling(window=20).mean()\ndata["EMA_20"] = data["Close"].ewm(span=20).mean()\n\nprint(data[["Close", "SMA_20", "EMA_20"]].tail())',
      explanation: 'Moving averages identify trends.',
    }],
  },
  'rsi-basics': {
    content: 'RSI Basics\n\nRelative Strength Index measures momentum.\n\nFormula: RSI = 100 - (100 / (1 + RS))\nRS = Average Gain / Average Loss\n\nInterpretation:\n- RSI > 70: Overbought\n- RSI < 30: Oversold\n- Standard period: 14 days',
    codeExamples: [{
      title: 'Calculating RSI',
      language: 'python',
      code: 'import pandas as pd\n\ndef calculate_rsi(prices, period=14):\n    delta = prices.diff()\n    gains = delta.where(delta > 0, 0)\n    losses = -delta.where(delta < 0, 0)\n    avg_gain = gains.rolling(window=period).mean()\n    avg_loss = losses.rolling(window=period).mean()\n    rs = avg_gain / avg_loss\n    rsi = 100 - (100 / (1 + rs))\n    return rsi\n\n# Usage: rsi = calculate_rsi(data["Close"])',
      explanation: 'RSI identifies overbought/oversold conditions.',
    }],
  },
  'what-is-backtesting': {
    content: 'What is Backtesting\n\nBacktesting tests a strategy on historical data.\n\nPurpose:\n- Validate strategy logic\n- Estimate expected returns\n- Identify risks\n- Compare strategies\n\nComponents:\n- Strategy rules\n- Historical data\n- Simulation\n- Performance metrics\n\nLimitations: Past does not guarantee future',
    codeExamples: [{
      title: 'Simple Backtest',
      language: 'python',
      code: 'import pandas as pd\n\ndef simple_backtest(prices, signals, capital=10000):\n    positions = signals.shift(1)\n    returns = prices.pct_change()\n    strategy_returns = positions * returns\n    cumulative = (1 + strategy_returns).cumprod()\n    final = capital * cumulative.iloc[-1]\n    return {"final_value": final, "return_pct": (final/capital-1)*100}',
      explanation: 'Basic backtest calculates historical performance.',
    }],
  },
  'sharpe-ratio': {
    content: 'Sharpe Ratio\n\nMeasures risk-adjusted return.\n\nFormula: Sharpe = (Return - RiskFree) / StdDev\n\nInterpretation:\n- Sharpe < 1: Poor\n- Sharpe 1-2: Good\n- Sharpe > 2: Excellent',
    codeExamples: [{
      title: 'Calculating Sharpe',
      language: 'python',
      code: 'import numpy as np\n\ndef sharpe_ratio(returns, rf=0.02):\n    excess = returns - rf/252\n    mean_excess = excess.mean()\n    std = returns.std()\n    sharpe = (mean_excess * 252) / (std * np.sqrt(252))\n    return sharpe',
      explanation: 'Sharpe helps compare strategies by adjusting for risk.',
    }],
  },
  'diversification': {
    content: 'Diversification\n\nReduces risk by spreading investments.\n\nBenefits:\n- Lower overall risk\n- Smoother returns\n- Protection against failures\n\nCorrelation Matters:\n- Low correlation = Better diversification',
    codeExamples: [{
      title: 'Portfolio Volatility',
      language: 'python',
      code: 'import pandas as pd\nimport numpy as np\n\ndef portfolio_vol(weights, returns_matrix):\n    cov = returns_matrix.cov()\n    var = np.dot(weights, np.dot(cov, weights))\n    return np.sqrt(var)',
      explanation: 'Diversification lowers volatility.',
    }],
  },
  'decision-trees': {
    content: 'Decision Trees\n\nMake predictions using simple decision rules.\n\nAdvantages:\n- Easy to interpret\n- Handles numerical and categorical\n- No scaling needed\n\nDisadvantages:\n- Can overfit\n- Sensitive to changes',
    codeExamples: [{
      title: 'Decision Tree for Trading',
      language: 'python',
      code: 'from sklearn.tree import DecisionTreeClassifier\n\ndef train_model(features, labels):\n    model = DecisionTreeClassifier(max_depth=5)\n    model.fit(features, labels)\n    return model\n\n# Usage: model = train_model(features[:-1], labels[:-1])',
      explanation: 'Decision trees classify market direction.',
    }],
  },
  'stat-arb-overview': {
    content: 'Statistical Arbitrage\n\nExploits statistical mispricings between related securities.\n\nProcess:\n1. Find correlated pairs\n2. Test cointegration\n3. Define spread threshold\n4. Trade on divergence\n5. Close on convergence',
    codeExamples: [{
      title: 'Correlation Check',
      language: 'python',
      code: 'import pandas as pd\n\ndef check_correlation(a, b):\n    returns_a = a.pct_change().dropna()\n    returns_b = b.pct_change().dropna()\n    return returns_a.corr(returns_b)\n\n# High correlation (> 0.7) suggests potential pair',
      explanation: 'High correlation is first step in pairs trading.',
    }],
  },
  'var-methods': {
    content: 'Value at Risk (VaR)\n\nEstimates potential loss over a period.\n\nMethods:\n- Historical: Use past returns\n- Parametric: Assume normal distribution\n- Monte Carlo: Simulate scenarios\n\n95% VaR of $10K means losses probably wont exceed $10K',
    codeExamples: [{
      title: 'Historical VaR',
      language: 'python',
      code: 'import numpy as np\n\ndef historical_var(returns, confidence=0.95):\n    var = np.percentile(returns, (1-confidence)*100)\n    return -var',
      explanation: 'Historical VaR uses past returns to estimate losses.',
    }],
  },
  'paper-trading': {
    content: 'Paper Trading\n\nSimulates trading without real money.\n\nPurpose:\n- Test in real conditions\n- Verify execution logic\n- Build confidence\n- Find operational issues\n\nBest Practices:\n- Use realistic capital\n- Account for costs\n- Track like real\n- Paper trade 1-3 months',
    resources: [{ title: 'TradingView Paper Trading', url: 'https://www.tradingview.com/paper-trading/', type: 'tool' }],
  },
};

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await Course.deleteMany({});
    await Lesson.deleteMany({});
    console.log('Cleared existing data');

    let lessonCount = 0;
    for (const courseData of coursesData) {
      const course = await Course.create(courseData);
      console.log('Created course: ' + course.title);

      for (const courseModule of courseData.modules) {
        for (const lessonInfo of courseModule.lessons) {
          const lessonContent = lessonsContent[lessonInfo.slug] || {
            content: lessonInfo.title + '\n\nThis lesson covers key concepts and practical applications.\n\nContinue learning to master this topic.',
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
          lessonCount++;
        }
      }
    }

    console.log('Seeding completed! ' + coursesData.length + ' courses, ' + lessonCount + ' lessons');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seedDatabase();