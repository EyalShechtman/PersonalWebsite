'use client';

import Link from "next/link";
import dynamic from "next/dynamic";
import { Home as HomeIcon, User, Briefcase, FileText, Music } from 'lucide-react';
import { NavBar } from './components/ui/tubelight-navbar';
import { ContainerScroll } from './components/ui/container-scroll-animation';
import GlassMusicPlaylist from './components/GlassMusicPlaylist';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, memo, useState, useEffect } from 'react';

const PrismaticBurst = dynamic(() => import('./components/PrismaticBurst'), { ssr: false });

// Featured projects for the tablet (top 3)
const featuredProjects = [
  {
    title: "Dress to Impress: AI Fashion Showdown",
    description: "24-hour hackathon project from SF OpenAI × Cerebral Valley GPT-5 - AI fashion game with avatar generation, AI opponent, multimodal judging, and runway videos.",
    stars: 16,
    tech: ["Next.js 15", "React 19", "OpenAI", "FASHN AI", "Kling AI", "Docker"],
    link: "https://github.com/parsakhaz/open-ai-dress2impress",
    slug: "dress2impress",
    highlights: ["Built in 24hrs", "AI Opponent", "Runway Videos", "Production Ready"]
  },
  {
    title: "Pictur.AI",
    description: "AI-powered creative platform for next-generation content creation and visual experiences. Currently in development as the flagship project.",
    tech: ["AI/ML", "Creative Tech", "Web Platform"],
    link: "https://www.pictur.ai",
    slug: "pictur-ai",
    liveUrl: "https://www.pictur.ai",
    highlights: ["In Development", "Flagship Project", "Creative AI", "Visual Platform"]
  },
  {
    title: "StyleList - AI Fashion Stylist",
    description: "Production-ready AI fashion assistant powered by Gemini 2.5 Flash with automatic moodboard generation, gender-aware product searches, and virtual try-on capabilities.",
    stars: 74,
    forks: 15,
    tech: ["Next.js 15", "TypeScript", "Gemini 2.5", "Tailwind CSS", "Zustand", "FASHN AI", "Amazon API"],
    link: "https://github.com/parsakhaz/open-ai-stylist",
    slug: "open-ai-stylist",
    highlights: ["Auto-Style Mode", "Multi-Modal Chat", "Virtual Try-Ons", "Real-time Products"]
  }
];

