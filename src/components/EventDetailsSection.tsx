import { MapPin, Sparkles, Compass, Shirt, Sun, HelpCircle, Heart } from 'lucide-react';
import { COUPLE_DATA } from '../data/weddingData';

export default function EventDetailsSection() {
  const detailsCards = [
    {
      icon: MapPin,
      title: 'The Venue & Grounds',
      subtitle: 'The Kingsbury Colombo',
      description:
        'Perched high on a rocky promontory overlooking the Amalfi Coast, Villa Cimbrone dates back to the 11th century. Ceremony takes place on the Terrazza dell’Infinito followed by dinner in the Gothic Crypt.',
      actionText: 'Open Directions in Maps',
      actionUrl: 'https://maps.app.goo.gl/2qfpr8FjREqeN2Vv7',
    },
    {
      icon: Shirt,
      title: 'Dress Code & Palette',
      subtitle: 'lightweight, breathable fabrics in soft pastels or bright sunset hues',
      description:
        'Tuxedos or dark suits for gentlemen; floor-length evening gowns or elevated cocktail dresses for ladies. Palette inspiration: champagne, olive, sage, warm terracotta, and neutral tones.',
      actionText: 'View Color Palette',
    },
    {
      icon: Sun,
      title: 'Colombo SriLanka Weather',
      subtitle: 'Warm 29°C (84°F) Cloudy & Evening Showers',
      description:
        'Early October offers clear skies and golden sunshine in Ravello. Temperatures dip slightly after sunset along the terrace, so a light wrap, pashmina, or evening jacket is warmly recommended.',
    },
    {
      icon: Heart,
      title: 'Unplugged Ceremony',
      subtitle: 'Be Truly Present With Us',
      description:
        'We respectfully request an unplugged ceremony. Please tuck away all cameras and smartphones during the processional and vows. Our professional photographers will capture every moment!',
    },
  ];

  return (
    <section id="details" className="py-24 sm:py-32 bg-[#F6F2EB] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#936E40] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guest Information</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2C2724] font-normal tracking-tight">
            Event Guide & Venue
          </h2>
          <div className="w-16 h-px bg-[#D5C2AA] mx-auto my-6" />
          <p className="text-sm sm:text-base text-[#6B5E54]">
            Everything our cherished traveling guests need to know for a seamless weekend in Ravello.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {detailsCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E8DFC9] p-7 sm:p-8 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#FAF5EC] border border-[#E8DFC9] flex items-center justify-center text-[#936E40] mb-5">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-xs uppercase tracking-wider text-[#936E40] font-medium">
                    {card.subtitle}
                  </span>

                  <h3 className="font-serif text-2xl text-[#2C2724] mt-1 mb-3">
                    {card.title}
                  </h3>

                  <p className="text-sm text-[#5C5147] leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {card.actionUrl && (
                  <div className="pt-6 mt-6 border-t border-[#F2ECE1]">
                    <a
                      href={card.actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold uppercase tracking-wider text-[#936E40] hover:text-[#74532B] inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>{card.actionText}</span>
                      <span>→</span>
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Honeymoon & Gratitude Note */}
        <div className="bg-[#FAF7F2] rounded-3xl border border-[#EDE4D6] p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xs">
          <span className="font-script text-3xl sm:text-4xl text-[#936E40]">
            With Our Deepest Gratitude
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#2C2724] mt-2 mb-4">
            Your Presence Is Our Greatest Gift
          </h3>
          <p className="text-sm sm:text-base text-[#685A4E] leading-relaxed max-w-xl mx-auto">
            Traveling across oceans and mountains to stand with us in Italy is the greatest blessing we
            could ever ask for. Please do not feel obligated to purchase physical gifts—your presence,
            laughter, and shared memories are what we will carry into eternity.
          </p>
        </div>
      </div>
    </section>
  );
}
