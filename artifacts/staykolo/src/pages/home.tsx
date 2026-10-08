import { useState } from 'react';
import { ArrowRight, Check, Compass, GraduationCap, MapPin, Search, ShieldCheck, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { KarnatakaFlag, SectionHeading, SiteFooter, SiteNav } from '@/components/staykolo-ui';
import { Modal360 } from '@/components/view-360';
import pgsJson from '../../mock-data/pgs.json';

const areas = [
  'Vijaynagar',
  'Nagarbhavi',
  'Malleshwaram',
  'Mathikere',
  'Koramangala',
  'HSR Layout',
  'Chandra Layout',
  'Basaveshwar Nagar',
  'Kumaraswamy Layout',
  'Bellandur',
  'Whitefield',
  'Yeshwanthpur'
];

const featuredPgs = (pgsJson as any[]).slice(0, 6);

function HomePropertyCard({ property }: { property: (typeof featuredPgs)[number] }) {
  const [show360, setShow360] = useState(false);

  return (
    <article className="sk-card overflow-hidden transition-transform duration-200 hover:-translate-y-0.5" data-testid={`card-home-property-${property.id}`}>
      <div className="relative h-[195px] overflow-hidden bg-[#e6f2f2]">
        <img src={property.images[0]} alt={`${property.name} property exterior`} className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-[#e5f3f8] px-2.5 py-1 text-[10px] font-bold text-[#17668c]">
          {property.verification.status}
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-[#176d73]">
          {property.occupancy}
        </span>

        {/* 360 Tour Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShow360(true);
          }}
          className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/80 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold text-white shadow hover:bg-[#0878b0] transition-colors"
          title="Open 360° Virtual Tour"
        >
          <Compass size={11} className="text-cyan-400" /> 360° View
        </button>
      </div>

      <Modal360
        isOpen={show360}
        onClose={() => setShow360(false)}
        property={{
          name: property.name,
          address: property.address,
          coordinates: property.coordinates,
          contact: property.contact,
        }}
      />

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="sk-display text-[17px] font-bold text-[#18364a]">{property.name}</h3>
            <p className="mt-1 flex items-center gap-1 text-[12px] text-[#70818b]">
              <MapPin size={13} /> {property.area}
            </p>
            {property.college && (
              <p className="mt-1 flex items-center gap-1 text-[11px] font-medium text-[#0878b0]">
                <GraduationCap size={12} /> Near {property.college}
              </p>
            )}
          </div>
          <p className="sk-mono text-[13px] font-bold text-[#18364a]">
            ₹{property.startingRent.toLocaleString('en-IN')}
            <small className="block font-sans text-[10px] font-normal text-[#70818b]">starting / mo</small>
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-[#edf1f3] pt-3">
          <span className="text-[11px] text-[#647782]">{property.roomTypes[0]}</span>
          <Link href={`/pg/${property.slug}`} className="inline-flex items-center gap-1 text-[12px] font-bold text-[#0878b0]" data-testid={`link-home-property-${property.id}`}>
            View details <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function Home() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setLocation(searchTerm ? `/search?q=${encodeURIComponent(searchTerm)}` : '/search');
  };

  return (
    <div className="min-h-[100dvh] bg-[#fbfcfd]">
      <SiteNav />
      <main>
        {/* Hero Section */}
        <section className="border-b border-[#dfe9ee] bg-[#edf7fa]">
          <div className="sk-container grid gap-10 py-16 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:py-24">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <KarnatakaFlag className="h-3.5 w-5" />
                <p className="sk-eyebrow">Brand Karnataka · PG findings made easy in Bangalore · Phase 1</p>
              </div>
              <h1 className="sk-display mt-4 max-w-[650px] text-[42px] font-extrabold leading-[1.08] text-[#18364a] sm:text-[56px]">
                Find verified PGs near colleges and top tech hubs.
              </h1>
              <p className="mt-5 max-w-[540px] text-[16px] leading-7 text-[#59717e]">
                Explore 400+ verified PGs across Bengaluru with transparent rent, room configurations, resident rules, and direct owner contacts.
              </p>

              {/* Main Search Bar */}
              <form
                onSubmit={handleSearch}
                className="mt-8 flex max-w-[610px] flex-col gap-2 rounded-[12px] border border-[#c7e0e7] bg-white p-2 shadow-[0_16px_38px_rgba(28,65,87,.12)] sm:flex-row"
              >
                <label className="sk-field flex-1 border-0 shadow-none">
                  <Search size={18} />
                  <span className="sr-only">Search college, area or landmark</span>
                  <input
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setSubmitted(false);
                    }}
                    placeholder="e.g. 'PGs near PES University' or 'Vijaynagar'"
                    data-testid="input-home-location"
                  />
                </label>
                <button type="submit" className="sk-button sk-button-primary px-6" data-testid="button-home-search">
                  Find a PG <ArrowRight size={15} />
                </button>
              </form>

              {submitted && (
                <p className="mt-2 text-[12px] font-semibold text-[#176d73]" role="status" data-testid="status-home-search">
                  Searching for "{searchTerm || 'all Bengaluru'}" profiles…
                </p>
              )}

              {/* Quick College Suggestions */}
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="flex items-center gap-1 font-bold text-[#506875]">
                  <Sparkles size={13} className="text-[#168aad]" /> Popular:
                </span>
                {['PES University', 'MS Ramaiah', 'IISC', 'Vijaynagar', 'Christ University', 'Koramangala'].map((slug) => (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => setLocation(`/search?q=${encodeURIComponent(slug)}`)}
                    className="rounded-full border border-[#d3e0e4] bg-white px-2.5 py-0.5 text-[11px] font-medium text-[#476772] hover:border-[#168aad] hover:bg-[#edf7fa]"
                  >
                    {slug}
                  </button>
                ))}
              </div>

              <div className="mt-7 flex items-center gap-2 text-[12px] font-medium text-[#607b88]">
                <ShieldCheck size={16} className="text-[#168aad]" /> 400+ Verified properties. Direct decisions. No inflated claims.
              </div>
            </div>

            {/* Hero Card Visual */}
            <div className="sk-grid-paper relative rounded-[18px] p-4 sm:p-6">
              <div className="rounded-xl border border-[#d1e1e6] bg-white p-5 shadow-[0_10px_25px_rgba(28,65,87,.08)]">
                <div className="flex items-start justify-between border-b border-[#ebf0f2] pb-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#84959e]">Bengaluru property search</p>
                    <p className="sk-display mt-1 text-[20px] font-bold text-[#18364a]">A clearer shortlist</p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e4f4f7] text-[#0878b0]">
                    <MapPin size={18} />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    ['Rent and deposit', 'Direct & Up front'],
                    ['Colleges & Landmark', 'Mapped by proximity'],
                    ['Room format', 'Single, Double, Multi'],
                    ['Occupancy', 'Current live status'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between rounded-lg border border-[#e4ebee] px-3 py-2.5">
                      <span className="text-[12px] font-semibold text-[#46616e]">{label}</span>
                      <span className="text-[11px] font-semibold text-[#168aad]">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-[11px] text-[#6b8793]">
                  <Check size={14} className="text-[#168aad]" /> Compare first. Contact directly when ready.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Explore by Neighbourhood Section */}
        <section className="border-b border-[#e1e9ed] bg-[#fbfcfd] py-16">
          <div className="sk-container">
            <SectionHeading
              eyebrow="Neighbourhood Directory"
              title="Bengaluru, by Area & Locality"
              copy="Begin with the neighbourhood that fits your commute, office, and routine."
            />
            <div className="mt-7 flex flex-wrap gap-2">
              {areas.map((item) => (
                <Link
                  href={`/search?q=${encodeURIComponent(item)}`}
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-[#d7e4e9] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#46616e] transition-colors hover:border-[#7ebdce] hover:bg-[#edf8fa] hover:text-[#0878b0]"
                  data-testid={`link-area-${item.toLowerCase().replaceAll(' ', '-')}`}
                >
                  <MapPin size={14} className="text-[#168aad]" />
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Shortlist Section */}
        <section className="sk-container py-20">
          <SectionHeading
            eyebrow="Featured Profiles"
            title="Verified PG Accommodations"
            copy="Sample local profiles with complete details, rent breakdown, and amenities."
            action={
              <Link href="/search" className="sk-button sk-button-secondary" data-testid="link-home-view-all">
                Explore all 400+ profiles <ArrowRight size={15} />
              </Link>
            }
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {featuredPgs.map((property) => (
              <HomePropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="border-t border-[#e1e9ed] bg-white py-20">
          <div className="sk-container">
            <SectionHeading
              eyebrow="How it works"
              title="Three useful steps, no guesswork."
              copy="Staykolo keeps the first decision focused: find an area, compare the facts, then ask the property team what you still need to know."
            />
            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {[
                ['01', 'Choose your college or area', 'Start with your college campus or workspace commute.'],
                ['02', 'Compare the practicals', 'See starting rent, deposit, room formats, gender policy, amenities and direct phone contacts.'],
                ['03', 'Make a direct enquiry', 'Contact the owner or request a visit directly with no hidden commissions.'],
              ].map(([number, title, copy]) => (
                <div key={number} className="sk-card p-6">
                  <span className="sk-mono text-[13px] font-bold text-[#168aad]">{number}</span>
                  <h2 className="sk-display mt-6 text-[20px] font-bold text-[#18364a]">{title}</h2>
                  <p className="mt-3 text-[13px] leading-6 text-[#6d7e88]">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Get Verified PG Owner CTA Section */}
        <section className="border-t border-[#e1e9ed] bg-[#edf7fa] py-16">
          <div className="sk-container">
            <div className="rounded-2xl border border-[#b2e2ec] bg-white p-8 sm:p-12 shadow-sm grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <KarnatakaFlag className="h-3.5 w-5" />
                  <span className="text-[11px] font-bold uppercase tracking-[.08em] text-[#0878b0]">
                    PG Owner Partner Program
                  </span>
                </div>
                <h2 className="sk-display text-[26px] sm:text-[34px] font-bold text-[#18364a] leading-tight">
                  List Your Property & Get StayKolo Verified
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed text-[#59717e]">
                  Join 400+ verified Bangalore accommodations. Upload your property documents, get inspected within 24 hours, and get 3x higher direct tenant enquiries with zero brokerage.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href="/contact?tab=verify"
                    className="sk-button sk-button-primary text-xs font-bold py-3 px-5 inline-flex items-center gap-2 shadow-sm"
                    data-testid="link-home-get-verified"
                  >
                    <ShieldCheck size={16} /> Get Verified & Upload Details <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/contact"
                    className="sk-button sk-button-secondary text-xs"
                  >
                    Contact Support Desk
                  </Link>
                </div>
              </div>
              <div className="space-y-3 border-t lg:border-t-0 lg:border-l border-[#edf1f3] pt-6 lg:pt-0 lg:pl-8">
                {[
                  '✓ Instant 25% Off tenant discount vouchers',
                  '✓ Direct tenant calls, zero commission',
                  '✓ Verified badge & high search priority',
                  '✓ Free staff duty & visitor roster ERP',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-[#355364]">
                    <span className="text-[#0878b0]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export function FutureScreen({ title }: { title: string }) {
  return (
    <div className="min-h-[100dvh] bg-[#fbfcfd]">
      <SiteNav />
      <main className="sk-container flex min-h-[60vh] items-center py-16">
        <div className="max-w-[560px]">
          <p className="sk-eyebrow">Future phase</p>
          <h1 className="sk-display mt-3 text-[38px] font-bold leading-tight text-[#18364a]">{title}</h1>
          <p className="mt-4 text-[16px] leading-7 text-[#647782]">This screen is mapped into Staykolo’s navigation and will be designed in a future phase.</p>
          <Link href="/" className="sk-button sk-button-primary mt-7" data-testid="link-return-home">
            Return to home <ArrowRight size={16} />
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}