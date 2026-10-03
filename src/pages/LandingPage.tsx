import React from 'react';
import { Navbar } from '../components/marketing/Navbar';
import { Hero } from '../components/marketing/Hero';
import { RoleTabs } from '../components/marketing/RoleTabs';
import { OrderJourney } from '../components/marketing/OrderJourney';
import { PaymentFlow } from '../components/marketing/PaymentFlow';
import { LocationsMap } from '../components/marketing/LocationsMap';
import { Footer } from '../components/marketing/Footer';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, Sliders, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F2E8] text-[#1D2624] font-body selection:bg-[#DCE8E4]">
      <Navbar />

      <main>
        {/* Hero Section (§8.1) */}
        <Hero />

        {/* Section 1: Four Roles in One System (§8.2.1) */}
        <RoleTabs />

        {/* Section 2: How One Order Moves (§8.2.2) */}
        <OrderJourney />

        {/* Section 3: Built for Payments You Control (§8.2.3) */}
        <PaymentFlow />

        {/* Section 4: One Platform, Many Islands (§8.2.4) */}
        <LocationsMap />

        {/* Section 5, 6, 7: Governance Teasers (Ownership, Roadmap, Scope) */}
        <section className="py-16 md:py-24 bg-[#EFE8DA]/50 border-t border-[#E1D9C8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="label-style text-[#2F6F6A]">Executive Alignment</span>
              <h2 className="text-3xl font-display font-medium text-[#14403F] mt-2 mb-3">
                Built to protect your budget, brand, and authority.
              </h2>
              <p className="text-sm text-[#4A5753]">
                Deeply addressing your requirements around developer access, milestone-based releases, and lean startup scoping.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Teaser 1: Ownership */}
              <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[20px] p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#D4EDDA] text-[#2E7D5B] flex items-center justify-center mb-4">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-display font-medium text-[#14403F] mb-1">
                    Your Assets, Your Control
                  </h3>
                  <p className="text-xs text-[#4A5753] leading-relaxed mb-4">
                    Bubble app, Stripe, domain, Apple, and Google accounts are created strictly in your company name. Zero hostage risk.
                  </p>
                </div>
                <Link to="/ownership">
                  <Button variant="secondary" size="sm" className="w-full">
                    <span>Inspect Ownership Matrix</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>

              {/* Teaser 2: Roadmap */}
              <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[20px] p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#F6DDD2] text-[#C65D3B] flex items-center justify-center mb-4">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-display font-medium text-[#14403F] mb-1">
                    Milestone Approvals
                  </h3>
                  <p className="text-xs text-[#4A5753] leading-relaxed mb-4">
                    Payments are tied to 7 concrete deliverable milestones. You test each build before releasing the next stage.
                  </p>
                </div>
                <Link to="/roadmap">
                  <Button variant="secondary" size="sm" className="w-full">
                    <span>View Project Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>

              {/* Teaser 3: Scope */}
              <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[20px] p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#DCE8E4] text-[#14403F] flex items-center justify-center mb-4">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-display font-medium text-[#14403F] mb-1">
                    A Realistic V1 Scope
                  </h3>
                  <p className="text-xs text-[#4A5753] leading-relaxed mb-4">
                    Protect your startup runway. Toggle features between V1 and Later to balance immediate go-to-market speed with long-term polish.
                  </p>
                </div>
                <Link to="/scope">
                  <Button variant="secondary" size="sm" className="w-full">
                    <span>Explore Scope Advisor</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Footer & Contact Form (§20) */}
        <Footer />
      </main>
    </div>
  );
};
