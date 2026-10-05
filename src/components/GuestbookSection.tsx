import { useState } from 'react';
import { Sparkles, Heart, MessageSquare, Send, Wine, Search, Plus, User } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GuestMessage } from '../types/wedding';

interface GuestbookSectionProps {
  messages: GuestMessage[];
  onAddMessage: (msg: Omit<GuestMessage, 'id' | 'likes' | 'cheers' | 'date'>) => void;
  onLikeMessage: (id: string) => void;
  onCheersMessage: (id: string) => void;
}

export default function GuestbookSection({
  messages,
  onAddMessage,
  onLikeMessage,
  onCheersMessage,
}: GuestbookSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterTag, setFilterTag] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [messageText, setMessageText] = useState('');
  const [blessingTag, setBlessingTag] = useState('Eternal Love');
  const [photoPreview, setPhotoPreview] = useState<string>('');

  const blessingOptions = [
    'Eternal Love',
    'Joy & Adventure',
    'A Lifetime of Laughter',
    'Endless Happiness',
    'Health & Abundance',
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !messageText.trim()) return;

    onAddMessage({
      name: name.trim(),
      relation: relation.trim() || 'Guest & Well-Wisher',
      message: messageText.trim(),
      blessingTag,
      photoUrl: photoPreview || undefined,
    });

    // Trigger joyful confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#E8D8C8', '#936E40', '#F2ECE1', '#E11D48'],
    });

    // Reset
    setName('');
    setRelation('');
    setMessageText('');
    setPhotoPreview('');
    setIsModalOpen(false);
  };

  const filteredMessages = messages.filter((msg) => {
    const matchesTag = filterTag === 'all' || msg.blessingTag === filterTag;
    const matchesSearch =
      searchTerm.trim() === '' ||
      msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.relation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <section id="guestbook" className="py-24 sm:py-32 bg-[#FDFBF7] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#936E40] font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Wishes & Blessings</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2C2724] font-normal tracking-tight">
            The Digital Guestbook
          </h2>
          <div className="w-16 h-px bg-[#D5C2AA] mx-auto my-6" />
          <p className="text-sm sm:text-base text-[#6B5E54]">
            Send your warm prayers, advice, or favorite memory with Aethel and Julian. Your words will
            be treasured forever.
          </p>

          <div className="mt-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2C2724] hover:bg-[#453C35] text-white text-xs sm:text-sm font-medium tracking-wide uppercase transition-all shadow-md hover:shadow-lg"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>Sign the Guestbook</span>
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#ECE4D8]">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setFilterTag('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap ${
                filterTag === 'all'
                  ? 'bg-[#2C2724] text-white shadow-xs'
                  : 'text-[#6C6054] hover:text-[#2C2724] hover:bg-[#F2ECE1]'
              }`}
            >
              All ({messages.length})
            </button>
            {blessingOptions.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilterTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap ${
                  filterTag === tag
                    ? 'bg-[#2C2724] text-white shadow-xs'
                    : 'text-[#6C6054] hover:text-[#2C2724] hover:bg-[#F2ECE1]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search wishes or names..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-[#E0D5C5] rounded-lg focus:outline-hidden focus:border-[#936E40] text-[#2C2724]"
            />
          </div>
        </div>

        {/* Message Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredMessages.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#EDE5DA] p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Author Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {item.avatarUrl ? (
                      <img
                        src={item.avatarUrl}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#E8DEC8]"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#F5EFE6] border border-[#E8DEC8] flex items-center justify-center text-[#936E40] font-serif text-lg">
                        {item.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <h4 className="font-serif text-lg text-[#2C2724] font-medium leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#847A70]">{item.relation}</p>
                    </div>
                  </div>

                  {/* Clean unboxed tag */}
                  <span className="text-xs text-[#936E40] font-medium tracking-wide">
                    {item.blessingTag}
                  </span>
                </div>

                {/* Message Body */}
                <p className="font-serif italic text-base text-[#463D36] leading-relaxed mb-4">
                  “{item.message}”
                </p>

                {/* Attached guest snapshot if provided */}
                {item.photoUrl && (
                  <div className="mb-4 rounded-xl overflow-hidden max-h-48 border border-[#EBE4D8]">
                    <img
                      src={item.photoUrl}
                      alt="Guest upload"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Card Footer: Date & Reactions */}
              <div className="pt-4 border-t border-[#F2ECE1] flex items-center justify-between text-xs text-[#8C7E72]">
                <span>{item.date}</span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onLikeMessage(item.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF7F2] hover:bg-rose-50 text-[#7C6E61] hover:text-rose-600 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500/20 text-rose-500" />
                    <span>{item.likes}</span>
                  </button>

                  <button
                    onClick={() => onCheersMessage(item.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF7F2] hover:bg-amber-50 text-[#7C6E61] hover:text-amber-700 transition-colors"
                  >
                    <Wine className="w-3.5 h-3.5 text-amber-600" />
                    <span>{item.cheers} Cheers</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Write a Message */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-[#FDFBF7] rounded-3xl border border-[#EDE5DA] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="text-center mb-6">
                <span className="text-xs uppercase tracking-widest text-[#936E40] font-semibold">
                  To the Newlyweds
                </span>
                <h3 className="font-serif text-3xl text-[#2C2724] mt-1">
                  Leave Your Blessing
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6B5E54] font-medium mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Eleanor Vance & Family"
                    className="w-full px-4 py-2.5 text-sm bg-white border border-[#E0D5C5] rounded-xl focus:outline-hidden focus:border-[#936E40]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6B5E54] font-medium mb-1">
                    Your Relationship / Role
                  </label>
                  <input
                    type="text"
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    placeholder="e.g. Maid of Honor, College Friend, Uncle..."
                    className="w-full px-4 py-2.5 text-sm bg-white border border-[#E0D5C5] rounded-xl focus:outline-hidden focus:border-[#936E40]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6B5E54] font-medium mb-1">
                    Theme of Blessing
                  </label>
                  <select
                    value={blessingTag}
                    onChange={(e) => setBlessingTag(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-white border border-[#E0D5C5] rounded-xl focus:outline-hidden focus:border-[#936E40]"
                  >
                    {blessingOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6B5E54] font-medium mb-1">
                    Your Message / Vow of Support *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Share your prayers, funniest memory, or advice for the couple..."
                    className="w-full px-4 py-2.5 text-sm bg-white border border-[#E0D5C5] rounded-xl focus:outline-hidden focus:border-[#936E40]"
                  />
                </div>

                {/* Optional Photo Attachment */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6B5E54] font-medium mb-1">
                    Attach a Wedding Photo or Selfie (Optional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="text-xs text-[#6B5E54] file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-[#F2ECE1] file:text-[#4F4439] hover:file:bg-[#EAE1D2]"
                  />
                  {photoPreview && (
                    <div className="mt-2 relative w-20 h-20 rounded-lg overflow-hidden border border-[#D5C2AA]">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-medium text-[#6B5E54] hover:bg-[#F2ECE1]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#936E40] hover:bg-[#7D5C32] text-white text-xs font-medium uppercase tracking-wider transition-colors shadow-xs"
                  >
                    Publish Blessing
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
