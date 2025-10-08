'use client';

import Link from "next/link";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const PrismaticBurst = dynamic(() => import('../../components/PrismaticBurst'), { ssr: false });
const TwitterEmbed = dynamic(() => import('../../components/TwitterEmbed'), { ssr: false });

// Project data
const projectsData: Record<string, {
  title: string;
  tagline: string;
  description: string;
  longDescription: string[];
  tech: string[];
  stats?: { label: string; value: string }[];
  features: string[];
  links?: { label: string; url: string }[];
  date: string;
  category: string;
  videoUrl?: string;
  loomUrl?: string;
  videoFile?: string;
  images?: string[];
  redditEmbed?: string;
  twitterEmbeds?: string[];
  imagePlaceholder: {
    type: 'gradient' | 'pattern' | 'geometric' | 'abstract';
    colors: string[];
    icon?: string;
  };
}> = {
  'artistos': {
    title: "ArtistOS",
    tagline: "AI-Powered Music Production Platform",
    description: "A comprehensive music mixing and video generation platform leveraging AI for creative music production.",
    longDescription: [
      "ArtistOS is an actively developed platform that combines music mixing functionality with AI-powered video generation capabilities. Built with Python (66.5%) and Jupyter Notebook (33.5%), it represents a new approach to music production workflow.",
      "The platform features advanced audio processing capabilities and integrates with modern AI tools to assist artists in both audio and visual content creation. The repository includes dedicated music_mixing and music_video directories, showcasing a modular architecture for creative workflows.",
      "Currently in active development with the last commit on October 6, 2025. Recent updates include code refactoring, addition of 'cool features', and the first working version launched in late September 2025. The project is in a rapid iteration phase with continuous improvements."
    ],
    tech: ["Python", "Jupyter Notebook", "Audio Processing", "AI Integration", "Video Generation"],
    features: [
      "Music mixing functionality",
      "Music video generation",
      "AI-powered audio processing",
      "Rapid iteration development",
      "Modular architecture",
      "Creative workflow optimization"
    ],
    date: "September 2025 - Present",
    category: "AI & Music",
    imagePlaceholder: {
      type: 'gradient',
      colors: ['#667eea', '#764ba2', '#f093fb'],
      icon: '🎵'
    }
  },
  'open-ai-stylist': {
    title: "StyleList - AI Fashion Stylist",
    tagline: "Conversational AI Fashion Assistant",
    description: "Production-ready AI stylist with automatic moodboard generation, virtual try-ons, and real-time product integration.",
    longDescription: [
      "StyleList is a cutting-edge AI fashion application that combines conversational AI with practical fashion tools. Powered by Gemini 2.5 Flash via OpenRouter, it provides personalized styling advice through an intuitive multi-modal chat interface.",
      "The standout Auto-Style Mode automatically generates curated moodboards from AI recommendations, featuring gender-aware product searches and virtual try-on capabilities. Users can upload personal photos to see how different outfits look on them using FASHN AI technology.",
      "With 74 GitHub stars and 15 forks, StyleList demonstrates production-grade architecture with Zustand state management, IndexedDB persistence, and seamless integration with Amazon's product catalog via RapidAPI and FASHN AI's virtual try-on technology."
    ],
    tech: ["Next.js 15", "TypeScript", "Gemini 2.5 Flash", "Tailwind CSS", "Zustand", "FASHN AI", "Amazon API", "OpenRouter"],
    stats: [
      { label: "GitHub Stars", value: "74" },
      { label: "Forks", value: "15" },
      { label: "Watchers", value: "1" }
    ],
    features: [
      "Multi-modal AI chat with image support",
      "Auto-Style Mode with automatic moodboards",
      "Gender-aware product searches",
      "Virtual try-on with personal photos",
      "Real-time Amazon product integration",
      "AI-generated creative moodboard titles",
      "Persistent storage with IndexedDB",
      "Streaming AI responses"
    ],
    links: [
      { label: "View on GitHub", url: "https://github.com/parsakhaz/open-ai-stylist" },
      { label: "Figma Design", url: "https://www.figma.com/design/eJiELUVBnuWqzLbn5G4dFH/StyleList" },
      { label: "Reddit Discussion", url: "https://www.reddit.com/r/vibecoding/comments/1llzipu/i_used_ai_to_build_an_ai_stylist_in_24_hours_and/" }
    ],
    redditEmbed: `<blockquote class="reddit-embed-bq" style="height:500px" data-embed-height="546"><a href="https://www.reddit.com/r/vibecoding/comments/1llzipu/i_used_ai_to_build_an_ai_stylist_in_24_hours_and/">I used AI to build an AI Stylist in 24 hours (and made it open source)</a><br> by<a href="https://www.reddit.com/user/ParsaKhaz/">u/ParsaKhaz</a> in<a href="https://www.reddit.com/r/vibecoding/">vibecoding</a></blockquote><script async="" src="https://embed.reddit.com/widgets.js" charset="UTF-8"></script>`,
    twitterEmbeds: [
      `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Was able to attend the <a href="https://twitter.com/MetaforDevs?ref_src=twsrc%5Etfw">@MetaforDevs</a> llama hackathon last weekend and got 7th, one place away from the finals. In 24 hours, we built an AI stylist. <br><br>It now has over 55 github stars so who really won😎<br><br>Check it out if you&#39;re too lazy to go to the mall: <a href="https://t.co/GB4wEGR4ht">https://t.co/GB4wEGR4ht</a></p>&mdash; Eyal Shechtman (@eyal_shechtman) <a href="https://twitter.com/eyal_shechtman/status/1940282955488010323?ref_src=twsrc%5Etfw">July 2, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`
    ],
    date: "June - July 2025",
    category: "AI & Fashion",
    imagePlaceholder: {
      type: 'pattern',
      colors: ['#ff6b9d', '#c44569', '#ffa726', '#ec407a'],
      icon: '👗'
    }
  },
  'dress2impress': {
    title: "Dress to Impress: AI Fashion Showdown",
    tagline: "24-Hour Hackathon Fashion Game",
    description: "Built in 24 hours - AI-powered fashion game featuring avatar generation, virtual try-on, and real-time video generation.",
    longDescription: [
      "Created during the SF OpenAI × Cerebral Valley GPT-5 Hackathon, Dress to Impress is a multi-phase fashion game that challenges players to compete against an AI opponent in styling competitions.",
      "The game flow includes webcam character creation, theme selection, timed shopping sprees with real Amazon products, styling rounds with FASHN AI virtual try-ons, accessorizing with OpenAI image editing, and evaluation by a multimodal GPT judge.",
      "With 16 GitHub stars and production-grade Docker deployment, this project showcases rapid prototyping skills and advanced AI integration including avatar generation, virtual try-on technology, and optional runway video generation with Kling AI."
    ],
    tech: ["Next.js 15", "React 19", "TypeScript", "OpenAI", "FASHN AI", "Kling AI", "Docker", "Tailwind CSS 4"],
    stats: [
      { label: "GitHub Stars", value: "16" },
      { label: "Build Time", value: "24 hours" },
      { label: "Game Phases", value: "7" }
    ],
    features: [
      "AI avatar generation from webcam photos",
      "Real-time Amazon product shopping",
      "Virtual try-on with FASHN AI",
      "AI opponent with autonomous gameplay",
      "Multimodal GPT judge evaluation",
      "Optional runway video generation",
      "Docker deployment with health monitoring",
      "Rate limiting and security headers"
    ],
    links: [
      { label: "View on GitHub", url: "https://github.com/parsakhaz/open-ai-dress2impress" }
    ],
    videoUrl: "https://www.youtube.com/embed/s8o59vPj6kY",
    twitterEmbeds: [
      `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Last week on thursday night <a href="https://twitter.com/ParsaKhaz?ref_src=twsrc%5Etfw">@ParsaKhaz</a> and I decided to do something impulsive. <br><br>We bought tickets to sf for the <a href="https://twitter.com/cerebral_valley?ref_src=twsrc%5Etfw">@cerebral_valley</a> GPT5 hackathon. <br><br>On Sunday night, we placed top 6 and presented in front of the most influential investors in SF.<br><br>Bottom line: impulsive actions &gt; <a href="https://t.co/T2pP8gBH1p">pic.twitter.com/T2pP8gBH1p</a></p>&mdash; Eyal Shechtman (@eyal_shechtman) <a href="https://twitter.com/eyal_shechtman/status/1955346300565905709?ref_src=twsrc%5Etfw">August 12, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
      `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">last night, we opened our doors for the first-ever Builder Lounge at <a href="https://twitter.com/OpenAI?ref_src=twsrc%5Etfw">@openai</a>! thanks to everyone who joined us for dinner, stayed for coworking, and capped the night with impromptu demos <a href="https://t.co/gC5g7ulrAP">pic.twitter.com/gC5g7ulrAP</a></p>&mdash; Cristine Jones (@cristineejones) <a href="https://twitter.com/cristineejones/status/1960762466033655890?ref_src=twsrc%5Etfw">August 27, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
      `<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Kind of crazy to see that we implemented everything on here. This was written in the first 30 minutes of the hackathon. We goated fr (don't mind my handwriting) <a href="https://t.co/3kis8HakGe">pic.twitter.com/3kis8HakGe</a></p>&mdash; Eyal Shechtman (@eyal_shechtman) <a href="https://twitter.com/eyal_shechtman/status/1955428821211189739?ref_src=twsrc%5Etfw">August 13, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
      `<blockquote class="twitter-tweet" data-media-max-width="560"><p lang="en" dir="ltr">2/ Fashion AI<br><br>Diffusion models and GPT-5 to let users style 3D avatars with AI-powered outfit recommendations.<a href="https://twitter.com/fashn_ai?ref_src=twsrc%5Etfw">@fashn_ai</a> <a href="https://twitter.com/ParsaKhaz?ref_src=twsrc%5Etfw">@parsakhaz</a> <a href="https://twitter.com/eyal_shechtman?ref_src=twsrc%5Etfw">@eyal_shechtman</a> <a href="https://t.co/mIwWHCd1Sa">pic.twitter.com/mIwWHCd1Sa</a></p>&mdash; Alex Reibman 🖇️ (@AlexReibman) <a href="https://twitter.com/AlexReibman/status/1955353643248652703?ref_src=twsrc%5Etfw">August 12, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`
    ],
    date: "July 2025",
    category: "AI & Gaming",
    imagePlaceholder: {
      type: 'geometric',
      colors: ['#6366f1', '#8b5cf6', '#d946ef', '#f43f5e'],
      icon: '🎮'
    }
  },
  'awshackday': {
    title: "AWSHackDay - Agentic Investment System",
    tagline: "AI-Powered Investment Analysis Platform",
    description: "Multi-agent system combining Twitter sentiment analysis with comprehensive financial data for automated investment decisions.",
    longDescription: [
      "AWSHackDay is a sophisticated agentic investment system built for an AWS-sponsored hackathon in July 2025. The platform uses a sequential agent pipeline to analyze market sentiment, financial data, and execute trades autonomously with no human intervention.",
      "The system features six specialized agents working in sequence: Twitter Agent (Grok/XAI) for trending stock tickers, Finance Data Agent (Finnhub API) collecting fundamentals/options/technical data, Financial Decision Agent for LLM-based ranking, Advisor Agent with user-customizable investment strategies, Trade Execution Agent (Alpaca API) for autonomous trading, and an optional Notification Agent.",
      "The Finance Data Agent is particularly comprehensive, collecting fundamentals (EPS, Revenue, EBITDA), financial ratios (P/E, P/S, PEG), options data (IV, Greeks, Open Interest), technical indicators (RSI, MACD, Bollinger Bands), alternative data (social sentiment, news), macro indicators (CPI, GDP, VIX), fund flows (ETF flows, 13F filings), and analyst ratings. The system implements hard filters including quote freshness, probability of profit thresholds, and risk management rules."
    ],
    tech: ["TypeScript", "Finnhub API", "Grok/XAI API", "Gemini API", "OpenAI API", "Alpaca API", "HTML", "CSS"],
    features: [
      "Twitter sentiment analysis with Grok",
      "Comprehensive financial data collection",
      "Multi-agent sequential pipeline",
      "User-customizable investment strategies",
      "Fully autonomous trade execution",
      "Portfolio value tracking and visualization",
      "Risk tolerance considerations",
      "Hard filters and selection rules"
    ],
    links: [
      { label: "View on GitHub", url: "https://github.com/EyalShechtman/AWSHackDay" }
    ],
    date: "July 2025",
    category: "AI & Finance",
    imagePlaceholder: {
      type: 'abstract',
      colors: ['#10b981', '#059669', '#34d399', '#6ee7b7'],
      icon: '📈'
    }
  },
  'videoarchive': {
    title: "VideoArchive",
    tagline: "Smart Video Management System",
    description: "Self-hosted video archive with intelligent search and automated tagging system.",
    longDescription: [
      "VideoArchive was created out of necessity - a smart video management solution with advanced search capabilities that didn't exist elsewhere. The platform combines frontend and backend architecture to provide a comprehensive video organization system.",
      "The system features intelligent search functionality that goes beyond simple filename matching, incorporating smart tagging for automated categorization. Built for local hosting, it gives users complete control over their video libraries.",
      "With a full-stack architecture using TypeScript/React frontend and Python FastAPI backend, VideoArchive demonstrates strong system design skills and practical problem-solving abilities."
    ],
    tech: ["TypeScript", "React", "Python", "FastAPI", "uvicorn"],
    features: [
      "Smart search functionality",
      "Automated tagging system",
      "Local hosting capability",
      "Full-stack architecture",
      "Custom indexing system",
      "AI-powered categorization",
      "Personal library management"
    ],
    links: [
      { label: "View on GitHub", url: "https://github.com/EyalShechtman/VideoArchive" },
      { label: "Watch Demo", url: "https://www.loom.com/share/ca4bc290f8ef4fc9b7605ed5369e6287" }
    ],
    loomUrl: "https://www.loom.com/embed/ca4bc290f8ef4fc9b7605ed5369e6287",
    date: "February 2025",
    category: "Utility & Tools",
    imagePlaceholder: {
      type: 'gradient',
      colors: ['#3b82f6', '#1d4ed8', '#60a5fa'],
      icon: '📹'
    }
  },
  'automatedads': {
    title: "AutomatedAds",
    tagline: "AI Ad Generation Platform",
    description: "Automated ad creation system combining OpenAI for scripts and ElevenLabs for voice synthesis.",
    longDescription: [
      "AutomatedAds is a Python-based platform that revolutionizes ad creation by leveraging AI for both script generation and voice synthesis. The system uses OpenAI's API to create personalized ad scripts based on user data.",
      "Integration with ElevenLabs provides natural-sounding voice synthesis, creating high-quality audio advertisements with professional background music mixing. The platform can generate ads at scale for different user segments.",
      "Perfect for automated marketing campaigns, A/B testing, and bulk ad generation, AutomatedAds demonstrates practical application of AI in marketing automation."
    ],
    tech: ["Python", "OpenAI API", "ElevenLabs", "Pandas", "Jupyter"],
    features: [
      "AI-powered script generation",
      "Natural voice synthesis",
      "Personalized ad creation",
      "Background music integration",
      "Bulk generation capability",
      "User data analysis",
      "Professional audio mixing"
    ],
    links: [
      { label: "View on GitHub", url: "https://github.com/EyalShechtman/AutomatedAds" }
    ],
    date: "December 2024",
    category: "AI & Marketing",
    imagePlaceholder: {
      type: 'pattern',
      colors: ['#f59e0b', '#d97706', '#fbbf24'],
      icon: '🎙️'
    }
  },
  'youtube-toxic': {
    title: "YouTube Toxic",
    tagline: "Comment Toxicity Analysis Tool",
    description: "Analyze and compare toxicity levels across different YouTube channel comment sections.",
    longDescription: [
      "YouTube Toxic is a TypeScript-based tool designed to analyze comment sections across different YouTube channels, providing insights into toxicity levels and sentiment patterns.",
      "The platform integrates with the YouTube Data API to fetch comments and uses natural language processing to detect and measure toxic behavior. It enables comparative analysis across multiple channels.",
      "With data visualization capabilities, users can track sentiment trends over time and identify patterns in community behavior, making it a valuable tool for content creators and researchers."
    ],
    tech: ["TypeScript", "YouTube Data API", "NLP", "Sentiment Analysis"],
    features: [
      "YouTube comment section analysis",
      "Toxicity detection and measurement",
      "Channel comparison tools",
      "Sentiment tracking over time",
      "Data visualization",
      "Comparative analytics"
    ],
    links: [
      { label: "View on GitHub", url: "https://github.com/EyalShechtman/YouTube_Toxic" },
      { label: "Watch Demo", url: "https://www.youtube.com/watch?v=m0RioPqzbDY" }
    ],
    videoUrl: "https://www.youtube.com/embed/m0RioPqzbDY",
    date: "May - June 2025",
    category: "Data Analysis",
    imagePlaceholder: {
      type: 'geometric',
      colors: ['#ef4444', '#dc2626', '#f87171'],
      icon: '💬'
    }
  },
  'casca': {
    title: "Casca",
    tagline: "Interactive Challenge Platform",
    description: "TypeScript full-stack application with backend API and challenge/game logic.",
    longDescription: [
      "Casca is a rapid-development project built in just 4 days, showcasing efficient full-stack TypeScript development. The platform features backend logic and an interactive challenge system.",
      "With a clean architecture separating backend concerns from game logic, Casca demonstrates strong software engineering principles and VS Code-optimized development workflow.",
      "The project includes comprehensive documentation and a video demo showcasing the functionality and user experience."
    ],
    tech: ["TypeScript", "Backend API", "Full-Stack"],
    features: [
      "Challenge/game logic",
      "Backend API",
      "TypeScript full-stack",
      "Rapid development (4 days)",
      "Clean architecture",
      "VS Code optimized"
    ],
    links: [
      { label: "View on GitHub", url: "https://github.com/EyalShechtman/Casca" },
      { label: "Watch Demo", url: "https://www.loom.com/share/cd53dfd522b74a2fb7ad888c1f5f5212" }
    ],
    videoFile: "/assets/Casca.mp4",
    date: "February 2025",
    category: "Full-Stack",
    imagePlaceholder: {
      type: 'abstract',
      colors: ['#8b5cf6', '#7c3aed', '#a78bfa'],
      icon: '🎯'
    }
  },
  'sammamish-pickleball': {
    title: "Sammamish Pickleball App",
    tagline: "iOS Court Scheduling Platform",
    description: "Fully developed Swift iOS app for pickleball court scheduling in Sammamish, WA.",
    longDescription: [
      "A comprehensive iOS application built entirely in Swift, designed to streamline pickleball court scheduling for the city of Sammamish. The app features a clean, native iOS interface following Apple's design guidelines.",
      "Users can manage player profiles, organize matches, reserve courts, and track availability through an intuitive booking system. The app includes notifications to keep players informed of their bookings.",
      "Built with pure Swift using modern iOS development patterns, the app demonstrates strong mobile development skills and understanding of local community needs."
    ],
    tech: ["Swift", "iOS", "UIKit/SwiftUI"],
    features: [
      "Court reservation system",
      "Player profile management",
      "Match organization",
      "Schedule management",
      "Availability tracking",
      "Push notifications",
      "Native iOS design"
    ],
    links: [
      { label: "View on GitHub", url: "https://github.com/EyalShechtman/SammamishPickleBall-App" }
    ],
    images: ["/assets/Pickle1.png", "/assets/Pickle2.png"],
    date: "July 2024",
    category: "Mobile",
    imagePlaceholder: {
      type: 'pattern',
      colors: ['#22c55e', '#16a34a', '#4ade80'],
      icon: '🏓'
    }
  },
  'selenium-projects': {
    title: "Selenium Projects",
    tagline: "Web Automation & Scraping Suite",
    description: "Collection of web automation projects including LinkedIn scraper with OCR and NFL player statistics collector.",
    longDescription: [
      "A comprehensive collection of web automation projects demonstrating advanced Selenium WebDriver skills. The LinkedIn scraper uses OCR technology to read names from screen recordings and automatically scrapes corresponding LinkedIn profiles.",
      "The NFL scraper collects statistics for ALL active NFL players, extracting comprehensive career data including yards, touchdowns, team history, and performance metrics from the official NFL website.",
      "Built with Jupyter Notebooks for interactive development, these projects showcase expertise in web automation, OCR implementation, large-scale data scraping, and error handling for production web scraping."
    ],
    tech: ["Selenium", "Jupyter Notebook", "OCR", "Pandas", "BeautifulSoup"],
    features: [
      "LinkedIn profile scraping",
      "OCR for screen recordings",
      "NFL player data collection",
      "CSV data export",
      "Large-scale web automation",
      "Error handling systems",
      "Professional networking tools"
    ],
    links: [
      { label: "View on GitHub", url: "https://github.com/EyalShechtman/Selenium_Projects" }
    ],
    date: "August 2024",
    category: "Automation",
    imagePlaceholder: {
      type: 'gradient',
      colors: ['#06b6d4', '#0891b2', '#22d3ee'],
      icon: '🤖'
    }
  },
  'covid-visualization': {
    title: "COVID-19 Visualization App",
    tagline: "R Shiny Interactive Dashboard",
    description: "Interactive COVID-19 data visualization dashboard built with R Shiny, featuring time-series analysis and geographic mapping.",
    longDescription: [
      "An interactive R Shiny application providing comprehensive COVID-19 data visualizations. The dashboard features real-time data updates, time-series trend analysis, and geographic mapping of case distributions.",
      "Built using ggplot2 for beautiful visualizations and plotly for interactive charts, the app allows users to explore case counts, death rates, vaccination progress, and regional comparisons through an intuitive interface.",
      "The project demonstrates proficiency in R programming, statistical analysis, data visualization best practices, and public health data handling. With 3 forks, it has been used by other developers as a reference."
    ],
    tech: ["R", "Shiny", "ggplot2", "plotly", "dplyr", "tidyr"],
    features: [
      "Interactive dashboards",
      "Time-series visualizations",
      "Geographic mapping",
      "Statistical analysis",
      "Real-time data updates",
      "Case trend analysis",
      "Vaccination tracking",
      "Regional comparisons"
    ],
    links: [
      { label: "View on GitHub", url: "https://github.com/EyalShechtman/COVID-19-Visualization-app-SHINY-" }
    ],
    date: "February - March 2023",
    category: "Data Visualization",
    imagePlaceholder: {
      type: 'abstract',
      colors: ['#ec4899', '#db2777', '#f472b6'],
      icon: '📊'
    }
  },
  'tamid-mass-texter': {
    title: "TAMID Mass Texter",
    tagline: "Bulk SMS Communication Platform",
    description: "Next.js application for TAMID organization to send bulk SMS messages to members, featuring event notifications and group messaging.",
    longDescription: [
      "TAMID Mass Texter is a production-deployed Next.js application built for the TAMID organization to facilitate bulk SMS messaging to members. The platform streamlines communication for event notifications, announcements, and group messaging.",
      "As a contributor to this project, implementation involved building TypeScript-based components and integrating SMS API services to handle mass text messaging capabilities. The application is currently live and actively used by the TAMID organization.",
      "Deployed on Vercel with a modern TypeScript stack, the project demonstrates practical application development for real organizational needs with focus on reliability and ease of use."
    ],
    tech: ["Next.js", "TypeScript", "Vercel", "SMS API"],
    features: [
      "Bulk SMS messaging",
      "Member communication management",
      "Event notifications",
      "Group messaging capabilities",
      "Contact list management",
      "Message scheduling",
      "Delivery tracking"
    ],
    links: [
      { label: "View Live App", url: "https://tamid-mass-texter-next.vercel.app" },
      { label: "View on GitHub", url: "https://github.com/ArvinH16/tamid_massTexter_next" },
      { label: "Watch Demo", url: "https://www.loom.com/share/834c84a07f884f059e370a275fb72071" }
    ],
    loomUrl: "https://www.loom.com/embed/834c84a07f884f059e370a275fb72071",
    date: "April - August 2025",
    category: "Full-Stack",
    imagePlaceholder: {
      type: 'gradient',
      colors: ['#14b8a6', '#0d9488', '#2dd4bf'],
      icon: '💬'
    }
  },
  'pictur-ai': {
    title: "PicturAI",
    tagline: "AI-Powered Image Generation Platform",
    description: "Next-generation AI platform for creative image generation and editing.",
    longDescription: [
      "PicturAI is a cutting-edge AI platform featured in Eyal's portfolio teaser (www.pictur.ai). This project represents the latest work in AI-powered creative tools and image generation.",
      "Built with modern web technologies, PicturAI leverages state-of-the-art AI models to provide users with powerful image generation and editing capabilities through an intuitive interface.",
      "The platform demonstrates expertise in AI integration, user experience design, and scalable web architecture. Currently in active development as a flagship portfolio project."
    ],
    tech: ["AI/ML", "Next.js", "TypeScript", "Image Processing"],
    features: [
      "AI-powered image generation",
      "Advanced editing tools",
      "Modern web interface",
      "Real-time processing",
      "Creative automation",
      "User-friendly design"
    ],
    links: [
      { label: "Visit PicturAI", url: "https://www.pictur.ai" }
    ],
    images: ["/assets/picturAI.png"],
    date: "October 2025",
    category: "AI & Creative Tools",
    imagePlaceholder: {
      type: 'gradient',
      colors: ['#ff6b9d', '#ec4899', '#f43f5e', '#fbbf24'],
      icon: '🎨'
    }
  }
};

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projectsData[slug];

  // Load Twitter widgets script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Load Reddit widgets script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.reddit.com/widgets.js';
    script.async = true;
    script.charset = 'UTF-8';
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Render image placeholder based on type
  const renderImagePlaceholder = () => {
    const { type, colors, icon } = project.imagePlaceholder;
    
    const baseClasses = "w-full h-96 rounded-3xl overflow-hidden relative group";
    
    switch (type) {
      case 'gradient':
        return (
          <div 
            className={`${baseClasses} flex items-center justify-center`}
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.03))`
            }}
          >
            <div className="text-9xl group-hover:scale-110 transition-transform duration-500">
              {icon}
            </div>
          </div>
        );
      
      case 'pattern':
        return (
          <div 
            className={`${baseClasses}`}
            style={{
              background: `repeating-linear-gradient(45deg, rgba(255,255,255,0.12), rgba(255,255,255,0.12) 10px, rgba(255,255,255,0.04) 10px, rgba(255,255,255,0.04) 20px)`
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <div className="text-9xl group-hover:scale-110 transition-transform duration-500">
                {icon}
              </div>
            </div>
          </div>
        );
      
      case 'geometric':
        return (
          <div 
            className={`${baseClasses}`}
            style={{
              background: `conic-gradient(from 180deg at 50% 50%, rgba(255,255,255,0.2), rgba(255,255,255,0.05), rgba(255,255,255,0.2))`
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-9xl group-hover:rotate-12 transition-transform duration-500">
                {icon}
              </div>
            </div>
          </div>
        );
      
      case 'abstract':
        return (
          <div className={`${baseClasses} bg-black`}>
            <div 
              className="absolute inset-0 opacity-50"
              style={{
                background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.18), transparent 50%), 
                           radial-gradient(circle at 70% 70%, rgba(255,255,255,0.12), transparent 50%),
                           radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08), transparent 70%)`
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-9xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                {icon}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <PrismaticBurst
          intensity={0.8}
          speed={0.2}
          animationType="hover"
          colors={project.imagePlaceholder.colors}
          distort={2}
          hoverDampness={0.4}
          rayCount={8}
          mixBlendMode="screen"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4">
            <div className="flex items-center justify-between gap-2">
              <Link 
                href="/"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </Link>
              <div className="flex gap-2 md:gap-3 overflow-x-auto">
                {project.links?.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.url}
                    target="_blank"
                    className="px-3 py-2 md:px-4 bg-white/10 hover:bg-white/20 rounded-lg text-xs md:text-sm text-white transition-colors whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
          {/* Title & Meta */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-2 md:gap-3 mb-3 flex-wrap">
              <span className="px-2 md:px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs md:text-sm text-white/80">
                {project.category}
              </span>
              <span className="text-white/60 text-xs md:text-sm">{project.date}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-3 md:mb-4 leading-tight">
              {project.title}
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white/70 font-light">
              {project.tagline}
            </p>
          </div>

          {/* Stats */}
          {project.stats && (
            <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8 md:mb-12">
              {project.stats.map((stat, idx) => (
                <div 
                  key={idx}
                  className="bg-white/5 backdrop-blur-md p-3 md:p-6 rounded-xl md:rounded-2xl border border-white/10"
                >
                  <div className="text-xl md:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-white/60 text-xs md:text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Media Section */}
          <div className="mb-12 space-y-6">
            {/* Video Embeds */}
            {project.videoUrl && (
              <div className="w-full rounded-3xl overflow-hidden shadow-2xl">
                <iframe
                  className="w-full aspect-video"
                  src={project.videoUrl}
                  title={`${project.title} Demo Video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {project.loomUrl && (
              <div className="w-full rounded-3xl overflow-hidden shadow-2xl">
                <iframe
                  className="w-full aspect-video"
                  src={project.loomUrl}
                  title={`${project.title} Demo`}
                  allowFullScreen
                />
              </div>
            )}

            {project.videoFile && (
              <div className="w-full rounded-3xl overflow-hidden shadow-2xl">
                <video
                  className="w-full"
                  controls
                  src={project.videoFile}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {/* Reddit Embeds */}
            {project.redditEmbed && (
              <div className="w-full rounded-3xl overflow-hidden shadow-2xl bg-white">
                <div
                  className="reddit-embed"
                  dangerouslySetInnerHTML={{ __html: project.redditEmbed }}
                />
              </div>
            )}

            {/* Twitter Embeds */}
            {project.twitterEmbeds && project.twitterEmbeds.length > 0 && (
              <div className="space-y-6">
                {project.twitterEmbeds.map((embed, idx) => (
                  <div key={idx} className="w-full rounded-3xl overflow-hidden shadow-2xl bg-white">
                    <TwitterEmbed html={embed} />
                  </div>
                ))}
              </div>
            )}

            {/* Project Images */}
            {project.images && project.images.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.images.map((image, idx) => (
                  <div key={idx} className="rounded-3xl overflow-hidden shadow-2xl">
                    <img
                      src={image}
                      alt={`${project.title} Screenshot ${idx + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Image Placeholder - Only show if no media above */}
            {!project.videoUrl && !project.loomUrl && !project.videoFile && !project.redditEmbed && !project.twitterEmbeds && !project.images && (
              <div>{renderImagePlaceholder()}</div>
            )}
          </div>

          {/* Description */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">About This Project</h2>
                <div className="space-y-4">
                  {project.longDescription.map((para, idx) => (
                    <p key={idx} className="text-white/80 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {project.features.map((feature, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tech Stack */}
              <div className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10 sticky top-24">
                <h3 className="text-xl font-bold text-white mb-4">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-2 bg-white/10 border border-white/20 text-white rounded-lg text-sm font-medium hover:scale-105 transition-transform"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Interested in this project?</h3>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Check out the source code and documentation to learn more about the implementation details.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              {project.links?.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.url}
                  target="_blank"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all hover:scale-105"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold transition-all"
              >
                View All Projects
              </Link>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="mt-20 bg-white/5 backdrop-blur-md border-t border-white/10">
          <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <blockquote className="text-2xl md:text-3xl font-light text-white/80 leading-relaxed mb-6">
              "You always overestimate the change that will occur in the short term, but underestimate the change that will occur in the long term."
            </blockquote>
            <p className="text-white/60 text-lg">
              — Anonymous
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <p className="text-center text-white/60">
              © 2025 Eyal Shechtman. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

