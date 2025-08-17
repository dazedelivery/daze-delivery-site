"use client";
import React, { useEffect, useMemo, useState } from "react";
import { BRAND } from "@/lib/site";

const Star = () => (<svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>);
const Chip = ({children}:{children: React.ReactNode}) => (<span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium shadow-sm">{children}</span>);
const Section: React.FC<React.PropsWithChildren<{id?: string; className?: string; title?: string; subtitle?: string;}>> =
({ id, className = "", title, subtitle, children }) => (<section id={id} className={`mx-auto w-full max-w-6xl px-4 md:px-6 ${className}`}>
  {title && (<div className="mb-6 text-center"><h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>{subtitle && <p className="mt-2 text-sm md:text-base">{subtitle}</p>}</div>)}{children}</section>);
const CTA = ({ href = "#", children }: { href?: string; children: React.ReactNode; }) => (
  <a href={href} className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 bg-black text-white">{children}</a>
);
const AgeGate: React.FC<{onAllow: () => void}> = ({ onAllow }) => (
  <div role="dialog" aria-modal="true" className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
    <div className="max-w-md w-full rounded-3xl bg-white p-6 shadow-2xl">
      <div className="space-y-3 text-center"><h2 className="text-2xl font-semibold">21+ Only</h2>
        <p className="text-sm text-gray-600">You must be 21+ (or 18+ with valid medical card) to enter this website.</p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button onClick={onAllow} className="rounded-xl bg-black px-5 py-2.5 text-white font-medium">I am 21+</button>
          <a href="https://www.google.com" className="rounded-xl border px-5 py-2.5 font-medium">Exit</a>
        </div>
      </div>
    </div>
  </div>
);

const JsonLd: React.FC = () => {
  const data = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BRAND.NAME, image: [`https://${BRAND.DOMAIN}/logo.svg`],
    url: `https://${BRAND.DOMAIN}`, telephone: BRAND.PHONE,
    address: {"@type":"PostalAddress","streetAddress":"Service Only – No Walk-Ins","addressLocality":"Los Angeles","addressRegion":"CA","postalCode":"900**","addressCountry":"US"},
    areaServed: BRAND.SERVICE_AREAS,
    openingHoursSpecification: [{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"opens":BRAND.HOURS.open,"closes":BRAND.HOURS.close}],
    sameAs: [`https://instagram.com/${BRAND.IG_HANDLE}`, `https://www.tiktok.com/@${BRAND.TIKTOK_HANDLE}`]
  }), []);
  return (<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />);
};

const FeatureCard: React.FC<{title: string; text: string;}> = ({ title, text }) => (
  <div className="rounded-2xl border p-5 shadow-sm hover:shadow-md transition">
    <div className="mb-3 flex items-center gap-3"><h3 className="text-lg font-semibold">{title}</h3></div>
    <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
  </div>
);

const Testimonial: React.FC<{name: string; text: string; stars?: number}> = ({ name, text, stars = 5 }) => (
  <div className="rounded-2xl border p-5 shadow-sm">
    <div className="flex items-center gap-2 text-yellow-500" aria-label={`${stars} star rating`}>
      {Array.from({length: stars}).map((_, i) => <Star key={i} />)}
    </div>
    <p className="mt-3 text-sm text-gray-700">“{text}”</p><p className="mt-2 text-xs font-medium text-gray-500">— {name}</p>
  </div>
);

