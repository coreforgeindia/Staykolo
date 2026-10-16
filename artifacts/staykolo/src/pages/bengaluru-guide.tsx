import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, MapPin, Search } from 'lucide-react';
import { Link } from 'wouter';
import { SiteFooter, SiteNav } from '@/components/staykolo-ui';
import { bengaluruDestinations } from '@/lib/bengaluru-guide';

export function BengaluruGuidePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const destination = bengaluruDestinations[activeIndex];
  const categories = ['All', ...new Set(bengaluruDestinations.map((place) => place.category))];
  const filteredDestinations = useMemo(() => bengaluruDestinations
    .map((place, index) => ({ place, index }))
    .filter(({ place }) => {
      const matchesCategory = category === 'All' || place.category === category;
      const searchText = `${place.name} ${place.description} ${place.category}`.toLowerCase();
      return matchesCategory && searchText.includes(query.trim().toLowerCase());
    }), [category, query]);
  useEffect(() => {
    if (filteredDestinations.length > 0 && !filteredDestinations.some(({ index }) => index === activeIndex)) {
      setActiveIndex(filteredDestinations[0].index);
    }
  }, [activeIndex, filteredDestinations]);
  return (
    <div className="min-h-screen bg-[#f4f1e9] text-[#1b1d18]">
      <SiteNav />
      <main>
        <section className="sk-dark-pattern py-12 text-[#f7f5ed] sm:py-16">
          <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
            <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#d6f36a]">Bengaluru city guide · 50 places</p>
            <h1 className="sk-display mt-3 max-w-[760px] text-[38px] font-extrabold leading-tight tracking-[-.05em] sm:text-[56px]">
              Get to know Bengaluru, one place at a time.
            </h1>
            <p className="mt-4 max-w-[620px] text-[14px] leading-7 text-white/65">
              Search Bengaluru’s temples, street-food streets, parks, green spaces, landmarks and more. Choose a destination from the list to pin its photo here.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12" aria-label="Bengaluru destinations">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(390px,.9fr)] lg:gap-10">
            <div className="sticky top-[80px] z-20 self-start bg-[#f4f1e9] pb-2 lg:top-[80px]">
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#686a61]">
                  Featured place <span className="text-[#1b1d18]">{String(activeIndex + 1).padStart(2, '0')} / {bengaluruDestinations.length}</span>
                </p>
              </div>
              <article className="overflow-hidden rounded-[22px] border border-[#dedbd0] bg-[#f7f5ed] shadow-[0_10px_32px_rgba(27,29,24,.08)]" aria-live="polite">
                <div className="relative aspect-[16/10] bg-[#eeebe2] sm:aspect-[4/3]">
                  <img key={destination.image} src={destination.image} alt={destination.name} loading="eager" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden="true" />
                  <div className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-5 lg:p-7">
                    <span className="inline-flex max-w-full items-center gap-1.5 truncate rounded-full bg-[#d6f36a] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.08em] text-[#1b1d18] sm:px-3 sm:py-1.5 sm:text-[10px]"><MapPin className="shrink-0" size={12} /> <span className="truncate">{destination.category}</span></span>
                    <h2 className="sk-display mt-2 line-clamp-2 text-[clamp(1rem,4.5vw,2rem)] font-extrabold leading-tight tracking-[-.04em] [overflow-wrap:anywhere] sm:mt-3 sm:text-[clamp(1.5rem,2.5vw,2.125rem)]">{destination.name}</h2>
                    <p className="mt-1 line-clamp-2 text-[11px] leading-4 text-white/90 sm:mt-2 sm:text-[13px] sm:leading-6">{destination.description}</p>
                    <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${destination.name}, Bengaluru`)}`} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#f7f5ed] px-3 py-2 text-[10px] font-bold text-[#1b1d18] transition hover:bg-[#d6f36a] sm:mt-4 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-[11px]">
                      Open in Google Maps <ArrowRight className="shrink-0" size={13} />
                    </a>
                  </div>
                </div>
                <p className="break-words border-t border-[#dedbd0] px-3 py-2 text-[9px] leading-4 text-[#686a61] sm:px-4 sm:py-3 sm:text-[10px] sm:leading-5">
                  Photo: <a href={destination.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#1b1d18] underline underline-offset-2">{destination.author}, “{destination.sourceTitle}”</a>
                  {' '}· <a href={destination.licenseUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#526b1b] underline underline-offset-2">{destination.license}</a>
                  {' '}· {destination.changes}
                </p>
              </article>
            </div>

            <div className="min-w-0">
              <div className="relative z-10 bg-[#f4f1e9] pb-3 lg:sticky lg:top-[76px] lg:-mx-2 lg:px-2 lg:pt-2">
              <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center">
              <label className="sk-field min-h-12 min-w-0 rounded-xl lg:w-[230px] lg:shrink-0">
                <Search size={17} />
                <span className="sr-only">Search Bengaluru guide</span>
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search places, food, parks..." aria-label="Search Bengaluru guide" />
              </label>
              <div className="sk-scrollbar-hide flex min-w-0 flex-1 snap-x snap-mandatory gap-2 overflow-x-auto whitespace-nowrap pb-1" aria-label="Destination categories" tabIndex={0}>
                {categories.map((item) => (
                  <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={`shrink-0 snap-start rounded-full border px-3 py-2 text-[10px] font-bold transition ${category === item ? 'border-[#1b1d18] bg-[#1b1d18] text-[#f7f5ed]' : 'border-[#d4d0c6] bg-[#f7f5ed] text-[#55574e] hover:border-[#829e39] hover:bg-[#e9f2cd]'}`}>
                    {item}
                  </button>
                ))}
              </div>
              </div>
              </div>
              <div className="mb-3 mt-5 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#728f2c]">{filteredDestinations.length} destinations</p>
                  <h2 className="sk-display mt-1 text-[20px] font-bold">Choose your next stop</h2>
                </div>
                <Link href="/search" className="text-[11px] font-bold text-[#526b1b] hover:underline">Find a PG nearby</Link>
              </div>
              <div className="space-y-3">
                {filteredDestinations.map(({ place, index }) => (
                  <article
                    key={place.name}
                    className={`rounded-xl border p-2.5 transition ${activeIndex === index ? 'border-[#829e39] bg-[#e9f2cd]' : 'border-[#dedbd0] bg-[#f7f5ed] hover:border-[#829e39]'}`}
                  >
                    <button type="button" onClick={() => setActiveIndex(index)} aria-pressed={activeIndex === index} className="grid w-full grid-cols-[76px_1fr] gap-3 text-left sm:grid-cols-[104px_1fr] sm:gap-4">
                      <img src={place.image} alt="" loading="lazy" decoding="async" className="h-[76px] w-[76px] rounded-lg object-cover sm:h-[88px] sm:w-[104px]" />
                      <span className="min-w-0 py-1">
                        <span className="block text-[9px] font-bold uppercase tracking-[.1em] text-[#728f2c]">{place.category}</span>
                        <span className="mt-1 block text-[12px] font-bold leading-4 text-[#1b1d18]">{place.name}</span>
                        <span className="mt-1 line-clamp-2 block text-[10px] leading-4 text-[#686a61]">{place.description}</span>
                      </span>
                    </button>
                    <p className="mt-2 pl-1 text-[9px] leading-4 text-[#686a61]">
                      Photo: <a href={place.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">{place.author}</a>
                      {' '}· <a href={place.licenseUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#526b1b] underline underline-offset-2">{place.license}</a>
                    </p>
                  </article>
                ))}
                {filteredDestinations.length === 0 && (
                  <div className="rounded-xl border border-dashed border-[#c9c6bb] bg-[#f7f5ed] p-5 text-center">
                    <p className="text-[12px] font-semibold text-[#4c4e46]">No destinations match your search.</p>
                    <button type="button" onClick={() => { setQuery(''); setCategory('All'); }} className="mt-2 text-[11px] font-bold text-[#526b1b] underline underline-offset-2">Clear search and category</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