// All projects for the full section
const allProjects = [
  {
    title: "Dress to Impress: AI Fashion Showdown",
    description: "24-hour hackathon project from SF OpenAI × Cerebral Valley GPT-5 - AI fashion game with avatar generation, AI opponent, multimodal judging, and runway videos.",
    stars: 16,
    tech: ["Next.js 15", "React 19", "OpenAI", "FASHN AI", "Kling AI", "Docker"],
    link: "https://github.com/parsakhaz/open-ai-dress2impress",
    slug: "dress2impress",
    highlights: ["Built in 24hrs", "AI Opponent", "Runway Videos", "Production Ready"]
  },
  {
    title: "Pictur.AI",
    description: "AI-powered creative platform for next-generation content creation and visual experiences. Currently in development as the flagship project.",
    tech: ["AI/ML", "Creative Tech", "Web Platform"],
    link: "https://www.pictur.ai",
    slug: "pictur-ai",
    liveUrl: "https://www.pictur.ai",
    highlights: ["In Development", "Flagship Project", "Creative AI", "Visual Platform"]
  },
  {
    title: "StyleList - AI Fashion Stylist",
    description: "Production-ready AI fashion assistant powered by Gemini 2.5 Flash with automatic moodboard generation, gender-aware product searches, and virtual try-on capabilities.",
    stars: 74,
    forks: 15,
    tech: ["Next.js 15", "TypeScript", "Gemini 2.5", "Tailwind CSS", "Zustand", "FASHN AI", "Amazon API"],
    link: "https://github.com/parsakhaz/open-ai-stylist",
    slug: "open-ai-stylist",
    highlights: ["Auto-Style Mode", "Multi-Modal Chat", "Virtual Try-Ons", "Real-time Products"]
  },
  {
    title: "ArtistOS",
    description: "AI-powered music mixing and video generation platform - actively developed with rapid iteration and cool new features.",
    tech: ["Python", "Jupyter Notebook", "Audio Processing", "AI"],
    link: "https://github.com/EyalShechtman/open-ai-ArtistOS",
    slug: "artistos",
    highlights: ["Music Mixing", "Video Generation", "Rapid Development"]
  },
  {
    title: "AWSHackDay - Agentic Investment System",
    description: "Multi-agent AI system using Twitter sentiment (Grok), comprehensive financial data (Finnhub), and autonomous trading (Alpaca) with 6 specialized agents.",
    tech: ["TypeScript", "Finnhub API", "Grok/XAI", "Gemini", "OpenAI", "Alpaca"],
    link: "https://github.com/EyalShechtman/AWSHackDay",
    slug: "awshackday",
    highlights: ["6 AI Agents", "Twitter Analysis", "Auto Trading", "AWS Hackathon"]
  },
  {
    title: "VideoArchive",
    description: "Self-built smart video management solution with intelligent search and tagging. Created when existing solutions weren't good enough.",
    tech: ["TypeScript", "React", "Python", "FastAPI"],
    link: "https://github.com/EyalShechtman/VideoArchive",
    slug: "videoarchive",
    highlights: ["Smart Search", "AI Tagging", "Full-Stack", "Loom Demo Available"]
  },
  {
    title: "AutomatedAds",
    description: "AI ad generation combining OpenAI script generation with ElevenLabs voice synthesis and background music for personalized audio advertisements.",
    tech: ["Python", "OpenAI", "ElevenLabs", "Pandas"],
    link: "https://github.com/EyalShechtman/AutomatedAds",
    slug: "automatedads",
    highlights: ["Script Generation", "Voice Synthesis", "Music Integration"]
  },
  {
    title: "YouTube Toxic",
    description: "Comment toxicity analysis tool for analyzing and comparing sentiment across different YouTube channel communities.",
    tech: ["TypeScript", "YouTube API", "NLP"],
    link: "https://github.com/EyalShechtman/YouTube_Toxic",
    slug: "youtube-toxic",
    highlights: ["Toxicity Detection", "Channel Comparison", "Data Viz"]
  },
  {
    title: "Sammamish Pickleball App",
    description: "Fully developed native iOS court scheduling app built with Swift for the city of Sammamish, WA.",
    tech: ["Swift", "iOS", "UIKit/SwiftUI"],
    link: "https://github.com/EyalShechtman/SammamishPickleBall-App",
    slug: "sammamish-pickleball",
    highlights: ["Native iOS", "Court Booking", "Pure Swift"]
  },
  {
    title: "Selenium Projects",
    description: "Web automation suite featuring LinkedIn URL scraper with OCR from screen recordings and comprehensive NFL player statistics collector.",
    tech: ["Selenium", "Python", "OCR", "Pandas"],
    link: "https://github.com/EyalShechtman/Selenium_Projects",
    slug: "selenium-projects",
    highlights: ["OCR Integration", "NFL Stats", "CSV Export"]
  },
  {
    title: "Casca",
    description: "Interactive challenge platform built in just 4 days with TypeScript - full-stack application with backend API and game logic.",
    tech: ["TypeScript", "Backend API"],
    link: "https://github.com/EyalShechtman/Casca",
    slug: "casca",
    highlights: ["4-Day Build", "Loom Demo", "Full-Stack"]
  },
  {
    title: "COVID-19 Visualization",
    description: "Interactive R Shiny dashboard with time-series analysis, geographic mapping, and real-time COVID-19 data visualizations.",
    tech: ["R", "Shiny", "ggplot2", "plotly"],
    forks: 3,
    link: "https://github.com/EyalShechtman/COVID-19-Visualization-app-SHINY-",
    slug: "covid-visualization",
    highlights: ["Interactive Dashboards", "Geographic Maps", "Statistical Analysis"]
  },
  {
    title: "TAMID Mass Texter",
    description: "Production-deployed Next.js bulk SMS platform for TAMID organization member communication and event notifications.",
    tech: ["Next.js", "TypeScript", "Vercel", "SMS API"],
    link: "https://github.com/ArvinH16/tamid_massTexter_next",
    slug: "tamid-mass-texter",
    liveUrl: "https://tamid-mass-texter-next.vercel.app",
    highlights: ["Live Deployment", "Bulk Messaging", "Event Notifications"]
  }
];

