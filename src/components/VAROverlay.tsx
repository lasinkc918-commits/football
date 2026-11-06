/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Eye, CheckCircle2, XCircle, AlertTriangle, Tv, ShieldCheck } from 'lucide-react';

export type VARDecisionType = 'GOAL CONFIRMED' | 'NO GOAL - OFFSIDE' | 'PENALTY AWARDED' | 'NO PENALTY - SIMULATION' | 'RED CARD UPHELD';

export interface VARReviewState {
  isActive: boolean;
  incidentType: 'goal' | 'penalty' | 'offside' | 'foul';
  playerInvolved: string;
  teamInvolved: 'home' | 'away';
  teamName: string;
  decision?: VARDecisionType;
  reviewStep: 'alert' | 'reviewing' | 'verdict' | 'complete';
}

interface VAROverlayProps {
  varState: VARReviewState;
  onDismiss: () => void;
}

export const VAROverlay: React.FC<VAROverlayProps> = ({ varState, onDismiss }) => {
  const [internalStep, setInternalStep] = useState<'alert' | 'reviewing' | 'verdict' | 'complete'>('alert');
  const [reviewProgress, setReviewProgress] = useState<number>(0);
  const [calibratedDistance, setCalibratedDistance] = useState<string>('+0.14m');

  useEffect(() => {
    if (!varState.isActive) return;
    setInternalStep('alert');
    setReviewProgress(0);
    setCalibratedDistance((Math.random() * 0.28 - 0.12).toFixed(2) + 'm');

    const t1 = setTimeout(() => {
      setInternalStep('reviewing');
    }, 1400);

    const interval = setInterval(() => {
      setReviewProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 12;
      });
    }, 280);

    const t2 = setTimeout(() => {
      setInternalStep('verdict');
    }, 4200);

    const t3 = setTimeout(() => {
      setInternalStep('complete');
      onDismiss();
    }, 7200);

    return () => {
      clearTimeout(t1);
      clearInterval(interval);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [varState.isActive, onDismiss]);

  if (!varState.isActive) return null;

  const isConfirmed =
    varState.decision === 'GOAL CONFIRMED' || varState.decision === 'PENALTY AWARDED';

  return (
    <div className="fixed inset-0 z-[120] pointer-events-none flex flex-col items-center justify-center p-4">
      {/* Top TV Broadcast Header */}
      <div className="absolute top-6 flex items-center gap-3 bg-[#070A0E]/95 border-2 border-[#E11D48] text-white px-6 py-2.5 rounded-full shadow-[0_0_30px_rgba(225,29,72,0.6)] backdrop-blur-md animate-pulse">
        <Tv className="w-5 h-5 text-[#E11D48]" />
        <span className="font-['Chakra_Petch'] font-black tracking-widest text-sm text-[#F1F5F9]">
          FIFA VAR • VIDEO ASSISTANT REFEREE
        </span>
        <div className="w-2.5 h-2.5 rounded-full bg-[#E11D48] animate-ping" />
      </div>

      {/* Main VAR Broadcast Box */}
      <div className="w-full max-w-xl bg-[#0B0F17]/95 border-2 border-slate-700/80 rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-xl pointer-events-auto">
        {internalStep === 'alert' && (
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-rose-500 animate-bounce" />
            </div>
            <div>
              <p className="text-xs uppercase font-mono tracking-widest text-rose-400 font-bold">
                INCIDENT UNDER SCRUTINY
              </p>
              <h2 className="text-2xl font-['Chakra_Petch'] font-bold text-white mt-1">
                CHECKING POSSIBLE {varState.incidentType.toUpperCase()}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Player Involved: <strong className="text-white">{varState.playerInvolved}</strong> ({varState.teamName})
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/80 px-4 py-1.5 rounded-lg border border-slate-800">
              <Eye className="w-4 h-4 text-emerald-400 animate-spin" />
              REFEREE CONSULTING HIGH-DEFINITION SIDELINE MONITOR
            </div>
          </div>
        )}

        {internalStep === 'reviewing' && (
          <div className="space-y-4">
            {/* Holographic Calibration Screen */}
            <div className="relative aspect-video w-full rounded-xl bg-slate-950 border border-emerald-500/40 overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
              {/* Virtual Offside Calibration Line */}
              <div className="absolute inset-y-0 left-1/2 w-0.5 bg-rose-500 shadow-[0_0_12px_#F43F5E]" />
              <div className="absolute inset-y-0 left-[48%] w-0.5 bg-blue-500 shadow-[0_0_12px_#38BDF8]" />
              <div className="absolute top-3 left-4 bg-black/75 px-3 py-1 rounded text-xs font-mono text-emerald-400 border border-emerald-500/30">
                PITCH CROSSHAIR DELTA: {calibratedDistance}
              </div>
              <div className="absolute bottom-3 right-4 bg-black/75 px-3 py-1 rounded text-xs font-mono text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                FRAME 1248 @ 120 FPS
              </div>
              <div className="text-center z-10 px-4 py-2 bg-slate-900/90 rounded-lg border border-slate-700">
                <p className="font-mono text-xs text-slate-400">ANALYZING 3D TRAJECTORY & CONTACT POINT</p>
                <div className="w-64 h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-300"
                    style={{ width: `${reviewProgress}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 px-1">
              <span>MULTIPLE ANGLES: REVERSE HIGH / GOAL LINE CAM</span>
              <span className="text-emerald-400 font-bold">{reviewProgress}% CALIBRATED</span>
            </div>
          </div>
        )}

        {internalStep === 'verdict' && (
          <div className="flex flex-col items-center text-center space-y-4 py-2 animate-in zoom-in-95">
            <div
              className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 ${
                isConfirmed
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.5)]'
                  : 'bg-rose-500/20 border-rose-500 text-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.5)]'
              }`}
            >
              {isConfirmed ? (
                <CheckCircle2 className="w-12 h-12" />
              ) : (
                <XCircle className="w-12 h-12" />
              )}
            </div>

            <div>
              <p className="text-xs uppercase font-mono tracking-widest text-slate-400 font-bold">
                OFFICIAL VAR VERDICT
              </p>
              <h2
                className={`text-3xl font-['Chakra_Petch'] font-black mt-1 tracking-wider ${
                  isConfirmed ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {varState.decision || 'DECISION CONFIRMED'}
              </h2>
              <p className="text-slate-300 text-sm mt-2 font-mono">
                {isConfirmed
                  ? `Goal verified on the line. Fair play confirmed!`
                  : `Infraction confirmed by video referee. Decision stands.`}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-4 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4" />
              MATCH PLAY RESUMING IMMEDIATELY
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
