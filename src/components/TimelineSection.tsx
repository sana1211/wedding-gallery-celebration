import { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, HeartHandshake, Compass } from 'lucide-react';
import { TIMELINE_MILESTONES, WEDDING_DAY_SCHEDULE } from '../data/weddingData';

export default function TimelineSection() {
  const [viewType, setViewType] = useState<'love_story' | 'wedding_day'>('love_story');

  return (
    <section id="timeline" className="py-24 sm:py-32 bg-[#F6F2EB] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#936E40] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chronicles</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2C2724] font-normal tracking-tight">
            The Journey to Forever
          </h2>
          <div className="w-16 h-px bg-[#D5C2AA] mx-auto my-6" />
          <p className="text-sm sm:text-base text-[#6B5E54] max-w-xl mx-auto">
            From accidental umbrellas to golden rings: every step that shaped our universe and brought us
            to this sacred celebration.
          </p>

          {/* Interactive Mode Toggle */}
          <div className="mt-8 inline-flex items-center p-1.5 bg-[#ECE5D8] rounded-xl border border-[#DFD5C5]">
            <button
              onClick={() => setViewType('love_story')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium tracking-wide uppercase transition-all ${
                viewType === 'love_story'
                  ? 'bg-white text-[#2C2724] shadow-xs'
                  : 'text-[#6C6054] hover:text-[#2C2724]'
              }`}
            >
              <HeartHandshake className="w-4 h-4 text-[#936E40]" />
              <span>Relationship Milestones</span>
            </button>
            <button
              onClick={() => setViewType('wedding_day')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium tracking-wide uppercase transition-all ${
                viewType === 'wedding_day'
                  ? 'bg-white text-[#2C2724] shadow-xs'
                  : 'text-[#6C6054] hover:text-[#2C2724]'
              }`}
            >
              <Clock className="w-4 h-4 text-[#936E40]" />
              <span>Wedding Day Schedule</span>
            </button>
          </div>
        </div>

        {/* View 1: Relationship Milestones Timeline */}
        {viewType === 'love_story' && (
          <div className="relative">
            {/* Center spine line for desktop */}
            <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-px bg-[#D6C8B4]" />

            <div className="space-y-12 sm:space-y-16">
              {TIMELINE_MILESTONES.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={item.id}
                    className={`relative flex flex-col lg:flex-row items-center ${
                      isEven ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Center Node Dot */}
                    <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#FDFBF7] border-2 border-[#936E40] items-center justify-center z-10 shadow-xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#936E40]" />
                    </div>

                    {/* Image Column */}
                    <div className="w-full lg:w-1/2 px-0 lg:px-10 mb-6 lg:mb-0">
                      <div className="relative group overflow-hidden rounded-2xl bg-white shadow-md border border-[#E8DFC9] aspect-[16/10]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />
                        <div className="absolute bottom-3 left-4 text-white">
                          <span className="text-xs uppercase tracking-widest text-amber-200">
                            {item.badge}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className="w-full lg:w-1/2 px-0 lg:px-10">
                      <div className="bg-white/90 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-[#E8DFC9] shadow-xs">
                        {/* Unboxed clean metadata (zero-pill discipline) */}
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#936E40] font-semibold mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {item.date}
                          </span>
                          <span className="text-[#CABEB0]">·</span>
                          <span className="flex items-center gap-1 text-[#786D61] font-normal">
                            <MapPin className="w-3.5 h-3.5" />
                            {item.location}
                          </span>
                        </div>

                        <h3 className="font-serif text-2xl sm:text-3xl text-[#2C2724] mb-3">
                          {item.title}
                        </h3>

                        <p className="text-sm sm:text-base text-[#594F47] leading-relaxed mb-4">
                          {item.description}
                        </p>

                        {item.quote && (
                          <div className="border-t border-[#F2ECE1] pt-3 mt-3">
                            <p className="font-serif italic text-sm text-[#7D6E60]">
                              {item.quote}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* View 2: Wedding Day Schedule */}
        {viewType === 'wedding_day' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl border border-[#E8DFC9] p-6 sm:p-10 shadow-sm relative">
              <div className="text-center mb-8 pb-6 border-b border-[#F0EAE0]">
                <span className="text-xs uppercase tracking-[0.2em] text-[#936E40] font-medium">
                  October 4, 2026 · Official Order of Events
                </span>
                <h3 className="font-serif text-3xl text-[#2C2724] mt-1">
                  Celebration Programme
                </h3>
              </div>

              <div className="space-y-8 relative before:absolute before:left-3 sm:before:left-5 before:top-2 before:bottom-2 before:w-px before:bg-[#E3D6C3]">
                {WEDDING_DAY_SCHEDULE.map((item, idx) => (
                  <div key={idx} className="relative pl-9 sm:pl-12 group">
                    {/* Bullet marker */}
                    <div className="absolute left-1.5 sm:left-3.5 top-1.5 w-3.5 h-3.5 rounded-full bg-[#FAF7F2] border-2 border-[#936E40] group-hover:scale-110 transition-transform" />

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                      <h4 className="font-serif text-xl sm:text-2xl text-[#2C2724] font-medium">
                        {item.title}
                      </h4>
                      <span className="text-xs font-semibold tracking-wider text-[#936E40] uppercase shrink-0">
                        {item.time}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-[#827568] mb-2">
                      <MapPin className="w-3.5 h-3.5 text-[#B08953]" />
                      <span>{item.location}</span>
                    </div>

                    <p className="text-sm text-[#5C5248] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-[#F0EAE0] text-center">
                <p className="text-xs text-[#7A6E63] italic">
                  Shuttles will operate continuously between Ravello town square and Villa Cimbrone from
                  2:30 PM until 1:00 AM.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
