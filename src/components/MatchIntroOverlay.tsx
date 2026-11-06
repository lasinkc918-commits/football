/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { FootballPlayer, TeamData, FormationName } from '../data/gameDatabase';
import { PlayerPhotoAvatar } from './PlayerPhotoAvatar';
import { Shield, Sparkles, FastForward, UserCheck, Flame } from 'lucide-react';

interface MatchIntroOverlayProps {
  homeTeam: TeamData;
  awayTeam: TeamData;
  homeSquad: FootballPlayer[];
  homeFormation: FormationName;
  awayFormation?: FormationName;
  stadiumName: string;
  weatherName: string;
  onFinishIntro: () => void;
}

export const MatchIntroOverlay: React.FC<MatchIntroOverlayProps> = ({
  homeTeam,
  awayTeam,
  homeSquad,
  homeFormation,
  awayFormation = '4-3-3',
  stadiumName,
  weatherName,
  onFinishIntro,
}) => {
  const [step, setStep] = useState<'walkout' | 'lineups' | 'spotlight' | 'cointoss'>('walkout');
  const homeStar = homeSquad.slice().sort((a, b) => b.rating - a.rating)[0] || homeSquad[0];

  useEffect(() => {
    const t1 = setTimeout(() => setStep('lineups'), 3000);
    const t2 = setTimeout(() => setStep('spotlight'), 6000);
    const t3 = setTimeout(() => setStep('cointoss'), 9000);
    const t4 = setTimeout(() => onFinishIntro(), 12000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onFinishIntro]);

  return (
    <div className="fixed inset-0 z-[115] bg-[#070A0E]/90 backdrop-blur-md flex flex-col justify-between p-6 animate-in fade-in duration-500">
      {/* Top Header Bar */}
      <div className="flex justify-between items-center max-w-6xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full text-xs font-mono font-bold tracking-widest uppercase">
            LIVE BROADCAST • MATCHDAY INTRO
          </span>
          <span className="text-slate-400 text-xs font-mono">
            {stadiumName} • {weatherName}
          </span>
        </div>

        <button
          onClick={onFinishIntro}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold transition-all border border-slate-700 hover:border-emerald-500 cursor-pointer"
        >
          <span>SKIP WALKOUT</span>
          <FastForward className="w-3.5 h-3.5 text-emerald-400" />
        </button>
      </div>

      {/* Main Center Stage */}
      <div className="max-w-5xl w-full mx-auto my-auto">
        {step === 'walkout' && (
          <div className="text-center space-y-6 animate-in zoom-in-95 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-900 border border-slate-700 text-amber-400 text-xs font-mono">
              <Sparkles className="w-4 h-4" />
              PLAYERS WALKING OUT OF THE TUNNEL
            </div>
            <div className="flex items-center justify-center gap-8 md:gap-16">
              {/* Home Team Badge */}
              <div className="flex flex-col items-center space-y-2">
                <div
                  className="w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center text-3xl font-black text-white shadow-2xl border-4"
                  style={{
                    backgroundColor: homeTeam.primaryColor,
                    borderColor: homeTeam.secondaryColor,
                  }}
                >
                  {homeTeam.shortName || homeTeam.name.slice(0, 3).toUpperCase()}
                </div>
                <h3 className="font-['Chakra_Petch'] font-bold text-xl md:text-2xl text-white">
                  {homeTeam.name}
                </h3>
                <span className="text-xs font-mono text-emerald-400">HOME SQUAD</span>
              </div>

              {/* VS Banner */}
              <div className="flex flex-col items-center">
                <span className="font-['Chakra_Petch'] font-black text-4xl md:text-6xl text-slate-600">
                  VS
                </span>
                <span className="text-[10px] font-mono text-slate-400 tracking-widest mt-1">
                  OFFICIAL FIXTURE
                </span>
              </div>

              {/* Away Team Badge */}
              <div className="flex flex-col items-center space-y-2">
                <div
                  className="w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center text-3xl font-black text-white shadow-2xl border-4"
                  style={{
                    backgroundColor: awayTeam.primaryColor,
                    borderColor: awayTeam.secondaryColor,
                  }}
                >
                  {awayTeam.shortName || awayTeam.name.slice(0, 3).toUpperCase()}
                </div>
                <h3 className="font-['Chakra_Petch'] font-bold text-xl md:text-2xl text-white">
                  {awayTeam.name}
                </h3>
                <span className="text-xs font-mono text-cyan-400">AWAY SQUAD</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm font-mono max-w-lg mx-auto">
              The stadium is in full voice as both sides emerge onto the hallowed turf accompanied by the tournament anthem.
            </p>
          </div>
        )}

        {step === 'lineups' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="text-center">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">
                STARTING ELEVEN & FORMATIONS
              </span>
              <h2 className="text-2xl font-['Chakra_Petch'] font-bold text-white mt-1">
                {homeTeam.name} ({homeFormation}) vs {awayTeam.name} ({awayFormation})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Home Starting 11 */}
              <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="font-bold text-white text-sm">{homeTeam.name} Starting XI</span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                    {homeFormation}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  {homeSquad.slice(0, 11).map((p, i) => (
                    <div key={p.id + i} className="flex items-center gap-2 p-1.5 rounded-lg bg-slate-950/60 border border-slate-800">
                      <PlayerPhotoAvatar player={p} size={28} className="rounded-md" />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-200 truncate">{p.name}</div>
                        <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                          <span>{p.position}</span>
                          <span className="text-slate-500">•</span>
                          <span>OVR {p.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Away Overview */}
              <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="font-bold text-white text-sm">{awayTeam.name} Tactical Setup</span>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                      {awayFormation}
                    </span>
                  </div>
                  <div className="mt-4 space-y-3 text-sm text-slate-300">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                      <span className="text-slate-400 text-xs font-mono">PRIMARY STRATEGY:</span>
                      <span className="text-white font-bold text-xs">High Line & Rapid Wing Play</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                      <span className="text-slate-400 text-xs font-mono">FORMATION SHAPE:</span>
                      <span className="text-white font-bold text-xs">{awayFormation} Balanced Press</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                      <span className="text-slate-400 text-xs font-mono">DANGER RATING:</span>
                      <span className="text-amber-400 font-bold text-xs">Elite Tier (88+ Average)</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-400 text-center py-2 bg-slate-950/40 rounded-xl border border-slate-800/60">
                  Defensive Line: Compact • Counter-Attacking Speed: High
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'spotlight' && (
          <div className="max-w-2xl mx-auto bg-slate-900/90 border border-amber-500/40 rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-500">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider mb-4">
              <Flame className="w-4 h-4" />
              KEY PLAYER SPOTLIGHT • ONES TO WATCH
            </div>
            <div className="flex items-center gap-6">
              <PlayerPhotoAvatar player={homeStar} size={96} className="rounded-2xl border-2 border-amber-400 shadow-xl" />
              <div className="space-y-1">
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded text-[10px] font-mono font-bold">
                  {homeStar.position} • TALISMAN
                </span>
                <h3 className="font-['Chakra_Petch'] font-bold text-2xl text-white">
                  {homeStar.name}
                </h3>
                <p className="text-slate-400 text-xs font-mono">
                  Club: {homeStar.club} | Rating: <strong className="text-emerald-400">{homeStar.rating}</strong>
                </p>
                <div className="flex gap-4 pt-2">
                  <div className="text-xs font-mono text-slate-300">
                    <span className="text-slate-500 block text-[10px]">PACE</span>
                    <strong>{homeStar.attributes.pace}</strong>
                  </div>
                  <div className="text-xs font-mono text-slate-300">
                    <span className="text-slate-500 block text-[10px]">SHOOTING</span>
                    <strong>{homeStar.attributes.shooting}</strong>
                  </div>
                  <div className="text-xs font-mono text-slate-300">
                    <span className="text-slate-500 block text-[10px]">DRIBBLING</span>
                    <strong>{homeStar.attributes.dribbling}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'cointoss' && (
          <div className="text-center space-y-6 animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-400 animate-spin">
              <UserCheck className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-mono text-slate-400 tracking-widest uppercase">
                REFEREE PIERLUIGI WEBB
              </span>
              <h2 className="text-3xl font-['Chakra_Petch'] font-black text-white mt-1">
                OFFICIAL COIN TOSS COMPLETED
              </h2>
              <p className="text-emerald-400 text-sm font-mono mt-2">
                {homeTeam.name} has won the toss and elected to attack from Left to Right!
              </p>
            </div>
            <button
              onClick={onFinishIntro}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold font-['Chakra_Petch'] tracking-wider shadow-lg transition-all cursor-pointer"
            >
              COMMENCE KICK-OFF
            </button>
          </div>
        )}
      </div>

      {/* Bottom Step Indicator */}
      <div className="flex justify-center gap-2 max-w-xs mx-auto">
        {(['walkout', 'lineups', 'spotlight', 'cointoss'] as const).map((s) => (
          <div
            key={s}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step === s ? 'w-8 bg-emerald-400' : 'w-2 bg-slate-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
