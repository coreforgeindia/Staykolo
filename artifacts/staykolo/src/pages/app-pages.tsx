import { type FormEvent, type ReactNode, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'wouter';
import {
  ArrowLeft, ArrowRight, Check, CheckCircle, ChevronDown, CircleAlert, ExternalLink, Eye, EyeOff, FileText,
  Fan, Gift, GraduationCap, Heart, Home, Info, Mail, MapPin, Navigation, Phone, RotateCcw, Scale, Search, ShieldCheck,
  Droplets, Wifi,
  SlidersHorizontal, Sparkles, User, UserCheck, UserRound, Users, Wrench, X,
} from 'lucide-react';
import { MapView } from '@/components/map-view';
import { BrandKarnatakaBadge, KarnatakaFlag, SectionHeading, SiteFooter, SiteNav } from '@/components/staykolo-ui';
import { isStaykoloVerified, standardAmenities, verifiedPg } from '@/lib/public-listings';
import pgsJson from '../../mock-data/pgs.json';

type PG = (typeof pgsJson)[number];
type ModalProps = { onClose: () => void; children: React.ReactNode; title: string };
const pgs = pgsJson as PG[];
const chronicles = [
  { id: 'bengaluru-pg-visit-checklist', tag: '#tenant-tips', title: 'Bengaluru PG Visit Checklist: What to Check Before You Decide', date: 'Updated 2026', read: '6 min read', copy: 'A practical room-visit checklist for checking water, Wi-Fi, safety, rules and the everyday details that matter before choosing a paying guest stay.', primaryKeywords: ['Bengaluru PG visit checklist', 'questions to ask before booking a PG'], secondaryKeywords: ['PG inspection checklist', 'paying guest accommodation Bengaluru', 'PG safety checklist', 'PG house rules', 'what to check in a PG room', 'PG visit questions', 'PG facilities checklist'], sections: [{ heading: 'Check the essentials in person', content: 'Visit at a time that lets you see the building entrance, common areas and the route you would use each day. Ask how water is supplied and when it is available, test the Wi-Fi where you expect to work or study, and check fans, lights, sockets and bathroom ventilation. A listing can help you find a place, but a visit helps you confirm what is actually present.' }, { heading: 'Ask about routines and rules', content: 'Request a clear explanation of meal arrangements if offered, visitor access, quiet hours, cleaning, laundry, maintenance requests and notice expectations. Ask who to contact when something stops working and how quickly urgent issues are handled. Write down anything important rather than relying on a verbal promise.' }, { heading: 'Take time before committing', content: 'Read every written term and confirm the address and contact person independently. Do not transfer money under pressure or share account passwords or one-time codes. If an amount, room arrangement or facility is not documented, ask for written confirmation before treating it as agreed.' }] },
  { id: 'choose-bengaluru-pg-location', tag: '#tenant-tips', title: 'How to Choose a Bengaluru PG Location Around Your Commute', date: 'Updated 2026', read: '5 min read', copy: 'Compare neighbourhoods by your real daily route, first- and last-mile options, essential services and the time you need to get home.', primaryKeywords: ['Bengaluru PG near work', 'best area to stay in Bengaluru'], secondaryKeywords: ['PG near office Bengaluru', 'Bengaluru commute planning', 'PG near metro Bengaluru', 'HSR Layout PG search', 'Whitefield accommodation', 'Koramangala PG location', 'Indiranagar commute', 'Bengaluru neighbourhood guide'], sections: [{ heading: 'Start with your actual destination', content: 'Map the route from a shortlisted address to your office, college or regular appointment, not just to the centre of a neighbourhood. Check the route at the hours you usually travel and consider walking time at both ends. A short straight-line distance can still mean a complicated daily trip.' }, { heading: 'Compare the last mile', content: 'Look beyond a single transport option. Check nearby bus stops, metro access where available, safe walking routes and how you would reach home after your usual schedule. Visit the street itself and note lighting, traffic and the availability of everyday services such as groceries and pharmacies.' }, { heading: 'Choose for your routine', content: 'HSR Layout, Whitefield, Koramangala, Indiranagar and other Bengaluru localities suit different commutes and routines. There is no universally best area. Compare verified address details and visit the exact lane before deciding; do not rely on a broad area label alone.' }] },
  { id: 'pg-rental-questions-bengaluru', tag: '#tenant-tips', title: 'Questions to Ask Before Moving Into a PG in Bengaluru', date: 'Updated 2026', read: '5 min read', copy: 'Use these clear questions to understand responsibilities, facilities, access and move-in expectations before you agree to stay.', primaryKeywords: ['questions to ask before moving into a PG', 'PG accommodation Bengaluru'], secondaryKeywords: ['PG move in questions', 'PG agreement questions', 'PG facilities Bengaluru', 'paying guest house rules', 'PG maintenance contact', 'PG notice policy', 'PG water Wi-Fi facilities'], sections: [{ heading: 'Clarify what your stay includes', content: 'Ask which facilities are available to residents and whether their use has conditions. Confirm water access, Wi-Fi coverage, fan and appliance availability, cleaning arrangements and how shared spaces are maintained. Ask to see the actual room and facilities rather than assuming every room or floor is the same.' }, { heading: 'Understand access and responsibilities', content: 'Find out how keys or entry access work, whom to call for repairs, how visitors are handled and what quiet-hour or shared-space rules apply. Ask what you are expected to keep clean and how maintenance concerns are recorded. Clear expectations help both residents and operators avoid misunderstandings.' }, { heading: 'Get important terms in writing', content: 'Before you pay or move belongings, request a written summary of the agreed stay, amounts and timing, notice terms, included services and any applicable refund conditions. Review the document carefully and keep a copy of receipts and messages. Do not rely on assumptions based on another resident’s arrangement.' }] },
  { id: 'pg-moving-day-checklist', tag: '#tenant-tips', title: 'PG Moving Day Checklist for a Smooth Bengaluru Move', date: 'Updated 2026', read: '4 min read', copy: 'Plan documents, essentials, travel timing and a condition check so your first day in a new paying guest stay is less stressful.', primaryKeywords: ['PG moving day checklist', 'moving to Bengaluru PG'], secondaryKeywords: ['PG packing list', 'Bengaluru move in checklist', 'first day in a PG', 'PG documents to carry', 'paying guest move in', 'student moving to Bengaluru'], sections: [{ heading: 'Prepare the essentials', content: 'Confirm the address, arrival time and contact person the day before. Keep identification, written agreements, payment receipts and important phone numbers accessible. Pack daily-use clothes, personal medication, chargers, toiletries and a small set of bedding or utensils only after checking what the property already provides.' }, { heading: 'Record the room condition', content: 'On arrival, inspect the door, windows, lights, fan, sockets and bathroom. Photograph any pre-existing damage for your own records and report it promptly through the agreed channel. Test the Wi-Fi and ask how to raise maintenance requests, rather than waiting until a problem becomes urgent.' }, { heading: 'Settle into the neighbourhood', content: 'Locate the nearest grocery shop, pharmacy and reliable route to your regular destination. Save the property contact and a trusted personal contact. Take time to learn shared-space rules and introduce yourself to the relevant operator or warden so you know where to get help.' }] },
  { id: 'pg-wifi-water-amenities-check', tag: '#tenant-tips', title: 'How to Check PG Wi-Fi, Water and Everyday Facilities', date: 'Updated 2026', read: '4 min read', copy: 'A straightforward way to ask about essential PG facilities without assuming that a listed amenity is available everywhere or at all times.', primaryKeywords: ['PG Wi-Fi and water facilities', 'check amenities before booking PG'], secondaryKeywords: ['PG Wi-Fi coverage', 'PG water availability', 'PG fan facilities', 'paying guest amenities', 'check PG facilities in person', 'PG internet for work', 'PG maintenance questions'], sections: [{ heading: 'Test connectivity where you need it', content: 'Ask whether Wi-Fi is available in the room as well as common areas, and test it from the place you expect to use a laptop or make calls. Ask how residents report outages and whether there are known limits. Do not assume that a signal near reception represents coverage throughout a building.' }, { heading: 'Ask specifically about water', content: 'Confirm the usual water arrangement, storage and how residents are informed about maintenance interruptions. Check taps and bathroom fixtures during your visit. If you have a particular schedule or accessibility need, ask how the normal supply pattern fits that routine.' }, { heading: 'Confirm each facility, not the label', content: 'Walk through the room and common areas and identify the fan, lights and other facilities you expect to use. Ask whether shared equipment has a usage schedule or separate rule. Keep the discussion factual: a directory listing is not a substitute for checking a facility at the property.' }] },
  { id: 'pg-safety-checklist', tag: '#tenant-tips', title: 'PG Safety Checklist: Access, Visitors and Emergency Contacts', date: 'Updated 2026', read: '5 min read', copy: 'Practical safety questions for residents evaluating building access, visitor arrangements, emergency exits and support contacts.', primaryKeywords: ['PG safety checklist Bengaluru', 'PG security questions'], secondaryKeywords: ['paying guest safety', 'PG visitor rules', 'PG emergency contact', 'hostel safety checklist', 'PG building access', 'PG fire exit check', 'safe PG for students'], sections: [{ heading: 'Review entry and support', content: 'Ask how residents enter the building, what to do if a key or access card is lost, and who is reachable outside routine hours. Check that the main entrance and the route to your room feel suitable for your schedule. Understand how visitors are registered and what privacy rules apply.' }, { heading: 'Look at the building itself', content: 'During a visit, note stairs and exits, corridor lighting, door locks and any posted emergency information. Ask where to report a hazard or a broken lock. If you have a specific safety concern, raise it directly with the operator and assess the answer rather than relying on a badge or promotional claim.' }, { heading: 'Keep a personal plan', content: 'Save the property contact, a trusted person and local emergency numbers. Share your move-in address with someone you trust. Read all access and visitor rules before accepting them, and report urgent risks through the appropriate local channels.' }] },
  { id: 'pg-near-college-bengaluru', tag: '#tenant-tips', title: 'Finding a PG Near Your Bengaluru College: A Student Guide', date: 'Updated 2026', read: '5 min read', copy: 'Search around the real campus entrance, check your class-day commute and compare the practical details that shape student life.', primaryKeywords: ['PG near college Bengaluru', 'student PG accommodation Bengaluru'], secondaryKeywords: ['PG near PES University', 'PG near RVCE', 'PG near Christ University Bengaluru', 'PG near BMSCE', 'student accommodation Bangalore', 'college commute Bengaluru', 'PG near campus'], sections: [{ heading: 'Use the correct campus as your anchor', content: 'Large institutions can have multiple gates, campuses or departments. Confirm which entrance you will use most often, then compare the full route from each PG address. Search by both the institution name and its neighbourhood, but verify the exact street and route before arranging a visit.' }, { heading: 'Match the stay to your timetable', content: 'Consider early classes, evening labs, study routines and weekend travel. Check transport availability at the times you expect to travel, plus nearby food and daily essentials. Ask about Wi-Fi access and shared-space routines if you plan to study at the property.' }, { heading: 'Visit and verify the terms', content: 'Inspect the room, facilities and access arrangements in person. Ask who handles repairs and how visitors or quiet hours work. Get all agreed stay terms in writing and keep a copy; student status should never pressure you into skipping basic checks.' }] },
  { id: 'pg-near-office-bengaluru', tag: '#tenant-tips', title: 'Choosing a PG Near Your Bengaluru Office Without Guesswork', date: 'Updated 2026', read: '5 min read', copy: 'Use the office entrance, work schedule and actual travel route to assess a PG location before you shortlist it.', primaryKeywords: ['PG near office Bengaluru', 'working professionals PG Bengaluru'], secondaryKeywords: ['Bengaluru office commute', 'PG near HSR Layout offices', 'PG near Whitefield IT parks', 'PG near Electronic City', 'working women PG Bengaluru', 'weekday commute planning', 'Bengaluru rental search'], sections: [{ heading: 'Measure the weekday journey', content: 'Check the route from the exact property address to the office entrance at the times you commute. Account for walking, waiting and the last mile, and consider your return journey as well. If you use a company shuttle or a regular transit stop, verify the walk between that point and the property.' }, { heading: 'Check how the property fits work', content: 'Ask about Wi-Fi availability in your room, quiet hours, shared-space expectations and how maintenance is handled. Visit at a time when you can see the approach to the building. A good commute is important, but so are reliable everyday arrangements.' }, { heading: 'Compare only confirmed details', content: 'Do not infer facilities, rates or room arrangements from a neighbourhood or a different property. Ask the operator to confirm any decision-critical details in writing. Use map links to inspect the location, then make an in-person visit before committing.' }] },
  { id: 'pg-listing-verification-explained', tag: '#staykolo-updates', title: 'What a Verified PG Listing Means on StayKolo', date: 'Updated 2026', read: '4 min read', copy: 'Understand the difference between a StayKolo-verified profile and an unverified local directory entry, and what each one does and does not promise.', primaryKeywords: ['verified PG listing Bengaluru', 'StayKolo PG verification'], secondaryKeywords: ['verified paying guest accommodation', 'PG directory Bengaluru', 'how PG verification works', 'unverified PG listing', 'PG listing information', 'property profile verification'], sections: [{ heading: 'Read the listing status carefully', content: 'A directory entry is a starting point for locating a property, not an endorsement. StayKolo uses a distinct verification label for a profile that has gone through its verification process. Do not treat an unverified directory result as checked simply because it appears in search.' }, { heading: 'Verification is not a substitute for your visit', content: 'A label cannot decide whether a stay suits your needs or guarantee a future experience. Confirm the address, facilities, contacts and written terms yourself. Ask questions and inspect the premises before sending money or making a decision.' }, { heading: 'How to request a review', content: 'Property operators can use the verification form to share the property name, contact information and a map link. The operations team can then follow up for the information needed to review the profile. A request is not the same as completed verification.' }] },
  { id: 'pg-operator-listing-guide', tag: '#owner-guides', title: 'A Clear PG Listing Guide for Bengaluru Property Operators', date: 'Updated 2026', read: '5 min read', copy: 'Help prospective residents understand a property by keeping its location, contact and confirmed facilities clear and up to date.', primaryKeywords: ['PG listing guide Bengaluru', 'list a PG online Bengaluru'], secondaryKeywords: ['PG property listing details', 'paying guest operator guide', 'PG verification request', 'accurate PG address', 'PG listing contact information', 'Bengaluru accommodation directory'], sections: [{ heading: 'Make the location easy to confirm', content: 'Provide the property’s complete address and a map link that points to the correct entrance or building. Use the name residents recognise and maintain a reachable contact channel. Precise location details reduce confusion for people arranging a visit.' }, { heading: 'Publish only confirmed information', content: 'Describe facilities that are currently available and explain any relevant access or usage conditions. Avoid guessing about rates, room configurations or availability; update details when they change. Clear, consistent information helps prospective residents ask focused questions.' }, { heading: 'Prepare for verification follow-up', content: 'Use the StayKolo contact form to request a review and include the requested business details. Keep supporting information accurate and respond to operations follow-up. Submitting a request does not itself create a verified badge; wait for confirmation before presenting a profile as verified.' }] },
];
const tagOptions = ['#tenant-tips', '#owner-guides', '#staykolo-updates'];

function Shell({ children }: { children: ReactNode }) {
  return <div className="sk-public-shell min-h-[100dvh] bg-[#f4f1e9] text-[#1b1d18]"><SiteNav />{children}<SiteFooter /></div>;
}

function matchVerifiedPgQuery(query: string): boolean {
  const text = `${verifiedPg.name} ${verifiedPg.area} ${verifiedPg.address}`.toLowerCase();
  const cleaned = query.toLowerCase()
    .replace(/\b(pg'?s?|hostels?|stays?|rooms?|living|paying\s*guest)\b/gi, ' ')
    .replace(/\b(near|in|at|around|close\s*to|by|for)\b/gi, ' ')
    .replace(/[^a-z0-9\s]/gi, ' ')
    .trim();
  return !cleaned || cleaned.split(/\s+/).every((token) => text.includes(token));
}

function Money({ value }: { value: number }) {
  return <span className="sk-mono">₹{value.toLocaleString('en-IN')}</span>;
}

function PropertyCardFull({
  property,
  selected,
  onSelect,
  isLiked,
  onToggleLike,
}: {
  property: PG;
  selected?: boolean;
  onSelect?: () => void;
  isLiked?: boolean;
  onToggleLike?: () => void;
}) {
  const isVerified = isStaykoloVerified(property.id);

  return (
    <article
      className={`relative overflow-hidden rounded-[16px] border bg-[#f7f5ed] transition-all ${
        selected ? 'border-[#829e39] ring-2 ring-[#d6f36a]/70' : 'border-[#dedbd0]'
      }`}
      data-testid={`card-search-property-${property.id}`}
    >
      {isVerified && <ShieldCheck aria-hidden="true" className="absolute right-5 top-5 z-10 h-6 w-6 text-[#526b1b]" />}
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <button type="button" className="min-w-0 flex-1 text-left" onClick={onSelect} data-testid={`button-select-property-${property.id}`}>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.1em] ${isVerified ? 'bg-[#e9f2cd] text-[#526b1b]' : 'bg-[#e9e6dd] text-[#686a61]'}`}>
            {isVerified ? <ShieldCheck size={11} /> : <MapPin size={11} />}
            {isVerified ? 'Staykolo verified profile' : 'Not verified by Staykolo'}
          </span>
          <h3 className="sk-display mt-2 text-[16px] font-bold text-[#1b1d18]">{property.name}</h3>
          <p className="mt-1 flex items-start gap-1.5 text-[11px] leading-5 text-[#686a61]">
            <MapPin size={13} className="mt-0.5 shrink-0" />{isVerified ? `${property.area} · ` : ''}{property.address}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {standardAmenities.map((amenity) => (
              <span key={amenity} className="inline-flex items-center gap-1.5 rounded-full bg-[#eeebe2] px-2.5 py-1 text-[9px] font-semibold text-[#55574e]">
                {amenity === 'Wi-Fi' ? <Wifi size={11} /> : amenity === 'Water' ? <Droplets size={11} /> : <Fan size={11} />}
                {amenity}
              </span>
            ))}
          </div>
        </button>
        <div className="flex shrink-0 flex-wrap items-center gap-2 border-t border-[#e5e1d7] pt-3 sm:border-0 sm:pt-0">
          {isVerified && onToggleLike && (
            <button
              type="button"
              onClick={onToggleLike}
              className={`grid h-9 w-9 place-items-center rounded-full border border-[#dedbd0] transition hover:border-[#829e39] ${isLiked ? 'text-[#728f2c]' : 'text-[#686a61]'}`}
              aria-label={isLiked ? 'Remove from comparison' : 'Add to comparison'}
              title={isLiked ? 'Remove from comparison' : 'Add to comparison'}
            >
              <Heart size={15} className={isLiked ? 'fill-current' : ''} />
            </button>
          )}
          {isVerified && <Link href={`/pg/${property.slug}`} className="inline-flex items-center gap-1 rounded-full bg-[#1b1d18] px-3.5 py-2.5 text-[10px] font-bold text-white hover:bg-[#3a3d32]" data-testid={`link-search-detail-${property.id}`}>Details <ArrowRight size={12} /></Link>}
          <a href={property.contact.googleMaps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-[#d4d0c6] px-3.5 py-2.5 text-[10px] font-bold text-[#34362f] hover:border-[#1b1d18]">
            <ExternalLink size={12} /> Google Maps
          </a>
        </div>
      </div>
    </article>
  );
}

// Smart query matcher: handles natural inputs like "pgs near pes university", "pg near vijaynagar", "boys pg in mathikere"
function matchPGQuery(p: PG, query: string): boolean {
  if (!query || !query.trim()) return true;
  
  const raw = query.toLowerCase().trim();
  const cleaned = raw
    .replace(/\b(pg'?s?|hostels?|stays?|rooms?|living|paying\s*guest)\b/gi, '')
    .replace(/\b(near|in|at|around|close\s*to|by|for)\b/gi, '')
    .replace(/[^a-z0-9\s]/gi, ' ')
    .trim();
  
  const tokens = (cleaned || raw).split(/\s+/).filter((t) => t.length > 0);
  
  const targetText = [
    p.name,
    p.area,
    p.address,
    p.college || '',
    p.collegeHeader || '',
    ...(p.nearbyLandmarks || []),
    ...(p.searchKeywords || []),
  ]
    .join(' ')
    .toLowerCase();

  if (cleaned && targetText.includes(cleaned)) return true;

  return tokens.every((token) => targetText.includes(token));
}

function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  error?: string;
}) {
  const [showPass, setShowPass] = useState(false);
  const isPass = type === 'password';
  const actualType = isPass ? (showPass ? 'text' : 'password') : type;
  const autoComplete = isPass
    ? name.includes('login')
      ? 'current-password'
      : 'new-password'
    : name.includes('contact')
    ? 'email'
    : name.includes('name')
    ? 'name'
    : 'off';

  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-bold text-[#405966]">{label}</span>
      <span className={`sk-field relative flex items-center ${error ? 'border-[#b55b25]' : ''}`}>
        <input
          name={name}
          type={actualType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          className="flex-1 pr-9"
        />
        {isPass && (
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 text-[#70818b] hover:text-[#18364a] focus:outline-none"
            title={showPass ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </span>
      {error && <span className="mt-1 block text-[11px] text-[#b55b25]">{error}</span>}
    </label>
  );
}

function Modal({
  onClose,
  children,
  title,
  maxWidth = 'max-w-[580px]',
}: ModalProps & { maxWidth?: string }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#18364a]/45 p-0 sm:items-center sm:p-4 backdrop-blur-xs"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`max-h-[92dvh] w-full ${maxWidth} overflow-y-auto rounded-t-[20px] border border-[#d7e3e8] bg-white p-5 sm:p-6 shadow-[0_20px_60px_rgba(28,65,87,.25)] sm:rounded-[18px]`}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="modal-title" className="sk-display text-[20px] sm:text-[22px] font-bold text-[#18364a]">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#607b88] hover:bg-[#edf7fa] transition-colors"
            aria-label="Close dialog"
            data-testid="button-close-modal"
          >
            <X size={19} />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

/* ========== SEARCH PAGE (Req #1, #40, #41, #42, #43, #50, #36) ========== */
export function SearchPage() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(location.split('?')[1] ?? '');
  const initialQuery = searchParams.get('q') || searchParams.get('area') || '';
  const directoryOnly = searchParams.get('status') === 'directory';
  const [query, setQuery] = useState(initialQuery);
  const [selected, setSelected] = useState(pgs[0]?.id || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mobileTab, setMobileTab] = useState<'list' | 'map'>('list');
  const [visibleCount, setVisibleCount] = useState(20);
  const [compareModal, setCompareModal] = useState(false);

  // Liked PGs state (Req #40)
  const [likedIds, setLikedIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('staykolo.likedPgs') || '["pg_001"]');
    } catch {
      return ['pg_001'];
    }
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 200);
    return () => window.clearTimeout(timer);
  }, []);

  const toggleLike = (id: string) => {
    setLikedIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem('staykolo.likedPgs', JSON.stringify(updated));
      return updated;
    });
  };

  const filtered = useMemo(() => {
    return pgs.filter((property) => matchPGQuery(property, query));
  }, [query]);

  const displayedProperties = filtered.slice(0, visibleCount);
  const hasMorePaginated = visibleCount < filtered.length;
  const aparnaMatches = !directoryOnly && matchVerifiedPgQuery(query);
  const selectedProperty = displayedProperties.find((property) => property.id === selected) ?? displayedProperties[0];
  const comparedProperties = pgs.filter((property) => isStaykoloVerified(property.id) && likedIds.includes(property.id)).slice(0, 3);

  const visiblePins = selectedProperty ? [{
    id: selectedProperty.id,
    name: selectedProperty.name,
    lat: selectedProperty.coordinates.lat,
    lng: selectedProperty.coordinates.lng,
  }] : [];

  useEffect(() => {
    if (!displayedProperties.some((property) => property.id === selected)) {
      setSelected(displayedProperties[0]?.id ?? '');
    }
  }, [displayedProperties, selected]);

  return (
    <Shell>
      <main>
        <section className="border-b border-[#d8d6cc] bg-[#eeebe2]">
          <div className="sk-container py-10 sm:py-14">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <KarnatakaFlag className="h-3.5 w-5" />
                  <p className="sk-eyebrow">Bengaluru PG directory · One verified profile, local listings clearly separated</p>
                </div>
                <h1 className="sk-display mt-2 text-[32px] font-bold text-[#1b1d18] sm:text-[42px]">
                  Search Bengaluru by colleges, areas, or landmarks.
                </h1>
              </div>
            </div>

            {/* Smart Suggestions Bar (Colleges & Key Hubs) */}
            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
              <span className="flex items-center gap-1 font-bold text-[#476772]">
                <Sparkles size={13} className="text-[#168aad]" /> Quick Hubs:
              </span>
              {[
                { label: 'PES University', q: 'PES University' },
                { label: 'Vijaynagar', q: 'Vijaynagar' },
                { label: 'MS Ramaiah (MSRIT)', q: 'MS Ramaiah' },
                { label: 'Nagarbhavi', q: 'Nagarbhavi' },
                { label: 'IISC Bangalore', q: 'IISC' },
                { label: 'Christ University', q: 'Christ University' },
                { label: 'BMSCE Basavanagudi', q: 'BMSCE' },
                { label: 'RV College (RVCE)', q: 'RVCE' },
                { label: 'Dayananda Sagar (DSCE)', q: 'DSCE' },
                { label: 'Koramangala', q: 'Koramangala' },
                { label: 'Malleshwaram', q: 'Malleshwaram' },
              ].map((sug) => (
                <button
                  key={sug.label}
                  type="button"
                  onClick={() => {
                    setQuery(sug.q);
                    setVisibleCount(20);
                  }}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                    query === sug.q
                      ? 'border-[#168aad] bg-[#168aad] text-white'
                      : 'border-[#d3e0e4] bg-white text-[#476772] hover:border-[#168aad] hover:bg-[#edf7fa]'
                  }`}
                >
                  {sug.label}
                </button>
              ))}
            </div>

            {/* Search Filters Bar */}
            <div className="mt-6 sk-card grid gap-3 p-3 md:grid-cols-[1fr_auto]">
              <label className="sk-field">
                <Search size={17} />
                <span className="sr-only">Search by college, area, or landmark</span>
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setVisibleCount(20);
                  }}
                  placeholder="e.g. 'PGs near PES University' or 'Vijaynagar'"
                  aria-label="Search by college, area, or landmark"
                  data-testid="input-search-area"
                />
              </label>
              <button
                type="button"
                className="sk-button sk-button-primary"
                onClick={() => {
                  setQuery('');
                  setVisibleCount(20);
                }}
                data-testid="button-clear-filters"
              >
                Clear filters
              </button>
            </div>
          </div>
        </section>

        {/* Main Search Results Area */}
        <section className="sk-container py-8">
          {/* Mobile View Switcher (List vs Map) */}
          <div className="mb-4 flex rounded-xl bg-[#e5eff3] p-1 lg:hidden" role="tablist" aria-label="Search view mode">
            <button
              type="button"
              role="tab"
              aria-selected={mobileTab === 'list'}
              onClick={() => setMobileTab('list')}
              className={`flex-1 rounded-lg py-2 text-center text-xs font-bold transition-all ${
                mobileTab === 'list'
                  ? 'bg-white text-[#18364a] shadow-sm'
                  : 'text-[#647782] hover:text-[#18364a]'
              }`}
            >
              List View ({displayedProperties.length})
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mobileTab === 'map'}
              onClick={() => setMobileTab('map')}
              className={`flex-1 rounded-lg py-2 text-center text-xs font-bold transition-all ${
                mobileTab === 'map'
                  ? 'bg-white text-[#18364a] shadow-sm'
                  : 'text-[#647782] hover:text-[#18364a]'
              }`}
            >
              Map View ({visiblePins.length} Pins)
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(360px,0.86fr)_1.14fr]">
            <aside className={mobileTab === 'map' ? 'hidden lg:block' : 'block'}>
              <div className="mb-5">
                <div>
                  <p className="sk-eyebrow">Available profiles</p>
                  <h2 className="sk-display mt-1 text-[23px] font-bold text-[#1b1d18]">
                    {directoryOnly
                      ? `${filtered.length} local directory listings`
                      : loading
                      ? 'Checking profiles'
                      : `${filtered.length + (aparnaMatches ? 1 : 0)} listings found ${query ? `for "${query}"` : ''}`}
                  </h2>
                </div>
              </div>

              {/* Results Cards List */}
              {loading ? (
                <div className="space-y-4" aria-label="Loading properties">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="sk-card h-[112px] p-4">
                      <div className="sk-sheen h-4 w-3/5 rounded" />
                      <div className="sk-sheen mt-3 h-3 w-4/5 rounded" />
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="sk-card p-7 text-center">
                  <CircleAlert className="mx-auto text-[#b55b25]" size={25} />
                  <h3 className="sk-display mt-3 text-[17px] font-bold text-[#18364a]">
                    Property profiles could not load
                  </h3>
                  <button
                    type="button"
                    className="sk-button sk-button-secondary mt-5"
                    onClick={() => {
                      setError(false);
                      setLoading(true);
                      window.setTimeout(() => setLoading(false), 400);
                    }}
                    data-testid="button-search-retry"
                  >
                    Try again
                  </button>
                </div>
              ) : displayedProperties.length === 0 && !aparnaMatches ? (
                <div className="sk-card p-8 text-center">
                  <Search className="mx-auto text-[#6e8c97]" size={25} />
                  <h3 className="sk-display mt-3 text-[17px] font-bold text-[#18364a]">
                    No profiles match "{query}"
                  </h3>
                  <p className="mt-2 text-[13px] text-[#70818b]">
                    Try searching by another area name, college, or resetting your filters.
                  </p>
                  <button
                    type="button"
                    className="sk-button sk-button-secondary mt-5"
                    onClick={() => {
                      setQuery('');
                      setVisibleCount(20);
                    }}
                  >
                    Reset search
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {aparnaMatches && (
                    <section aria-label="Verified PG">
                      <div className="mb-3">
                        <h3 className="sk-display text-[17px] font-bold text-[#1b1d18]">Verified PG <span className="font-sans text-[12px] text-[#77796f]">(1)</span></h3>
                        <p className="mt-1 text-[11px] text-[#77796f]">This is the only PG currently marked verified by StayKolo.</p>
                      </div>
                      <article className="relative overflow-hidden rounded-[18px] border border-[#b2c957] bg-[#d6f36a] p-5 shadow-sm">
                        <ShieldCheck aria-hidden="true" className="pointer-events-none absolute -left-3 top-4 z-0 h-32 w-32 text-[#748a35]/20" strokeWidth={1.1} />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#526b1b]/[.16] via-[#d6f36a]/[.07] to-transparent" aria-hidden="true" />
                        <div className="relative z-10">
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#1b1d18] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white"><ShieldCheck size={12} /> Verified by StayKolo</span>
                          <h4 className="sk-display mt-3 text-[20px] font-bold text-[#1b1d18]">{verifiedPg.name}</h4>
                          <p className="mt-1 text-[12px] leading-5 text-[#404432]">{verifiedPg.address}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {standardAmenities.map((amenity) => <span key={amenity} className="rounded-full border border-[#526b1b]/20 bg-white/65 px-2.5 py-1 text-[10px] font-semibold text-[#313a1d]">{amenity}</span>)}
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Link href={`/pg/${verifiedPg.slug}`} className="inline-flex items-center gap-1 rounded-full bg-[#1b1d18] px-3.5 py-2 text-[10px] font-bold text-white">View details <ArrowRight size={12} /></Link>
                            <a href={verifiedPg.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full border border-[#1b1d18]/25 bg-white/65 px-3.5 py-2 text-[10px] font-bold text-[#1b1d18]">Google Maps <ExternalLink size={11} /></a>
                          </div>
                        </div>
                      </article>
                    </section>
                  )}
                  {[
                    { title: 'Local directory', copy: 'These listings are not verified by StayKolo. Only name, address and map links are shown.', listings: displayedProperties, verified: false },
                  ].map((group) => group.listings.length > 0 && (
                    <section key={group.title} aria-label={group.title}>
                      <div className="mb-3">
                        <h3 className="sk-display text-[17px] font-bold text-[#1b1d18]">{group.title} <span className="font-sans text-[12px] text-[#77796f]">({group.listings.length})</span></h3>
                        <p className="mt-1 text-[11px] leading-5 text-[#77796f]">{group.copy}</p>
                      </div>
                      <div className="space-y-3">
                        {group.listings.map((property) => (
                          <PropertyCardFull
                            key={property.id}
                            property={property}
                            selected={selected === property.id}
                            onSelect={() => setSelected(property.id)}
                            isLiked={likedIds.includes(property.id)}
                            onToggleLike={group.verified ? () => toggleLike(property.id) : undefined}
                          />
                        ))}
                      </div>
                    </section>
                  ))}

                  {/* Show More Properties (Pagination) */}
                  {hasMorePaginated && (
                    <div className="pt-2 text-center">
                      <button
                        type="button"
                        onClick={() => setVisibleCount((prev) => prev + 20)}
                        className="sk-button sk-button-secondary w-full text-xs font-bold py-3"
                      >
                        Load More PGs ({filtered.length - visibleCount} remaining)
                      </button>
                    </div>
                  )}

                </div>
              )}
            </aside>

            {/* Map View */}
            <div className={`relative lg:sticky lg:top-[88px] lg:h-[calc(100dvh-160px)] ${mobileTab === 'list' ? 'hidden lg:block' : 'block'}`}>
              {selectedProperty && mobileTab === 'map' && (
                <div className="absolute left-3 right-3 top-3 z-20 rounded-xl border border-[#dedbd0] bg-[#f7f5ed]/95 p-3 shadow-lg lg:hidden" role="status">
                  <p className="text-[12px] font-bold text-[#1b1d18]">{selectedProperty.name}</p>
                  <p className="mt-0.5 text-[10px] text-[#686a61]">{selectedProperty.area}</p>
                </div>
              )}
              <MapView
                pins={visiblePins}
                selectedId={selected}
                onSelect={setSelected}
                center={selectedProperty ? [selectedProperty.coordinates.lng, selectedProperty.coordinates.lat] : undefined}
                className="h-[520px] lg:h-full"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Floating Sticky Compare Bar when 2+ PGs are selected (#43) */}
      {comparedProperties.length >= 2 && !compareModal && (
        <aside className="fixed bottom-5 inset-x-0 z-40 flex justify-center px-3 pointer-events-none" aria-label="Compare bar">
          <div className="pointer-events-auto flex items-center justify-between sm:justify-start gap-3 sm:gap-4 rounded-2xl bg-[#1b1d18] px-4 py-2.5 sm:px-5 sm:py-3 text-white shadow-2xl border border-white/20 animate-in slide-in-from-bottom-5 max-w-lg w-full">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-[#829e39] text-xs font-bold text-white shadow-inner">
                {likedIds.length}
              </span>
              <div className="text-left truncate">
                <p className="text-xs font-bold leading-tight truncate">PGs to Compare</p>
                <p className="text-[10px] text-white/70 hidden sm:block">Compare verified PG details</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setCompareModal(true)}
                className="flex items-center gap-1.5 rounded-xl bg-[#d6f36a] px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-bold text-[#1b1d18] hover:bg-[#c8e65d] shadow-md transition-transform active:scale-95"
              >
                <Scale size={13} /> Compare
              </button>
              <button
                type="button"
                onClick={() => {
                  setLikedIds([]);
                  localStorage.setItem('staykolo.likedPgs', '[]');
                }}
                className="text-[11px] text-white/60 hover:text-white underline px-1"
              >
                Clear
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Side-by-Side PG Comparison Modal (Req #43) */}
      {compareModal && (
        <Modal title="Side-by-Side PG Comparison" onClose={() => setCompareModal(false)} maxWidth="max-w-[780px]">
          <div className="mt-2 flex items-center justify-between gap-2 text-[11px] text-[#70818b] sm:hidden">
            <span className="flex items-center gap-1 font-medium">
              <ArrowRight size={12} className="text-[#0878b0]" /> Swipe horizontally to view all PGs
            </span>
            <span className="font-semibold text-[#18364a]">{comparedProperties.length} compared</span>
          </div>
          <div className="mt-3 overflow-x-auto rounded-xl border border-[#dfe9ee]">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-[#dfe9ee] bg-[#f8fbfd]">
                  <th className="sticky left-0 z-20 bg-[#f8fbfd] p-3 font-bold text-[#70818b] w-32 min-w-[120px] border-r border-[#dfe9ee] shadow-[2px_0_4px_rgba(0,0,0,0.03)]">
                    Property
                  </th>
                  {comparedProperties.map((p) => (
                    <th key={p.id} className="p-3 font-bold text-[#18364a] min-w-[160px] sm:min-w-[190px]">
                      <div className="space-y-1.5">
                        <span className="block font-bold text-sm text-[#18364a] line-clamp-1">{p.name}</span>
                        <span className="block text-[11px] font-normal text-[#70818b]">{p.area}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf1f3]">
                <tr>
                  <td className="sticky left-0 z-10 bg-white p-3 font-semibold text-[#506875] border-r border-[#dfe9ee] shadow-[2px_0_4px_rgba(0,0,0,0.03)]">
                    Starting Rent
                  </td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-3 font-bold text-[#0878b0]">
                      <Money value={p.startingRent} />
                      <span className="block text-[10px] font-normal text-[#70818b]">/ month</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 z-10 bg-white p-3 font-semibold text-[#506875] border-r border-[#dfe9ee] shadow-[2px_0_4px_rgba(0,0,0,0.03)]">
                    Security Deposit
                  </td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-3 font-semibold text-[#18364a]">
                      <Money value={p.deposit} />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 z-10 bg-white p-3 font-semibold text-[#506875] border-r border-[#dfe9ee] shadow-[2px_0_4px_rgba(0,0,0,0.03)]">
                    Room Types
                  </td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-3 text-[#18364a]">
                      {p.roomTypes.join(' · ')}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 z-10 bg-white p-3 font-semibold text-[#506875] border-r border-[#dfe9ee] shadow-[2px_0_4px_rgba(0,0,0,0.03)]">
                    Gender Policy
                  </td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-3 text-[#18364a]">
                      <span className="rounded-md bg-[#edf7fa] px-2 py-0.5 text-[11px] font-semibold text-[#0878b0]">
                        {p.genderPolicy}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 z-10 bg-white p-3 font-semibold text-[#506875] border-r border-[#dfe9ee] shadow-[2px_0_4px_rgba(0,0,0,0.03)]">
                    Verified Amenities
                  </td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-3 text-[#18364a]">
                      <ul className="space-y-1 text-[11px] text-[#506875]">
                        {p.amenities.map((a) => (
                          <li key={a} className="flex items-center gap-1">
                            <Check size={12} className="text-[#176d73] shrink-0" /> {a}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 z-10 bg-white p-3 font-semibold text-[#506875] border-r border-[#dfe9ee] shadow-[2px_0_4px_rgba(0,0,0,0.03)]">
                    Verification Status
                  </td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-3 font-bold text-[#176d73]">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#e4f4f7] px-2.5 py-0.5 text-[11px]">
                        <ShieldCheck size={12} /> {p.verification.status}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 z-10 bg-white p-3 font-semibold text-[#506875] border-r border-[#dfe9ee] shadow-[2px_0_4px_rgba(0,0,0,0.03)]">
                    1st Month Offer
                  </td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-3 font-bold text-[#b55b25]">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#fff8f5] border border-[#fbd4c2] px-2.5 py-0.5 text-[11px]">
                        <Gift size={12} /> 25% Off Eligible
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky left-0 z-10 bg-white p-3 font-semibold text-[#506875] border-r border-[#dfe9ee] shadow-[2px_0_4px_rgba(0,0,0,0.03)]">
                    Action
                  </td>
                  {comparedProperties.map((p) => (
                    <td key={p.id} className="p-3">
                      <Link
                        href={`/pg/${p.slug}`}
                        className="sk-button sk-button-primary w-full text-center text-xs py-2"
                      >
                        View Details
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              className="sk-button sk-button-secondary text-xs"
              onClick={() => setCompareModal(false)}
            >
              Close Comparison
            </button>
          </div>
        </Modal>
      )}
    </Shell>
  );
}

/* ========== PROPERTY DETAIL (Req #22, #50, #38, #35) ========== */
export function PropertyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const property = pgs.find((p) => p.slug === slug || p.id === slug);
  const [modal, setModal] = useState(false);

  if (slug === verifiedPg.slug) {
    return (
      <Shell>
        <main className="sk-container min-h-[70vh] py-10">
          <Link href="/search" className="inline-flex items-center gap-1 text-[12px] font-bold text-[#1b1d18]"><ArrowLeft size={14} /> Back to search</Link>
          <article className="relative mt-7 max-w-[900px] overflow-hidden rounded-[22px] border border-[#b2c957] bg-[#d6f36a] p-6 sm:p-10">
            <ShieldCheck aria-hidden="true" className="pointer-events-none absolute -left-8 -top-8 z-0 h-64 w-64 text-[#1b1d18]/[.07]" strokeWidth={1.1} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#526b1b]/[.12] via-[#d6f36a]/[.08] to-transparent" aria-hidden="true" />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1b1d18] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.1em] text-white"><ShieldCheck size={13} /> StayKolo verified</span>
              <h1 className="sk-display mt-5 text-[34px] font-bold leading-tight tracking-[-.04em] text-[#1b1d18] sm:text-[44px]">{verifiedPg.name}</h1>
              <p className="mt-3 flex items-start gap-2 text-[14px] leading-6 text-[#404432]"><MapPin size={16} className="mt-1 shrink-0" />{verifiedPg.address}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {standardAmenities.map((amenity) => <span key={amenity} className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-2 text-[11px] font-semibold text-[#303328]">{amenity === 'Wi-Fi' ? <Wifi size={13} /> : amenity === 'Water' ? <Droplets size={13} /> : <Fan size={13} />}{amenity}</span>)}
              </div>
              <p className="mt-6 max-w-[580px] text-[13px] leading-6 text-[#4d523b]">View this location in Google Maps. Contact details and room or rate information are not currently listed.</p>
              <a href={verifiedPg.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1b1d18] px-5 py-3 text-[12px] font-bold text-white">Open in Google Maps <ExternalLink size={14} /></a>
            </div>
          </article>
        </main>
      </Shell>
    );
  }

  if (!property) {
    return (
      <Shell>
        <main className="sk-container flex min-h-[60vh] items-center py-16">
          <div>
            <p className="sk-eyebrow">Property not found</p>
            <h1 className="sk-display mt-3 text-[38px] font-bold text-[#18364a]">
              That profile is not available.
            </h1>
            <Link href="/search" className="sk-button sk-button-primary mt-6">
              Back to search <ArrowRight size={16} />
            </Link>
          </div>
        </main>
      </Shell>
    );
  }

  if (!isStaykoloVerified(property.id)) {
    return (
      <Shell>
        <main className="sk-container min-h-[70vh] py-10">
          <Link href="/search?status=directory" className="inline-flex items-center gap-1 text-[12px] font-bold text-[#1b1d18]">
            <ArrowLeft size={14} /> Back to directory
          </Link>
          <section className="mt-7 max-w-[900px] overflow-hidden rounded-[22px] border border-[#dedbd0] bg-[#f7f5ed]">
            <div className="p-6 sm:p-9">
              <p className="inline-flex items-center gap-1.5 rounded-full bg-[#e9e6dd] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.1em] text-[#686a61]">
                <MapPin size={12} /> Not verified by Staykolo
              </p>
              <h1 className="sk-display mt-5 text-[32px] font-bold leading-tight tracking-[-.04em] text-[#1b1d18] sm:text-[42px]">{property.name}</h1>
              <p className="mt-3 flex items-start gap-2 text-[13px] leading-6 text-[#686a61]">
                <MapPin size={16} className="mt-1 shrink-0" /> {property.address}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {standardAmenities.map((amenity) => <span key={amenity} className="inline-flex items-center gap-1.5 rounded-full border border-[#dedbd0] bg-white px-3 py-2 text-[11px] font-semibold text-[#55574e]">{amenity === 'Wi-Fi' ? <Wifi size={13} /> : amenity === 'Water' ? <Droplets size={13} /> : <Fan size={13} />}{amenity}</span>)}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={property.contact.googleMaps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#1b1d18] px-5 py-3 text-[12px] font-bold text-white hover:bg-[#3a3d32]">
                  Open in Google Maps <ExternalLink size={14} />
                </a>
                <Link href="/search?status=directory" className="inline-flex items-center gap-2 rounded-full border border-[#d4d0c6] px-5 py-3 text-[12px] font-bold text-[#34362f] hover:border-[#1b1d18]">
                  Back to directory
                </Link>
              </div>
            </div>
            <MapView
              pins={[{ id: property.id, name: property.name, lat: property.coordinates.lat, lng: property.coordinates.lng }]}
              selectedId={property.id}
              center={[property.coordinates.lng, property.coordinates.lat]}
              className="h-[350px] rounded-none border-0 border-t border-[#dedbd0]"
            />
          </section>
        </main>
      </Shell>
    );
  }

  return (
    <Shell>
      <main>
        <div className="sk-container py-7">
          <Link
            href="/search"
            className="inline-flex items-center gap-1 text-[12px] font-bold text-[#0878b0]"
          >
            <ArrowLeft size={14} /> Back to search
          </Link>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-[18px] border border-[#dedbd0] bg-[#eeebe2] px-5 py-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.13em] text-[#728f2c]">Verified property profile</p>
              <p className="mt-1 text-[12px] text-[#686a61]">Property details, room options and location in one clear place.</p>
            </div>
            <ShieldCheck size={21} className="text-[#728f2c]" />
          </div>

          <div className="grid gap-10 py-9 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#edf7fa] px-3 py-1 text-xs font-bold text-[#0878b0]">
                      <ShieldCheck size={14} /> {property.verification.status}
                    </span>
                    {property.college && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#f4faf7] border border-[#cbebe0] px-3 py-1 text-xs font-bold text-[#1b7a5a]">
                        <GraduationCap size={14} /> Near {property.college}
                      </span>
                    )}
                  </div>
                  <h1 className="sk-display mt-2 text-[36px] font-bold leading-tight text-[#18364a]">
                    {property.name}
                  </h1>
                  <p className="mt-2 flex items-center gap-1.5 text-[14px] text-[#647782]">
                    <MapPin size={15} />
                    {property.address}
                  </p>
                </div>
                <div className="rounded-lg bg-[#edf7fa] px-4 py-3 text-right">
                  <p className="text-[11px] text-[#6c818a]">Starting rent</p>
                  <p className="sk-mono mt-1 text-[20px] font-bold text-[#18364a]">
                    <Money value={property.startingRent} />
                  </p>
                  <p className="text-[10px] text-[#6c818a]">per month</p>
                </div>
              </div>

              {/* Ecosystem Transfer Guarantee Banner (Req #50) */}
              <div className="mt-6 rounded-xl border border-[#dfe9ee] bg-[#fbfcfd] p-4 flex items-start gap-3">
                <RotateCcw className="h-5 w-5 text-[#0878b0] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#18364a]">StayKolo Ecosystem Transfer Ready</h4>
                  <p className="text-[11px] text-[#647782] mt-0.5 leading-relaxed">
                    Need to switch location later? Easily transfer your deposit and verification history between any
                    StayKolo Verified PG in Bengaluru without lock-in penalties.
                  </p>
                </div>
              </div>

              <p className="mt-6 text-[15px] leading-7 text-[#5f7783]">{property.description}</p>

              {/* Property Facts */}
              <div className="mt-8">
                <SectionHeading eyebrow="Property facts" title="Know the practicals first" />
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    ['Deposit', `₹${property.deposit.toLocaleString('en-IN')}`],
                    ['Room types', property.roomTypes.join(' / ')],
                    ['Gender policy', property.genderPolicy],
                    ['Availability', property.occupancy],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-lg border border-[#dfe9ed] bg-white p-3">
                      <p className="text-[10px] uppercase tracking-[.08em] text-[#81909a]">{label}</p>
                      <p className="mt-2 text-[13px] font-bold leading-5 text-[#355364]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-9">
                <p className="sk-eyebrow">Amenities</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {standardAmenities.map((amenity) => <span key={amenity} className="inline-flex items-center gap-1.5 rounded-full border border-[#dedbd0] bg-white px-3 py-2 text-[11px] font-semibold text-[#55574e]">{amenity === 'Wi-Fi' ? <Wifi size={13} /> : amenity === 'Water' ? <Droplets size={13} /> : <Fan size={13} />}{amenity}</span>)}
                </div>
              </div>

              {/* Location Map & Google Maps link */}
              <div className="mt-9 sk-card overflow-hidden">
                <div className="p-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="sk-eyebrow">Location</p>
                    <h2 className="sk-display mt-1 text-[20px] font-bold text-[#18364a]">{property.area}</h2>
                    <p className="mt-0.5 text-[13px] text-[#6d7e88]">{property.address}</p>
                  </div>
                  {property.contact?.googleMaps && (
                    <a
                      href={property.contact.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#edf7fa] border border-[#b8dde8] px-3 py-1.5 text-xs font-bold text-[#0878b0] hover:bg-[#e0f3f8]"
                    >
                      <Navigation size={13} /> Open in Google Maps <ExternalLink size={12} />
                    </a>
                  )}
                </div>
                <MapView
                  pins={[{ id: property.id, name: property.name, lat: property.coordinates.lat, lng: property.coordinates.lng }]}
                  selectedId={property.id}
                  center={[property.coordinates.lng, property.coordinates.lat]}
                  className="h-[260px] rounded-none border-0 border-t"
                />
              </div>
            </div>

            {/* Sticky Action Sidebar */}
            <aside className="lg:pt-1">
              <div className="sk-card sticky top-5 p-5">
                <div className="rounded-lg bg-[#fff8f5] border border-[#fbd4c2] p-3 mb-4">
                  <p className="text-xs font-bold text-[#b55b25] flex items-center gap-1.5">
                    <Gift size={14} /> 25% Off on Verified PGs
                  </p>
                  <p className="text-[11px] text-[#647782] mt-1">
                    Available only when you apply to a StayKolo verified PG.
                  </p>
                </div>
                <p className="text-[12px] font-bold uppercase tracking-[.12em] text-[#81909a]">Interested in this PG?</p>
                <h2 className="sk-display mt-2 text-[22px] font-bold text-[#18364a]">Request a visit or book now.</h2>
                <p className="mt-2 text-[13px] leading-6 text-[#6d7e88]">
                  Your details go straight to the property owner. No booking commission or hidden fees.
                </p>
                
                {property.contact?.phone && (
                  <a
                    href={`tel:${property.contact.phone.replace(/[^0-9+]/g, '')}`}
                    className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-[#cce4ed] bg-[#f8fbfd] py-2.5 text-xs font-bold text-[#0878b0] hover:bg-[#edf7fa]"
                  >
                    <Phone size={14} /> Call PG: {property.contact.phone}
                  </a>
                )}

                <button
                  type="button"
                  className="sk-button sk-button-primary mt-3 w-full"
                  onClick={() => setModal(true)}
                  data-testid="button-apply-contact"
                >
                  <Mail size={15} /> Apply / Contact PG Owner
                </button>
                <div className="mt-5 border-t border-[#edf1f3] pt-4 text-[12px] text-[#647782]">
                  <p className="flex items-center gap-2">
                    <ShieldCheck size={14} className="text-[#168aad]" />
                    {property.verification.status}
                  </p>
                  <p className="mt-2">Last inspected {property.verification.lastChecked}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {modal && <LeadModal property={property} onClose={() => setModal(false)} />}
    </Shell>
  );
}

/* ========== LEAD CAPTURE MODAL (Req #35, #49) ========== */
function LeadModal({ property, onClose }: { property: PG; onClose: () => void }) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2 || !contact.match(/(@|[0-9]{10})/)) {
      setErrors('Enter your name and a valid 10-digit phone number (UID) or email.');
      return;
    }
    setErrors('');
    // Store lead in localStorage for SuperAdmin lead tracking (#35, #49)
    try {
      const existingLeads = JSON.parse(localStorage.getItem('staykolo.leads') || '[]');
      const newLead = {
        id: `lead_${Date.now()}`,
        name,
        contact,
        propertyId: property.id,
        propertyName: property.name,
        area: property.area,
        message,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('staykolo.leads', JSON.stringify([newLead, ...existingLeads]));
    } catch {
      // ignore
    }
    setSubmitted(true);
  };

  return (
    <Modal title={`Contact ${property.name}`} onClose={onClose}>
      {submitted ? (
        <div className="py-8 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#e4f4f7] text-[#0878b0]">
            <Check size={22} />
          </div>
          <h3 className="sk-display mt-4 text-[21px] font-bold text-[#18364a]">Request Received</h3>
          <p className="mt-2 text-[13px] leading-6 text-[#6d7e88]">
            The owner of {property.name} has received your enquiry. Your 25% discount voucher is attached to this request.
          </p>
          <button type="button" className="sk-button sk-button-primary mt-5" onClick={onClose}>
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-5 space-y-4">
          <div className="rounded-lg bg-[#edf7fa] p-3 text-xs text-[#0878b0] font-semibold">
            ✓ Eligible for 25% 1st-month discount on Verified PG admission.
          </div>
          <Field label="Your full name" name="name" value={name} onChange={setName} placeholder="e.g. Rahul Sharma" />
          <Field
            label="Phone number / UID"
            name="contact"
            value={contact}
            onChange={setContact}
            placeholder="+91 98765 43210"
          />
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-bold text-[#405966]">
              Message <span className="font-normal text-[#81909a]">(optional)</span>
            </span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-[#d3e0e4] bg-white p-3 text-[13px] text-[#18364a] outline-none focus:border-[#168aad]"
              placeholder="I would like to know about single room availability starting next week..."
            />
          </label>
          {errors && <p className="text-[11px] text-[#b55b25]">{errors}</p>}
          <button type="submit" className="sk-button sk-button-primary w-full">
            Send Request &amp; Claim 25% Discount <ArrowRight size={15} />
          </button>
        </form>
      )}
    </Modal>
  );
}

function AuthLayout({
  children,
  eyebrow,
  title,
  copy,
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <Shell>
      <main className="sk-container py-10 sm:py-16">
        <div className="mx-auto max-w-5xl grid gap-10 md:grid-cols-[1fr_1.1fr] items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <KarnatakaFlag className="h-4 w-6" />
              <p className="sk-eyebrow">{eyebrow}</p>
            </div>
            <h1 className="sk-display text-3xl sm:text-4xl font-bold text-[#1b1d18] leading-tight">
              {title}
            </h1>
            <p className="text-sm leading-relaxed text-[#686a61] max-w-md">
              {copy}
            </p>
            <div className="rounded-xl border border-[#dedbd0] bg-[#eeebe2] p-4 text-xs space-y-2 text-[#55574e]">
              <div className="flex items-center gap-2 font-bold text-[#1b1d18]">
                <ShieldCheck size={16} className="text-[#728f2c]" />
                Universal 10-Digit Mobile UID Login
              </div>
              <p>
                One single credential across Tenants, PG Owners, Field Staff, and Super Admins.
              </p>
            </div>
          </div>
          <div className="sk-card p-6 sm:p-8 shadow-lg border border-[#dedbd0] bg-[#f7f5ed]">
            {children}
          </div>
        </div>
      </main>
    </Shell>
  );
}

/* ========== UNIFIED LOGIN PAGE ========== */
type WebsiteProfile = { name: string; contact: string; email?: string; photo?: string };

function readWebsiteProfile(): WebsiteProfile | null {
  try {
    const stored = localStorage.getItem('staykolo.websiteProfile');
    if (!stored) return null;
    const value: unknown = JSON.parse(stored);
    if (typeof value !== 'object' || value === null) return null;
    const profile = value as Record<string, unknown>;
    return typeof profile.name === 'string' && typeof profile.contact === 'string'
      ? { name: profile.name, contact: profile.contact, email: typeof profile.email === 'string' ? profile.email : undefined, photo: typeof profile.photo === 'string' ? profile.photo : undefined }
      : null;
  } catch {
    return null;
  }
}

function saveWebsiteProfile(profile: WebsiteProfile) {
  localStorage.setItem('staykolo.websiteProfile', JSON.stringify(profile));
  window.dispatchEvent(new Event('staykolo:profile-updated'));
}

export function LoginPage() {
  const [location, setLocation] = useLocation();
  const isSignUp = location.startsWith('/auth/signup') || location.startsWith('/auth/register');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState<'idle' | 'loading'>('idle');
  const [error, setError] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if ((isSignUp && !name.trim()) || !contact.trim() || !password) {
      setError(isSignUp ? 'Enter your name, phone number and password.' : 'Enter your phone number and password.');
      return;
    }
    if (isSignUp && !contact.match(/(@|[0-9]{10})/)) {
      setError('Enter a valid 10-digit phone number or email address.');
      return;
    }

    setError('');
    setState('loading');
    const existing = readWebsiteProfile();
    const profileName = isSignUp ? name.trim() : existing?.contact === contact ? existing.name : contact.split('@')[0];
    try {
      saveWebsiteProfile({ name: profileName, contact: contact.trim(), email: email.trim() || (existing?.contact === contact ? existing.email : undefined), photo: existing?.contact === contact ? existing.photo : undefined });
      setLocation('/profile');
    } catch {
      setError('Your profile could not be saved in this browser. Please try again.');
      setState('idle');
    }
  };

  return (
    <AuthLayout
      eyebrow="StayKolo Profile"
      title={isSignUp ? 'Create your StayKolo profile.' : 'Welcome back.'}
      copy="Your website sign-in is for your StayKolo discovery profile. Property owner, staff and platform dashboards use their own separate access points."
    >
      <div className="flex gap-2 rounded-xl bg-[#eeebe2] p-1">
        <Link href="/auth/login" className={`flex-1 rounded-lg py-2 text-center text-xs font-bold ${!isSignUp ? 'bg-[#1b1d18] text-[#d6f36a]' : 'text-[#686a61]'}`}>Sign in</Link>
        <Link href="/auth/signup" className={`flex-1 rounded-lg py-2 text-center text-xs font-bold ${isSignUp ? 'bg-[#1b1d18] text-[#d6f36a]' : 'text-[#686a61]'}`}>Create profile</Link>
      </div>
      <h2 className="sk-display mt-5 text-[26px] font-bold text-[#1b1d18]">{isSignUp ? 'Create your profile' : 'Sign in to your profile'}</h2>
      <p className="mt-1 text-xs text-[#686a61]">{isSignUp ? 'Set up one profile for your StayKolo website activity.' : 'Continue to your StayKolo website profile.'}</p>
      <form onSubmit={submit} className="mt-5 space-y-4" noValidate>
        {isSignUp && <Field label="Full name" name="signup-name" value={name} onChange={setName} placeholder="Your name" />}
        <Field label="Phone number or email" name="account-contact" value={contact} onChange={setContact} placeholder="Phone number or email address" />
        {isSignUp && <Field label="Email address (optional)" name="signup-email" value={email} onChange={setEmail} placeholder="you@example.com" />}
        <Field label="Password" name="account-password" value={password} onChange={setPassword} type="password" placeholder="Enter password" />
        {error && <p className="text-xs text-[#b55b25]" role="alert">{error}</p>}
        <button type="submit" disabled={state === 'loading'} className="sk-button sk-button-primary w-full disabled:opacity-50" data-testid="button-login-submit">
          {state === 'loading' ? 'Opening your profile…' : isSignUp ? 'Create profile' : 'Sign in'} <ArrowRight size={15} />
        </button>
        {!isSignUp && <Link href="/auth/forgot-password" className="block pt-1 text-right text-xs text-[#526b1b]">Forgot password?</Link>}
      </form>
    </AuthLayout>
  );
}

export function WebsiteProfilePage() {
  const [, setLocation] = useLocation();
  const [savedProfile, setSavedProfile] = useState<WebsiteProfile | null>(() => readWebsiteProfile());
  const [name, setName] = useState(savedProfile?.name ?? '');
  const [contact, setContact] = useState(savedProfile?.contact ?? '');
  const [email, setEmail] = useState(savedProfile?.email ?? '');
  const [photo, setPhoto] = useState(savedProfile?.photo ?? '');
  const [message, setMessage] = useState('');

  if (!savedProfile) {
    return <Shell><main className="sk-container py-16"><div className="mx-auto max-w-md rounded-2xl border border-[#dedbd0] bg-[#f7f5ed] p-7 text-center"><h1 className="sk-display text-2xl font-bold text-[#1b1d18]">Your StayKolo profile</h1><p className="mt-2 text-sm text-[#686a61]">Sign in to view and update your website profile.</p><Link href="/auth/login" className="sk-button sk-button-primary mt-5">Sign in / Sign up</Link></div></main></Shell>;
  }

  const save = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setMessage('Name and phone number or email are required.');
      return;
    }
    const next = { name: name.trim(), contact: contact.trim(), email: email.trim() || undefined, photo: photo || undefined };
    try {
      saveWebsiteProfile(next);
      setSavedProfile(next);
      setMessage('Profile saved in this browser.');
    } catch {
      setMessage('Your profile could not be saved in this browser. Please try again.');
    }
  };

  return <Shell><main className="sk-container py-10 sm:py-14"><div className="mx-auto max-w-2xl"><p className="sk-eyebrow">Website account</p><h1 className="sk-display mt-2 text-3xl font-bold text-[#1b1d18]">My profile</h1><p className="mt-2 text-sm text-[#686a61]">Manage the details attached to your StayKolo website profile.</p>
    <form onSubmit={save} className="mt-7 space-y-5 rounded-2xl border border-[#dedbd0] bg-[#f7f5ed] p-5 sm:p-7">
      <div className="flex items-center gap-4">{photo ? <img src={photo} alt="Profile" className="h-16 w-16 rounded-full object-cover" /> : <span className="grid h-16 w-16 place-items-center rounded-full bg-[#d6f36a] text-2xl font-bold text-[#1b1d18]">{name.trim().charAt(0) || 'U'}</span>}<label className="text-xs font-semibold text-[#42443c]">Profile photo<input type="file" accept="image/*" className="mt-2 block w-full text-xs" onChange={(event) => {
        const file = event.currentTarget.files?.[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) { setMessage('Choose an image smaller than 2 MB.'); return; }
        const reader = new FileReader();
        reader.onload = () => { if (typeof reader.result === 'string') { setPhoto(reader.result); setMessage(''); } };
        reader.onerror = () => setMessage('The selected image could not be read.');
        reader.readAsDataURL(file);
      }} /></label></div>
      <Field label="Full name" name="profile-name" value={name} onChange={setName} placeholder="Your name" />
      <Field label="Phone number or email" name="profile-contact" value={contact} onChange={setContact} placeholder="Phone number or email" />
      <Field label="Email address" name="profile-email" value={email} onChange={setEmail} placeholder="you@example.com" />
      {message && <p className="text-xs text-[#526b1b]" role="status">{message}</p>}
      <div className="flex flex-wrap gap-3"><button type="submit" className="sk-button sk-button-primary">Save profile</button><button type="button" className="sk-button sk-button-secondary" onClick={() => { localStorage.removeItem('staykolo.websiteProfile'); window.dispatchEvent(new Event('staykolo:profile-updated')); setSavedProfile(null); setLocation('/'); }}>Sign out</button></div>
    </form>
    <Link href="/legal/data-deletion" className="mt-5 inline-block text-xs font-semibold text-[#526b1b] underline underline-offset-4">Request profile deletion</Link>
  </div></main></Shell>;
}

/* ========== UNIFIED SIGNUP PAGE ========== */
export function SignupPage() {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [role, setRole] = useState<'tenant' | 'owner'>('tenant');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [state, setState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !contact.match(/(@|[0-9]{10})/) || password.length < 6) {
      setError('Add your name, a valid 10-digit phone number (UID), and a password of at least 6 characters.');
      return;
    }
    setError('');
    setState('loading');
    const now = new Date().toISOString();
    window.setTimeout(() => {
      localStorage.setItem(
        'staykolo.mockUser',
        JSON.stringify({
          name,
          contact,
          role,
          consent: [
            { agreedDocument: 'terms', version: '2026-09-26', timestamp: now },
            { agreedDocument: 'privacy', version: '2026-09-26', timestamp: now },
          ],
        })
      );
      setState('success');
    }, 550);
  };

  return (
    <AuthLayout
      eyebrow="Create an account"
      title="Start with a better-informed move."
      copy="Save a shortlist, send focused enquiries, claim 25% move-in discount, and access all StayKolo services."
    >
      <p className="sk-eyebrow">Create account</p>
      <h2 className="sk-display mt-2 text-[26px] font-bold text-[#18364a]">Create your account</h2>
      <p className="text-xs text-[#506875] mt-1">Sign up with your phone number to get started with StayKolo.</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          className={`rounded-lg border p-3.5 text-left ${
            role === 'tenant' ? 'border-[#168aad] bg-[#edf7fa]' : 'border-[#d9e4e8] bg-white'
          }`}
          onClick={() => setRole('tenant')}
        >
          <UserRound size={17} className="text-[#0878b0]" />
          <span className="mt-2 block text-xs font-bold text-[#355364]">PG Seeker / Tenant</span>
          <span className="mt-0.5 block text-[11px] text-[#778891]">Compare stays, get 25% off verified PGs.</span>
        </button>
        <button
          type="button"
          className={`rounded-lg border p-3.5 text-left ${
            role === 'owner' ? 'border-[#168aad] bg-[#edf7fa]' : 'border-[#d9e4e8] bg-white'
          }`}
          onClick={() => setRole('owner')}
        >
          <Home size={17} className="text-[#0878b0]" />
          <span className="mt-2 block text-xs font-bold text-[#355364]">PG Owner / Admin</span>
          <span className="mt-0.5 block text-[11px] text-[#778891]">List property &amp; manage tenants.</span>
        </button>
      </div>

      {state === 'success' ? (
        <div className="mt-6 rounded-lg bg-[#edf7fa] p-5 text-center">
          <Check className="mx-auto text-[#168aad]" size={24} />
          <h3 className="sk-display mt-3 text-lg font-bold text-[#18364a]">Account Created</h3>
          <p className="mt-1 text-xs text-[#6d7e88]">Your UID ({contact}) is registered.</p>
          <Link href={role === 'owner' ? '/admin/overview' : '/tenant/home'} className="sk-button sk-button-primary mt-4 text-xs">
            Continue to {role === 'owner' ? 'Owner' : 'Tenant'} Portal
          </Link>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-5 space-y-4" noValidate>
          <Field label="Full Name" name="signup-name" value={name} onChange={setName} placeholder="Your name" />
          <Field
            label="Phone Number (Universal UID)"
            name="signup-contact"
            value={contact}
            onChange={setContact}
            placeholder="10-digit mobile number"
          />
          <Field
            label="Password"
            name="signup-password"
            value={password}
            onChange={setPassword}
            type="password"
            placeholder="At least 6 characters"
          />

          {error && <p className="text-xs text-[#b55b25]">{error}</p>}

          <label className="flex items-start gap-2 text-[11px] leading-4 text-[#5f7783]">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className="mt-0.5"
            />
            I agree to the <Link href="/legal/terms" className="sk-link mx-0.5">Terms of Service</Link>.
          </label>
          <label className="flex items-start gap-2 text-[11px] leading-4 text-[#5f7783]">
            <input
              type="checkbox"
              checked={privacy}
              onChange={(e) => setPrivacy(e.target.checked)}
              className="mt-0.5"
            />
            I agree to the <Link href="/legal/privacy" className="sk-link mx-0.5">Privacy Policy</Link>.
          </label>

          <button
            type="submit"
            disabled={!terms || !privacy || state === 'loading'}
            className="sk-button sk-button-primary w-full disabled:opacity-45 text-xs"
          >
            {state === 'loading' ? 'Creating account…' : 'Create Account'} <ArrowRight size={15} />
          </button>
          <p className="text-center text-xs text-[#6d7e88]">
            Already have an account? <Link href="/auth/login" className="sk-link">Sign in</Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}

function strength(password: string) {
  if (!password) return { label: 'Enter a password', color: '#81909a', width: '0%' };
  if (password.length < 8 || !/[0-9]/.test(password)) return { label: 'Weak', color: '#b55b25', width: '33%' };
  if (password.length < 12 || !/[A-Z]/.test(password)) return { label: 'Medium', color: '#a77b25', width: '66%' };
  return { label: 'Strong', color: '#176d73', width: '100%' };
}

export function ForgotPasswordPage() {
  const [contact, setContact] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  return (
    <AuthLayout
      eyebrow="Account access"
      title="A reset link, without the runaround."
      copy="Request a mock email or OTP, then set a new password in the next step."
    >
      <p className="sk-eyebrow">Forgot password</p>
      {sent ? (
        <div className="py-8">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e4f4f7] text-[#0878b0]">
            <Mail size={21} />
          </div>
          <h2 className="sk-display mt-4 text-[27px] font-bold text-[#18364a]">Check your phone.</h2>
          <p className="mt-3 text-[13px] leading-6 text-[#6d7e88]">
            For this demo, use OTP <span className="sk-mono font-bold text-[#18364a]">482913</span> on the next screen.
          </p>
          <Link href="/auth/reset-password" className="sk-button sk-button-primary mt-6">
            Continue to reset password <ArrowRight size={15} />
          </Link>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!contact.match(/(@|[0-9]{10})/)) {
              setError('Enter a valid email or 10-digit phone number.');
              return;
            }
            setSent(true);
          }}
          className="mt-7 space-y-5"
          noValidate
        >
          <h2 className="sk-display text-[27px] font-bold text-[#18364a]">Where should we send it?</h2>
          <Field
            label="Email or Phone Number (UID)"
            name="forgot-contact"
            value={contact}
            onChange={setContact}
            placeholder="you@example.com or 10-digit mobile"
          />
          {error && <p className="text-[11px] text-[#b55b25]">{error}</p>}
          <button type="submit" className="sk-button sk-button-primary w-full">
            Send reset instructions <ArrowRight size={15} />
          </button>
          <Link href="/auth/login" className="block text-center text-[12px] font-semibold text-[#0878b0]">
            Back to sign in
          </Link>
        </form>
      )}
    </AuthLayout>
  );
}

export function ResetPasswordPage() {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const level = strength(password);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (otp !== '482913') setError('That OTP is not correct. Use the six-digit code 482913.');
    else if (password.length < 6) setError('Choose a password of at least 6 characters.');
    else if (password !== confirm) setError('Passwords do not match.');
    else {
      setError('');
      setSuccess(true);
    }
  };

  return (
    <AuthLayout
      eyebrow="Account access"
      title="Choose a password you can keep."
      copy="Password view/hide toggles make it easy to verify what you typed."
    >
      <p className="sk-eyebrow">Reset password</p>
      {success ? (
        <div className="py-8 text-center">
          <Check className="mx-auto text-[#168aad]" size={29} />
          <h2 className="sk-display mt-4 text-[25px] font-bold text-[#18364a]">Password updated.</h2>
          <p className="mt-2 text-[13px] text-[#6d7e88]">Your demo account is ready for sign in.</p>
          <Link href="/auth/login" className="sk-button sk-button-primary mt-5">
            Sign in <ArrowRight size={15} />
          </Link>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-7 space-y-5" noValidate>
          <Field label="Six-digit OTP" name="reset-otp" value={otp} onChange={setOtp} placeholder="482913" />
          <div>
            <Field
              label="New password"
              name="reset-password"
              value={password}
              onChange={setPassword}
              type="password"
              placeholder="Use 6+ characters"
            />
            <div className="mt-2 h-1 rounded-full bg-[#e9eff1]">
              <div className="h-1 rounded-full transition-all" style={{ width: level.width, background: level.color }} />
            </div>
            <p className="mt-1 text-[11px]" style={{ color: level.color }}>
              {level.label}
            </p>
          </div>
          <Field
            label="Confirm new password"
            name="reset-confirm"
            value={confirm}
            onChange={setConfirm}
            type="password"
            placeholder="Repeat password"
          />
          {error && <p className="text-[11px] text-[#b55b25]">{error}</p>}
          <button type="submit" className="sk-button sk-button-primary w-full">
            Set new password <ArrowRight size={15} />
          </button>
        </form>
      )}
    </AuthLayout>
  );
}

function BlogCard({ item }: { item: typeof chronicles[number] }) {
  return <article className="sk-card p-5 transition hover:border-[#829e39]"><div className="flex items-center justify-between gap-3"><span className="text-[11px] font-bold text-[#728f2c]">{item.tag.replace('#', '')}</span><span className="text-[11px] text-[#77796f]">{item.read}</span></div><h2 className="sk-display mt-5 text-[20px] font-bold leading-tight text-[#1b1d18]">{item.title}</h2><p className="mt-3 text-[13px] leading-6 text-[#686a61]">{item.copy}</p><p className="mt-5 text-[11px] font-semibold text-[#77796f]">{item.date}</p><Link href={`/blogs/article/${item.id}`} className="mt-5 inline-flex items-center gap-1 text-[12px] font-bold text-[#526b1b]">Read article <ArrowRight size={13} /></Link></article>;
}
export function BlogsPage() {
  const [active, setActive] = useState('all'); const list = active === 'all' ? chronicles : chronicles.filter((item) => item.tag === active);
  return <Shell><main><section className="border-b border-[#dedbd0] bg-[#eeebe2]"><div className="sk-container py-14 sm:py-20"><p className="sk-eyebrow">The Staykolo blog</p><h1 className="sk-display mt-3 text-[42px] font-bold text-[#1b1d18] sm:text-[56px]">Useful notes for your Bengaluru move.</h1><p className="mt-4 max-w-[590px] text-[16px] leading-7 text-[#686a61]">Practical guides for finding a PG, planning a visit and settling into a new neighbourhood.</p></div></section><section className="sk-container py-12"><div className="flex flex-wrap gap-2" aria-label="Blog topics"><button type="button" className={`rounded-full border px-4 py-2 text-[12px] font-bold ${active === 'all' ? 'border-[#1b1d18] bg-[#1b1d18] text-white' : 'border-[#d4d0c6] bg-[#f7f5ed] text-[#55574e]'}`} onClick={() => setActive('all')} data-testid="button-blogs-all">All articles</button>{tagOptions.map((tag) => <button key={tag} type="button" onClick={() => setActive(tag)} className={`rounded-full border px-4 py-2 text-[12px] font-bold ${active === tag ? 'border-[#1b1d18] bg-[#1b1d18] text-white' : 'border-[#d4d0c6] bg-[#f7f5ed] text-[#55574e]'}`}>{tag.replace('#', '')}</button>)}</div><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{list.map((item) => <BlogCard item={item} key={item.id} />)}</div></section></main></Shell>;
}
export function BlogTagPage() {
  const { tag } = useParams<{ tag: string }>(); const fullTag = `#${tag}`; const list = chronicles.filter((item) => item.tag === fullTag);
  return <Shell><main className="sk-container py-12"><Link href="/blogs" className="inline-flex items-center gap-1 text-[12px] font-bold text-[#1b1d18]" data-testid="link-back-blogs"><ArrowLeft size={14} /> All blog articles</Link><p className="sk-eyebrow mt-10">Blog topic</p><h1 className="sk-display mt-2 text-[42px] font-bold text-[#1b1d18]">{fullTag}</h1>{list.length ? <div className="mt-8 grid gap-4 md:grid-cols-2">{list.map((item) => <BlogCard item={item} key={item.id} />)}</div> : <div className="sk-card mt-8 max-w-[580px] p-8"><FileText className="text-[#728f2c]" size={25} /><h2 className="sk-display mt-4 text-[22px] font-bold text-[#1b1d18]">No articles under this topic yet.</h2><p className="mt-2 text-[13px] leading-6 text-[#686a61]">Try another blog topic or return to all articles.</p><Link href="/blogs" className="sk-button sk-button-secondary mt-5" data-testid="link-unknown-tag-blogs">Browse all blogs <ArrowRight size={15} /></Link></div>}</main></Shell>;
}

export function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const item = chronicles.find((article) => article.id === slug);

  useEffect(() => {
    if (!item) return;
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const keywords = document.querySelector<HTMLMetaElement>('meta[name="keywords"]');
    const previousDescription = description?.content;
    const previousKeywords = keywords?.content;
    if (description) description.content = item.copy;
    if (keywords) keywords.content = [...item.primaryKeywords, ...item.secondaryKeywords].join(', ');
    document.title = `${item.title} | StayKolo`;
    return () => {
      document.title = previousTitle;
      if (description && previousDescription !== undefined) description.content = previousDescription;
      if (keywords && previousKeywords !== undefined) keywords.content = previousKeywords;
    };
  }, [item]);

  if (!item) return <Shell><main className="sk-container min-h-[60vh] py-14"><p className="sk-eyebrow">Article not found</p><h1 className="sk-display mt-3 text-3xl font-bold">This article is not available.</h1><Link href="/blogs" className="sk-button sk-button-primary mt-6">Browse all blogs <ArrowRight size={15} /></Link></main></Shell>;

  const relatedArticles = chronicles.filter((article) => article.id !== item.id).slice(0, 3);
  return <Shell><main><article className="mx-auto max-w-[900px] px-5 py-12 sm:px-8 sm:py-16"><Link href="/blogs" className="inline-flex items-center gap-1 text-[12px] font-bold text-[#1b1d18]"><ArrowLeft size={14} /> All articles</Link><header className="mt-9 border-b border-[#dedbd0] pb-8"><p className="sk-eyebrow">{item.tag.replace('#', '')} · {item.date} · {item.read}</p><h1 className="sk-display mt-3 text-[36px] font-bold leading-tight tracking-[-.04em] text-[#1b1d18] sm:text-[50px]">{item.title}</h1><p className="mt-5 text-[16px] leading-7 text-[#686a61]">{item.copy}</p></header><div className="prose-staykolo mt-8 space-y-8">{item.sections.map((section) => <section key={section.heading}><h2 className="sk-display text-[23px] font-bold text-[#1b1d18]">{section.heading}</h2><p className="mt-3 text-[15px] leading-7 text-[#55574e]">{section.content}</p></section>)}</div><section className="mt-10 rounded-[18px] border border-[#dedbd0] bg-[#eeebe2] p-5"><h2 className="text-[11px] font-bold uppercase tracking-[.12em] text-[#55574e]">Search topics</h2><p className="mt-3 text-[11px] font-bold text-[#526b1b]">Primary keywords</p><p className="mt-1 text-[12px] leading-6 text-[#686a61]">{item.primaryKeywords.join(' · ')}</p><p className="mt-3 text-[11px] font-bold text-[#526b1b]">Related keywords</p><p className="mt-1 text-[12px] leading-6 text-[#686a61]">{item.secondaryKeywords.join(' · ')}</p></section><section className="mt-8"><h2 className="sk-display text-xl font-bold text-[#1b1d18]">Keep exploring</h2><div className="mt-3 grid gap-3 sm:grid-cols-3">{relatedArticles.map((article) => <Link key={article.id} href={`/blogs/article/${article.id}`} className="rounded-xl border border-[#dedbd0] bg-[#f7f5ed] p-4 text-sm font-semibold text-[#1b1d18] hover:border-[#a5bd55]">{article.title}<span className="mt-2 block text-[10px] font-medium text-[#686a61]">{article.tag.replace('#', '')} · Read article</span></Link>)}</div><Link href="/search" className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-[#526b1b]">Explore available PG listings <ArrowRight size={13} /></Link></section></article></main></Shell>;
}

const legalSections = {
  terms: [
    ['1', 'Introduction & Acceptance of Terms', `These Terms of Service, together with the User Agreement, Privacy Policy, and Data Deletion Policy set out below (collectively, the "Terms"), govern access to and use of the Staykolo mobile application and website (the "Platform" or "App"), operated by CoreForge ("CoreForge", "we", "us", or "our"), a company/proprietorship based in Bengaluru, Karnataka, India.\n\nBy downloading, installing, registering on, or otherwise using the Platform whether as a Property Owner, Property Manager/Warden, Staff Member, or Tenant/Resident (each a "User", collectively "Users") you agree to be bound by these Terms. If you do not agree, you must not access or use the Platform.\n\nIf you are entering into these Terms on behalf of a business (for example, listing a PG/co-living property as an Owner), you represent that you have the authority to bind that business, and "you" refers both to you and that business.\n\nWe may update these Terms from time to time. We will notify Users of material changes through the App or by email at least 7 days before the changes take effect. Continued use of the Platform after changes take effect constitutes acceptance of the revised Terms.`],
    ['2', 'Definitions', `"Platform" means the Staykolo website and mobile application, and all related services, features, and content.\n\n"Owner" means a person or entity who lists a PG/co-living property on the Platform.\n\n"Tenant" or "Resident" means a person who books, subscribes to, or resides at a property listed on the Platform.\n\n"Staff" means wardens, caretakers, or other personnel granted access to manage a property through the Platform.\n\n"Content" means listings, photos, descriptions, reviews, messages, and any other material submitted to the Platform.\n\n"Personal Data" has the meaning given under the Digital Personal Data Protection Act, 2023 ("DPDP Act") any data about an individual who is identifiable by or in relation to such data.\n\n"Services" means property listing and discovery, digital rent/subscription tracking, QR-based WiFi and access provisioning, visitor logging, complaint/issue tracking, staff attendance, notices, and related features described on the Platform.`],
    ['3', 'User Agreement & Eligibility', `3.1 Eligibility\nYou must be at least 18 years old and capable of entering into a legally binding contract under the Indian Contract Act, 1872 to use the Platform. By using the Platform, you represent that you meet this requirement.\n\n3.2 Account Registration\nYou must register using accurate, current, and complete information, including a valid phone number and/or email address. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account. You must notify us immediately at the support contact below if you suspect unauthorized use of your account.\n\n3.3 User Roles & Access Control\nThe Platform assigns role-based access (Owner, Staff/Warden, Tenant) so that each User can only view or manage information relevant to their role. Owners are responsible for correctly assigning and revoking Staff access, including when a Staff member's employment ends.\n\n3.4 Owner Obligations\nProvide accurate property details, pricing, amenities, and photographs. Comply with all applicable local, municipal, and state laws relating to PG/rental accommodation, including police verification of tenants where mandated by local regulations, fire safety norms, and building/occupancy regulations. Obtain and maintain any licenses or registrations required to legally operate a paying-guest accommodation in the relevant jurisdiction. Honour the terms of any tenancy/leave-and-license agreement entered into with a Tenant, independent of the Platform.\n\n3.5 Tenant Obligations\nProvide accurate identification and contact information as required for onboarding and, where applicable, police verification. Comply with the property's house rules, visitor policies, and payment schedules. Use shared amenities, WiFi access, and QR-based entry systems only for their intended purpose and not share access credentials with unauthorized persons.\n\n3.6 Prohibited Conduct\nPosting false, misleading, or fraudulent listings or reviews; attempting to bypass, hack, or misuse the QR-based access, WiFi provisioning, or security systems; harassment, discrimination, or unlawful conduct towards other Users or Staff; or using the Platform for any unlawful purpose or in violation of any applicable law.`],
    ['4', 'Subscription, Payments & Billing', `Staykolo is offered to Owners on a subscription basis as described on the Platform's pricing page, which may include promotional/introductory pricing. Promotional pricing is offered at our discretion, may be time-bound, and may be modified or withdrawn for new subscribers at any time without affecting Users already enrolled at that rate for the promised duration.\n\nWhere the Platform facilitates online rent or subscription payments through a third-party payment gateway, such payments are subject to the payment gateway provider's own terms, and CoreForge is not responsible for failures, delays, or errors caused by the payment gateway or the User's bank. Where the Platform is used only to track or remind Users of payments made outside the App, CoreForge does not process, hold, or guarantee those payments and is not a party to the underlying rent agreement between Owner and Tenant.\n\nSubscription fees, once paid, are non-refundable except where required by law or expressly stated in a specific offer's terms. We will provide reasonable advance notice before any price change takes effect for existing subscribers.`],
    ['5', 'Platform Features & Disclaimers', `The Platform provides tools including, but not limited to: automated property profile creation and marketing, tenant-matching alerts, QR-based WiFi provisioning and automatic credential refresh, QR-based access/entry, visitor logging, staff attendance tracking, furniture/asset inventory, issue/complaint raising and tracking, and payment/agreement/deposit notices, as illustrated in the Platform's feature overview.\n\nThese features are provided as a management and convenience tool. CoreForge does not guarantee tenant occupancy, rental income, or any specific business outcome for Owners. Physical security of the property remains the Owner's responsibility; the Platform's digital access/QR features supplement, but do not replace, physical security measures.\n\nCoreForge Technologies is a technology platform and is not a party to, and does not guarantee performance of, any tenancy, leave-and-license, or rental agreement entered into between an Owner and a Tenant.`],
    ['6', 'Intellectual Property', `All trademarks, logos, app design, source code, and content created by CoreForge (excluding User-submitted Content) are the property of CoreForge and may not be copied, reproduced, or used without prior written consent. Users retain ownership of Content they submit (such as property photos) but grant CoreForge a non-exclusive, royalty-free, worldwide licence to host, display, and use that Content for the purpose of operating and promoting the Platform.`],
    ['7', 'Limitation of Liability & Indemnity', `To the maximum extent permitted by applicable law, CoreForge shall not be liable for any indirect, incidental, special, or consequential damages, or loss of profits, revenue, or data, arising from use of, or inability to use, the Platform. CoreForge aggregate liability for any claim arising out of these Terms shall not exceed the subscription fees paid by the User to CoreForge in the three (3) months preceding the claim.\n\nNothing in these Terms limits liability that cannot be limited under applicable Indian law, including liability arising from gross negligence, wilful misconduct, or fraud.\n\nYou agree to indemnify and hold harmless CoreForge, its officers, employees, and agents from any claims, damages, or expenses (including reasonable legal fees) arising from your breach of these Terms, your Content, or your violation of any law or third-party right.`],
    ['8', 'Suspension & Termination', `We may suspend or terminate a User's access to the Platform, with or without notice, if we reasonably believe the User has violated these Terms, engaged in fraudulent or unlawful conduct, or misused the security/access features of the Platform. Users may terminate their account at any time by contacting support; termination does not entitle the User to a refund of subscription fees already paid, except as required by law.\n\nUpon termination, an Owner's property listing and associated data will be handled in accordance with the Data Deletion Policy in Section 12.`],
    ['9', 'Governing Law & Dispute Resolution', `These Terms are governed by the laws of India. Subject to Section 9 below, the courts at Bengaluru, Karnataka shall have exclusive jurisdiction over any disputes arising out of or in connection with these Terms.\n\nAny dispute, controversy, or claim arising out of or relating to these Terms shall first be referred to good-faith negotiation between the parties. If not resolved within 30 days, the dispute shall be referred to and finally resolved by arbitration under the Arbitration and Conciliation Act, 1996, seated in Bengaluru, Karnataka, conducted in English, before a sole arbitrator appointed by mutual agreement. This clause does not prevent either party from seeking urgent interim relief from a competent court.`],
  ],
  privacy: [
    ['10.1', 'Data We Collect', `Identity & contact data: name, phone number, email address, photograph, government ID details (where required for tenant verification).\n\nProperty data: address, room/bed configuration, amenities, rent, occupancy status.\n\nOccupancy & operations data: staff attendance records, visitor logs, furniture/asset inventory, utility status reports.\n\nFinancial data: rent/subscription amounts, payment status, deposit details, and transaction references from the payment gateway. CoreForge does not store full card or bank account numbers.\n\nAccess & device data: QR-based WiFi/access credentials and logs, device identifiers, IP address, app usage/log data, notices and complaint/issue records.\n\nCommunications: messages, complaint descriptions, and support interactions submitted through the Platform.`],
    ['10.2', 'How We Use Personal Data', `To create and manage property listings, tenant-matching alerts, and marketing of properties to prospective tenants; to operate role-based access control, QR WiFi/entry provisioning, and automatic credential refresh; to maintain visitor logs, staff attendance, issue tracking, and notices for property management and safety purposes; to send payment reminders, agreement, and deposit-related notices; to provide customer support, respond to queries, and improve the Platform; and to comply with legal obligations, including tenant verification requirements under applicable local police/municipal regulations, where such verification is enabled through the Platform.\n\nWe process Personal Data on the basis of your consent, for the performance of the contract between you and CoreForge, and, where applicable, to comply with legal obligations.`],
    ['10.3', 'Sharing of Personal Data', `We share Personal Data only as necessary: between an Owner/Staff and their Tenants, and vice versa, to operate the Services; with payment gateway providers, cloud hosting providers, SMS/notification providers, and other service providers who process data on our behalf under contractual confidentiality obligations; with law enforcement or government authorities where required by law; and in connection with a merger, acquisition, or sale of assets of CoreForge, subject to equivalent privacy protections. We do not sell Personal Data to third parties for their independent marketing use.`],
    ['10.4', 'Data Storage & Security', `Personal Data is stored on secure servers, with access restricted through role-based permissions as described in Section 3.3. We use reasonable technical and organisational measures including encryption in transit, access controls, and automatic credential refresh for WiFi/access QR codes to protect Personal Data against unauthorized access, alteration, disclosure, or destruction, in line with the reasonable security practices standard under the IT Act, 2000 and applicable rules. No method of transmission or storage is 100% secure, and we cannot guarantee absolute security.`],
    ['10.5', 'Data Retention', `We retain Personal Data for as long as your account is active and as necessary to provide the Services. Visitor logs, attendance records, and complaint/issue records are retained for safety, audit, and dispute-resolution purposes, unless a longer period is required by applicable law. Financial records may be retained longer where required for tax or accounting compliance.`],
    ['10.6', 'Your Rights (Consent, Access, Correction & Erasure)', `In accordance with the DPDP Act, 2023, you have the right to obtain a summary of the Personal Data we hold about you; correct or update inaccurate or incomplete Personal Data; request erasure of your Personal Data, subject to the Data Deletion Policy and legal retention requirements; withdraw consent at any time; nominate another individual to exercise these rights on your behalf in the event of death or incapacity; and file a complaint with the Data Protection Board of India after first raising the grievance with our Grievance Officer.\n\nWithdrawing consent or requesting erasure of certain data may mean we are unable to continue providing some or all Services to you, and we will inform you of this before processing your request.`],
    ['10.7', 'Cookies & Analytics', `The Platform may use cookies, SDKs, and similar technologies to remember preferences, keep you logged in, and understand how the Platform is used, so we can improve it. You can control cookie preferences through your device/browser settings, though disabling cookies may affect some features.`],
    ['10.8', "Children's Data", `The Platform is not directed at, and does not knowingly collect Personal Data from, individuals below 18 years of age acting as independent Users. If you believe a minor has provided Personal Data to us without appropriate consent, please contact us using the details below so we can take appropriate action.`],
    ['10.9', 'Grievance Officer & Contact', `In accordance with the IT Act, 2000, its rules, and the DPDP Act, 2023, the contact details of our Grievance Officer / Data Protection contact are provided below. [Declared Soon]`],
  ],
  deletion: [
    ['11.1', 'How to Request Deletion', `Users may request deletion of their account and associated Personal Data at any time through the "Delete Account" option in the App's settings, or by writing to our support/Grievance Officer contact with the request. We will verify the identity of the requester before processing the request.`],
    ['11.2', 'What Happens on Deletion', `Profile information (name, contact details, photograph) will be permanently deleted from active systems within 30 days of a verified request.\n\nProperty listings created by an Owner will be delisted immediately and permanently deleted within 30 days, unless there is an active, unresolved tenancy or dispute linked to that listing.\n\nVisitor logs, attendance records, and issue/complaint records directly tied to your account will be deleted or anonymised within 30 days, unless retention is required for safety, audit, legal, or regulatory purposes. Financial and transaction records may be retained for the period required under applicable tax, accounting, and audit laws.\n\nPersonal Data may persist in encrypted backups for a limited period (e.g., up to 90 days) after deletion from live systems, after which it is purged in the ordinary backup-rotation cycle. Backup copies are not used for active processing.`],
    ['11.3', 'Effect on Other Users', `Where your data is also part of another User's records required for their own legal or safety compliance (for example, an Owner's visitor log which includes a Tenant's visit details, or a Tenant's record of a completed tenancy needed for an Owner's compliance records), we may retain the minimum necessary information within that other User's records even after you delete your own account, to the extent permitted by law.`],
    ['11.4', 'Confirmation', `We will send a confirmation once your deletion request has been processed. If any data is retained beyond the standard 30-day period, we will explain what is retained, why, and for how long.`],
  ],
} as const;

export function LegalPage({ kind }: { kind: keyof typeof legalSections }) {
  const [confirm, setConfirm] = useState(false); const [requested, setRequested] = useState(false); const [requestName, setRequestName] = useState(readWebsiteProfile()?.name ?? ''); const [requestContact, setRequestContact] = useState(readWebsiteProfile()?.contact ?? ''); const [requestReason, setRequestReason] = useState(''); const [requestError, setRequestError] = useState(''); const isTerms = kind === 'terms'; const isPrivacy = kind === 'privacy'; const title = isTerms ? 'Terms of Service & User Agreement' : isPrivacy ? 'Privacy Policy' : 'Account & Data Deletion Policy'; const sections = legalSections[kind];
  return <Shell><main className="sk-container py-10 sm:py-14"><div className="max-w-[850px]"><p className="sk-eyebrow">Staykolo legal</p><h1 className="sk-display mt-3 text-[36px] font-bold leading-tight text-[#18364a] sm:text-[46px]">{title}</h1><p className="mt-4 text-[13px] leading-6 text-[#6d7e88]">Effective Date: <strong className="text-[#405966]">26 September 2026</strong> · Governing Jurisdiction: <strong className="text-[#405966]">Bengaluru, Karnataka, India</strong></p></div><div className="mt-10 grid gap-10 lg:grid-cols-[210px_1fr]"><aside className="lg:sticky lg:top-5 lg:self-start"><details className="sk-card p-4 lg:open"><summary className="cursor-pointer list-none text-[12px] font-bold text-[#355364]">On this page</summary><nav className="mt-3 space-y-2 border-t border-[#edf1f3] pt-3">{sections.map(([id, heading]) => <a href={`#section-${id.replace('.', '-')}`} key={id} className="block text-[11px] leading-4 text-[#0878b0] hover:underline" data-testid={`link-toc-${id.replace('.', '-')}`}>{id}. {heading}</a>)}</nav></details>{isTerms && <Link href="/legal/privacy" className="mt-4 block text-[11px] font-semibold text-[#0878b0]" data-testid="link-legal-privacy">Read Privacy Policy <ArrowRight size={12} className="inline" /></Link>}{isPrivacy && <Link href="/legal/data-deletion" className="mt-4 block text-[11px] font-semibold text-[#0878b0]" data-testid="link-legal-deletion">Read Data Deletion Policy <ArrowRight size={12} className="inline" /></Link>}</aside><article className="max-w-[700px]"><div className="mb-8 rounded-lg border border-[#cfe2e6] bg-[#edf7fa] p-5 text-[13px] leading-6 text-[#4e6b77]">This document is a structured demo policy for Staykolo, operated by CoreForge. Please read the sections relevant to your use of the Platform.</div>{sections.map(([id, heading, copy]) => <section id={`section-${id.replace('.', '-')}`} key={id} className="scroll-mt-6 border-b border-[#e5edef] py-7 first:pt-0"><h2 className="sk-display text-[23px] font-bold text-[#18364a]"><span className="mr-2 text-[#168aad]">{id}</span>{heading}</h2><div className="mt-4 space-y-4 text-[14px] leading-7 text-[#586f7b]">{copy.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></section>)}{kind === 'deletion' && <div className="mt-8">{requested ? <div className="rounded-lg bg-[#e4f4f7] p-5 text-[13px] text-[#176d73]" role="status"><Check className="mb-2" size={18} />Deletion request prepared for this demo. No data was deleted.</div> : <button type="button" className="sk-button sk-button-primary" onClick={() => setConfirm(true)} data-testid="button-request-deletion">Request deletion <ArrowRight size={15} /></button>}</div>}</article></div></main>{confirm && <Modal title="Request account deletion?" onClose={() => setConfirm(false)}><p className="mt-4 text-[13px] leading-6 text-[#647782]">This demonstration records the request only in this browser. It does not delete data or contact support.</p><div className="mt-4 space-y-3"><Field label="Full name" name="deletion-name" value={requestName} onChange={setRequestName} placeholder="Your name" /><Field label="Account phone or email" name="deletion-contact" value={requestContact} onChange={setRequestContact} placeholder="Phone number or email" /><label className="block text-[11px] font-semibold text-[#42443c]">Reason (optional)<textarea value={requestReason} onChange={(event) => setRequestReason(event.target.value)} className="sk-input mt-1 min-h-20" placeholder="Tell us why you are requesting deletion" /></label></div>{requestError && <p className="mt-3 text-xs text-[#b55b25]" role="alert">{requestError}</p>}<div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button type="button" className="sk-button sk-button-secondary" onClick={() => setConfirm(false)} data-testid="button-cancel-deletion">Cancel</button><button type="button" className="sk-button sk-button-primary" onClick={() => { if (!requestName.trim() || !requestContact.trim()) { setRequestError('Enter your name and the contact linked to the account.'); return; } try { localStorage.setItem('staykolo.deletionRequest', JSON.stringify({ name: requestName.trim(), contact: requestContact.trim(), reason: requestReason.trim(), requestedAt: new Date().toISOString() })); setRequested(true); setConfirm(false); } catch { setRequestError('The request could not be saved in this browser. Please try again.'); } }} data-testid="button-confirm-deletion">Submit request</button></div></Modal>}</Shell>;
}

/* ========== ABOUT PAGE (#16, #17, #50) ========== */
export function AboutPage() {
  return (
    <Shell>
      <main>
        <section className="border-b border-[#dedbd0] bg-[#eeebe2]">
          <div className="sk-container py-14 sm:py-20">
            <div className="flex items-center gap-2.5 mb-3">
              <KarnatakaFlag className="h-4 w-6" />
              <p className="sk-eyebrow tracking-wider font-bold">Brand Karnataka · Made for Bengaluru</p>
            </div>
            <h1 className="sk-display mt-2 text-[40px] font-bold text-[#18364a] sm:text-[54px] leading-tight">
              All at one click. The complete PG ecosystem.
            </h1>
            <p className="mt-4 max-w-[620px] text-[16px] leading-7 text-[#59717e]">
              StayKolo is a Bengaluru-first way to discover better PGs with direct owner contact, verified details, and a simpler decision process. This is the first phase introduction of the platform.
            </p>
          </div>
        </section>

        <section className="sk-container py-14">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="sk-card p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf7fa] text-[#0878b0] mb-4">
                <ShieldCheck size={22} />
              </span>
              <h3 className="sk-display text-lg font-bold text-[#18364a]">100% Resident-Verified</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#6d7e88]">
                No fake reviews or star ratings. Real amenity checklists audited by active tenants and on-site staff.
              </p>
            </div>
            <div className="sk-card p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff8f5] text-[#b55b25] mb-4">
                <Gift size={22} />
              </span>
              <h3 className="sk-display text-lg font-bold text-[#18364a]">25% Off on Verified PGs</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#6d7e88]">
                Available only when you apply through a StayKolo verified PG partner in the first phase rollout.
              </p>
            </div>
            <div className="sk-card p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#edf7fa] text-[#176d73] mb-4">
                <RotateCcw size={22} />
              </span>
              <h3 className="sk-display text-lg font-bold text-[#18364a]">Ecosystem Deposit Transfer</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#6d7e88]">
                Relocating across Bengaluru? Transfer your verification history and deposit seamlessly within our network.
              </p>
            </div>
          </div>

          <div className="mt-12 sk-card p-8 bg-gradient-to-r from-[#edf7fa] to-[#f5fafc]">
            <p className="sk-eyebrow">Bengaluru coverage</p>
            <h2 className="sk-display mt-2 text-2xl font-bold text-[#18364a]">Built for tech commutes and college hubs.</h2>
            <p className="mt-2 text-xs leading-relaxed text-[#6d7e88] max-w-[650px]">
              Currently serving HSR Layout, Koramangala, Bellandur, Indiranagar, Whitefield, Marathahalli, and Electronic City with localized daily food menus, visitor management, and Wi-Fi provisioning.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/search" className="sk-button sk-button-primary text-xs">
                Launch StayKolo PG Locator <ArrowRight size={14} />
              </Link>
              <Link href="/auth/signup" className="sk-button sk-button-secondary text-xs">
                Register as PG Owner
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Shell>
  );
}

/* ========== CONTACT PAGE ========== */
/* ========== CONTACT & GET VERIFIED PAGE ========== */
export function ContactPage() {
  const [activeTab, setActiveTab] = useState<'verify' | 'contact'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('tab') === 'verify' || window.location.pathname === '/get-verified') {
        return 'verify';
      }
    }
    return 'contact';
  });

  // General Contact Form State
  const [generalName, setGeneralName] = useState('');
  const [generalContact, setGeneralContact] = useState('');
  const [generalSubject, setGeneralSubject] = useState('');
  const [generalMessage, setGeneralMessage] = useState('');
  const [generalSubmitted, setGeneralSubmitted] = useState(false);

  // Simplified PG Get Verified Form State
  const [pgName, setPgName] = useState('');
  const [pgPhone, setPgPhone] = useState('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');
  const [verifySubmitted, setVerifySubmitted] = useState(false);
  const [verificationId, setVerificationId] = useState('');

  const handleGeneralSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!generalName || !generalContact) return;
    setGeneralSubmitted(true);
  };

  const handleVerifySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!pgName || !pgPhone) return;
    const refId = `SK-VRF-${Math.floor(100000 + Math.random() * 900000)}`;
    setVerificationId(refId);
    setVerifySubmitted(true);
  };

  return (
    <Shell>
      <main>
        {/* Hero Section */}
        <section className="border-b border-[#dedbd0] bg-[#eeebe2]">
          <div className="sk-container py-12 sm:py-16">
            <div className="flex items-center gap-2 mb-2">
              <KarnatakaFlag className="h-3.5 w-5" />
              <p className="sk-eyebrow">StayKolo Support & PG Onboarding</p>
            </div>
            <h1 className="sk-display mt-2 text-[36px] font-bold text-[#1b1d18] sm:text-[46px]">
              {activeTab === 'verify'
                ? 'Get Your PG Verified on StayKolo'
                : 'Contact StayKolo Operations'}
            </h1>
            <p className="mt-3 max-w-[620px] text-[15px] leading-7 text-[#686a61]">
              {activeTab === 'verify'
                ? 'Enter your PG name, contact phone number, and Google Maps location URL to get listed and verified.'
                : 'Have questions about platform features, tenant move-ins, or need direct support? We are ready to assist you.'}
            </p>

            {/* Tab Selector */}
            <div className="mt-8 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('contact')}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold transition-all ${
                  activeTab === 'contact'
                    ? 'bg-[#1b1d18] text-[#d6f36a] shadow-sm'
                    : 'bg-[#f7f5ed] text-[#55574e] border border-[#d4d0c6] hover:border-[#829e39]'
                }`}
              >
                <Mail size={16} /> Contact StayKolo Operations
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('verify')}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold transition-all ${
                  activeTab === 'verify'
                    ? 'bg-[#1b1d18] text-[#d6f36a] shadow-sm'
                    : 'bg-[#f7f5ed] text-[#55574e] border border-[#d4d0c6] hover:border-[#829e39]'
                }`}
              >
                <ShieldCheck size={16} /> Verify your PG
              </button>
            </div>
          </div>
        </section>

        {/* ================= GET VERIFIED TAB (SIMPLIFIED) ================= */}
        {activeTab === 'verify' && (
          <section className="sk-container py-12">
            {verifySubmitted ? (
              <div className="mx-auto max-w-[640px] sk-card p-8 text-center bg-white border-[#168aad]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#edf7fa] text-[#0878b0]">
                  <ShieldCheck size={36} />
                </div>
                <h2 className="sk-display mt-4 text-2xl font-bold text-[#18364a]">
                  Verification Request Received!
                </h2>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#e4f4f7] px-4 py-1 text-xs font-bold text-[#0878b0]">
                  Reference ID: <span className="font-mono">{verificationId}</span>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-[#59717e] max-w-[500px] mx-auto">
                  Thank you! Your PG <strong className="text-[#18364a]">{pgName}</strong> (Contact: <strong className="text-[#18364a]">{pgPhone}</strong>) has been queued for verification.
                </p>

                {googleMapsUrl && (
                  <div className="mt-4 rounded-lg bg-[#f8fafb] border border-[#edf1f3] p-3 text-xs text-left">
                    <span className="font-semibold text-[#18364a] block">Google Maps Location:</span>
                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0878b0] underline truncate block mt-0.5"
                    >
                      {googleMapsUrl}
                    </a>
                  </div>
                )}

                <div className="mt-6 rounded-xl border border-[#edf1f3] bg-[#fbfcfd] p-4 text-left text-xs space-y-2">
                  <p className="flex items-center gap-2 text-[#59717e]">
                    <Check size={14} className="text-[#0878b0]" /> Our field executive will contact <strong>{pgPhone}</strong> within 24 hours.
                  </p>
                  <p className="flex items-center gap-2 text-[#59717e]">
                    <Check size={14} className="text-[#0878b0]" /> Verified badge & 25% tenant vouchers will be activated on search.
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                  <Link href="/search" className="sk-button sk-button-primary text-xs">
                    Browse All PGs <ArrowRight size={14} />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setVerifySubmitted(false);
                      setPgName('');
                      setPgPhone('');
                      setGoogleMapsUrl('');
                    }}
                    className="sk-button sk-button-secondary text-xs"
                  >
                    Submit Another PG
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] max-w-[950px] mx-auto">
                {/* Simplified Form */}
                <form onSubmit={handleVerifySubmit} className="sk-card p-6 sm:p-8 space-y-5">
                  <div>
                    <h3 className="sk-display text-lg font-bold text-[#18364a]">PG Verification Details</h3>
                    <p className="text-xs text-[#6d7e88] mt-1">
                      Fill in your PG details to get verified and listed on StayKolo.
                    </p>
                  </div>

                  <Field
                    label="PG Name"
                    name="pg-name"
                    value={pgName}
                    onChange={setPgName}
                    placeholder="e.g. Lively Legacy PG"
                  />

                  <Field
                    label="Contact Phone Number"
                    name="pg-phone"
                    value={pgPhone}
                    onChange={setPgPhone}
                    placeholder="e.g. 9845012345"
                  />

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold text-[#405966]">
                      Google Maps Location URL
                    </span>
                    <input
                      type="url"
                      value={googleMapsUrl}
                      onChange={(e) => setGoogleMapsUrl(e.target.value)}
                      placeholder="https://maps.app.goo.gl/... or Google Maps link"
                      className="w-full rounded-lg border border-[#d3e0e4] p-2.5 text-xs outline-none focus:border-[#168aad]"
                      required
                    />
                  </label>

                  <button type="submit" className="sk-button sk-button-primary w-full text-xs py-3 font-bold">
                    <ShieldCheck size={16} /> Submit PG for Verification
                  </button>
                </form>

                {/* Right Benefits Card */}
                <div className="space-y-4">
                  <div className="sk-card p-6 bg-[#edf7fa] border-[#b2e2ec]">
                    <h4 className="font-bold text-[#18364a] text-sm flex items-center gap-2">
                      <ShieldCheck size={18} className="text-[#0878b0]" /> Why Get Verified?
                    </h4>
                    <ul className="mt-3 space-y-2.5 text-xs text-[#46616e]">
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 text-[#0878b0] shrink-0" size={14} />
                        <span><strong>Top Search Placement:</strong> Verified PGs appear first on the StayKolo map.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 text-[#0878b0] shrink-0" size={14} />
                        <span><strong>Zero Brokerage:</strong> Direct calls from students and working professionals.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="mt-0.5 text-[#0878b0] shrink-0" size={14} />
                        <span><strong>25% Discount Vouchers:</strong> Faster bookings sponsored by StayKolo.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="sk-card p-5">
                    <h5 className="font-bold text-[#18364a] text-xs">Need Assistance?</h5>
                    <p className="mt-1 text-xs text-[#6d7e88]">Call our Bengaluru Onboarding Desk:</p>
                    <p className="mt-2 text-xs font-semibold text-[#0878b0] flex items-center gap-1.5">
                      <Phone size={13} /> +91 98450 12345
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ================= GENERAL SUPPORT TAB ================= */}
        {activeTab === 'contact' && (
          <section className="sk-container py-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
              <div className="space-y-6">
                <div className="sk-card p-6">
                  <h3 className="sk-display text-base font-bold text-[#18364a]">Bengaluru Operations Hub</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#6d7e88]">
                    CoreForge Technologies<br />
                    14th Main Rd, Sector 4, HSR Layout<br />
                    Bengaluru, Karnataka 560102
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#edf1f3] space-y-2 text-xs text-[#506875]">
                    <p className="flex items-center gap-2">
                      <Phone size={14} className="text-[#0878b0]" /> +91 98450 12345
                    </p>
                    <p className="flex items-center gap-2">
                      <Mail size={14} className="text-[#0878b0]" /> support@staykolo.in
                    </p>
                  </div>
                </div>

                <div className="sk-card p-6 bg-[#fff8f5] border-[#fbd4c2]">
                  <h4 className="text-xs font-bold text-[#b55b25] flex items-center gap-1.5">
                    <Gift size={14} /> 25% Off Tenant Voucher Questions
                  </h4>
                  <p className="text-[11px] text-[#6d7e88] mt-2 leading-relaxed">
                    Vouchers are issued automatically upon confirming your move-in through verified StayKolo properties.
                  </p>
                </div>
              </div>

              <div className="sk-card p-8">
                <h2 className="sk-display text-xl font-bold text-[#18364a]">Send a message</h2>
                {generalSubmitted ? (
                  <div className="mt-6 rounded-xl bg-[#edf7fa] p-6 text-center">
                    <Check className="mx-auto text-[#0878b0]" size={28} />
                    <h3 className="sk-display mt-3 text-lg font-bold text-[#18364a]">Message Received</h3>
                    <p className="mt-2 text-xs text-[#6d7e88]">
                      Thank you {generalName}. Our Bangalore operations team will respond to {generalContact} within 4 working hours.
                    </p>
                    <button
                      type="button"
                      className="sk-button sk-button-primary mt-5 text-xs"
                      onClick={() => setGeneralSubmitted(false)}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleGeneralSubmit} className="mt-6 space-y-4">
                    <Field
                      label="Your Name"
                      name="contact-name"
                      value={generalName}
                      onChange={setGeneralName}
                      placeholder="Rahul Sharma"
                    />
                    <Field
                      label="Phone Number (UID) or Email"
                      name="contact-phone"
                      value={generalContact}
                      onChange={setGeneralContact}
                      placeholder="+91 98765 43210"
                    />
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold text-[#405966]">Subject</span>
                      <input
                        type="text"
                        value={generalSubject}
                        onChange={(e) => setGeneralSubject(e.target.value)}
                        placeholder="e.g. PG Listing verification, 25% discount"
                        className="w-full rounded-lg border border-[#d3e0e4] p-2.5 text-xs outline-none focus:border-[#168aad]"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold text-[#405966]">Message</span>
                      <textarea
                        rows={4}
                        value={generalMessage}
                        onChange={(e) => setGeneralMessage(e.target.value)}
                        placeholder="How can we help you?"
                        className="w-full rounded-lg border border-[#d3e0e4] p-2.5 text-xs outline-none focus:border-[#168aad]"
                      />
                    </label>
                    <button type="submit" className="sk-button sk-button-primary w-full text-xs">
                      Submit Message <ArrowRight size={14} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </Shell>
  );
}