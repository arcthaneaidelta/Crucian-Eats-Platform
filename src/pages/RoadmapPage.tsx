import React, { useState } from 'react';
import { ArrowLeft, Check, Lock, Clock, CheckCircle2, ChevronRight, Award, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Drawer } from '../components/ui/Drawer';
import { useDemoStore } from '../store/useDemoStore';
import { useToast } from '../components/ui/Toast';
import type { Milestone } from '../data/types';

export const RoadmapPage: React.FC = () => {
  const { milestones, approveMilestone } = useDemoStore();
  const { success } = useToast();

  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [stampAnimation, setStampAnimation] = useState<number | null>(null);

  const handleOpenReview = (m: Milestone) => {
    setSelectedMilestone(m);
  };

  const handleConfirmApproval = () => {
    if (!selectedMilestone) return;
    const mId = selectedMilestone.id;

    approveMilestone(mId);
    setIsApproveModalOpen(false);
    setStampAnimation(mId);

    success(`Milestone ${mId} approved! Payment released to developer. Milestone ${mId + 1} unlocked.`, 'Milestone Approved');

    setTimeout(() => {
      setStampAnimation(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F7F2E8] py-12 px-4 sm:px-6 lg:px-8 font-body">
      <div className="max-w-5xl mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14403F] hover:text-[#0F3332]">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to overview</span>
          </Link>
        </div>

        {/* Header */}
        <div className="pb-8 border-b border-[#E1D9C8] mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCE8E4] text-[#14403F] text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-4 h-4 text-[#2E7D5B]" />
            <span>Milestone-Based Governance · §1.1 & §2</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-medium text-[#14403F] tracking-tight">
            Milestones you review and approve.
          </h1>
          <p className="text-base text-[#4A5753] mt-2 max-w-2xl">
            You maintain 100% financial leverage throughout the project. Work is segmented into verified phases—funds are released only when you test the deliverables and click approve.
          </p>
        </div>

        {/* Milestone Cards Stack */}
        <div className="space-y-4">
          {milestones.map((m) => {
            const isApproved = m.status === 'approved';
            const isInReview = m.status === 'in_review';
            const isLocked = m.status === 'locked';

            return (
              <div
                key={m.id}
                className={`bg-[#FFFDF8] border rounded-[20px] p-6 transition-all duration-200 relative overflow-hidden ${
                  isInReview
                    ? 'border-[#C65D3B] shadow-[0_8px_24px_rgba(198,93,59,0.12)]'
                    : isApproved
                    ? 'border-[#2E7D5B]/40 bg-[#FAF5EC]'
                    : 'border-[#E1D9C8] opacity-75'
                }`}
              >
                {/* Stamp animation */}
                {stampAnimation === m.id && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#2E7D5B]/10 backdrop-blur-[1px] animate-scaleIn">
                    <div className="border-4 border-[#2E7D5B] text-[#2E7D5B] font-display font-bold text-2xl uppercase tracking-widest px-6 py-2 rounded-xl rotate-[-8deg] shadow-lg">
                      APPROVED & FUNDED
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
                        isApproved
                          ? 'bg-[#D4EDDA] text-[#2E7D5B]'
                          : isInReview
                          ? 'bg-[#F6DDD2] text-[#C65D3B]'
                          : 'bg-[#EFE8DA] text-[#76817D]'
                      }`}
                    >
                      {isApproved ? <Check className="w-5 h-5 stroke-[2.5]" /> : isLocked ? <Lock className="w-4 h-4" /> : m.id}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#76817D]">
                          Milestone {m.id}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isApproved
                              ? 'bg-[#D4EDDA] text-[#2E7D5B]'
                              : isInReview
                              ? 'bg-[#F6DDD2] text-[#C65D3B] animate-pulse'
                              : 'bg-[#EFE8DA] text-[#76817D]'
                          }`}
                        >
                          {isApproved ? 'Approved & Paid' : isInReview ? 'Ready for Your Review' : 'Locked Until Prior Phase'}
                        </span>
                      </div>

                      <h3 className="text-lg font-display font-medium text-[#14403F]">
                        {m.title}
                      </h3>
                      <p className="text-xs text-[#4A5753] mt-1">
                        {m.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:self-center">
                    {isInReview && (
                      <Button
                        size="sm"
                        onClick={() => handleOpenReview(m)}
                        className="bg-[#C65D3B] hover:bg-[#AE4D2E] text-white"
                      >
                        <span>Review & Approve</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    )}

                    {isApproved && (
                      <div className="flex items-center gap-1.5 text-xs text-[#2E7D5B] font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Deliverables Accepted</span>
                      </div>
                    )}

                    {isLocked && (
                      <span className="text-xs text-[#76817D] italic">
                        Unlocks sequentially
                      </span>
                    )}
                  </div>
                </div>

                {/* Deliverables snippet */}
                <div className="mt-4 pt-3 border-t border-[#E1D9C8] flex flex-wrap gap-2 text-xs">
                  {m.deliverables.map((d, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-[11px] text-[#4A5753] bg-[#EFE8DA] px-2 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2F6F6A]" />
                      <span>{d}</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Milestone Detail Drawer */}
        <Drawer
          isOpen={!!selectedMilestone}
          onClose={() => setSelectedMilestone(null)}
          title={selectedMilestone ? `Milestone ${selectedMilestone.id}: ${selectedMilestone.title}` : ''}
          description="Verify deliverables before approving payment release"
        >
          {selectedMilestone && (
            <div className="space-y-6 text-xs text-[#1D2624]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C65D3B]">Phase Description</span>
                <p className="text-sm text-[#4A5753] mt-1 leading-relaxed">
                  {selectedMilestone.description}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2F6F6A]">Deliverables Checklist</span>
                <div className="space-y-2 mt-2">
                  {selectedMilestone.deliverables.map((d, i) => (
                    <div key={i} className="p-3 bg-[#EFE8DA] rounded-[10px] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2E7D5B]" />
                        <span className="font-semibold text-[#14403F]">{d}</span>
                      </div>
                      <span className="text-[10px] font-bold uppercase text-[#2E7D5B] bg-[#D4EDDA] px-2 py-0.5 rounded">Ready</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#FAF5EC] border border-[#CFC5B0] rounded-[14px] p-4 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#14403F]">Approval Safeguard</span>
                <p className="text-xs text-[#4A5753] leading-relaxed">
                  Clicking "Approve & Release Payment" triggers your payment platform escrow release for this stage and immediately unlocks Milestone {selectedMilestone.id + 1}.
                </p>
              </div>

              <div className="pt-4 flex gap-3">
                <Button
                  size="md"
                  onClick={() => setIsApproveModalOpen(true)}
                  className="flex-1 bg-[#2E7D5B] hover:bg-[#256348] text-white"
                >
                  Approve & Release Payment
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setSelectedMilestone(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </Drawer>

        {/* Confirmation Modal */}
        <Modal
          isOpen={isApproveModalOpen}
          onClose={() => setIsApproveModalOpen(false)}
          title="Confirm Milestone Approval"
          description="This action marks this phase complete and unlocks the next milestone."
        >
          <div className="space-y-4 text-xs font-body text-[#1D2624]">
            <p className="leading-relaxed">
              Are you satisfied that the deliverables for <strong className="text-[#14403F]">{selectedMilestone?.title}</strong> meet your requirements and high standards?
            </p>
            <div className="p-3 bg-[#EFE8DA] rounded-[10px] flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-[#2E7D5B] shrink-0" />
              <span>Payment funds will be transferred from your escrow balance.</span>
            </div>
            <div className="flex justify-end gap-2.5 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setIsApproveModalOpen(false)}>
                Go Back
              </Button>
              <Button size="sm" onClick={handleConfirmApproval} className="bg-[#2E7D5B] text-white">
                Yes, Approve Milestone
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
