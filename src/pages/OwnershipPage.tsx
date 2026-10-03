import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, Download, ChevronDown, ChevronUp, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useToast } from '../components/ui/Toast';

interface AssetRow {
  id: string;
  asset: string;
  ownedBy: string;
  developerAccess: string;
  handoverMilestone: string;
  whatThisMeans: string;
  checklist: string[];
}

const ASSETS_DATA: AssetRow[] = [
  {
    id: 'bubble',
    asset: 'Bubble.io Application & Database',
    ownedBy: 'Created & Owned directly in your Bubble account',
    developerAccess: 'Collaborator agency invite (strictly scoped, revocable anytime)',
    handoverMilestone: 'Immediate at Milestone 1',
    whatThisMeans: 'You own the primary application container and database schema. If we ever part ways, you simply revoke my email access. Your app stays live and completely in your hands.',
    checklist: ['Client creates Bubble account with company email', 'Client invites developer as developer/agency seat', 'Full DB export credentials stored in client password manager'],
  },
  {
    id: 'domain',
    asset: 'Domain & DNS (CrucianEats.com)',
    ownedBy: 'Registered in your Namecheap/GoDaddy account',
    developerAccess: 'DNS record addition only (no account ownership transfer)',
    handoverMilestone: 'Milestone 1',
    whatThisMeans: 'The web address and brand identity stay in your name from day one. I never hold the domain.',
    checklist: ['Domain purchased directly by client', 'Developer provides CNAME & TXT records for DNS config', 'SSL verified through client account'],
  },
  {
    id: 'apple',
    asset: 'Apple Developer Account & App Store',
    ownedBy: 'Enrolled under Crucian Eats LLC in Apple Developer',
    developerAccess: 'App Manager role in App Store Connect (no legal ownership)',
    handoverMilestone: 'Milestone 7',
    whatThisMeans: 'The customer and courier mobile apps are published under your company name on the App Store. All ratings and listings remain your permanent asset.',
    checklist: ['Client acquires Apple D-U-N-S number for LLC', 'Enrolls in Apple Developer Program ($99/yr directly to Apple)', 'Developer invited to App Store Connect to build and submit'],
  },
  {
    id: 'google',
    asset: 'Google Play Console Account',
    ownedBy: 'Created under your Google Workspace',
    developerAccess: 'Developer access to release track only',
    handoverMilestone: 'Milestone 7',
    whatThisMeans: 'Android apps are hosted in your personal Google Play console. You retain total authority over APK signing keys and store listings.',
    checklist: ['Client creates Google Play Developer console', 'Invites developer as release manager', 'Keystores safely archived to client secure storage'],
  },
  {
    id: 'payment',
    asset: 'Payment Gateway (Stripe / Processor)',
    ownedBy: 'Your verified USVI business bank account',
    developerAccess: 'Developer API Keys only (NO bank withdrawal permissions)',
    handoverMilestone: 'Milestone 3',
    whatThisMeans: 'Crucial trust pillar: 100% of customer funds settle in your bank. I never hold, escrow, or withdraw any transaction amounts.',
    checklist: ['Client links corporate bank account', 'Developer configures webhooks with restricted API keys', 'Client confirms payout schedule and test charges directly'],
  },
  {
    id: 'source',
    asset: 'Figma Designs, Workflows & Documentation',
    ownedBy: 'Shared directly to your Google Drive & Figma team',
    developerAccess: 'Author/Contributor',
    handoverMilestone: 'Progressive at every milestone approval',
    whatThisMeans: 'You receive all vector files, design token exports, architecture diagrams, and plain-English operational manuals at every milestone.',
    checklist: ['Figma file duplicated to client team workspace', 'Exported SVG and PNG asset repository delivered', 'Step-by-step admin maintenance guide delivered as PDF/Notion'],
  },
  {
    id: 'thirdparty',
    asset: 'Transactional SMS / Email / Maps Services',
    ownedBy: 'Created in client name (Twilio/SendGrid/Google Maps)',
    developerAccess: 'API key integration only',
    handoverMilestone: 'Milestone 1',
    whatThisMeans: 'All utility APIs are tied to your payment card at standard volume rates, eliminating surprise developer markup.',
    checklist: ['Client registers API accounts', 'Monthly limits and fraud alerts configured', 'API tokens secured in environment settings'],
  },
];