const skills = {
  "Languages": ["TypeScript", "Python", "JavaScript", "Swift", "R", "Jupyter"],
  "Frontend": ["Next.js 15", "React 19", "Tailwind CSS", "Zustand", "IndexedDB"],
  "AI/ML": ["OpenAI", "Gemini 2.5", "FASHN AI", "Kling AI", "Grok/XAI", "ElevenLabs"],
  "Backend": ["Node.js", "FastAPI", "uvicorn", "Docker", "Nginx"],
  "APIs & Integrations": ["Amazon API", "Finnhub", "Alpaca", "YouTube API", "RapidAPI"]
};

// Memoized project card component for better performance
const ProjectCard = memo(({ project, idx }: { project: typeof allProjects[0], idx: number }) => (
  <Link
    key={idx}
    href={`/projects/${project.slug}`}
    className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1 hover:shadow-2xl group block"
  >
    <div className="flex justify-between items-start mb-4">
      <h4 className="text-xl font-bold text-white group-hover:text-white transition-all">
        {project.title}
      </h4>
      <div className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 group-hover:text-white">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>

    {(project.stars || project.forks) && (
      <div className="flex gap-4 mb-3 text-sm text-white/60">
        {project.stars && <span>⭐ {project.stars} stars</span>}
        {project.forks && <span>🍴 {project.forks} forks</span>}
      </div>
    )}

    <p className="text-white/70 mb-4 leading-relaxed line-clamp-3">
      {project.description}
    </p>

    <div className="flex flex-wrap gap-2 mb-4">
      {project.tech.slice(0, 3).map((tech, i) => (
        <span
          key={i}
          className="px-3 py-1 bg-white/10 border border-white/20 text-white rounded-full text-sm font-medium"
        >
          {tech}
        </span>
      ))}
      {project.tech.length > 3 && (
        <span className="px-3 py-1 text-white/50 text-sm">
          +{project.tech.length - 3} more
        </span>
      )}
    </div>

    <div className="border-t border-white/10 pt-4">
      <div className="flex items-center gap-2 text-sm text-white/60 group-hover:text-white/80 transition-colors">
        <span>View Details</span>
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </div>
  </Link>
));

ProjectCard.displayName = 'ProjectCard';

// Performance monitoring hook
function usePerformanceMonitor() {
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  useEffect(() => {
    // Simple performance detection
    const connection = (navigator as { connection?: { effectiveType?: string } }).connection;
    const isSlowConnection = connection?.effectiveType && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
    const isLowMemory = (navigator as { deviceMemory?: number }).deviceMemory && (navigator as { deviceMemory?: number }).deviceMemory! < 4;
    const isOldHardware = !window.requestAnimationFrame || !window.IntersectionObserver;

    setIsLowEndDevice(Boolean(isSlowConnection || isLowMemory || isOldHardware));
  }, []);

  return { isLowEndDevice };
}

