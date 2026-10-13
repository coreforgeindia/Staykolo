import { useEffect } from 'react';
import { ArrowRight, ChevronDown, Search } from 'lucide-react';
import { Link } from 'wouter';
import { SiteFooter, SiteNav } from '@/components/staykolo-ui';

const faqItems = [
  { category: 'Finding a PG in Bengaluru', question: 'How do I find a PG in Bengaluru?', answer: 'Search by neighbourhood, college or landmark, then review the address and the information shown for each result. Use the listing details as a starting point and confirm current availability directly with the property before making plans.' },
  { category: 'Finding a PG in Bengaluru', question: 'Where can I search for paying guest accommodation in Bangalore?', answer: 'Use the StayKolo PG search page to browse Bengaluru listings by area, college or landmark. You can open a property result to review its available details and map link.' },
  { category: 'Finding a PG in Bengaluru', question: 'How can I find a PG near my office in Bengaluru?', answer: 'Enter your office area or a nearby landmark in search. Compare the location and route for each listing, and check the commute at the times you expect to travel.' },
  { category: 'Finding a PG in Bengaluru', question: 'How do I find a PG near my college in Bangalore?', answer: 'Search the college name or a nearby locality. Confirm the property address and commute yourself, since a broad area match does not guarantee a particular travel time.' },
  { category: 'Finding a PG in Bengaluru', question: 'Can I search Bengaluru PGs by neighbourhood?', answer: 'Yes. Search using an area name, or select a neighbourhood on the homepage to see matching directory results.' },
  { category: 'Finding a PG in Bengaluru', question: 'Can I search by landmark instead of an area?', answer: 'Yes. Enter a nearby landmark in the search field. Review the address and map link to make sure a result is near the right landmark.' },
  { category: 'Finding a PG in Bengaluru', question: 'What should I compare when choosing a PG in Bangalore?', answer: 'Compare location, commute, room and facility details that have been confirmed, house rules, access arrangements, and the terms provided by the operator. Visit before committing whenever possible.' },
  { category: 'Finding a PG in Bengaluru', question: 'How do I shortlist PGs near me?', answer: 'Search the locality or landmark, save or compare relevant verified profiles where that option is available, and contact each property to confirm current availability and terms.' },
  { category: 'Finding a PG in Bengaluru', question: 'Does StayKolo show PGs across Bengaluru?', answer: 'StayKolo lists Bengaluru property records. The page labels verified profiles separately from local directory listings so you can understand what has and has not been confirmed.' },
  { category: 'Finding a PG in Bengaluru', question: 'Can I search for a PG using a natural phrase?', answer: 'Yes. Try a phrase such as “PG near Koramangala” or “PG near PES University”. You can also clear the filters and try another area or landmark.' },

  { category: 'Bengaluru neighbourhoods', question: 'How do I find a PG in Vijayanagar, Bengaluru?', answer: 'Search for Vijayanagar on the PG search page or choose it from the homepage neighbourhood links. Check the full address because listings may use nearby locality spellings.' },
  { category: 'Bengaluru neighbourhoods', question: 'Where can I search for a PG in Nagarbhavi?', answer: 'Enter Nagarbhavi in the search field. Check each listing’s address and contact the property to confirm its exact location and current availability.' },
  { category: 'Bengaluru neighbourhoods', question: 'How can I find a PG in Malleshwaram?', answer: 'Search Malleshwaram and review the matching addresses. Confirm the route to your workplace or campus and ask the operator about current room options.' },
  { category: 'Bengaluru neighbourhoods', question: 'Are there PG listings in Mathikere?', answer: 'Search Mathikere to see matching directory records. Listings can change, so contact the property directly to check whether it is currently accepting residents.' },
  { category: 'Bengaluru neighbourhoods', question: 'How do I look for a PG in Koramangala?', answer: 'Search Koramangala and compare addresses against your commute. Confirm current rates, room types and availability directly with the property.' },
  { category: 'Bengaluru neighbourhoods', question: 'How can I find a PG in HSR Layout?', answer: 'Enter HSR Layout in search. Check the exact sector or street in the property address and plan the journey to your regular destination.' },
  { category: 'Bengaluru neighbourhoods', question: 'Where can I search for a PG in Whitefield?', answer: 'Search Whitefield and inspect the address and map link. Whitefield covers a broad area, so confirm the distance to your office or transit stop.' },
  { category: 'Bengaluru neighbourhoods', question: 'Can I find a PG in Bellandur through StayKolo?', answer: 'Search Bellandur to find matching listings. Confirm the precise location, availability and terms with the operator before visiting.' },
  { category: 'Bengaluru neighbourhoods', question: 'How do I compare PG locations in Bengaluru?', answer: 'Search each neighbourhood you are considering, then compare the actual addresses, daily travel routes and nearby services rather than relying only on locality names.' },
  { category: 'Bengaluru neighbourhoods', question: 'Does a PG area name guarantee it is close to a metro station?', answer: 'No. Area names can cover a large distance. Check the property address and independently confirm walking distance and available transport.' },

  { category: 'PGs near colleges and workplaces', question: 'How do I find a PG near PES University?', answer: 'Search PES University or the surrounding area. Check the address and route to your campus, and ask the operator to confirm travel options.' },
  { category: 'PGs near colleges and workplaces', question: 'Where can I search for a PG near MS Ramaiah Institute of Technology?', answer: 'Enter MS Ramaiah or MSRIT in search. Confirm the exact property location and campus commute before deciding.' },
  { category: 'PGs near colleges and workplaces', question: 'How do I find a PG near IISc Bangalore?', answer: 'Search IISc or a nearby locality, review the property address, and check the route to your campus entrance at the hours you expect to travel.' },
  { category: 'PGs near colleges and workplaces', question: 'Can I find a PG near Christ University in Bengaluru?', answer: 'Search Christ University or the relevant campus neighbourhood. Confirm the campus location because routes differ between Bengaluru campuses.' },
  { category: 'PGs near colleges and workplaces', question: 'How can I find a PG near BMS College of Engineering?', answer: 'Search BMSCE or Basavanagudi and check the address and journey to the correct college entrance. Verify current availability with the property.' },
  { category: 'PGs near colleges and workplaces', question: 'How do I find accommodation near RV College of Engineering?', answer: 'Search RVCE or a nearby area. Verify the address, campus route and transport schedule before choosing a place.' },
  { category: 'PGs near colleges and workplaces', question: 'How can I find a PG near Dayananda Sagar College?', answer: 'Search DSCE or the campus neighbourhood. Confirm which campus you need and check the route from the property address.' },
  { category: 'PGs near colleges and workplaces', question: 'What is the best way to find a PG near an IT park in Bengaluru?', answer: 'Search the IT park or nearby neighbourhood, then compare commute routes at peak hours. Check the exact address with the property operator.' },
  { category: 'PGs near colleges and workplaces', question: 'Should I choose a PG based only on its distance from college?', answer: 'Distance is only one factor. Consider the actual route, transport availability, access and safety at your travel times, house rules and the written terms.' },
  { category: 'PGs near colleges and workplaces', question: 'How can students compare PGs near Bengaluru colleges?', answer: 'Compare confirmed address and facility details, commute, rules, deposit and rent terms provided by the property, and visit the room before paying.' },

  { category: 'PG rent, deposits and budget', question: 'How much does a PG cost in Bengaluru?', answer: 'Rent varies by location, room sharing, facilities and the operator. StayKolo only shows pricing where it is available and confirmed; ask the property for its current written price and inclusions.' },
  { category: 'PG rent, deposits and budget', question: 'What is the average PG rent in Bangalore for students?', answer: 'There is no single reliable price for every student or area. Compare current offers for the specific neighbourhood and room type, and confirm what the quoted rent includes.' },
  { category: 'PG rent, deposits and budget', question: 'How do I find an affordable PG in Bengaluru?', answer: 'Search several nearby neighbourhoods, compare the total monthly cost and commute, and ask for written details of rent, deposit, utilities and any other charges before agreeing.' },
  { category: 'PG rent, deposits and budget', question: 'What is usually included in PG rent?', answer: 'Inclusions differ by property. Ask whether food, Wi-Fi, electricity, water, cleaning or other services are included, and request the answer in writing.' },
  { category: 'PG rent, deposits and budget', question: 'Do PGs in Bengaluru charge a security deposit?', answer: 'Deposit requirements vary. Ask the operator for the amount, payment method, refund conditions and deductions in writing before paying.' },
  { category: 'PG rent, deposits and budget', question: 'How can I compare PG rent and deposit fairly?', answer: 'Compare the total move-in cost, recurring charges, included services, room occupancy and written refund conditions—not just the advertised monthly rent.' },
  { category: 'PG rent, deposits and budget', question: 'Are electricity charges included in PG rent?', answer: 'This depends on the property. Ask how electricity is billed, whether there are limits or separate charges, and how shared bills are calculated.' },
  { category: 'PG rent, deposits and budget', question: 'Are food and meals included in Bengaluru PG rent?', answer: 'Meal arrangements vary. Confirm whether meals are available, their schedule, any extra cost and what happens on days when meals are not served.' },
  { category: 'PG rent, deposits and budget', question: 'Can PG rent change after I move in?', answer: 'Review the written terms for rent changes and notice. Ask the operator to clarify any price adjustment before you sign or pay.' },
  { category: 'PG rent, deposits and budget', question: 'What payment proof should I keep when paying PG rent?', answer: 'Keep a receipt or written payment acknowledgement showing the amount, date, recipient and purpose. Do not share passwords or one-time verification codes to make a payment.' },

  { category: 'Facilities and verified listings', question: 'What does a StayKolo verified PG badge mean?', answer: 'The badge identifies a property profile that StayKolo has marked verified. It does not guarantee availability, quality, safety, pricing or a particular experience; confirm details directly and visit before committing.' },
  { category: 'Facilities and verified listings', question: 'Are all PG listings on StayKolo verified?', answer: 'No. StayKolo distinguishes the verified profile from local directory listings that have not been verified. Check the label shown on each result.' },
  { category: 'Facilities and verified listings', question: 'How can I check whether a PG listing is verified?', answer: 'Look for the “StayKolo verified profile” or “Verified by StayKolo” label on the listing. Directory results are explicitly shown as not verified by StayKolo.' },
  { category: 'Facilities and verified listings', question: 'Does a verified badge guarantee a room is available?', answer: 'No. Availability can change. Contact the property directly to confirm current vacancies, move-in dates and room options.' },
  { category: 'Facilities and verified listings', question: 'Does StayKolo guarantee the quality of a verified PG?', answer: 'A verified label is not a guarantee of quality or a substitute for a visit. Inspect the property, ask questions and review written terms before making a decision.' },
  { category: 'Facilities and verified listings', question: 'How do I check Wi-Fi availability in a PG?', answer: 'Ask whether Wi-Fi is currently provided, which areas it covers, any usage limits and whether the cost is included. Test the connection during a visit if it is important to you.' },
  { category: 'Facilities and verified listings', question: 'How do I confirm water availability at a PG?', answer: 'Ask about the water supply schedule, storage and any restrictions. Confirm the arrangement during a visit rather than assuming it is the same at every property.' },
  { category: 'Facilities and verified listings', question: 'How can I check the fan and room facilities before moving in?', answer: 'Inspect the specific room and test its fan, lights, sockets, doors and windows. Ask who handles repairs and how to report a fault.' },
  { category: 'Facilities and verified listings', question: 'Why does a directory listing show limited property details?', answer: 'Unverified directory records are kept limited to information available for the listing. Contact the property to confirm details; do not assume unlisted facilities or prices.' },
  { category: 'Facilities and verified listings', question: 'How can a PG owner request verification on StayKolo?', answer: 'Use the property listing or contact request form to submit a verification request. A request does not itself create a verified badge; wait for StayKolo confirmation.' },

  { category: 'Visits, safety and house rules', question: 'What should I check when visiting a PG in Bengaluru?', answer: 'Inspect the room, bathrooms, shared areas, locks, ventilation, water and internet. Confirm the address, access rules, charges and repair contact, then compare what you see with the written offer.' },
  { category: 'Visits, safety and house rules', question: 'What questions should I ask a PG owner before booking?', answer: 'Ask about rent, deposit, refund terms, facilities, meals, visitors, entry times, notice, maintenance and who you can contact. Request written answers for important terms.' },
  { category: 'Visits, safety and house rules', question: 'Should I visit a PG before paying a deposit?', answer: 'A visit can help you confirm the room and location. Avoid paying under pressure, verify who receives the payment and keep written terms and a receipt.' },
  { category: 'Visits, safety and house rules', question: 'How can I check whether a PG location is right for my commute?', answer: 'Travel the route at your usual hours if possible. Check walking connections, transport availability and the final route to the building rather than relying on distance alone.' },
  { category: 'Visits, safety and house rules', question: 'What safety details should I check in a PG?', answer: 'Check locks, building access, lighting, emergency exits and how visitors are handled. Ask who is available for urgent issues and use your own judgement during a visit.' },
  { category: 'Visits, safety and house rules', question: 'How do I understand PG visitor rules?', answer: 'Ask the operator to explain visitor hours, guest access and any restrictions. Make sure the rules are clear before you agree to move in.' },
  { category: 'Visits, safety and house rules', question: 'What should I check about PG entry and curfew rules?', answer: 'Ask about entry hours, late access, keys or access cards, and what to do if you return late. Confirm the rules in writing if they affect your routine.' },
  { category: 'Visits, safety and house rules', question: 'How can I report a maintenance issue at a PG?', answer: 'Ask who handles repairs and which channel to use. Record the issue and when you reported it, especially if it affects a facility included in your written terms.' },
  { category: 'Visits, safety and house rules', question: 'What should I do if the PG room differs from the listing?', answer: 'Raise the difference with the operator before paying or moving in. Request an updated written agreement that accurately describes the room and facilities.' },
  { category: 'Visits, safety and house rules', question: 'How do I avoid PG rental scams in Bengaluru?', answer: 'Verify the property and recipient independently, visit or arrange a trusted inspection, avoid pressure payments, keep receipts and never share account passwords or one-time codes.' },

  { category: 'Booking, documents and moving in', question: 'How do I book a PG in Bengaluru through StayKolo?', answer: 'Use StayKolo to discover and review property information, then contact the property directly to confirm availability and booking terms. Do not assume a search result reserves a room.' },
  { category: 'Booking, documents and moving in', question: 'Can I book a PG directly from a listing?', answer: 'Listings help you explore options; booking arrangements must be confirmed with the property. Ask the operator about the process and get the terms in writing.' },
  { category: 'Booking, documents and moving in', question: 'What documents are needed to move into a PG?', answer: 'Requirements vary by property. Ask the operator which identification or paperwork is required and how it will be handled before sharing personal documents.' },
  { category: 'Booking, documents and moving in', question: 'Should I sign a PG agreement before moving in?', answer: 'Read and understand the written terms before moving in or paying. Make sure rent, deposit, notice, services and refund conditions are clear, and keep a copy.' },
  { category: 'Booking, documents and moving in', question: 'What should a PG rental agreement include?', answer: 'Check that it identifies the parties, room or occupancy, rent, deposit, payment schedule, included services, rules, notice period and applicable refund conditions.' },
  { category: 'Booking, documents and moving in', question: 'How early should I search for a PG in Bengaluru?', answer: 'Start early enough to compare locations and arrange visits before your move date. Availability depends on the property, so confirm dates directly with operators.' },
  { category: 'Booking, documents and moving in', question: 'Can I reserve a PG before visiting?', answer: 'Reservation policies differ. Ask the operator about any hold fee, refund terms and proof of reservation, and verify the property before transferring money.' },
  { category: 'Booking, documents and moving in', question: 'What should I do on PG move-in day?', answer: 'Confirm your arrival and contact person, inspect the room, document any existing damage, test key facilities and save a copy of your agreement and payment receipts.' },
  { category: 'Booking, documents and moving in', question: 'How do I give notice before leaving a PG?', answer: 'Check the notice requirement in your agreement and send notice through the agreed written channel. Confirm the move-out date, outstanding charges and deposit settlement.' },
  { category: 'Booking, documents and moving in', question: 'How can I get my PG deposit back?', answer: 'Follow the written move-out and notice terms, document the room condition, settle agreed charges and request a written deposit settlement from the operator.' },

  { category: 'Room types and resident preferences', question: 'How do I find a single-sharing PG in Bengaluru?', answer: 'Search the area you prefer and ask each property whether a single-sharing room is currently available. Not every listing includes confirmed room-type details.' },
  { category: 'Room types and resident preferences', question: 'What is the difference between single and shared PG rooms?', answer: 'A single room is generally occupied by one resident, while a shared room has multiple residents. Confirm the exact occupancy, privacy arrangements and price with the operator.' },
  { category: 'Room types and resident preferences', question: 'How can I find a ladies PG in Bangalore?', answer: 'Search for the locality and relevant terms, then confirm the property’s current resident policy and room availability directly before visiting.' },
  { category: 'Room types and resident preferences', question: 'How can I find a gents PG in Bengaluru?', answer: 'Search for your preferred locality and confirm the operator’s current resident policy, room type and availability.' },
  { category: 'Room types and resident preferences', question: 'Are co-living and PG accommodation the same?', answer: 'The terms can describe different arrangements. Ask the operator about occupancy, services, house rules, agreement terms and who manages the property.' },
  { category: 'Room types and resident preferences', question: 'Can working professionals stay in Bengaluru PGs?', answer: 'Resident eligibility varies by property. Confirm the operator’s policy, access hours and any documentation requirements before booking.' },
  { category: 'Room types and resident preferences', question: 'Are students allowed in every PG?', answer: 'Policies differ between properties. Ask whether students are accepted and whether any campus-related or guardian requirements apply.' },
  { category: 'Room types and resident preferences', question: 'How do I check the actual number of people sharing a PG room?', answer: 'Ask to see the specific room and confirm its intended occupancy with the operator. Include the agreed sharing arrangement in your written terms.' },
  { category: 'Room types and resident preferences', question: 'Can I bring my own furniture to a PG?', answer: 'Ask the operator first. Space, furniture policies and storage arrangements differ from property to property.' },
  { category: 'Room types and resident preferences', question: 'Are pets allowed in Bengaluru PGs?', answer: 'Pet policies vary. Ask the property directly and get permission and any related conditions in writing before moving in with a pet.' },

  { category: 'Using StayKolo', question: 'How does StayKolo help people find PGs?', answer: 'StayKolo provides a Bengaluru PG directory with listing details and search by area, college or landmark. Verified profiles and unverified directory records are labeled separately.' },
  { category: 'Using StayKolo', question: 'How do I open a PG location in Google Maps?', answer: 'Open a listing that provides a map link and select its Google Maps option. Confirm the result matches the property address before travelling.' },
  { category: 'Using StayKolo', question: 'Can I compare PG listings on StayKolo?', answer: 'Where comparison is available, use the compare control on eligible verified profiles. Review the details provided and confirm current information with the property.' },
  { category: 'Using StayKolo', question: 'Why can’t I find a PG by its exact name?', answer: 'Try searching its neighbourhood or a distinctive part of its name. Check spelling and clear filters if needed; some local directory records have limited details.' },
  { category: 'Using StayKolo', question: 'How do I clear my PG search filters?', answer: 'On the search page, select “Clear filters” to reset the current query and browse the available results again.' },
  { category: 'Using StayKolo', question: 'How can I contact StayKolo about a listing?', answer: 'Use the Contact Us page to send a question or request. For current room availability and property-specific terms, contact the property operator directly.' },
  { category: 'Using StayKolo', question: 'How can a property owner update a PG listing?', answer: 'Use the property contact or listing request form and provide accurate details. StayKolo may follow up before publishing or changing verification status.' },
  { category: 'Using StayKolo', question: 'Does submitting a listing request mean a PG is verified?', answer: 'No. A submission is a request for review and does not grant a verified badge. Wait for confirmation from StayKolo.' },
  { category: 'Using StayKolo', question: 'How do I read PG advice on the StayKolo blog?', answer: 'Visit the Blogs page for practical Bengaluru guides about searching, visiting and moving into a PG. The FAQ page also answers common search and rental questions.' },
  { category: 'Using StayKolo', question: 'Where can I find answers about PG searches on StayKolo?', answer: 'Browse this FAQ page by topic or use the PG search page to explore listings. Contact StayKolo if you need help with the website.' },

  { category: 'Moving to Bengaluru', question: 'What should I pack when moving into a Bengaluru PG?', answer: 'Pack everyday clothing, personal medication, chargers and toiletries. Confirm what furniture, bedding or utensils the property supplies before bringing bulky items.' },
  { category: 'Moving to Bengaluru', question: 'How do I plan a commute from a Bengaluru PG?', answer: 'Check your route at typical travel times, including the first and last mile. Confirm transit schedules and walk the route if possible before choosing a property.' },
  { category: 'Moving to Bengaluru', question: 'What should I inspect in a PG bathroom?', answer: 'Check cleanliness, ventilation, water availability, taps, drainage, locks and hot-water arrangements if relevant. Report any issue and clarify responsibility before moving in.' },
  { category: 'Moving to Bengaluru', question: 'How can I check mobile network coverage at a PG?', answer: 'Test your own network inside the room and common areas during a visit. Coverage can vary between floors and buildings.' },
  { category: 'Moving to Bengaluru', question: 'What should I ask about cleaning and laundry in a PG?', answer: 'Confirm what cleaning is provided, how often it happens, whether laundry facilities are available and whether there are separate charges or usage rules.' },
  { category: 'Moving to Bengaluru', question: 'How can I settle into a new PG smoothly?', answer: 'Learn the house rules, save the operator’s maintenance contact, test essential facilities and locate nearby groceries, pharmacies and your regular transport route.' },
  { category: 'Moving to Bengaluru', question: 'What should I do if a PG facility stops working?', answer: 'Report the problem promptly using the property’s stated maintenance channel. Keep a record of the report and follow up with the responsible operator.' },
  { category: 'Moving to Bengaluru', question: 'How do I choose between two PGs in different Bengaluru areas?', answer: 'Compare total costs, the exact commute, room conditions, facilities, rules and written terms. Visit both options and choose based on your own needs.' },
  { category: 'Moving to Bengaluru', question: 'Is a PG near a bus stop always the best choice?', answer: 'Not necessarily. Check the route, service frequency at your travel times, walkability, safety and distance to your actual destination.' },
  { category: 'Moving to Bengaluru', question: 'How do I make a confident PG decision in Bangalore?', answer: 'Use the listing to shortlist, inspect the exact property, verify current details with the operator and read the written terms before paying or moving in.' },
];

