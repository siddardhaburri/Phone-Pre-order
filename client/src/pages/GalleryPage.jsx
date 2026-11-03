import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { SMARTPHONES } from '../data/smartphones';
import HeaderNav from '../components/HeaderNav';

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter phones cleanly if search is used
  const filteredPhones = useMemo(() => {
    if (!searchQuery.trim()) return SMARTPHONES;
    const query = searchQuery.toLowerCase().trim();
    return SMARTPHONES.filter(
      (phone) =>
        phone.name.toLowerCase().includes(query) ||
        phone.brand.toLowerCase().includes(query) ||
        phone.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-white text-slate-950 flex flex-col selection:bg-slate-900 selection:text-white">
      {/* Minimal Sticky Navigation */}
      <HeaderNav searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Apple-Style Quick Device Selector Ribbon */}
      <div className="border-b border-gray-100 bg-[#FCFCFD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-start sm:justify-center gap-6 sm:gap-12 min-w-max mx-auto">
            {SMARTPHONES.map((phone) => (
              <Link
                key={phone.id}
                to={`/devices/${phone.id}`}
                className="group flex flex-col items-center text-center select-none"
              >
                <div className="w-12 h-14 sm:w-14 sm:h-16 flex items-center justify-center p-1 transition-transform duration-200 group-hover:-translate-y-1">
                  <img
                    src={phone.image}
                    alt={phone.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <span className="mt-1 text-[11px] sm:text-xs font-semibold text-slate-900 group-hover:text-slate-600 transition-colors">
                  {phone.name}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {phone.startingPrice}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 sm:py-20 lg:py-24">
        {/* Large Editorial Headline */}
        <section className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 block mb-3">
            NEXTGEN MOBILE 2026 Collection
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 leading-[1.08]">
            Flagships. <br />
            <span className="text-slate-400">Designed for tomorrow.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-500 font-normal leading-relaxed max-w-2xl mx-auto">
            Explore four vision-defining smartphones. Aerospace alloys, pioneering silicon, and breakthrough optical systems—presented with pure minimalist restraint.
          </p>
        </section>

        {/* Clean Smartphone Collection Showcase */}
        <section id="collection" className="scroll-mt-24">
          {filteredPhones.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
              <p className="text-base font-semibold text-slate-900">No smartphones found</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for Apple, Samsung, or Motorola</p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 rounded-full text-xs font-semibold bg-slate-950 text-white"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8">
              {filteredPhones.map((phone) => (
                <Link
                  key={phone.id}
                  to={`/devices/${phone.id}`}
                  className="group flex flex-col bg-white rounded-3xl border border-gray-200/80 hover:border-gray-300 p-6 sm:p-7 transition-all duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.04)] select-none"
                >
                  {/* Category & Brand Eyebrow */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                      {phone.brand}
                    </span>
                    <span className="text-[11px] font-medium text-slate-900">
                      {phone.startingPrice}
                    </span>
                  </div>

                  {/* Device Name */}
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 group-hover:text-slate-700 transition-colors">
                    {phone.name}
                  </h2>

                  {/* Minimal Subtitle */}
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    {phone.category}
                  </p>

                  {/* Large High-Quality Product Image Container */}
                  <div className="my-6 sm:my-8 w-full aspect-[4/5] bg-[#F5F5F7] rounded-2xl p-6 sm:p-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.02]">
                    <img
                      src={phone.image}
                      alt={phone.name}
                      className="w-full h-full object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Color Finishes Swatches & Explore CTA */}
                  <div className="mt-auto pt-2 flex items-center justify-between border-t border-gray-100">
                    {/* Swatches Preview */}
                    <div className="flex items-center gap-1.5" title="Available Finishes">
                      {phone.colors.map((c) => (
                        <span
                          key={c.id}
                          className="w-3 h-3 rounded-full border border-gray-300 shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>

                    {/* Explore Link */}
                    <span className="inline-flex items-center text-xs font-semibold text-slate-900 group-hover:text-slate-600 transition-colors">
                      <span>Explore</span>
                      <ChevronRight className="w-3.5 h-3.5 ml-0.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Editorial Brand Note */}
        <section className="mt-24 sm:mt-32 pt-16 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
            <div>
              <h3 className="text-sm font-semibold text-slate-950 tracking-tight mb-1">
                Pioneering Materials
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Grade 5 titanium alloys, liquidmetal multi-axis hinges, and satin ceramic armor curated for unparalleled structural resilience.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-950 tracking-tight mb-1">
                Next-Generation Silicon
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fabricated on 2nm and 3nm leading nodes with dedicated neural engines engineered for on-device generative intelligence.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-950 tracking-tight mb-1">
                Transparent Specifications
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Detailed technical sheets covering display nodes, camera sensor sizes, battery capacities, and physical dimensions.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Apple-Style Minimalist Footer */}
      <footer className="border-t border-gray-200 bg-[#FAFAFC] py-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="text-[11px] leading-relaxed text-slate-400">
            * Specification Notice: Device specifications, pricing, and launch dates represent concept projections based on industry roadmaps and forecasts. All trademarks, logos, and brand names are the property of their respective owners.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-200/60 gap-3 text-slate-400 text-[11px]">
            <div>Copyright © {new Date().getFullYear()} NEXTGEN MOBILE Inc. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <Link to="/" className="hover:text-slate-900 transition-colors">Privacy Policy</Link>
              <Link to="/" className="hover:text-slate-900 transition-colors">Terms of Use</Link>
              <Link to="/" className="hover:text-slate-900 transition-colors">Legal</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
