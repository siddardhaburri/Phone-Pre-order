import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronRight, 
  Check, 
  X,
  Ruler,
  Loader2,
  AlertCircle,
  Calendar,
  Smartphone,
  User,
  Phone,
  Mail,
  Receipt
} from 'lucide-react';
import { SMARTPHONES } from '../data/smartphones';
import HeaderNav from '../components/HeaderNav';
import TechSpecsAccordion from '../components/TechSpecsAccordion';

export default function DeviceDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const phone = SMARTPHONES.find(p => p.id === id);

  // Active color finish selector
  const [selectedColor, setSelectedColor] = useState(phone?.colors?.[0] || null);

  // Pre-Order Modal State: 'idle' | 'confirm' | 'form' | 'success'
  const [modalStep, setModalStep] = useState('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Customer Form Data (exactly 3 required customer fields)
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: ''
  });

  // Form Field Validation Errors
  const [formErrors, setFormErrors] = useState({});

  // Saved Booking Record from MongoDB Atlas
  const [savedBooking, setSavedBooking] = useState(null);

  // Update selected color when phone id changes
  useEffect(() => {
    if (phone) {
      setSelectedColor(phone.colors[0]);
      closeModal();
      window.scrollTo(0, 0);
    }
  }, [id, phone]);

  if (!phone) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center text-slate-950">
        <h1 className="text-2xl font-bold tracking-tight mb-2">Device Not Found</h1>
        <p className="text-sm text-slate-500 mb-6">The requested smartphone does not exist in the collection.</p>
        <Link
          to="/"
          className="px-6 py-2.5 rounded-full text-xs font-semibold bg-slate-950 text-white hover:bg-slate-800 transition-colors"
        >
          Return to Devices
        </Link>
      </div>
    );
  }

  // Open the initial pre-order confirmation interface
  const openPreOrderModal = () => {
    setModalStep('confirm');
    setApiError(null);
    setFormErrors({});
  };

  // Close and reset modal state
  const closeModal = () => {
    setModalStep('idle');
    setIsSubmitting(false);
    setApiError(null);
    setFormErrors({});
    if (modalStep === 'success') {
      setFormData({ fullName: '', phoneNumber: '', email: '' });
      setSavedBooking(null);
    }
  };

  // Client-side validation for the 3 customer fields
  const validateForm = () => {
    const errors = {};

    // 1. Full Name: required, not empty
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required.';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters.';
    }

    // 2. Phone Number: valid Indian mobile number (10 digits starting with 6-9)
    const cleanedPhone = formData.phoneNumber.replace(/\D/g, '');
    let normalizedPhone = cleanedPhone;
    if (cleanedPhone.length === 12 && cleanedPhone.startsWith('91')) {
      normalizedPhone = cleanedPhone.substring(2);
    } else if (cleanedPhone.length === 11 && cleanedPhone.startsWith('0')) {
      normalizedPhone = cleanedPhone.substring(1);
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required.';
    } else if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
      errors.phoneNumber = 'Please enter a valid 10-digit Indian mobile number (e.g. 9876543210).';
    }

    // 3. Email: valid email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle customer details form submission to MongoDB Atlas
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent duplicate submissions

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setApiError(null);

    try {
      // Normalize phone number for API payload
      let cleanedPhone = formData.phoneNumber.replace(/\D/g, '');
      if (cleanedPhone.length === 12 && cleanedPhone.startsWith('91')) {
        cleanedPhone = cleanedPhone.substring(2);
      } else if (cleanedPhone.length === 11 && cleanedPhone.startsWith('0')) {
        cleanedPhone = cleanedPhone.substring(1);
      }

      const payload = {
        fullName: formData.fullName.trim(),
        phoneNumber: cleanedPhone,
        email: formData.email.trim().toLowerCase(),
        deviceName: phone.name,
        devicePrice: phone.price
      };

      const response = await fetch('/api/preorders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error?.message || 'Failed to register your pre-order. Please check your details and try again.'
        );
      }

      // Display success only after MongoDB confirms the record was saved
      setSavedBooking(data.preOrder);
      setModalStep('success');
    } catch (err) {
      console.error('Pre-order registration error:', err);
      setApiError(err.message || 'An unexpected network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Other phones for bottom switcher
  const otherPhones = SMARTPHONES.filter(p => p.id !== phone.id);

  return (
    <div className="min-h-screen bg-white text-slate-950 selection:bg-slate-900 selection:text-white">
      {/* 1. Main Navigation */}
      <HeaderNav showBack={true} />

      {/* 2. Apple-Style Product Sub-Navigation Ribbon (Sticky) */}
      <nav className="sticky top-14 sm:top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 sm:h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs font-medium text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Devices</span>
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-xs sm:text-sm font-bold text-slate-950 tracking-tight">
              {phone.name}
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-xs font-medium">
            <div className="hidden md:flex items-center gap-6 text-slate-500">
              <a href="#overview" className="hover:text-slate-950 transition-colors">Overview</a>
              <a href="#highlights" className="hover:text-slate-950 transition-colors">Highlights</a>
              <a href="#gallery" className="hover:text-slate-950 transition-colors">Gallery</a>
              <a href="#specs" className="hover:text-slate-950 transition-colors">Tech Specs</a>
              <a href="#preorder" className="hover:text-slate-950 transition-colors font-semibold text-slate-900">Pre-Order</a>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-900 hidden sm:inline text-xs">
                {phone.startingPrice}
              </span>
              <a
                href="#preorder"
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-950 text-white hover:bg-slate-800 transition-colors"
              >
                Pre-Order
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* SECTION 2: HERO */}
        <section id="overview" className="pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Titles */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
              <span className="text-xs uppercase font-semibold text-slate-400 tracking-widest block mb-3">
                {phone.brand} • {phone.category}
              </span>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950 leading-[1.06]">
                {phone.name}
              </h1>

              <p className="mt-4 text-xl sm:text-2xl font-medium text-slate-700 tracking-tight">
                {phone.headline.replace(`${phone.name}. `, '')}
              </p>

              <p className="mt-4 text-sm sm:text-base text-slate-500 font-normal leading-relaxed max-w-2xl mx-auto">
                {phone.tagline}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <span className="text-lg sm:text-xl font-bold font-mono text-slate-950">
                  {phone.priceFormatted}
                </span>
                <span className="text-xs text-slate-400 border-l border-gray-200 pl-3">
                  Pre-Order Deposit: ₹5,999
                </span>
              </div>
            </div>

            {/* Central Product Hero Image (Visual Focus) */}
            <div className="relative max-w-4xl mx-auto">
              <div className="w-full aspect-[4/3] sm:aspect-[16/10] bg-[#F5F5F7] rounded-3xl p-6 sm:p-14 flex items-center justify-center border border-gray-100 transition-all">
                <img
                  src={phone.image}
                  alt={`${phone.name} in ${selectedColor?.name || 'Studio Finish'}`}
                  className="w-full h-full object-contain drop-shadow-lg transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>

              {/* Specification Notice Pill */}
              <div className="mt-4 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-[11px] text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                  <span>{phone.conceptNotice}</span>
                </span>
              </div>
            </div>

            {/* Interactive Colour Finish Swatches */}
            <div className="mt-10 sm:mt-12 flex flex-col items-center justify-center gap-3">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Finish — <strong className="text-slate-900">{selectedColor?.name}</strong>
              </span>

              <div className="flex items-center gap-3">
                {phone.colors.map((color) => {
                  const isSelected = selectedColor?.id === color.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`group relative p-1 rounded-full transition-all focus:outline-none ${
                        isSelected ? 'ring-2 ring-slate-950 ring-offset-2' : 'hover:scale-110'
                      }`}
                      aria-label={`Select ${color.name}`}
                    >
                      <span
                        className="w-6 h-6 rounded-full block border border-gray-300 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  );
                })}
              </div>

              {selectedColor?.finish && (
                <p className="text-xs text-slate-500 max-w-md text-center mt-1">
                  {selectedColor.finish}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 3: PRODUCT HIGHLIGHTS (Large Editorial Layouts) */}
        <section id="highlights" className="py-20 sm:py-28 lg:py-32 border-b border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-16 sm:mb-24">
              <span className="text-xs uppercase font-mono tracking-widest text-slate-400 block mb-3">
                Product Highlights
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 leading-[1.1]">
                Breakthrough engineering. <br />
                <span className="text-slate-400">In every dimension.</span>
              </h2>
            </div>

            <div className="space-y-20 sm:space-y-32">
              {phone.highlights.map((highlight, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={highlight.id}
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                      isEven ? '' : 'lg:flex-row-reverse'
                    }`}
                  >
                    <div className="lg:col-span-5 space-y-4">
                      <span className="text-xs uppercase tracking-widest font-semibold text-slate-400 block">
                        {highlight.category}
                      </span>
                      <div className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-slate-950 leading-none">
                        {highlight.stat}
                      </div>
                      <div className="text-sm font-semibold text-slate-900 tracking-tight">
                        {highlight.statLabel}
                      </div>
                      <p className="text-sm sm:text-base text-slate-500 leading-relaxed pt-2">
                        {highlight.description}
                      </p>
                    </div>

                    <div className="lg:col-span-7 bg-[#F5F5F7] rounded-3xl p-8 sm:p-12 border border-gray-100">
                      <div className="max-w-xl">
                        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
                          Engineering Deep Dive
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight leading-snug">
                          {highlight.title}
                        </h3>
                        <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                          Developed to achieve unmatched stability and longevity. Every component interfaces seamlessly with the underlying operating platform, maximizing computational throughput without sacrificing battery efficiency.
                        </p>
                        <div className="mt-6 pt-6 border-t border-gray-200/80 flex flex-wrap gap-2">
                          <span className="px-3 py-1 rounded-full bg-white text-[11px] font-medium text-slate-800 border border-gray-200">
                            Zero Compromise
                          </span>
                          <span className="px-3 py-1 rounded-full bg-white text-[11px] font-medium text-slate-800 border border-gray-200">
                            Next-Gen Standard
                          </span>
                          <span className="px-3 py-1 rounded-full bg-white text-[11px] font-medium text-slate-800 border border-gray-200">
                            Hardware Accelerated
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4: PRODUCT GALLERY */}
        <section id="gallery" className="py-20 sm:py-28 bg-[#FCFCFD] border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <span className="text-xs uppercase font-mono tracking-widest text-slate-400 block mb-3">
                Product Views & Perspectives
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
                A closer look at {phone.name}.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-500">
                Crafted with surgical attention to tolerance, finishes, and optical curvature.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8">
              <div className="lg:col-span-8 bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                    Dual Perspective
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950 mt-1">
                    Front Display & Rear Chassis
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-lg">
                    Simultaneous view of the edge-to-edge screen profile and the matte-finished rear camera assembly.
                  </p>
                </div>

                <div className="my-8 aspect-[16/10] bg-[#F5F5F7] rounded-2xl p-6 sm:p-10 flex items-center justify-center">
                  <img
                    src={phone.image}
                    alt={`${phone.name} Front and Back view`}
                    className="max-h-full max-w-full object-contain drop-shadow-md"
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-gray-100">
                  <span>Industrial Studio Capture</span>
                  <span className="font-mono text-slate-900 font-semibold">{phone.name}</span>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-6 sm:space-y-8 flex flex-col">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 flex-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                    Curated Finishes
                  </span>
                  <h3 className="text-lg font-bold text-slate-950 mt-1 mb-4">
                    Material Swatches
                  </h3>

                  <div className="space-y-4">
                    {phone.colors.map((c) => (
                      <div
                        key={c.id}
                        className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-start gap-3"
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-gray-300 mt-0.5 shrink-0 shadow-sm"
                          style={{ backgroundColor: c.hex }}
                        />
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">
                            {c.name}
                          </span>
                          <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                            {c.finish}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Physical Profile</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-950 mb-3">
                    Precision Dimensions
                  </h3>
                  <div className="space-y-2 text-xs">
                    {phone.sections.dimensions?.map((dim, i) => (
                      <div key={i} className="flex justify-between py-1 border-b border-gray-100 last:border-b-0">
                        <span className="text-slate-500">{dim.label}</span>
                        <span className="font-semibold text-slate-900">{dim.value}</span>
                      </div>
                    ))}
                    {phone.sections.weight?.map((wt, i) => (
                      <div key={i} className="flex justify-between py-1 border-b border-gray-100 last:border-b-0">
                        <span className="text-slate-500">{wt.label}</span>
                        <span className="font-semibold text-slate-900">{wt.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: TECHNICAL SPECIFICATIONS (10-Category Expandable Accordion) */}
        <section id="specs" className="py-20 sm:py-28 lg:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <span className="text-xs uppercase font-mono tracking-widest text-slate-400 block mb-3">
                Technical Data Sheet
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
                Comprehensive Specifications.
              </h2>
              <p className="mt-3 text-sm text-slate-500 max-w-xl mx-auto">
                Expand any category below to review detailed parameters across display nodes, camera sensors, power metrics, and materials.
              </p>
            </div>

            <TechSpecsAccordion phone={phone} />

            <div className="mt-12 p-6 rounded-3xl bg-gray-50 border border-gray-200 text-xs text-slate-500 leading-relaxed">
              <strong className="text-slate-900 block mb-1">
                Transparency & Specification Notice:
              </strong>
              {phone.conceptNotice} Technical features, pricing projections, and launch windows reflect current industry engineering forecasts and are subject to official manufacturer disclosure upon formal announcement.
            </div>
          </div>
        </section>

        {/* SECTION 6: PRE-ORDER SECTION (Positioned after specifications accordion) */}
        <section id="preorder" className="py-20 sm:py-28 lg:py-32 border-t border-gray-200 bg-white scroll-mt-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs uppercase font-mono tracking-widest text-slate-400 block mb-3">
              Flagship Reservation
            </span>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950">
              Ready for What's Next?
            </h2>

            <p className="mt-3 text-base sm:text-lg text-slate-500 font-normal">
              Reserve your next flagship smartphone today.
            </p>

            <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-3xl bg-[#F5F5F7] border border-gray-200/80 max-w-xl mx-auto text-left">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white p-2.5 flex items-center justify-center shrink-0 border border-gray-200/60 shadow-sm">
                  <img
                    src={phone.image}
                    alt={phone.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider block">
                    {phone.brand}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-950 truncate">
                    {phone.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Finish: <strong className="text-slate-800">{selectedColor?.name}</strong>
                  </p>

                  <div className="mt-2.5 flex items-baseline justify-between pt-2 border-t border-gray-200/70">
                    <span className="text-xs text-slate-500">Device Price</span>
                    <span className="text-sm font-bold font-mono text-slate-900">{phone.priceFormatted}</span>
                  </div>

                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-xs font-semibold text-slate-900">Pre-Order Deposit</span>
                    <span className="text-base font-bold font-mono text-slate-950">₹5,999</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={openPreOrderModal}
                className="w-full sm:w-auto px-10 py-4 rounded-full text-sm sm:text-base font-semibold tracking-wide bg-slate-950 text-white hover:bg-slate-800 active:scale-[0.99] transition-all shadow-none inline-flex items-center justify-center"
              >
                PRE-ORDER NOW — ₹5,999
              </button>
            </div>

            <p className="mt-5 text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
              ₹5,999 is a pre-order deposit. Remaining device payment and refund conditions will be communicated before order confirmation.
            </p>
          </div>
        </section>

        {/* SECTION 7: EXPLORE OTHER FLAGSHIPS */}
        <section className="py-20 border-t border-gray-200 bg-[#FAFAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs uppercase font-mono tracking-widest text-slate-400 block mb-2">
                NEXTGEN MOBILE Collection
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
                Compare with other flagships.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {otherPhones.map((other) => (
                <Link
                  key={other.id}
                  to={`/devices/${other.id}`}
                  className="group bg-white rounded-3xl border border-gray-200 p-6 flex flex-col hover:border-gray-300 transition-all duration-300 hover:shadow-sm"
                >
                  <div className="w-full aspect-[4/3] bg-[#F5F5F7] rounded-2xl p-6 flex items-center justify-center mb-4">
                    <img
                      src={other.image}
                      alt={other.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    {other.brand}
                  </span>
                  <h3 className="text-lg font-bold text-slate-950 group-hover:text-slate-700 transition-colors">
                    {other.name}
                  </h3>
                  <span className="text-xs text-slate-500 mt-0.5">
                    {other.startingPrice}
                  </span>

                  <span className="mt-4 pt-3 border-t border-gray-100 inline-flex items-center text-xs font-semibold text-slate-900 group-hover:text-slate-600">
                    <span>View Specifications</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* PRE-ORDER MODAL INTERFACE */}
      {modalStep !== 'idle' && (
        <div className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-gray-200 max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 my-8">
            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              disabled={isSubmitting}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-950 hover:bg-gray-100 transition-colors disabled:opacity-50"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* STEP 1: PRE-ORDER CONFIRMATION INTERFACE */}
            {modalStep === 'confirm' && (
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-1">
                  Pre-Order Allocation
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950">
                  Confirm Pre-Order
                </h3>

                {/* Device & Finish Summary */}
                <div className="mt-5 p-4 rounded-2xl bg-[#F5F5F7] border border-gray-200/80 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 border border-gray-200">
                    <img
                      src={phone.image}
                      alt={phone.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                      {phone.brand}
                    </span>
                    <h4 className="text-sm font-bold text-slate-950 truncate">
                      {phone.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Finish: <span className="font-medium text-slate-800">{selectedColor?.name}</span>
                    </p>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="mt-4 p-4 rounded-2xl border border-gray-200 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-500">
                    <span>Device Retail Price</span>
                    <span className="font-mono text-slate-800">{phone.priceFormatted}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-100 font-semibold text-slate-950 text-sm">
                    <span>Pre-Order Deposit</span>
                    <span className="font-mono text-slate-950">₹5,999</span>
                  </div>
                </div>

                {/* Important Terms */}
                <div className="mt-4 p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-[11px] text-slate-600 leading-relaxed">
                  <strong className="block font-semibold text-slate-800 mb-0.5">Important Information:</strong>
                  ₹5,999 is a pre-order deposit. Remaining device payment and refund conditions will be communicated before order confirmation.
                </div>

                {/* Modal Action Buttons */}
                <div className="mt-6 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => setModalStep('form')}
                    className="w-full py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-slate-950 text-white hover:bg-slate-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Confirm Pre-Order</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full py-2.5 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-950 hover:bg-gray-50 transition-colors"
                  >
                    Cancel and Return to Specifications
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CUSTOMER DETAILS FORM */}
            {modalStep === 'form' && (
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 block mb-1">
                  Customer Information
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950">
                  Pre-Order Registration
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Please provide your contact details to register your reservation in MongoDB Atlas.
                </p>

                {/* Selected Device Badge */}
                <div className="mt-4 p-2.5 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-800">{phone.name} ({selectedColor?.name})</span>
                  <span className="font-mono font-bold text-slate-950">Deposit: ₹5,999</span>
                </div>

                {/* API Error Notification */}
                {apiError && (
                  <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{apiError}</span>
                  </div>
                )}

                {/* Registration Form with Exactly 3 Required Fields */}
                <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
                  {/* Field 1: Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-900 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, fullName: e.target.value }));
                          if (formErrors.fullName) setFormErrors(prev => ({ ...prev, fullName: null }));
                        }}
                        disabled={isSubmitting}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white text-slate-950 focus:outline-none focus:ring-2 transition-all ${
                          formErrors.fullName 
                            ? 'border-red-300 focus:ring-red-200' 
                            : 'border-gray-200 focus:border-slate-950 focus:ring-slate-100'
                        }`}
                      />
                    </div>
                    {formErrors.fullName && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.fullName}</p>
                    )}
                  </div>

                  {/* Field 2: Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-900 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, phoneNumber: e.target.value }));
                          if (formErrors.phoneNumber) setFormErrors(prev => ({ ...prev, phoneNumber: null }));
                        }}
                        disabled={isSubmitting}
                        placeholder="10-digit mobile number, e.g. 9876543210"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white text-slate-950 focus:outline-none focus:ring-2 transition-all ${
                          formErrors.phoneNumber 
                            ? 'border-red-300 focus:ring-red-200' 
                            : 'border-gray-200 focus:border-slate-950 focus:ring-slate-100'
                        }`}
                      />
                    </div>
                    {formErrors.phoneNumber && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.phoneNumber}</p>
                    )}
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      Indian mobile number starting with 6, 7, 8, or 9
                    </span>
                  </div>

                  {/* Field 3: Email Address */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-900 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData(prev => ({ ...prev, email: e.target.value }));
                          if (formErrors.email) setFormErrors(prev => ({ ...prev, email: null }));
                        }}
                        disabled={isSubmitting}
                        placeholder="e.g. rahul@example.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white text-slate-950 focus:outline-none focus:ring-2 transition-all ${
                          formErrors.email 
                            ? 'border-red-300 focus:ring-red-200' 
                            : 'border-gray-200 focus:border-slate-950 focus:ring-slate-100'
                        }`}
                      />
                    </div>
                    {formErrors.email && (
                      <p className="text-[11px] text-red-600 mt-1 font-medium">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Payment Terms Reminder */}
                  <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                    * ₹5,999 is a pre-order deposit. Remaining device payment and refund conditions will be communicated before order confirmation.
                  </p>

                  {/* Form Submission Actions */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-slate-950 text-white hover:bg-slate-800 active:scale-[0.99] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Registering in MongoDB Atlas...</span>
                        </>
                      ) : (
                        <span>Register Pre-Order — ₹5,999 Deposit</span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setModalStep('confirm')}
                      disabled={isSubmitting}
                      className="w-full py-2.5 rounded-full text-xs font-semibold text-slate-500 hover:text-slate-950 transition-colors disabled:opacity-50"
                    >
                      Back to Summary
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* STEP 3: SUCCESS SCREEN (Confirmed by MongoDB Atlas) */}
            {modalStep === 'success' && savedBooking && (
              <div className="text-center py-2">
                {/* Success Icon */}
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 border border-emerald-200 shadow-sm">
                  <Check className="w-7 h-7" />
                </div>

                <span className="text-[10px] uppercase font-mono tracking-widest text-emerald-600 font-bold block mb-1">
                  Saved to Database
                </span>

                {/* Success Headline */}
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950">
                  Your Pre-Order Has Been Registered!
                </h3>

                <p className="mt-2 text-xs text-slate-500 max-w-xs mx-auto">
                  Your flagship reservation document has been recorded in our database.
                </p>

                {/* Booking Receipt Card with Required Details */}
                <div className="my-5 p-5 rounded-2xl bg-[#F5F5F7] border border-gray-200/80 text-left space-y-3">
                  {/* Booking ID */}
                  <div className="pb-3 border-b border-gray-200 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                        Booking ID
                      </span>
                      <span className="text-sm sm:text-base font-bold font-mono text-slate-950 tracking-wide">
                        {savedBooking.bookingId}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      {savedBooking.orderStatus}
                    </span>
                  </div>

                  {/* Customer Name */}
                  <div className="flex justify-between text-xs py-1">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Customer Name</span>
                    </span>
                    <span className="font-semibold text-slate-950">{savedBooking.fullName}</span>
                  </div>

                  {/* Selected Smartphone */}
                  <div className="flex justify-between text-xs py-1">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                      <span>Smartphone</span>
                    </span>
                    <span className="font-semibold text-slate-950">{savedBooking.deviceName}</span>
                  </div>

                  {/* Phone Number */}
                  <div className="flex justify-between text-xs py-1">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>Phone Number</span>
                    </span>
                    <span className="font-mono font-medium text-slate-900">{savedBooking.phoneNumber}</span>
                  </div>

                  {/* Email Address */}
                  <div className="flex justify-between text-xs py-1">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>Email Address</span>
                    </span>
                    <span className="font-mono text-slate-900 truncate max-w-[180px] sm:max-w-none">
                      {savedBooking.email}
                    </span>
                  </div>

                  {/* Reservation Deposit */}
                  <div className="flex justify-between text-xs py-1">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Receipt className="w-3.5 h-3.5 text-slate-400" />
                      <span>Reservation Deposit</span>
                    </span>
                    <span className="font-mono font-bold text-slate-950">
                      ₹{savedBooking.depositAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Registration Date */}
                  <div className="flex justify-between text-xs pt-1 border-t border-gray-200/60">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Registration Date</span>
                    </span>
                    <span className="text-slate-600 text-[11px]">
                      {new Date(savedBooking.createdAt).toLocaleString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>

                {/* Explicit Explanation of Payment Status */}
                <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed text-left mb-6">
                  <strong className="block font-semibold mb-0.5">Please Note:</strong>
                  This pre-order registration reserves your smartphone allocation in our queue. Registration does not mean that full device payment has been completed. Remaining balance and settlement details will be communicated prior to dispatch.
                </div>

                {/* Return to Specifications Button */}
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full py-3 rounded-full text-xs sm:text-sm font-semibold bg-slate-950 text-white hover:bg-slate-800 transition-colors"
                >
                  Return to Specifications
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-[#FAFAFC] py-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
            <div>Copyright © {new Date().getFullYear()} NEXTGEN MOBILE Inc. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <Link to="/" className="hover:text-slate-900 transition-colors">All Devices</Link>
              <a href="#overview" className="hover:text-slate-900 transition-colors">Back to Top</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
