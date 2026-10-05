import { useState } from 'react';
import { Sparkles, Pin, Volume2, VolumeX, Heart, BookOpen, Quote, RotateCw } from 'lucide-react';
import { POLAROID_MEMORIES, WEDDING_VOWS } from '../data/weddingData';
import { PolaroidMemory } from '../types/wedding';

export default function MemoriesSection() {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [activeVowTab, setActiveVowTab] = useState<'bride' | 'groom'>('bride');
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  const toggleCardFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Play spoken vows with Web Speech API for authentic memory audio playback
  const playVowVoice = (text: string, voiceKey: string) => {
    if (playingVoiceId === voiceKey) {
      window.speechSynthesis.cancel();
      setPlayingVoiceId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.88;
    utterance.pitch = voiceKey === 'bride' ? 1.05 : 0.95;

    // Pick English voices if available
    const voices = window.speechSynthesis.getVoices();
    const enVoices = voices.filter((v) => v.lang.startsWith('en'));
    if (voiceKey === 'bride') {
      const femaleVoice = enVoices.find((v) => v.name.includes('Female') || v.name.includes('Natural') || v.name.includes('Google UK English Female') || v.name.includes('Samantha'));
      if (femaleVoice) utterance.voice = femaleVoice;
    } else {
      const maleVoice = enVoices.find((v) => v.name.includes('Male') || v.name.includes('Natural') || v.name.includes('Google UK English Male') || v.name.includes('Daniel'));
      if (maleVoice) utterance.voice = maleVoice;
    }

    utterance.onend = () => setPlayingVoiceId(null);
    utterance.onerror = () => setPlayingVoiceId(null);

    setPlayingVoiceId(voiceKey);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <section id="memories" className="py-24 sm:py-32 bg-[#F6F2EB] relative overflow-hidden">
      {/* Background soft pattern */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#936E40] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Keepsakes & Ephemera</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2C2724] font-normal tracking-tight">
            Memories & Sacred Vows
          </h2>
          <div className="w-16 h-px bg-[#D5C2AA] mx-auto my-6" />
          <p className="text-sm sm:text-base text-[#6B5E54]">
            Tangible fragments of our days: candid snapshots, handwritten journal pages, and the
            words we promised each other above the cliffs. Click any polaroid to flip and read its
            backstory.
          </p>
        </div>

        {/* 1. Polaroid Wall / Scrapbook */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif text-2xl text-[#2C2724] flex items-center gap-2">
              <span>The Polaroid Table</span>
              <span className="text-xs uppercase tracking-widest font-sans text-[#8C7E72] font-normal">
                (Tap card to reveal note)
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-4 items-stretch">
            {POLAROID_MEMORIES.map((pol) => {
              const isFlipped = !!flippedCards[pol.id];

              return (
                <div
                  key={pol.id}
                  onClick={() => toggleCardFlip(pol.id)}
                  className={`group relative cursor-pointer transition-all duration-300 transform hover:scale-105 hover:z-20 ${pol.rotation}`}
                >
                  {/* Decorative Washi Tape / Pushpin */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-16 h-4 bg-[#D4AF37]/40 backdrop-blur-xs shadow-xs -rotate-2 border border-white/40" />

                  {/* Polaroid Frame */}
                  <div
                    className={`bg-white p-3.5 pb-6 rounded-xs shadow-lg border border-[#EDE4D6] transition-all min-h-[360px] flex flex-col justify-between ${
                      isFlipped ? 'bg-[#FFFDF9] ring-2 ring-[#936E40]/40' : ''
                    }`}
                  >
                    {!isFlipped ? (
                      <>
                        {/* Front: Photo */}
                        <div>
                          <div className="aspect-square bg-[#ECE4D8] overflow-hidden mb-3 relative">
                            <img
                              src={pol.imageUrl}
                              alt={pol.caption}
                              className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-[#E8DCC8]/10 mix-blend-multiply" />
                          </div>

                          <p className="font-script text-2xl text-[#3A322B] text-center leading-tight">
                            {pol.caption}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-[#9A8D80] pt-2 border-t border-[#F2ECE1]">
                          <span>{pol.date}</span>
                          <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#936E40]">
                            <RotateCw className="w-3 h-3" /> Flip
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Back: Handwritten Journal Entry */}
                        <div className="flex-1 flex flex-col justify-between p-2">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs text-[#936E40] uppercase tracking-wider pb-2 border-b border-[#EDE4D6]">
                              <span>Handwritten Note</span>
                              <span>{pol.date}</span>
                            </div>

                            <p className="font-serif italic text-[#4A4036] text-sm leading-relaxed mt-2">
                              “{pol.note}”
                            </p>
                          </div>

                          <div className="pt-4 border-t border-[#EDE4D6] text-center">
                            <span className="font-script text-xl text-[#936E40]">
                              with all our love
                            </span>
                            <div className="text-[10px] uppercase tracking-widest text-[#A09385] mt-1">
                              Tap to view photo
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. Sacred Vows & Audio Keepsake */}
        <div className="bg-white rounded-3xl border border-[#E8DFC9] p-6 sm:p-12 shadow-sm relative">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#936E40] font-semibold mb-2">
                <BookOpen className="w-4 h-4" />
                <span>The Altar Exchange</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#2C2724]">
                Wedding Vows & Audio Recital
              </h3>
              <p className="text-xs sm:text-sm text-[#7D7063] mt-2">
                Listen to the words spoken at the Terrazza dell’Infinito or read the full promises.
              </p>

              {/* Bride / Groom Tab Selector */}
              <div className="mt-6 inline-flex p-1.5 bg-[#F6F2EB] rounded-xl border border-[#E4D8C6]">
                <button
                  onClick={() => setActiveVowTab('bride')}
                  className={`px-5 py-2 rounded-lg text-xs font-medium tracking-wide uppercase transition-all ${
                    activeVowTab === 'bride'
                      ? 'bg-white text-[#2C2724] shadow-xs'
                      : 'text-[#6C6054] hover:text-[#2C2724]'
                  }`}
                >
                  Aethel’s Vows (The Bride)
                </button>
                <button
                  onClick={() => setActiveVowTab('groom')}
                  className={`px-5 py-2 rounded-lg text-xs font-medium tracking-wide uppercase transition-all ${
                    activeVowTab === 'groom'
                      ? 'bg-white text-[#2C2724] shadow-xs'
                      : 'text-[#6C6054] hover:text-[#2C2724]'
                  }`}
                >
                  Julian’s Vows (The Groom)
                </button>
              </div>
            </div>

            {/* Vow Presentation Card */}
            {activeVowTab === 'bride' ? (
              <div className="bg-[#FAF7F2] p-8 sm:p-10 rounded-2xl border border-[#EDE4D6] relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8DEC8]">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#936E40] font-semibold">
                      Spoken by Aethel
                    </span>
                    <h4 className="font-serif text-2xl text-[#2C2724] mt-0.5">
                      “To Be Your Anchor & Your Wildest Adventure”
                    </h4>
                  </div>

                  {/* Audio Listen Button */}
                  <button
                    onClick={() => playVowVoice(WEDDING_VOWS.bride.fullVow, 'bride')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
                      playingVoiceId === 'bride'
                        ? 'bg-amber-600 text-white animate-pulse'
                        : 'bg-[#EADECE] hover:bg-[#D5C2AA] text-[#553E19]'
                    }`}
                  >
                    {playingVoiceId === 'bride' ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span>Pause Audio</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4" />
                        <span>Listen to Vows</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="py-6">
                  <Quote className="w-8 h-8 text-[#936E40]/30 mb-2" />
                  <p className="font-serif text-base sm:text-lg text-[#3B322A] leading-relaxed italic">
                    {WEDDING_VOWS.bride.fullVow}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8DEC8] flex items-center justify-between">
                  <span className="text-xs text-[#8C7D70]">
                    October 4, 2026 · 4:25 PM · Ravello
                  </span>
                  <span className="font-script text-3xl text-[#936E40]">Aethel</span>
                </div>
              </div>
            ) : (
              <div className="bg-[#FAF7F2] p-8 sm:p-10 rounded-2xl border border-[#EDE4D6] relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8DEC8]">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#936E40] font-semibold">
                      Spoken by Julian
                    </span>
                    <h4 className="font-serif text-2xl text-[#2C2724] mt-0.5">
                      “Loving You Is My Greatest Privilege”
                    </h4>
                  </div>

                  {/* Audio Listen Button */}
                  <button
                    onClick={() => playVowVoice(WEDDING_VOWS.groom.fullVow, 'groom')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
                      playingVoiceId === 'groom'
                        ? 'bg-amber-600 text-white animate-pulse'
                        : 'bg-[#EADECE] hover:bg-[#D5C2AA] text-[#553E19]'
                    }`}
                  >
                    {playingVoiceId === 'groom' ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span>Pause Audio</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4" />
                        <span>Listen to Vows</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="py-6">
                  <Quote className="w-8 h-8 text-[#936E40]/30 mb-2" />
                  <p className="font-serif text-base sm:text-lg text-[#3B322A] leading-relaxed italic">
                    {WEDDING_VOWS.groom.fullVow}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E8DEC8] flex items-center justify-between">
                  <span className="text-xs text-[#8C7D70]">
                    October 4, 2026 · 4:28 PM · Ravello
                  </span>
                  <span className="font-script text-3xl text-[#936E40]">Julian</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