const categories = [...new Set(faqItems.map((item) => item.category))];

export function FaqPage() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;
    document.title = 'Bengaluru PG FAQs: Rent, Areas & Booking | StayKolo';
    if (description) {
      description.content = 'Answers to 100 common questions about finding a PG in Bengaluru, neighbourhoods, college commutes, rent, verification, visits and booking.';
    }
    return () => {
      document.title = previousTitle;
      if (description && previousDescription !== undefined) description.content = previousDescription;
    };
  }, []);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };

  return (
    <div className="min-h-[100dvh] bg-[#f4f1e9] text-[#1b1d18]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteNav />
      <main>
        <section className="border-b border-[#dedbd0] bg-[#eeebe2]">
          <div className="sk-container py-12 sm:py-16">
            <p className="sk-eyebrow">StayKolo help</p>
            <h1 className="sk-display mt-3 max-w-3xl text-[36px] font-bold leading-tight tracking-[-.04em] sm:text-[52px]">Bengaluru PG search FAQs</h1>
            <p className="mt-4 max-w-2xl text-[14px] leading-7 text-[#686a61]">
              Straightforward answers to common questions about finding a PG in Bengaluru, comparing locations, checking listing details and planning a visit.
            </p>
            <Link href="/search" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#1b1d18] px-5 py-3 text-[12px] font-bold text-white transition hover:bg-[#3a3d32]">
              <Search size={14} /> Find a PG <ArrowRight size={14} />
            </Link>
            <span className="ml-4 text-xs text-[#77796f]">{faqItems.length} frequently asked questions</span>
          </div>
        </section>
        <div className="sk-container grid gap-8 py-10 sm:py-14 lg:grid-cols-[220px_minmax(0,1fr)]">
          <nav aria-label="FAQ topics" className="h-fit rounded-2xl border border-[#dedbd0] bg-[#f7f5ed] p-4 lg:sticky lg:top-24">
            <h2 className="text-xs font-bold uppercase tracking-[.12em] text-[#77796f]">Browse topics</h2>
            <ul className="mt-3 space-y-2">
              {categories.map((category, index) => (
                <li key={category}><a href={`#faq-topic-${index}`} className="text-xs font-semibold text-[#526b1b] hover:underline">{category}</a></li>
              ))}
            </ul>
          </nav>
          <div className="min-w-0 space-y-10">
            {categories.map((category, categoryIndex) => (
              <section key={category} id={`faq-topic-${categoryIndex}`} className="scroll-mt-24">
                <h2 className="sk-display text-[22px] font-bold text-[#1b1d18] sm:text-[26px]">{category}</h2>
                <div className="mt-4 divide-y divide-[#dedbd0] overflow-hidden rounded-2xl border border-[#dedbd0] bg-[#f7f5ed]">
                  {faqItems.filter((item) => item.category === category).map(({ question, answer }) => (
                    <details key={question} className="group px-4 py-4 sm:px-5">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[13px] font-bold text-[#1b1d18] [&::-webkit-details-marker]:hidden">
                        {question}
                        <ChevronDown size={16} className="mt-0.5 shrink-0 text-[#728f2c] transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="mt-3 max-w-3xl pr-6 text-[12px] leading-6 text-[#686a61]">{answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            ))}
            <section className="rounded-2xl border border-[#dedbd0] bg-[#eeebe2] p-5 sm:p-7">
              <h2 className="sk-display text-xl font-bold">Need help finding the right stay?</h2>
              <p className="mt-2 text-sm leading-6 text-[#686a61]">Search Bengaluru listings or read practical guides before arranging a visit.</p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs font-bold text-[#526b1b]">
                <Link href="/search" className="inline-flex items-center gap-1">Search PG listings <ArrowRight size={13} /></Link>
                <Link href="/blogs" className="inline-flex items-center gap-1">Read Bengaluru PG guides <ArrowRight size={13} /></Link>
                <Link href="/contact" className="inline-flex items-center gap-1">Contact StayKolo <ArrowRight size={13} /></Link>
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
