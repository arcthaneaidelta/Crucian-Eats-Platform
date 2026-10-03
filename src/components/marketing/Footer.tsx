import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Calendar, Check, ShieldCheck, Mail, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useToast } from '../ui/Toast';

export const Footer: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [priority, setPriority] = useState('Timeline');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const { success } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      success("Thanks! I'll reply within 24 hours.", "Message Sent");
    }, 1000);
  };

  return (
    <footer id="contact" className="bg-[#14403F] text-[#F7F2E8] pt-20 pb-12 font-body relative overflow-hidden">
      {/* Subtle St. Croix Background Line Art watermark */}
      <div className="absolute right-0 bottom-10 opacity-5 pointer-events-none select-none">
        <svg width="600" height="300" viewBox="0 0 600 300">
          <path d="M 60,180 C 120,130 260,120 450,150 C 520,160 500,200 380,220 C 240,240 140,250 60,180 Z" stroke="#FFFDF8" strokeWidth="3" fill="none" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Pitch Banner */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#D9A84E] block mb-2">
            PARTNER ON YOUR LAUNCH
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-medium text-[#FFFDF8] tracking-tight mb-4">
            Let's open Crucian Eats on St. Croix.
          </h2>
          <p className="text-base text-[#DCE8E4] leading-relaxed">
            A high-grade first version you can launch, own completely, and grow to St. Thomas and St. John without starting over.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#2F6F6A]">
          {/* Left Column (7 cols): Contact Form with Darker Surface */}
          <div className="lg:col-span-7 bg-[#0F3332] border border-[#2F6F6A] rounded-[24px] p-6 sm:p-8 shadow-xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-[#2E7D5B]/30 border border-[#2E7D5B] text-[#2E7D5B] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-medium text-[#FFFDF8]">
                  Message Received.
                </h3>
                <p className="text-xs text-[#DCE8E4] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. I will review your launch timeline and reply within 24 hours to schedule our architecture alignment call.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-[#D9A84E] underline mt-4 hover:text-white"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-display font-medium text-[#FFFDF8] mb-2">
                  Start a direct conversation
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#DCE8E4] mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Marisol"
                      className="w-full bg-[#1B4E4C] border border-[#2F6F6A] rounded-[10px] px-3.5 py-2.5 text-sm text-[#F7F2E8] placeholder-[#76817D] focus:outline-none focus:border-[#D9A84E]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#DCE8E4] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="founder@example.com"
                      className="w-full bg-[#1B4E4C] border border-[#2F6F6A] rounded-[10px] px-3.5 py-2.5 text-sm text-[#F7F2E8] placeholder-[#76817D] focus:outline-none focus:border-[#D9A84E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#DCE8E4] mb-1.5">
                    What matters most for launch?
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-[#1B4E4C] border border-[#2F6F6A] rounded-[10px] px-3.5 py-2.5 text-sm text-[#F7F2E8] focus:outline-none focus:border-[#D9A84E]"
                  >
                    <option value="Timeline">Timeline (Get to market quickly in St. Croix)</option>
                    <option value="Budget">Realistic Startup Budget (Lean V1 feature split)</option>
                    <option value="Payments">Direct Payments (100% funds held in client account)</option>
                    <option value="AppStore">Mobile Apps & App Store Publishing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#DCE8E4] mb-1.5">
                    Message / Notes
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me a bit about your vision and ideal launch dates..."
                    className="w-full bg-[#1B4E4C] border border-[#2F6F6A] rounded-[10px] px-3.5 py-2.5 text-sm text-[#F7F2E8] placeholder-[#76817D] focus:outline-none focus:border-[#D9A84E]"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full bg-[#C65D3B] hover:bg-[#AE4D2E] text-white"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    <span>Send Inquiry (24h Reply)</span>
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column (5 cols): Commitments & Direct Booking */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D9A84E]">
                Contractual Principles
              </span>
              <h4 className="text-xl font-display font-medium text-white">
                Guaranteed by Design
              </h4>

              <ul className="space-y-3 text-xs text-[#DCE8E4]">
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                  <span><strong>You own every account:</strong> Bubble, Stripe, Apple Developer, and Google Play accounts are set up strictly in your name.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                  <span><strong>Milestone-based releases:</strong> You approve deliverables before funding each stage. No open-ended hourly billing.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#2E7D5B] shrink-0 mt-0.5" />
                  <span><strong>No funds ever pass through me:</strong> 100% of customer food and delivery charges settle directly into your bank.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 bg-[#0F3332] border border-[#2F6F6A] rounded-[18px] space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D9A84E]">Direct Architecture Discussion</span>
              <p className="text-xs text-[#DCE8E4] leading-relaxed">
                Prefer a real-time conversation? Book a 30-minute scoping and Bubble roadmap alignment session.
              </p>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full text-[#F7F2E8] border-[#2F6F6A] hover:bg-[#1B4E4C]"
              >
                <Calendar className="w-4 h-4 mr-2" />
                <span>Schedule a 30-Min Call</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar (§20) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DCE8E4]/70">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-white text-sm">Crucian Eats</span>
            <span>·</span>
            <span>Interactive Bubble.io Prototype Proposal</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/ownership" className="hover:text-white transition-colors">Ownership Matrix</Link>
            <Link to="/roadmap" className="hover:text-white transition-colors">Milestones</Link>
            <Link to="/scope" className="hover:text-white transition-colors">V1 Scope</Link>
            <span>© 2026 Crucian Eats</span>
          </div>
        </div>
      </div>

      {/* Booking Modal Placeholder (§20) */}
      <Modal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title="Schedule a Scoping Call"
        description="Connect with the developer to align on Bubble.io milestone delivery."
      >
        <div className="space-y-4 text-xs text-[#1D2624]">
          <p className="leading-relaxed">
            Calendar scheduling is simulated in this frontend prototype demo. When submitted with your bid, a real Calendly / Cal.com link connects directly to your calendar.
          </p>
          <div className="p-3 bg-[#EFE8DA] rounded-[10px]">
            <p className="font-semibold text-[#14403F]">Available Discussion Topics:</p>
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-[#4A5753]">
              <li>Reviewing your brand identity & visual requirements</li>
              <li>Bubble.io multi-tenant database structuring</li>
              <li>USVI merchant payment account configuration</li>
              <li>Launch timeline for St. Croix and expansion gates</li>
            </ul>
          </div>
          <div className="pt-2 flex justify-end">
            <Button size="sm" onClick={() => setIsBookingModalOpen(false)}>
              Got it
            </Button>
          </div>
        </div>
      </Modal>
    </footer>
  );
};