export const OwnershipPage: React.FC = () => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: 'Checklist Downloaded',
      message: 'Simulated: "Crucian-Eats-Asset-Handover-Manifest.pdf" ready for your records.',
      type: 'success',
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F2E8] py-12 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14403F] hover:text-[#0F3332]">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to overview</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E1D9C8] mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCE8E4] text-[#14403F] text-xs font-semibold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4 text-[#2E7D5B]" />
              <span>Zero-Hostage Guarantee · §1.1 & §3</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-medium text-[#14403F] tracking-tight">
              Your assets, your control.
            </h1>
            <p className="text-base text-[#4A5753] mt-2 max-w-2xl">
              "You create and own the Bubble app, database, domain, Apple Developer account, Google Play account, and payment accounts. I am granted the access needed to build, and nothing more. I never hold your app, data, or customer funds."
            </p>
          </div>

          <Button variant="secondary" size="md" onClick={handleDownload} className="shrink-0">
            <Download className="w-4 h-4 mr-2" />
            <span>Download Handover Checklist</span>
          </Button>
        </div>

        {/* Asset Matrix Table */}
        <div className="bg-[#FFFDF8] border border-[#E1D9C8] rounded-[24px] shadow-[0_12px_36px_rgba(29,38,36,0.06)] overflow-hidden">
          <div className="p-6 bg-[#FAF5EC] border-b border-[#E1D9C8] flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#14403F]">
              Comprehensive Asset Ownership Matrix
            </span>
            <span className="text-xs text-[#76817D]">
              Click any row to reveal legal handover safeguards & checklists
            </span>
          </div>

          <div className="divide-y divide-[#E1D9C8]">
            {ASSETS_DATA.map((item) => {
              const isExpanded = expandedRow === item.id;

              return (
                <div key={item.id} className="transition-colors hover:bg-[#FAF5EC]/40">
                  <button
                    onClick={() => setExpandedRow(isExpanded ? null : item.id)}
                    className="w-full p-5 text-left flex flex-col md:flex-row md:items-center justify-between gap-4 select-none"
                  >
                    <div className="md:w-1/3">
                      <h4 className="text-sm font-semibold text-[#14403F] flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5 text-[#2F6F6A]" />
                        <span>{item.asset}</span>
                      </h4>
                      <span className="text-[11px] text-[#76817D] mt-0.5 block">{item.handoverMilestone}</span>
                    </div>

                    <div className="md:w-1/3 text-xs">
                      <span className="font-semibold text-[#2E7D5B] block">Owned By:</span>
                      <span className="text-[#1D2624]">{item.ownedBy}</span>
                    </div>

                    <div className="md:w-1/4 text-xs">
                      <span className="font-semibold text-[#76817D] block">Developer Access:</span>
                      <span className="text-[#4A5753]">{item.developerAccess}</span>
                    </div>

                    <div className="shrink-0 text-[#76817D]">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Accordion Detail View */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 bg-[#EFE8DA]/30 border-t border-[#E1D9C8] grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn text-xs">
                      <div className="space-y-2">
                        <h5 className="font-bold uppercase tracking-wider text-[10px] text-[#C65D3B]">
                          What This Means for Your Protection
                        </h5>
                        <p className="text-[#1D2624] leading-relaxed">
                          {item.whatThisMeans}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h5 className="font-bold uppercase tracking-wider text-[10px] text-[#2F6F6A]">
                          Handover Verification Checklist
                        </h5>
                        <ul className="space-y-1.5">
                          {item.checklist.map((c, i) => (
                            <li key={i} className="flex items-start gap-2 text-[#4A5753]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D5B] shrink-0 mt-0.5" />
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Commitment Statement Banner */}
        <div className="mt-10 bg-[#14403F] text-[#F7F2E8] rounded-[20px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-display font-medium">Ready to see how payments are tied to milestones?</h3>
            <p className="text-xs text-[#DCE8E4] max-w-xl">
              Inspect the 7-stage project roadmap with deliverable checklists and client release approvals.
            </p>
          </div>
          <Link to="/roadmap">
            <Button size="md" className="bg-[#C65D3B] hover:bg-[#AE4D2E] text-white shrink-0">
              View Project Roadmap
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
