import React, { useState } from 'react';
import { 
  Monitor, 
  Cpu, 
  HardDrive, 
  Camera, 
  BatteryCharging, 
  Zap, 
  Shield, 
  Ruler, 
  Weight, 
  Layers, 
  ChevronDown 
} from 'lucide-react';

// 10 Expandable Technical Specification Categories
export const SPEC_CATEGORIES = [
  { id: 'display', title: 'Display', icon: Monitor },
  { id: 'processor', title: 'Processor', icon: Cpu },
  { id: 'ramStorage', title: 'RAM & Storage', icon: HardDrive },
  { id: 'camera', title: 'Camera System', icon: Camera },
  { id: 'battery', title: 'Battery Capacity', icon: BatteryCharging },
  { id: 'charging', title: 'Charging Speed', icon: Zap },
  { id: 'materials', title: 'Materials & Build', icon: Shield },
  { id: 'dimensions', title: 'Dimensions', icon: Ruler },
  { id: 'weight', title: 'Weight', icon: Weight },
  { id: 'os', title: 'Operating System', icon: Layers },
];

export default function TechSpecsAccordion({ phone }) {
  // All sections initially collapsed
  const [openSections, setOpenSections] = useState([]);

  const toggleSection = (id) => {
    setOpenSections(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const allOpen = openSections.length === SPEC_CATEGORIES.length;
  const toggleAll = () => {
    if (allOpen) {
      setOpenSections([]);
    } else {
      setOpenSections(SPEC_CATEGORIES.map(c => c.id));
    }
  };

  return (
    <div className="w-full">
      {/* Accordion Controls Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-slate-400 block mb-0.5">
            Complete Overview
          </span>
          <h3 className="text-lg font-semibold text-slate-950 tracking-tight">
            Technical Specifications
          </h3>
        </div>

        <button
          type="button"
          onClick={toggleAll}
          className="text-xs font-semibold text-slate-500 hover:text-slate-950 transition-colors py-1 px-3 rounded-full hover:bg-gray-100"
        >
          {allOpen ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* 10 Expandable Sections Container */}
      <div className="border border-gray-200 rounded-3xl bg-white overflow-hidden divide-y divide-gray-200 shadow-none">
        {SPEC_CATEGORIES.map((category) => {
          const Icon = category.icon;
          const isOpen = openSections.includes(category.id);
          const items = (phone.sections && phone.sections[category.id]) || [];

          return (
            <div key={category.id} className="transition-colors">
              <button
                type="button"
                onClick={() => toggleSection(category.id)}
                aria-expanded={isOpen}
                className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-gray-50/60 transition-colors group focus:outline-none"
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors shrink-0">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-slate-950 tracking-tight">
                    {category.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
                    {items.length} specifications
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 group-hover:text-slate-950 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-slate-950' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Smooth CSS Grid Row Expansion */}
              <div
                className={`grid transition-[grid-template-rows] duration-250 ease-out ${
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 py-4 bg-[#FAFAFA] border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                      {items.map((item, idx) => (
                        <div
                          key={idx}
                          className="py-3 grid grid-cols-1 sm:grid-cols-12 gap-1.5 sm:gap-6 text-xs sm:text-sm"
                        >
                          <dt className="sm:col-span-4 text-slate-500 font-medium">
                            {item.label}
                          </dt>
                          <dd className="sm:col-span-8 text-slate-950 font-medium leading-relaxed">
                            {item.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