export default function Home() {
  const { isLowEndDevice } = usePerformanceMonitor();
  const projectsSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: projectsScrollProgress } = useScroll({
    target: projectsSectionRef,
    offset: ["start end", "start start"]
  });
  
  const projectsOpacity = useTransform(projectsScrollProgress, [0.7, 0.95], [0, 1]);

  const navItems = [
    { name: 'Home', url: '#home', icon: HomeIcon },
    { name: 'About', url: '#about', icon: User },
    { name: 'Projects', url: '#projects', icon: Briefcase },
    { name: 'Music', url: '#music', icon: Music },
    { name: 'Resume', url: '#resume', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated WebGL Background - Disabled on low-end devices for performance */}
      {!isLowEndDevice && (
        <div className="fixed inset-0 z-0">
          <PrismaticBurst
            intensity={1.5}
            speed={0.25}
            animationType="rotate3d"
            colors={['#ff00ff', '#00ffff', '#ff0080', '#8000ff', '#ffff00', '#ff0000', '#00ff00', '#0080ff']}
            distort={10}
            hoverDampness={0.08}
            rayCount={18}
            mixBlendMode="screen"
          />
        </div>
      )}

      {/* Tubelight Navigation */}
      <NavBar items={navItems} />
      
      {/* Content Overlay */}
      <div className="relative z-10 pb-24 md:pb-0">

        {/* Hero Section with Scroll Animation */}
        <section id="home" className="pt-20 md:pt-8">
          <ContainerScroll
            titleComponent={
              <div className="space-y-6 px-4">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-white/80 text-sm md:text-base">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">Full-Stack Developer @ Chewy</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Seattle, WA • UW</span>
                  </div>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-white leading-tight tracking-tight font-[family-name:var(--font-orbitron)]">
                  <span className="block text-white">
                    BUILDING
                  </span>
                  <span className="block mt-2 text-white">
                    AI-POWERED
                  </span>
                  <span className="block mt-2 font-[family-name:var(--font-space-grotesk)] text-white">
                    Web Experiences
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-[family-name:var(--font-space-grotesk)] mb-8 md:mb-12">
                  Specializing in full-stack development with cutting-edge AI integration
                </p>
              </div>
            }
          >
            {/* Featured Projects grid inside the tablet */}
            <div className="w-full h-full overflow-y-auto px-6 py-8">
              <h3 className="text-3xl md:text-4xl font-bold mb-8 text-white text-center">
                Featured Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredProjects.map((project, idx) => (
                  <ProjectCard key={project.slug} project={project} idx={idx} />
                ))}
              </div>
            </div>
          </ContainerScroll>
        </section>

        {/* All Projects - Full Page View (after scroll) */}
        <motion.section 
          ref={projectsSectionRef}
          id="projects" 
          className="max-w-6xl mx-auto px-6 py-20"
          style={{ opacity: projectsOpacity }}
        >
          <h3 className="text-4xl font-bold mb-12 text-white">
            All Projects
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects.map((project, idx) => (
              <ProjectCard key={project.slug} project={project} idx={idx} />
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <h3 className="text-4xl font-bold mb-12 text-white">
            Technical Skills
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div
                key={category}
                className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <h4 className="font-bold text-lg mb-4 text-white">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-white/10 text-white/90 rounded-lg text-sm hover:bg-white/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Music Section */}
        <section id="music" className="max-w-6xl mx-auto px-6 py-20">
          <GlassMusicPlaylist />
        </section>

        {/* Resume/Contact Section */}
        <section id="resume" className="max-w-6xl mx-auto px-6 py-20">
          <h3 className="text-4xl font-bold mb-8 text-white text-center">
            Get In Touch
          </h3>
          <div className="flex flex-col items-center gap-6">
            <p className="text-white/70 text-center max-w-2xl">
              Interested in collaborating or want to learn more about my work?
            </p>
            <div className="flex gap-4">
              <Link
                href="https://github.com/EyalShechtman"
                target="_blank"
                className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-all text-white flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </Link>
              <Link
                href="https://www.linkedin.com/in/eyal-shechtman"
                target="_blank"
                className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl font-semibold hover:bg-white/10 transition-all text-white flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 mt-20 bg-black/40">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/60">
                © 2025 Eyal Shechtman. All rights reserved.
              </p>
              <div className="flex gap-6">
                <Link 
                  href="https://github.com/EyalShechtman" 
                  target="_blank"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  GitHub
                </Link>
                <Link 
                  href="https://www.linkedin.com/in/eyal-shechtman" 
                  target="_blank"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  LinkedIn
                </Link>
                <Link 
                  href="https://www.pictur.ai" 
                  target="_blank"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Portfolio
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
