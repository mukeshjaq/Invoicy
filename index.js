import React, { useState, useRef } from "react";
import {
  Building2,
  Palette,
  Plus,
  Trash2,
  Download,
  Upload,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CreditCard,
  Briefcase,
  Layers,
  Settings,
  Image as ImageIcon
} from "lucide-react";

export default function CorporateProposalBuilder() {
  // --- Branding & Styling State ---
  const [bgColor, setBgColor] = useState("#f8fafc");
  const [primaryColor, setPrimaryColor] = useState("#1e293b");
  const [accentColor, setAccentColor] = useState("#2563eb");
  const [logo, setLogo] = useState(null);

  // --- Company Details State ---
  const [company, setCompany] = useState({
    name: "Apex Creative Agency",
    tagline: "High-Impact Visual Solutions & Digital Experiences",
    about:
      "We partner with industry leaders to build compelling brand identities, scalable web platforms, and converted marketing systems that accelerate business growth.",
    email: "proposals@apexagency.com",
    phone: "+1 (555) 234-5678",
    website: "www.apexcreativeagency.com",
    address: "100 Innovation Way, Suite 400, San Francisco, CA"
  });

  // --- Client Details State ---
  const [client, setClient] = useState({
    name: "Acme Corporation",
    contactPerson: "Jane Doe",
    email: "j.doe@acmecorp.com",
    proposalDate: new Date().toISOString().split("T")[0]
  });

  // --- Portfolio / Works State ---
  const [portfolio, setPortfolio] = useState([
    {
      id: 1,
      title: "FinTech Mobile App Redesign",
      category: "UI/UX & Branding",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "E-Commerce Rebrand Campaign",
      category: "Digital Marketing",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
    }
  ]);

  // --- Pricing Plans Carousel State ---
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: "Standard Plan",
      price: "$2,500",
      period: "One-time",
      description: "Ideal for startups needing a core brand identity & landing page.",
      features: [
        "Core Brand Guidelines",
        "3-Page Responsive Website",
        "Basic SEO Setup",
        "2 Rounds of Revisions"
      ]
    },
    {
      id: 2,
      name: "Premium Plan",
      price: "$5,000",
      period: "One-time",
      description: "Complete digital solution for growing mid-sized businesses.",
      features: [
        "Full Visual Identity Suite",
        "10-Page Custom Web Application",
        "Interactive Prototype & UI Kit",
        "AI Scope & Workflow Integration",
        "4 Rounds of Revisions"
      ]
    },
    {
      id: 3,
      name: "Luxury / Enterprise",
      price: "$9,500",
      period: "One-time",
      description: "Full-service agency partnership with custom features & dedicated support.",
      features: [
        "End-to-End Brand & Strategy",
        "Unlimited Pages & Micro-animations",
        "Dedicated Account Manager",
        "Continuous AI Optimization",
        "Priority 24/7 SLA Support"
      ]
    }
  ]);

  const [activePlanIdx, setActivePlanIdx] = useState(0);

  // --- Payment Instructions State ---
  const [payment, setPayment] = useState({
    bankName: "First National Commerce Bank",
    accountName: "Apex Creative LLC",
    accountNumber: "9876-5432-1098",
    routingNumber: "123456789",
    terms: "50% upfront deposit required upon acceptance. Remaining 50% due upon project completion prior to source file handover."
  });

  // --- Ref for PDF Printing ---
  const printRef = useRef();

  // --- Handlers ---
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddPortfolioItem = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPortfolio((prev) => [
          ...prev,
          {
            id: Date.now(),
            title: `Project Work ${prev.length + 1}`,
            category: "Portfolio Showcase",
            img: reader.result
          }
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePortfolio = (id) => {
    setPortfolio((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddPlan = () => {
    const newId = Date.now();
    setPlans([
      ...plans,
      {
        id: newId,
        name: `Custom Plan ${plans.length + 1}`,
        price: "$3,500",
        period: "One-time",
        description: "Tailored package for custom client specifications.",
        features: ["Custom Deliverable A", "Custom Deliverable B", "Standard Support"]
      }
    ]);
    setActivePlanIdx(plans.length);
  };

  const handleRemovePlan = (id) => {
    if (plans.length <= 1) return;
    const filtered = plans.filter((p) => p.id !== id);
    setPlans(filtered);
    if (activePlanIdx >= filtered.length) {
      setActivePlanIdx(filtered.length - 1);
    }
  };

  const handlePlanChange = (field, val) => {
    const updated = [...plans];
    updated[activePlanIdx][field] = val;
    setPlans(updated);
  };

  const handleFeatureChange = (featureIdx, val) => {
    const updated = [...plans];
    updated[activePlanIdx].features[featureIdx] = val;
    setPlans(updated);
  };

  const handleAddFeature = () => {
    const updated = [...plans];
    updated[activePlanIdx].features.push("New Deliverable / Feature");
    setPlans(updated);
  };

  const handleRemoveFeature = (featureIdx) => {
    const updated = [...plans];
    updated[activePlanIdx].features.splice(featureIdx, 1);
    setPlans(updated);
  };

  const triggerDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-900 text-slate-100 font-sans">
      {/* =========================================================================
          LEFT PANEL: CONTROLS & SETTINGS
          ========================================================================= */}
      <div className="w-full lg:w-5/12 xl:w-4/12 bg-slate-800 p-6 border-r border-slate-700 overflow-y-auto max-h-screen">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700">
          <Sparkles className="w-7 h-7 text-blue-400" />
          <div>
            <h1 className="text-xl font-bold text-white">Proposal Builder</h1>
            <p className="text-xs text-slate-400">Configure corporate styling & content</p>
          </div>
        </div>

        {/* Action: Print / PDF */}
        <button
          onClick={triggerDownloadPDF}
          className="w-full mb-6 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg flex items-center justify-center gap-2 transition"
        >
          <Download className="w-5 h-5" />
          Download / Save as PDF
        </button>

        <div className="space-y-6">
          {/* Section 1: Branding & Appearance */}
          <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-2 mb-3">
              <Palette className="w-4 h-4" /> Branding & Theme
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Company Logo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="w-full text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:bg-slate-700 file:text-slate-200 hover:file:bg-slate-600 cursor-pointer"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-300 mb-1">PDF Background</label>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-full h-8 bg-slate-700 rounded border border-slate-600 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Primary Color</label>
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-full h-8 bg-slate-700 rounded border border-slate-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Company Details */}
          <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-2 mb-3">
              <Building2 className="w-4 h-4" /> Company Details
            </h2>
            <div className="space-y-2 text-xs">
              <input
                type="text"
                placeholder="Company Name"
                value={company.name}
                onChange={(e) => setCompany({ ...company, name: e.target.value })}
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-200"
              />
              <input
                type="text"
                placeholder="Tagline"
                value={company.tagline}
                onChange={(e) => setCompany({ ...company, tagline: e.target.value })}
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-200"
              />
              <textarea
                placeholder="About Company"
                rows="3"
                value={company.about}
                onChange={(e) => setCompany({ ...company, about: e.target.value })}
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-200 resize-none"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Email"
                  value={company.email}
                  onChange={(e) => setCompany({ ...company, email: e.target.value })}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-200"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={company.phone}
                  onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-200"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Client Details */}
          <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-2 mb-3">
              <Briefcase className="w-4 h-4" /> Client Target
            </h2>
            <div className="space-y-2 text-xs">
              <input
                type="text"
                placeholder="Client Company Name"
                value={client.name}
                onChange={(e) => setClient({ ...client, name: e.target.value })}
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-200"
              />
              <input
                type="text"
                placeholder="Contact Person"
                value={client.contactPerson}
                onChange={(e) => setClient({ ...client, contactPerson: e.target.value })}
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-200"
              />
            </div>
          </div>

          {/* Section 4: Plans & Carousel Settings */}
          <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Pricing Plans Settings
              </h2>
              <button
                onClick={handleAddPlan}
                className="p-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add Plan
              </button>
            </div>

            {/* Plan Selector */}
            <div className="flex items-center justify-between bg-slate-900 p-2 rounded mb-3 text-xs">
              <button
                onClick={() => setActivePlanIdx((prev) => Math.max(0, prev - 1))}
                disabled={activePlanIdx === 0}
                className="p-1 text-slate-400 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-semibold text-slate-200">
                Card {activePlanIdx + 1} of {plans.length}: {plans[activePlanIdx]?.name}
              </span>
              <button
                onClick={() =>
                  setActivePlanIdx((prev) => Math.min(plans.length - 1, prev + 1))
                }
                disabled={activePlanIdx === plans.length - 1}
                className="p-1 text-slate-400 disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {plans[activePlanIdx] && (
              <div className="space-y-2 text-xs">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Plan Name"
                    value={plans[activePlanIdx].name}
                    onChange={(e) => handlePlanChange("name", e.target.value)}
                    className="w-2/3 p-2 bg-slate-900 border border-slate-700 rounded text-slate-200"
                  />
                  <input
                    type="text"
                    placeholder="Price"
                    value={plans[activePlanIdx].price}
                    onChange={(e) => handlePlanChange("price", e.target.value)}
                    className="w-1/3 p-2 bg-slate-900 border border-slate-700 rounded text-slate-200"
                  />
                </div>
                <textarea
                  placeholder="Plan Description"
                  rows="2"
                  value={plans[activePlanIdx].description}
                  onChange={(e) => handlePlanChange("description", e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-200 resize-none"
                />

                {/* Features List Edit */}
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Deliverables / Features:</label>
                  {plans[activePlanIdx].features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-1 mb-1">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => handleFeatureChange(fIdx, e.target.value)}
                        className="w-full p-1.5 bg-slate-900 border border-slate-700 rounded text-slate-200"
                      />
                      <button
                        onClick={() => handleRemoveFeature(fIdx)}
                        className="p-1 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleAddFeature}
                    className="mt-1 text-xs text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Feature Line
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-700 flex justify-end">
                  <button
                    onClick={() => handleRemovePlan(plans[activePlanIdx].id)}
                    disabled={plans.length <= 1}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 disabled:opacity-30"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete Plan Card
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Section 5: Portfolio Uploads */}
          <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-2 mb-3">
              <ImageIcon className="w-4 h-4" /> Showcase Portfolio
            </h2>
            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-center gap-2 w-full p-3 bg-slate-900 border border-dashed border-slate-600 rounded text-slate-300 hover:bg-slate-700/50 cursor-pointer">
                <Upload className="w-4 h-4 text-blue-400" />
                <span>Upload Work Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAddPortfolioItem}
                  className="hidden"
                />
              </label>

              <div className="grid grid-cols-2 gap-2">
                {portfolio.map((item) => (
                  <div key={item.id} className="relative group rounded overflow-hidden border border-slate-700">
                    <img src={item.img} alt={item.title} className="w-full h-20 object-cover" />
                    <button
                      onClick={() => handleRemovePortfolio(item.id)}
                      className="absolute top-1 right-1 p-1 bg-red-600/80 hover:bg-red-600 text-white rounded"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 6: Payment Instructions */}
          <div className="bg-slate-800/60 p-4 rounded-lg border border-slate-700">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-blue-400 flex items-center gap-2 mb-3">
              <CreditCard className="w-4 h-4" /> Payment Details
            </h2>
            <div className="space-y-2 text-xs">
              <input
                type="text"
                placeholder="Bank Name"
                value={payment.bankName}
                onChange={(e) => setPayment({ ...payment, bankName: e.target.value })}
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-200"
              />
              <input
                type="text"
                placeholder="Account Name"
                value={payment.accountName}
                onChange={(e) => setPayment({ ...payment, accountName: e.target.value })}
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-200"
              />
              <textarea
                placeholder="Terms & Conditions"
                rows="2"
                value={payment.terms}
                onChange={(e) => setPayment({ ...payment, terms: e.target.value })}
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-slate-200 resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          RIGHT PANEL: REAL-TIME PDF PREVIEW & PRINT CANVAS
          ========================================================================= */}
      <div className="w-full lg:w-7/12 xl:w-8/12 p-6 lg:p-10 flex justify-center items-start overflow-y-auto bg-slate-950">
        <div
          ref={printRef}
          style={{ backgroundColor: bgColor }}
          className="w-full max-w-[800px] min-h-[1050px] p-8 md:p-12 shadow-2xl border border-slate-200 text-slate-800 print:m-0 print:border-none print:shadow-none print:w-full"
        >
          {/* PDF HEADER */}
          <div className="flex justify-between items-start pb-8 border-b-2" style={{ borderColor: primaryColor }}>
            <div>
              {logo ? (
                <img src={logo} alt="Company Logo" className="h-14 object-contain mb-2" />
              ) : (
                <div
                  className="text-2xl font-black uppercase tracking-tight"
                  style={{ color: primaryColor }}
                >
                  {company.name}
                </div>
              )}
              <p className="text-xs text-slate-500 font-medium">{company.tagline}</p>
            </div>
            <div className="text-right text-xs text-slate-500 space-y-1">
              <div className="text-sm font-bold uppercase tracking-wider text-slate-800">
                Commercial Proposal
              </div>
              <div>Date: {client.proposalDate}</div>
              <div>Prepared for: <span className="font-semibold text-slate-700">{client.name}</span></div>
            </div>
          </div>

          {/* ABOUT COMPANY & CLIENT SECTION */}
          <div className="my-8 grid grid-cols-3 gap-6 text-xs">
            <div className="col-span-2">
              <h3 className="font-bold text-sm uppercase tracking-wide mb-2" style={{ color: primaryColor }}>
                About Our Agency
              </h3>
              <p className="text-slate-600 leading-relaxed">{company.about}</p>
            </div>
            <div className="p-4 rounded-lg bg-white/60 border border-slate-200/80 space-y-1">
              <h4 className="font-bold uppercase tracking-wider text-[10px] text-slate-400 mb-2">
                Contact Info
              </h4>
              <p className="font-semibold text-slate-700">{company.email}</p>
              <p className="text-slate-600">{company.phone}</p>
              <p className="text-slate-600">{company.website}</p>
            </div>
          </div>

          {/* PROPOSAL PLANS CAROUSEL / GRID DISPLAY */}
          <div className="my-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-sm uppercase tracking-wide" style={{ color: primaryColor }}>
                Selectable Service Packages
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">
                {plans.length} Tailored Options
              </span>
            </div>

            {/* Plans Grid layout optimized for PDF print rendering */}
            <div className={`grid gap-4 ${plans.length === 1 ? 'grid-cols-1' : plans.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {plans.map((plan, idx) => (
                <div
                  key={plan.id}
                  className={`p-5 rounded-xl border transition-all relative flex flex-col justify-between ${
                    idx === activePlanIdx
                      ? "bg-white shadow-md border-2"
                      : "bg-white/40 border-slate-200"
                  }`}
                  style={{ borderColor: idx === activePlanIdx ? accentColor : undefined }}
                >
                  <div>
                    {idx === activePlanIdx && (
                      <span
                        className="absolute -top-2.5 right-4 text-[9px] font-bold uppercase px-2 py-0.5 rounded text-white"
                        style={{ backgroundColor: accentColor }}
                      >
                        Recommended
                      </span>
                    )}
                    <h4 className="font-bold text-slate-800 text-sm">{plan.name}</h4>
                    <div className="my-2">
                      <span className="text-xl font-extrabold" style={{ color: primaryColor }}>
                        {plan.price}
                      </span>
                      <span className="text-[10px] text-slate-400 ml-1">/{plan.period}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mb-4 leading-snug">{plan.description}</p>

                    <div className="border-t border-slate-100 pt-3 space-y-1.5">
                      {plan.features.map((f, i) => (
                        <div key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PORTFOLIO WORKS SHOWCASE */}
          {portfolio.length > 0 && (
            <div className="my-10 pt-6 border-t border-slate-200/60">
              <h3 className="font-bold text-sm uppercase tracking-wide mb-4" style={{ color: primaryColor }}>
                Previous Works & Case Studies
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {portfolio.map((item) => (
                  <div key={item.id} className="rounded-lg overflow-hidden border border-slate-200 bg-white">
                    <img src={item.img} alt={item.title} className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <p className="font-semibold text-xs text-slate-800">{item.title}</p>
                      <p className="text-[10px] text-slate-400">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAYMENT & TERMS INSTRUCTIONS */}
          <div className="mt-10 p-5 rounded-lg bg-slate-100/80 border border-slate-200 text-xs grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold uppercase tracking-wider text-slate-700 mb-2">
                Payment Instructions
              </h4>
              <div className="space-y-1 text-slate-600">
                <p><span className="font-medium text-slate-700">Bank:</span> {payment.bankName}</p>
                <p><span className="font-medium text-slate-700">Account Name:</span> {payment.accountName}</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-wider text-slate-700 mb-2">
                Terms & Acceptance
              </h4>
              <p className="text-slate-500 text-[11px] leading-relaxed">{payment.terms}</p>
            </div>
          </div>

          {/* PDF FOOTER */}
          <div className="mt-12 pt-4 border-t border-slate-200 text-center text-[10px] text-slate-400">
            {company.name} • {company.address} • {company.email}
          </div>
        </div>
      </div>

      {/* Global CSS overrides for clean PDF printing */}
      <style>{`
        @media print {
          body {
            background-color: transparent !important;
          }
          /* Hide the control panel during printing */
          .lg\\:w-5\\/12 {
            display: none !important;
          }
          .lg\\:w-7\\/12 {
            width: 100% !important;
            padding: 0 !important;
            background: none !important;
          }
        }
      `}</style>
    </div>
  );
}