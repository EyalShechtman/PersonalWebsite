'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
const projects = [
  { name: 'Soccer Career', color: 'from-blue-400 to-indigo-400', slug: 'soccer-career', date: 'Nov 2025' },
  { name: 'Open AI Stylist', color: 'from-blue-500 to-cyan-500', slug: 'open-ai-stylist', date: 'June 2025' },
  { name: 'Dress to Impress', color: 'from-purple-500 to-pink-500', slug: 'dress2impress', date: 'July 2025' },
  { name: 'ArtistOS', color: 'from-orange-500 to-red-500', slug: 'artistos', date: 'Sept 2025' },
  { name: 'VideoArchive', color: 'from-green-500 to-emerald-500', slug: 'videoarchive', date: 'Feb 2025' },
  { name: 'AWSHackDay', color: 'from-indigo-500 to-blue-500', slug: 'awshackday', date: 'July 2025' },
  { name: 'AutomatedAds', color: 'from-yellow-500 to-orange-500', slug: 'automatedads', date: 'Dec 2024' },
  { name: 'YouTube Toxic', color: 'from-red-500 to-pink-500', slug: 'youtube-toxic', date: 'May 2025' },
  { name: 'Casca', color: 'from-teal-500 to-cyan-500', slug: 'casca', date: 'Feb 2025' },
  { name: 'Pickleball App', color: 'from-lime-500 to-green-500', slug: 'sammamish-pickleball', date: 'July 2024' },
  { name: 'COVID Viz', color: 'from-violet-500 to-purple-500', slug: 'covid-visualization', date: 'Feb 2023' },
  { name: 'PicturAI', color: 'from-pink-500 to-rose-500', slug: 'pictur-ai', date: 'Oct 2025', image: '/assets/picturAI.png' },
  { name: 'TAMID Mass Texter', color: 'from-teal-500 to-blue-500', slug: 'tamid-mass-texter', date: 'Apr 2025' },
];
export function ProjectsPreview() {
  return (
    <div className="w-full h-full bg-black p-4 overflow-y-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <Link
            key={index}
            href={`/projects/${project.slug}`}
            className="group relative aspect-square rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 bg-white/5 border border-white/10"
          >
            <div className="absolute inset-0 bg-white/5 opacity-90 group-hover:opacity-100 transition-opacity" />
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
                {[...Array(64)].map((_, i) => (
                  <div key={i} className="border border-white/20" />
                ))}
              </div>
            </div>
            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center p-4 text-center">
              {project.image ? (
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image 
                    src={project.image} 
                    alt={project.name}
                    fill
                    className="object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                    <div className="text-white font-bold text-sm md:text-base lg:text-lg drop-shadow-lg">
                      {project.name}
                    </div>
                    <div className="text-white/80 text-xs md:text-sm drop-shadow-lg mt-1">
                      {project.date}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-white font-bold text-sm md:text-base lg:text-lg drop-shadow-lg">
                    {project.name}
                  </div>
                  <div className="text-white/80 text-xs md:text-sm drop-shadow-lg mt-2">
                    {project.date}
                  </div>
                </>
              )}
              {/* Hover indicator */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-6 h-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            {/* Shine effect */}
            <div className=\"absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-700\" />
          </Link>
        ))}
      </div>
    </div>
  );
}