/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  RecordsManager,
  TrophyRecord,
  HallOfFameRecord,
  AchievementBadge,
} from '../services/RecordsAndAchievementsService';
import { Trophy, Award, Zap, CheckCircle2, Gift, X, Sparkles, Shield, Flame } from 'lucide-react';

interface TrophyRoomModalProps {
  onClose: () => void;
  onClaimReward: (coins: number, rupees: number) => void;
}

export const TrophyRoomModal: React.FC<TrophyRoomModalProps> = ({ onClose, onClaimReward }) => {
  const [tab, setTab] = useState<'trophies' | 'records' | 'badges'>('trophies');
  const [selectedTrophy, setSelectedTrophy] = useState<TrophyRecord | null>(null);

  const trophies = RecordsManager.getTrophies();
  const records = RecordsManager.getRecords();
  const achievements = RecordsManager.getAchievements();

  const handleClaim = (achId: string) => {
    const reward = RecordsManager.claimAchievementReward(achId);
    if (reward) {
      onClaimReward(reward.coins, reward.rupees);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0B0F17] border-2 border-slate-700/80 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Top Header */}
        <div className="p-6 bg-slate-900/90 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                HALL OF FAME & CABINET
              </span>
              <h2 className="text-2xl font-['Chakra_Petch'] font-bold text-white">
                STRIKE FOOTBALL TROPHY ROOM
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Nav Tabs */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono font-bold">
              <button
                onClick={() => setTab('trophies')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  tab === 'trophies'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                TROPHIES ({trophies.filter((t) => t.unlocked).length}/{trophies.length})
              </button>
              <button
                onClick={() => setTab('records')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  tab === 'records'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                RECORDS ({records.length})
              </button>
              <button
                onClick={() => setTab('badges')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  tab === 'badges'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                BADGES ({achievements.filter((a) => a.unlocked).length}/{achievements.length})
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {tab === 'trophies' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trophies.map((trophy) => (
                  <div
                    key={trophy.id}
                    onClick={() => setSelectedTrophy(trophy)}
                    className={`relative p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      trophy.unlocked
                        ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-amber-500/40 hover:border-amber-400 shadow-lg'
                        : 'bg-slate-950/60 border-slate-800 opacity-60'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            trophy.unlocked
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-slate-800 text-slate-500'
                          }`}
                        >
                          {trophy.unlocked ? `UNLOCKED • ${trophy.tier}` : 'LOCKED'}
                        </span>
                        <span className="text-xs font-mono text-slate-400 uppercase">
                          {trophy.category}
                        </span>
                      </div>

                      <div className="w-16 h-16 mx-auto my-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl shadow-inner">
                        {trophy.category === 'street' ? '⛓️' : trophy.category === 'individual' ? '🥇' : '🏆'}
                      </div>

                      <h3 className="font-['Chakra_Petch'] font-bold text-lg text-white text-center">
                        {trophy.name}
                      </h3>
                      <p className="text-slate-400 text-xs mt-2 text-center line-clamp-2">
                        {trophy.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-between items-center text-xs font-mono">
                      {trophy.unlocked ? (
                        <>
                          <span className="text-slate-500">Won on {trophy.unlockedAt}</span>
                          <span className="text-amber-400 font-bold">INSPECT &gt;</span>
                        </>
                      ) : (
                        <span className="text-slate-500 w-full text-center">Complete Tournament to Win</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Trophy Inspection Popup */}
              {selectedTrophy && (
                <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/60 flex flex-col md:flex-row items-center gap-6 animate-in fade-in">
                  <div className="w-28 h-28 rounded-3xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-5xl shadow-[0_0_40px_rgba(245,158,11,0.3)]">
                    🏆
                  </div>
                  <div className="flex-1 space-y-1 text-center md:text-left">
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-mono text-amber-400 font-bold">
                        CHAMPIONSHIP MEDALLION DETAILS
                      </span>
                    </div>
                    <h3 className="text-2xl font-['Chakra_Petch'] font-bold text-white">
                      {selectedTrophy.name}
                    </h3>
                    <p className="text-slate-300 text-sm">{selectedTrophy.description}</p>
                    {selectedTrophy.details && (
                      <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-slate-300">
                        {selectedTrophy.details.tournamentName && (
                          <div className="bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                            Tournament: <strong>{selectedTrophy.details.tournamentName}</strong>
                          </div>
                        )}
                        {selectedTrophy.details.opponent && (
                          <div className="bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                            Final Opponent: <strong>{selectedTrophy.details.opponent} ({selectedTrophy.details.score})</strong>
                          </div>
                        )}
                        {selectedTrophy.details.mvp && (
                          <div className="bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                            Tournament MVP: <strong className="text-amber-400">{selectedTrophy.details.mvp}</strong>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setSelectedTrophy(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold cursor-pointer"
                  >
                    CLOSE INSPECTION
                  </button>
                </div>
              )}
            </div>
          )}

          {tab === 'records' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                <span>OFFICIAL STRIKE FOOTBALL HALL OF FAME RECORDS</span>
                <span className="text-amber-400 font-bold">LIVE TELEMETRY TRACKER</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {records.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-2xl">
                        {rec.icon}
                      </div>
                      <div>
                        <span className="text-xs font-mono text-slate-400">{rec.title}</span>
                        <div className="text-2xl font-['Chakra_Petch'] font-black text-amber-400">
                          {rec.valueDisplay}
                        </div>
                        <div className="text-xs font-mono text-slate-300 mt-0.5">
                          Holder: <strong className="text-white">{rec.currentHolder}</strong>
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-[10px] font-mono text-slate-500">
                      <div>Achieved</div>
                      <div className="text-slate-400 font-bold">{rec.dateAchieved}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'badges' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                <span>ACHIEVEMENT REWARD BADGES (EARN COINS + ₹ RUPEES)</span>
                <span className="text-emerald-400 font-bold">INSTANT CLAIM AVAILABLE</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className={`p-4 rounded-2xl border flex items-center justify-between ${
                      ach.unlocked
                        ? 'bg-slate-900/90 border-emerald-500/40 shadow-md'
                        : 'bg-slate-950/60 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl">
                        {ach.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm">{ach.title}</h4>
                          <span className="text-[10px] font-mono text-slate-500 uppercase">
                            {ach.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{ach.description}</p>
                        <div className="flex items-center gap-2 mt-2 text-[10px] font-mono text-slate-300">
                          <span className="text-amber-400 font-bold">+{ach.rewardCoins.toLocaleString()} Coins</span>
                          <span>•</span>
                          <span className="text-emerald-400 font-bold">+₹{(ach.rewardRupees / 100000).toFixed(0)} Lakh</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {ach.claimed ? (
                        <span className="flex items-center gap-1 text-xs font-mono text-slate-500 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          CLAIMED
                        </span>
                      ) : ach.unlocked ? (
                        <button
                          onClick={() => handleClaim(ach.id)}
                          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 text-slate-950 font-bold text-xs font-['Chakra_Petch'] cursor-pointer shadow-lg animate-pulse"
                        >
                          <Gift className="w-3.5 h-3.5" />
                          CLAIM REWARD
                        </button>
                      ) : (
                        <div className="text-right text-xs font-mono text-slate-500">
                          <span>{ach.progress}/{ach.maxProgress}</span>
                          <div className="w-16 h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                            <div
                              className="h-full bg-slate-600"
                              style={{ width: `${(ach.progress / ach.maxProgress) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
