import { useState } from 'react';
import { Heart, Compass, Quote, Sparkles } from 'lucide-react';
import { COUPLE_DATA } from '../data/weddingData';

export default function StorySection() {
  const [activeStoryTab, setActiveStoryTab] = useState<'both' | 'her' | 'his'>('both');

  const storyChapters = [
    {
      chapter: '01',
      title: 'A Paris Rainstorm',
      subtitle: 'Montmartre, Autumn 2020',
      description:
        'Aethel was huddled beneath the green awning of a corner café, carefully shielding a portfolio of botanical sketches from a torrential Parisian downpour. Julian, carrying an umbrella wide enough for two, stopped to offer shelter. What began as a dry refuge turned into three hours of espresso, spirited debates over architecture and flora, and a telephone number scribbled on a sugar packet.',
    },
    {
      chapter: '02',
      title: 'The Highlands & Endless Roads',
      subtitle: 'Isle of Skye, Summer 2021',
      description:
        'Their first major expedition tested everything: torrential Scottish squalls, navigating single-track roads with sheep right of way, and pitch-black night skies over Loch Coruisk. Over campfires and cold fingers, they realized they didn’t just enjoy traveling together—they were each other’s home in any wilderness.',
    },
    {
      chapter: '03',
      title: 'A Question Beneath Positano Cliffs',
      subtitle: 'Amalfi Coast, Spring 2025',
      description:
        'Drifting quietly in a wooden gozzo boat as the sunset turned the cliffs of Positano into shades of apricot and rose gold, Julian pulled out a leather-bound letter. As Aethel read the final line, he was on one knee holding an heirloom sapphire. Through happy tears, her ‘yes’ echoed over the gentle tide.',
    },
  ];

  return (
    <section id="story" className="py-24 sm:py-32 bg-[#FDFBF7] relative overflow-hidden">
      {/* Decorative background watermark */}
      <div className="absolute right-0 top-1/4 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
        <span className="font-script text-[260px] text-[#2C2724]">Forever</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#936E40] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Journey</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2C2724] font-normal tracking-tight">
            Two Paths, One Horizon
          </h2>
          <div className="w-16 h-px bg-[#D5C2AA] mx-auto my-6" />
          <p className="font-serif italic text-lg sm:text-xl text-[#6B5E54] leading-relaxed">
            {COUPLE_DATA.loveLetterQuote}
          </p>
        </div>

        {/* Narrative & Photo Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          {/* Couple Portrait Frame with Architectural Matting */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer frame */}
              <div className="p-3 sm:p-4 bg-white rounded-2xl shadow-xl border border-[#EDE4D6] relative z-10">
                <div className="aspect-[4/5] rounded-xl overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85"
                    alt="Aethel & Julian"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="font-script text-2xl text-amber-200">Aethel & Julian</span>
                    <p className="text-xs text-white/90">Villa Cimbrone Gardens · Ravello</p>
                  </div>
                </div>
              </div>

              {/* Offset decorative backdrop layer */}
              <div className="absolute -inset-2 sm:-inset-3 bg-[#F2ECE1] rounded-3xl -rotate-2 -z-0 border border-[#E4DAC9]" />
            </div>

            {/* Quick Relationship Stats */}
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              <div className="bg-white/80 p-3.5 rounded-xl border border-[#EDE4D6] shadow-xs">
                <span className="block font-serif text-2xl text-[#2C2724] font-medium">6</span>
                <span className="text-[10px] uppercase tracking-wider text-[#847A70]">Years Together</span>
              </div>
              <div className="bg-white/80 p-3.5 rounded-xl border border-[#EDE4D6] shadow-xs">
                <span className="block font-serif text-2xl text-[#2C2724] font-medium">14</span>
                <span className="text-[10px] uppercase tracking-wider text-[#847A70]">Countries Explored</span>
              </div>
              <div className="bg-white/80 p-3.5 rounded-xl border border-[#EDE4D6] shadow-xs">
                <span className="block font-serif text-2xl text-[#936E40] font-medium">1</span>
                <span className="text-[10px] uppercase tracking-wider text-[#847A70]">Lifelong Vow</span>
              </div>
            </div>
          </div>

          {/* Chapters of the Story */}
          <div className="lg:col-span-7 space-y-8">
            {storyChapters.map((chap) => (
              <div
                key={chap.chapter}
                className="group relative pl-8 border-l border-[#DFD3C3] hover:border-[#936E40] transition-colors"
              >
                <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-[#DFD3C3] group-hover:bg-[#936E40] transition-colors" />
                <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#936E40] font-semibold mb-1">
                  <span>Chapter {chap.chapter}</span>
                  <span className="text-neutral-300">·</span>
                  <span className="text-[#847A70] font-normal">{chap.subtitle}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#2C2724] mb-3">
                  {chap.title}
                </h3>
                <p className="text-[#594F47] text-sm sm:text-base leading-relaxed">
                  {chap.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* His & Her Perspectives Interactive Module */}
        <div className="mt-16 bg-white rounded-2xl border border-[#EBE4D8] p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F0EAE1]">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#936E40] font-medium mb-1">
                <Quote className="w-3.5 h-3.5" />
                <span>In Their Own Words</span>
              </div>
              <h3 className="font-serif text-2xl text-[#2C2724]">The Moment We Knew</h3>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 p-1 bg-[#F8F5EE] rounded-lg">
              <button
                onClick={() => setActiveStoryTab('both')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                  activeStoryTab === 'both'
                    ? 'bg-white text-[#2C2724] shadow-xs'
                    : 'text-[#7C7166] hover:text-[#2C2724]'
                }`}
              >
                Both Perspectives
              </button>
              <button
                onClick={() => setActiveStoryTab('her')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                  activeStoryTab === 'her'
                    ? 'bg-white text-[#2C2724] shadow-xs'
                    : 'text-[#7C7166] hover:text-[#2C2724]'
                }`}
              >
                Aethel’s Note
              </button>
              <button
                onClick={() => setActiveStoryTab('his')}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                  activeStoryTab === 'his'
                    ? 'bg-white text-[#2C2724] shadow-xs'
                    : 'text-[#7C7166] hover:text-[#2C2724]'
                }`}
              >
                Julian’s Note
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            {(activeStoryTab === 'both' || activeStoryTab === 'her') && (
              <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-xl border border-[#EDE5DA] relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-serif text-xl text-[#2C2724]">Aethel’s Perspective</h4>
                    <span className="text-xs uppercase tracking-wider text-[#936E40]">The Bride</span>
                  </div>
                  <Heart className="w-5 h-5 text-rose-400 fill-rose-100" />
                </div>
                <p className="font-serif italic text-base text-[#4E443B] leading-relaxed mb-4">
                  “I knew Julian was the one on our second anniversary when my grandmother fell ill. Without
                  hesitation, he drove six hours through freezing fog with warm soup and stayed by my side in
                  the hospital corridor quietly holding my hand. His kindness is not a performance—it is his
                  very marrow.”
                </p>
                <div className="font-script text-2xl text-[#936E40] text-right">
                  — Aethel
                </div>
              </div>
            )}

            {(activeStoryTab === 'both' || activeStoryTab === 'his') && (
              <div className="bg-[#FAF7F2] p-6 sm:p-8 rounded-xl border border-[#EDE5DA] relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-serif text-xl text-[#2C2724]">Julian’s Perspective</h4>
                    <span className="text-xs uppercase tracking-wider text-[#936E40]">The Groom</span>
                  </div>
                  <Compass className="w-5 h-5 text-amber-600/70" />
                </div>
                <p className="font-serif italic text-base text-[#4E443B] leading-relaxed mb-4">
                  “People talk about sparks, but with Aethel, it was clarity. She sees beauty in the quietest
                  corners—cracked stones, wilting leaves, stray puppies. Standing next to her, the world is
                  infinitely more vivid, more forgiving, and brimming with hope.”
                </p>
                <div className="font-script text-2xl text-[#936E40] text-right">
                  — Julian
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