export default function Page() {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => { const ok = typeof window!=='undefined' && localStorage.getItem('daze_age_ok')==='yes'; if (ok) setAllowed(true); }, []);
  const allow = () => { localStorage.setItem('daze_age_ok','yes'); setAllowed(true); };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {!allowed && <AgeGate onAllow={allow} />}
      <JsonLd />

      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur border-b">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <a href="#" className="flex items-center gap-2"><img src="/logo.svg" className="h-9 w-9 rounded-2xl"/><span className="text-base md:text-lg font-semibold">{BRAND.NAME}</span></a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a className="hover:underline" href="#menu">Menu</a>
            <a className="hover:underline" href="#areas">Service Areas</a>
            <a className="hover:underline" href="#how">How It Works</a>
            <a className="hover:underline" href="#reviews">Reviews</a>
            <a className="hover:underline" href="#legal">Compliance</a>
          </nav>
          <CTA href={BRAND.DUTCHIE_LINK}>Order Now</CTA>
        </div>
      </header>

      <main>
        <Section className="pt-12 md:pt-20">
          <div className="grid gap-10 md:grid-cols-2 md:gap-12 items-center">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <Chip>Fast LA Delivery</Chip><Chip>Licensed • Lab-Tested</Chip><Chip>Open {BRAND.HOURS.open} – {BRAND.HOURS.close}</Chip>
              </div>
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight">Premium Cannabis, Delivered Across Los Angeles — Fast.</h1>
              <p className="mt-4 text-gray-600 md:text-lg">Flower, vapes, edibles, and more. Real-time menu, transparent pricing, and friendly support. First-time customers get <span className="font-semibold">20% off</span>.</p>
              <div className="mt-6 flex flex-wrap items-center gap-3"><CTA href={BRAND.DUTCHIE_LINK}>Browse Menu</CTA><a href="#how" className="inline-flex items-center rounded-2xl border px-5 py-3 text-sm font-semibold hover:bg-gray-50">How it works</a></div>
              <p className="mt-3 text-xs text-gray-500">*Discount applied automatically at checkout for eligible first orders.</p>
            </div>
            <div className="relative"><div className="aspect-[4/3] w-full rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner"/><div className="absolute -bottom-4 -left-4 rounded-2xl border bg-white p-3 shadow-md"><div className="flex items-center gap-2 text-yellow-500"><Star/><Star/><Star/><Star/><Star/></div><p className="mt-1 text-xs">“Fastest delivery in Hermosa. Super friendly driver.” — Jay</p></div></div>
          </div>
        </Section>

        <Section id="menu" className="py-12" title="Live Menu" subtitle="Updated in real time. Tap to order.">
          <div className="rounded-3xl border shadow-sm p-4 md:p-6">
            <div className="grid gap-4 md:grid-cols-3">
              {["Flower","Vapes","Edibles"].map((cat) => (
                <div key={cat} className="rounded-2xl border p-4"><h3 className="font-semibold">{cat}</h3><p className="mt-1 text-sm text-gray-600">Popular picks, always in stock.</p><a href={BRAND.DUTCHIE_LINK} className="mt-3 inline-block text-sm font-semibold underline">Shop {cat}</a></div>
              ))}
            </div>
            <div className="mt-5 flex justify-center"><CTA href={BRAND.DUTCHIE_LINK}>Open Full Menu</CTA></div>
          </div>
        </Section>

        <Section id="areas" className="py-12" title="Service Areas" subtitle="Same-day delivery across the Westside, South Bay, and central LA.">
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">{BRAND.SERVICE_AREAS.map(n => (<div key={n} className="rounded-xl border p-3 text-sm hover:bg-gray-50">{n}</div>))}</div>
          <p className="mt-3 text-xs text-gray-500">Outside these areas? Text us at <a className="underline" href={`tel:${BRAND.PHONE}`}>{BRAND.PHONE}</a>.</p>
        </Section>

        <Section id="how" className="py-12" title="How It Works" subtitle="Simple, secure, compliant.">
          <div className="grid gap-5 md:grid-cols-3">
            <FeatureCard title="1. Verify Age" text="Upload a valid ID at checkout. 21+ (or 18+ w/ medical)." />
            <FeatureCard title="2. Choose Items" text="Browse live menu by category or brand. Track ETA via SMS." />
            <FeatureCard title="3. Receive Delivery" text="Meet your driver with ID. Tap-to-pay or cash (where allowed)." />
          </div>
        </Section>

        <Section id="reviews" className="py-12" title="Customer Love" subtitle="Rated 4.9 by LA locals.">
          <div className="grid gap-5 md:grid-cols-3">
            <Testimonial name="Maya K." text="Legit the fastest service on the Westside. Great selection too." />
            <Testimonial name="Andre P." text="Driver was polite, text updates were on point. Will reorder." />
            <Testimonial name="Roxanne L." text="Prices are solid and they always have my favorite carts." />
          </div>
        </Section>

        <Section className="py-12" title="Get Deals & Drops" subtitle="Join the list for weekly specials and new strains.">
          <form className="mx-auto flex max-w-xl flex-col gap-3 rounded-2xl border p-4 md:flex-row md:items-center md:gap-2">
            <input required type="email" name="email" placeholder="you@email.com" className="h-11 flex-1 rounded-xl border px-3 outline-none focus:ring-2 focus:ring-black"/>
            <button type="submit" className="h-11 rounded-xl bg-black px-5 text-white font-semibold hover:shadow-md">Subscribe</button>
            <p className="md:ml-3 text-xs text-gray-500">By subscribing, you agree to receive emails/SMS from {BRAND.NAME}.</p>
          </form>
        </Section>

        <Section className="py-12">
          <div className="prose prose-sm md:prose lg:prose-lg max-w-none">
            <h2>Weed Delivery in Los Angeles — Fast, Compliant, Local</h2>
            <p>{BRAND.NAME} is a licensed cannabis delivery service operating across Los Angeles, the South Bay, and the Westside. We offer same-day delivery on premium flower, vapes, edibles, concentrates, and wellness products.</p>
            <h3>Local Areas We Serve</h3>
            <p>From Downtown LA to Santa Monica and the South Bay, we deliver to neighborhoods including West Hollywood, Venice, Culver City, Hermosa Beach, Manhattan Beach, and Redondo Beach.</p>
            <h3>First-Time Customer Deals</h3>
            <p>New to {BRAND.NAME}? Enjoy 20% off your first order plus rotating weekly specials.</p>
          </div>
        </Section>

        <Section id="legal" className="py-12">
          <div className="rounded-2xl border p-5">
            <h2 className="text-lg font-semibold">Compliance & Legal</h2>
            <ul className="mt-3 list-disc pl-5 text-sm text-gray-600 space-y-1">
              <li>21+ only (or 18+ with a valid medical recommendation).</li>
              <li>Valid government-issued ID required upon delivery.</li>
              <li>All products are sourced from state-licensed distributors and are lab-tested as required by California law.</li>
              <li>Delivery hours: {BRAND.HOURS.open}–{BRAND.HOURS.close} (subject to local regulations).</li>
            </ul>
            <p className="mt-3 text-xs text-gray-500">© {new Date().getFullYear()} {BRAND.NAME}. All rights reserved. Licensed delivery service.</p>
          </div>
        </Section>
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2"><img src="/logo.svg" className="h-8 w-8 rounded-xl"/><span className="font-semibold">{BRAND.NAME}</span></div>
              <p className="mt-3 text-sm text-gray-600">Serving Los Angeles & the South Bay. Text <a className="underline" href={`tel:${BRAND.PHONE}`}>{BRAND.PHONE}</a>.</p>
            </div>
            <div>
              <h4 className="font-semibold">Explore</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a className="hover:underline" href="#menu">Menu</a></li>
                <li><a className="hover:underline" href="#areas">Service Areas</a></li>
                <li><a className="hover:underline" href="#reviews">Reviews</a></li>
                <li><a className="hover:underline" href="#legal">Compliance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Follow</h4>
              <ul className="mt-2 space-y-1 text-sm">
                <li><a className="hover:underline" href={`https://instagram.com/${BRAND.IG_HANDLE}`}>Instagram</a></li>
                <li><a className="hover:underline" href={`https://www.tiktok.com/@${BRAND.TIKTOK_HANDLE}`}>TikTok</a></li>
                <li><a className="hover:underline" href={`mailto:${BRAND.EMAIL}`}>Email</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
