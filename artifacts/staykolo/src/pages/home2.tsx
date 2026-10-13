import { type FormEvent, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Droplets,
  ExternalLink,
  Fan,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Wifi,
} from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { MapView } from '@/components/map-view';
import { SiteFooter, SiteNav } from '@/components/staykolo-ui';
import { standardAmenities, verifiedPg } from '@/lib/public-listings';
import pgsJson from '../../mock-data/pgs.json';

const pgs = pgsJson as (typeof pgsJson)[number][];
const directoryPgs = pgs;
const quickSearches = ['Koramangala', 'HSR Layout', 'Whitefield', 'Nagarbhavi'];
const verifiedShowcase = [
  { name: verifiedPg.name, area: verifiedPg.area, address: verifiedPg.address, maps: verifiedPg.googleMapsUrl, demo: false },
  { name: 'Green Nest PG', area: 'HSR Layout', address: 'HSR Layout, Bengaluru, Karnataka · Demo profile', maps: 'https://www.google.com/maps/search/?api=1&query=HSR+Layout+Bengaluru', demo: true },
  { name: 'City Grove Stay', area: 'Koramangala', address: 'Koramangala, Bengaluru, Karnataka · Demo profile', maps: 'https://www.google.com/maps/search/?api=1&query=Koramangala+Bengaluru', demo: true },
];
const gallerySlides = [
  { title: 'Vidhana Soudha', label: 'Bengaluru landmark', tone: 'lime', image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Vidhana_Soudha%2C_front_%2801%29.jpg/960px-Vidhana_Soudha%2C_front_%2801%29.jpg', creditUrl: 'https://commons.wikimedia.org/wiki/File:Vidhana_Soudha,_front_(01).jpg' },
  { title: 'Lalbagh Botanical Garden', label: 'A quieter side of the city', tone: 'paper', image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Lalbagh%2C_Bengaluru-12.jpg/960px-Lalbagh%2C_Bengaluru-12.jpg', creditUrl: 'https://commons.wikimedia.org/wiki/File:Lalbagh,_Bengaluru-12.jpg' },
  { title: 'Bengaluru Palace', label: 'City heritage', tone: 'dark', image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/BANGALORE_PALACE.jpg/960px-BANGALORE_PALACE.jpg', creditUrl: 'https://commons.wikimedia.org/wiki/File:BANGALORE_PALACE.jpg' },
] as const;
const neighbourhoods = [
  'Vijaynagar', 'Nagarbhavi', 'Malleshwaram', 'Mathikere', 'Koramangala', 'HSR Layout',
  'Chandra Layout', 'Basaveshwar Nagar', 'Kumaraswamy Layout', 'Bellandur', 'Whitefield', 'Yeshwanthpur',
];

export function Home2() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [verifiedIndex, setVerifiedIndex] = useState(0);
  const [directoryIndex, setDirectoryIndex] = useState(0);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchTerm.trim();
    setLocation(query ? `/search?q=${encodeURIComponent(query)}` : '/search');
  };

  const moveGallery = (direction: number) => {
    setGalleryIndex((index) => (index + direction + gallerySlides.length) % gallerySlides.length);
  };
  const moveVerified = (direction: number) => setVerifiedIndex((index) => (index + direction + verifiedShowcase.length) % verifiedShowcase.length);
  const moveDirectory = (direction: number) => setDirectoryIndex((index) => (index + direction + directoryPgs.length) % directoryPgs.length);

  return (
    <div className="min-h-screen bg-[#f4f1e9] text-[#1b1d18]">
      <SiteNav />

      <main>
        <section className="mx-auto grid max-w-[1320px] gap-7 px-4 pb-8 pt-4 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:gap-5 lg:px-12 lg:pb-20 lg:pt-10">
          <div className="relative flex min-h-[calc(100svh-170px)] flex-col justify-evenly overflow-hidden rounded-[24px] bg-[#1b1d18] p-5 text-[#f7f5ed] sm:min-h-[590px] sm:justify-between sm:rounded-[28px] sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" style={{ backgroundImage: 'radial-gradient(circle at 82% 12%, transparent 0 90px, rgba(255,255,255,.09) 91px 92px, transparent 93px 126px, rgba(255,255,255,.07) 127px 128px, transparent 129px), repeating-linear-gradient(135deg, transparent 0 26px, rgba(255,255,255,.025) 27px 28px, transparent 29px 54px)' }} />
            <div className="pointer-events-none absolute -right-20 -top-24 hidden h-72 w-72 rounded-full border border-white/10 sm:block sm:h-96 sm:w-96" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-8 -top-12 hidden h-56 w-56 rounded-full border border-white/10 sm:block sm:h-72 sm:w-72" aria-hidden="true" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.06] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.15em] text-[#d6f36a]">
                <Sparkles size={12} /> Bengaluru, made easier
              </div>
              <h1 className="sk-display mt-5 max-w-[620px] text-[38px] font-extrabold leading-[.99] tracking-[-.055em] text-[#f7f5ed] sm:mt-8 sm:text-[62px] lg:text-[72px]">
                A better place to <span className="text-[#d6f36a]">land.</span>
              </h1>
              <p className="mt-4 max-w-[420px] text-[13px] leading-6 text-white/65 sm:mt-6 sm:text-[16px] sm:leading-7">
                Find a PG that feels right, with the details you need to choose well and the people you can contact directly.
              </p>
            </div>

            <div className="relative mt-5 sm:mt-10">
              <form onSubmit={handleSearch} className="flex flex-col gap-2 rounded-[18px] bg-[#f7f5ed] p-2 sm:flex-row sm:items-center">
                <label className="flex min-h-12 flex-1 items-center gap-3 px-3 text-[#77796f]">
                  <Search size={18} />
                  <span className="sr-only">Search area, college or landmark</span>
                  <input
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Area, college or landmark"
                    className="w-full min-w-0 bg-transparent text-[14px] text-[#1b1d18] outline-none placeholder:text-[#888980]"
                  />
                </label>
                <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[12px] bg-[#d6f36a] px-6 text-[13px] font-extrabold text-[#1b1d18] transition hover:bg-[#c8e65d]">
                  Find a stay <ArrowRight size={16} />
                </button>
              </form>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-[11px] font-semibold text-white/45">Try</span>
                {quickSearches.map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => setLocation(`/search?q=${encodeURIComponent(area)}`)}
                    className="rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-medium text-white/75 transition hover:border-[#d6f36a] hover:text-[#d6f36a]"
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative mt-5 flex flex-wrap items-center gap-x-7 gap-y-2 border-t border-white/15 pt-4 text-[10px] font-medium text-white/60 sm:mt-9 sm:gap-y-3 sm:pt-5 sm:text-[11px]">
              <span className="inline-flex items-center gap-2"><ShieldCheck size={15} className="text-[#d6f36a]" /> Verified details clearly labelled</span>
              <span className="inline-flex items-center gap-2"><Check size={15} className="text-[#d6f36a]" /> Direct owner contact</span>
            </div>
          </div>

          <div className="relative flex min-h-[480px] flex-col overflow-hidden rounded-[28px] border border-[#dedbd0] bg-[#eeebe2] p-4 sm:min-h-[590px] sm:p-6">
            <div className="relative z-10 mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-[#6d861f]">Explore the city</p>
                <h2 className="sk-display mt-1 text-[22px] font-bold tracking-[-.04em] sm:text-[26px]">Find your corner of Bengaluru.</h2>
              </div>
              <span className="rounded-full bg-[#d6f36a] px-3 py-1.5 text-[10px] font-bold">Bengaluru listings</span>
            </div>
            <MapView
              pins={directoryPgs.slice(0, 35).map(({ id, name, coordinates }) => ({ id, name, lat: coordinates.lat, lng: coordinates.lng }))}
              className="min-h-0 flex-1 rounded-[18px] border-[#d4d0c6]"
            />
            <div className="relative z-10 mt-4 flex items-center justify-between gap-3 rounded-[14px] bg-[#f7f5ed] px-4 py-3">
              <p className="text-[11px] font-semibold text-[#55574e]">Browse stays by map or by neighbourhood.</p>
              <Link href="/search" className="inline-flex shrink-0 items-center gap-1 text-[11px] font-extrabold">Open map <ArrowUpRight size={13} /></Link>
            </div>
          </div>
        </section>

        <section className="bg-[#1b1d18] py-16 text-[#f7f5ed] sm:py-20" id="verified-stays">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#d6f36a]">Verified stays</p>
                <h2 className="sk-display mt-3 text-[34px] font-bold leading-tight tracking-[-.045em] sm:text-[46px]">A shortlist worth your time.</h2>
                <p className="mt-3 max-w-[480px] text-[14px] leading-6 text-white/55">One confirmed listing and two clearly marked demo profiles.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="mr-2 text-[11px] text-white/55">{verifiedIndex + 1} / {verifiedShowcase.length}</span>
                <button type="button" onClick={() => moveVerified(-1)} className="grid h-10 w-10 place-items-center rounded-full border border-white/25 hover:border-[#d6f36a] hover:text-[#d6f36a]" aria-label="Previous verified PG"><ChevronLeft size={17} /></button>
                <button type="button" onClick={() => moveVerified(1)} className="grid h-10 w-10 place-items-center rounded-full border border-white/25 hover:border-[#d6f36a] hover:text-[#d6f36a]" aria-label="Next verified PG"><ChevronRight size={17} /></button>
              </div>
            </div>

            <article className="relative mt-9 min-h-[245px] overflow-hidden rounded-[18px] bg-[#d6f36a] p-5 text-[#1b1d18] shadow-lg sm:min-h-[270px] sm:p-7" aria-live="polite">
              <ShieldCheck className="pointer-events-none absolute -left-8 -top-10 z-0 h-64 w-64 -rotate-12 text-[#1b1d18]/[.07]" strokeWidth={1.2} aria-hidden="true" />
              <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-[#526b1b]/[.12] via-[#d6f36a]/[.08] to-transparent" aria-hidden="true" />
              <ShieldCheck aria-hidden="true" className="absolute right-5 top-5 z-10 h-8 w-8 text-[#1b1d18]/60 sm:right-7 sm:top-7" />
              <div className="relative z-10 max-w-[720px]">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1b1d18] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.1em] text-[#d6f36a]"><ShieldCheck size={12} /> {verifiedShowcase[verifiedIndex].demo ? 'Demo verified profile' : 'StayKolo verified'}</span>
                <h3 className="sk-display mt-3 text-[23px] font-extrabold tracking-[-.04em] sm:text-[28px]">{verifiedShowcase[verifiedIndex].name}</h3>
                <p className="mt-1 flex items-start gap-1.5 text-[12px] text-[#394327]"><MapPin size={14} className="mt-0.5 shrink-0" />{verifiedShowcase[verifiedIndex].address}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {standardAmenities.map((amenity) => <span key={amenity} className="inline-flex items-center gap-1.5 rounded-full bg-[#f7f5ed]/75 px-3 py-1.5 text-[10px] font-bold">{amenity === 'Wi-Fi' ? <Wifi size={12} /> : amenity === 'Water' ? <Droplets size={12} /> : <Fan size={12} />}{amenity}</span>)}
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {!verifiedShowcase[verifiedIndex].demo && <Link href={`/pg/${verifiedPg.slug}`} className="inline-flex items-center gap-2 rounded-full bg-[#1b1d18] px-4 py-3 text-[11px] font-bold text-white">View details <ArrowRight size={13} /></Link>}
                  <a href={verifiedShowcase[verifiedIndex].maps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#1b1d18]/25 bg-[#f7f5ed] px-4 py-3 text-[11px] font-bold text-[#1b1d18]">Google Maps <ExternalLink size={13} /></a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12" id="neighbourhoods">
          <div className="max-w-[650px]">
            <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#728f2c]">Browse by neighbourhood</p>
            <h2 className="sk-display mt-3 text-[34px] font-bold leading-tight tracking-[-.045em] sm:text-[44px]">Start with where you want to be.</h2>
            <p className="mt-3 text-[13px] leading-6 text-[#686a61]">Search Bengaluru PG listings by the area that makes your daily commute work.</p>
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            {neighbourhoods.map((area) => (
              <Link key={area} href={`/search?q=${encodeURIComponent(area)}`} className="inline-flex items-center gap-2 rounded-full border border-[#d4d0c6] bg-[#f7f5ed] px-4 py-2.5 text-[12px] font-semibold text-[#4c4e46] transition hover:border-[#829e39] hover:bg-[#e9f2cd]">
                <MapPin size={13} className="text-[#728f2c]" />{area}
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12" id="compare">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#728f2c]">Make a clear choice</p>
              <h2 className="sk-display mt-3 text-[34px] font-bold leading-tight tracking-[-.045em] sm:text-[46px]">Compare the details that matter.</h2>
              <p className="mt-3 max-w-[520px] text-[14px] leading-6 text-[#686a61]">A simple side-by-side look at verified profiles. No photos to distract from the practicals.</p>
            </div>
            <Link href="/search" className="inline-flex w-fit items-center gap-2 rounded-full bg-[#1b1d18] px-5 py-3 text-[12px] font-bold text-white transition hover:bg-[#3a3d32]">Compare all stays <ArrowRight size={15} /></Link>
          </div>
          <div className="mt-8 overflow-x-auto rounded-[20px] border border-[#dedbd0] bg-[#eeebe2]">
            <table className="w-full min-w-[680px] border-collapse text-left text-[12px]">
              <thead>
                <tr className="border-b border-[#dedbd0]">
                  <th className="w-[180px] p-4 text-[10px] font-bold uppercase tracking-[.12em] text-[#77796f]">Property details</th>
                  <th className="p-4 align-top"><span className="inline-flex items-center gap-1.5 text-[13px] font-extrabold"><ShieldCheck size={14} className="text-[#728f2c]" />{verifiedPg.name}</span><span className="mt-1 block pl-5 text-[11px] font-medium text-[#77796f]">{verifiedPg.area}</span></th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Address', verifiedPg.address],
                  ['Listed amenities', standardAmenities.join(' · ')],
                  ['Maps', 'Open the property location in Google Maps'],
                ].map(([label, value]) => (
                  <tr key={label} className="border-t border-[#dedbd0]">
                    <th className="p-4 font-semibold text-[#686a61]">{label}</th>
                    <td className="p-4 font-semibold">{label === 'Maps' ? <a href={verifiedPg.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline underline-offset-4">{value}<ExternalLink size={12} /></a> : value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-[#eeebe2] py-16 sm:py-20" id="directory">
          <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#77796f]">Bengaluru PG directory</p>
                <h2 className="sk-display mt-3 text-[34px] font-bold leading-tight tracking-[-.045em] sm:text-[44px]">Local places, listed plainly.</h2>
                <p className="mt-3 max-w-[600px] text-[13px] leading-6 text-[#686a61]">These records are not verified by Staykolo. We do not display unconfirmed pricing or room details.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="mr-2 text-[11px] font-semibold text-[#77796f]">{directoryIndex + 1} / {directoryPgs.length}</span>
                <button type="button" onClick={() => moveDirectory(-1)} className="grid h-10 w-10 place-items-center rounded-full border border-[#c9c6bb] hover:border-[#1b1d18]" aria-label="Previous directory listing"><ChevronLeft size={17} /></button>
                <button type="button" onClick={() => moveDirectory(1)} className="grid h-10 w-10 place-items-center rounded-full border border-[#c9c6bb] hover:border-[#1b1d18]" aria-label="Next directory listing"><ChevronRight size={17} /></button>
              </div>
            </div>
            <div className="mt-8 overflow-hidden rounded-[18px] border border-[#d7d4ca] bg-[#f7f5ed]">
              {(() => {
                const property = directoryPgs[directoryIndex];
                return <article key={property.id} className="relative flex min-h-[190px] flex-col gap-4 px-5 py-6 sm:min-h-[210px] sm:flex-row sm:items-center sm:justify-between sm:px-8">
                  <span className="absolute right-5 top-5 rounded-full bg-[#eeebe2] px-3 py-1 text-[9px] font-bold uppercase tracking-[.1em] text-[#686a61]">Unverified directory</span>
                  <div className="pr-28">
                    <h3 className="text-[16px] font-bold">{property.name}</h3>
                    <p className="mt-2 flex items-start gap-1.5 text-[12px] leading-5 text-[#77796f]"><MapPin size={14} className="mt-0.5 shrink-0" />{property.address}</p>
                    <div className="mt-3 flex flex-wrap gap-2">{standardAmenities.map((amenity) => <span key={amenity} className="rounded-full bg-[#eeebe2] px-2.5 py-1 text-[10px] font-semibold text-[#55574e]">{amenity}</span>)}</div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Link href={`/search?status=directory&q=${encodeURIComponent(property.name)}`} className="inline-flex items-center gap-1 rounded-full border border-[#d7d4ca] px-4 py-2.5 text-[11px] font-bold hover:border-[#1b1d18]">Show on map <MapPin size={13} /></Link>
                    <a href={property.contact.googleMaps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full bg-[#1b1d18] px-4 py-2.5 text-[11px] font-bold text-white hover:bg-[#3a3d32]">Google Maps <ExternalLink size={12} /></a>
                  </div>
                </article>;
              })()}
            </div>
            <Link href="/search?status=directory" className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#aaa99f] px-5 py-3 text-[12px] font-bold transition hover:border-[#1b1d18]">Open full directory <ArrowRight size={15} /></Link>
          </div>
        </section>

        <section className="overflow-hidden bg-[#1b1d18] py-16 text-[#f7f5ed] sm:py-20" aria-label="Bengaluru gallery">
          <div className="mx-auto grid max-w-[1320px] gap-10 px-5 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:items-center lg:px-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#d6f36a]">Life around the city</p>
              <h2 className="sk-display mt-3 text-[34px] font-bold leading-tight tracking-[-.045em] sm:text-[44px]">Bengaluru, at your pace.</h2>
              <p className="mt-3 max-w-[410px] text-[13px] leading-6 text-white/60">A few real Bengaluru landmarks and green spaces, captured in a light, compact gallery.</p>
              <div className="mt-6 flex items-center gap-2">
                <button type="button" onClick={() => moveGallery(-1)} className="grid h-10 w-10 place-items-center rounded-full border border-white/25 transition hover:border-[#d6f36a] hover:text-[#d6f36a]" aria-label="Previous gallery image"><ChevronLeft size={18} /></button>
                <button type="button" onClick={() => moveGallery(1)} className="grid h-10 w-10 place-items-center rounded-full border border-white/25 transition hover:border-[#d6f36a] hover:text-[#d6f36a]" aria-label="Next gallery image"><ChevronRight size={18} /></button>
                <span className="ml-2 text-[11px] font-semibold text-white/55">{galleryIndex + 1} / {gallerySlides.length}</span>
              </div>
            </div>
            <div className="relative mx-auto h-[310px] w-full max-w-[680px] sm:h-[390px]" aria-live="polite">
              {gallerySlides.map((slide, index) => {
                const offset = (index - galleryIndex + gallerySlides.length) % gallerySlides.length;
                const isFront = offset === 0;
                const positionClass = isFront
                  ? 'left-[12%] top-0 z-20 w-[76%] rotate-0 opacity-100'
                  : offset === 1
                    ? 'left-[2%] top-10 z-10 w-[76%] -rotate-6 opacity-65'
                    : 'right-[2%] top-10 z-10 w-[76%] rotate-6 opacity-65';
                const colorClass = slide.tone === 'lime'
                  ? 'bg-[#d6f36a] text-[#1b1d18]'
                  : slide.tone === 'paper'
                    ? 'bg-[#eeebe2] text-[#1b1d18]'
                    : 'bg-[#36392f] text-[#f7f5ed]';
                return (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => setGalleryIndex(index)}
                    aria-label={`Show gallery image: ${slide.title}`}
                    aria-current={isFront}
                    className={`absolute h-[270px] overflow-hidden rounded-[22px] text-left shadow-2xl transition-all duration-500 sm:h-[340px] ${positionClass} ${colorClass}`}
                  >
                    <img src={slide.image} alt={slide.title + ', Bengaluru'} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                    <span className="absolute inset-0 bg-[#1b1d18]/15" aria-hidden="true" />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-5 pt-16 sm:p-7 sm:pt-20">
                      <span className={`block text-[9px] font-bold uppercase tracking-[.17em] ${slide.tone === 'lime' ? 'text-[#526b1b]' : 'text-[#d6f36a]'}`}>{slide.label}</span>
                      <span className={`sk-display mt-2 block text-[21px] font-extrabold leading-tight tracking-[-.04em] sm:text-[28px] ${slide.tone === 'lime' ? 'text-[#1b1d18]' : 'text-white'}`}>{slide.title}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-1 text-right text-[9px] text-white/50">Photo: <a href={gallerySlides[galleryIndex].creditUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#d6f36a]">Wikimedia Commons · {gallerySlides[galleryIndex].title}</a></p>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1320px] gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-20 lg:px-12">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#728f2c]">Staykolo notes</p>
            <h2 className="sk-display mt-4 max-w-[520px] text-[38px] font-bold leading-[1.06] tracking-[-.05em] sm:text-[52px]">A little more prepared for your next move.</h2>
            <p className="mt-5 max-w-[470px] text-[14px] leading-7 text-[#686a61]">
              Read practical tips for comparing PGs, planning a visit and getting settled in Bengaluru.
            </p>
            <Link href="/blogs" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#1b1d18] px-5 py-3 text-[12px] font-bold text-white transition hover:bg-[#3a3d32]">
              Read the blog <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ['01', 'Find your area', 'Start with your campus, workplace or daily commute.'],
              ['02', 'See the location', 'Check the address and map before reaching out.'],
              ['03', 'Choose your neighbourhood', 'Start close to your campus, office or everyday commute.'],
              ['04', 'Talk directly', 'Reach property teams when you’re ready to ask or arrange a visit.'],
            ].map(([number, title, copy]) => (
              <div key={number} className="rounded-[18px] border border-[#e1ddd3] bg-[#eeebe2] p-5 sm:min-h-[180px] sm:p-6">
                <span className="text-[11px] font-extrabold tracking-[.12em] text-[#829e39]">{number}</span>
                <h3 className="sk-display mt-7 text-[18px] font-bold tracking-[-.025em]">{title}</h3>
                <p className="mt-2 text-[12px] leading-5 text-[#73756c]">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-5 pb-16 sm:px-8 sm:pb-20 lg:px-12">
          <div className="mx-auto grid max-w-[1320px] overflow-hidden rounded-[26px] bg-[#d6f36a] lg:grid-cols-[1.2fr_.8fr]">
            <div className="p-7 sm:p-10 lg:p-14">
              <p className="text-[10px] font-extrabold uppercase tracking-[.17em] text-[#526b1b]">For property owners</p>
              <h2 className="sk-display mt-4 max-w-[600px] text-[34px] font-extrabold leading-[1.04] tracking-[-.05em] sm:text-[48px]">Good homes deserve to be found.</h2>
              <p className="mt-4 max-w-[510px] text-[14px] leading-6 text-[#475533]">
                Share the details residents care about and connect directly with people looking for their next stay.
              </p>
              <Link href="/contact?tab=verify" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#1b1d18] px-5 py-3.5 text-[12px] font-bold text-white transition hover:bg-[#3a3d32]">
                List your property <ArrowUpRight size={15} />
              </Link>
            </div>
            <div className="relative flex min-h-[240px] items-end overflow-hidden bg-[#c4df5b] p-7 sm:p-10 lg:min-h-full">
              <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full border border-[#1b1d18]/15 sm:h-80 sm:w-80" aria-hidden="true" />
              <div className="absolute -right-2 -top-8 h-48 w-48 rounded-full border border-[#1b1d18]/15 sm:h-64 sm:w-64" aria-hidden="true" />
              <div className="relative max-w-[320px] rounded-[18px] bg-[#f7f5ed] p-5 shadow-lg sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[.14em] text-[#77796f]">Your listing, clearly told</span>
                  <ShieldCheck size={18} className="text-[#718e2b]" />
                </div>
                <p className="sk-display mt-5 text-[23px] font-bold leading-tight tracking-[-.04em]">The right details bring the right people.</p>
                <div className="mt-5 flex items-center gap-2 border-t border-[#e5e1d7] pt-4 text-[11px] font-semibold text-[#66685f]">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#d6f36a]"><Check size={14} /></span>
                  Direct enquiries, no brokerage
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
