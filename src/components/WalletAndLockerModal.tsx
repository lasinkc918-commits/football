/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Check,
  Coins,
  DollarSign,
  Gift,
  HelpCircle,
  Lock,
  Package,
  RotateCcw,
  Shield,
  ShoppingBag,
  Sparkles,
  Trophy,
  X,
  Zap,
} from 'lucide-react';
import {
  FootballBallItem,
  MATCH_BALLS,
  ORIGINAL_JERSEYS,
  OriginalJerseyItem,
  PLAYER_BOOTS,
  PlayerBootsItem,
} from '../data/equipmentStoreDatabase';
import {
  getPlayerSignatureCelebration,
  SIGNATURE_CELEBRATIONS,
  SignatureCelebrationDef,
} from '../data/signatureCelebrations';
import { SoundEngine } from '../engine/SoundEngine';

export interface WalletAndLockerModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletRupees: number;
  coins: number;
  onSpendRupees: (amount: number, reason: string) => boolean;
  onSpendCoins: (amount: number, reason: string) => boolean;
  unlockedBallIds: string[];
  activeBallId: string;
  onSelectBall: (ballId: string) => void;
  onUnlockBall: (ballId: string, paidRupees: boolean) => void;
  unlockedJerseyIds: string[];
  activeJerseyId: string;
  onSelectJersey: (jerseyId: string) => void;
  onUnlockJersey: (jerseyId: string, paidRupees: boolean) => void;
  unlockedBootsIds: string[];
  activeBootsId: string;
  onSelectBoots: (bootsId: string) => void;
  onUnlockBoots: (bootsId: string, paidRupees: boolean) => void;
  preferredCelebration: string;
  onSelectCelebration: (celebrationKey: string) => void;
}

type TabType = 'wallet' | 'balls' | 'jerseys' | 'boots' | 'celebrations';

export function WalletAndLockerModal({
  isOpen,
  onClose,
  walletRupees,
  coins,
  onSpendRupees,
  onSpendCoins,
  unlockedBallIds,
  activeBallId,
  onSelectBall,
  onUnlockBall,
  unlockedJerseyIds,
  activeJerseyId,
  onSelectJersey,
  onUnlockJersey,
  unlockedBootsIds,
  activeBootsId,
  onSelectBoots,
  onUnlockBoots,
  preferredCelebration,
  onSelectCelebration,
}: WalletAndLockerModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('wallet');
  const [previewCelebration, setPreviewCelebration] = useState<SignatureCelebrationDef | null>(null);

  if (!isOpen) return null;

  const formatRupees = (amount: number) => {
    return '₹' + amount.toLocaleString('en-IN');
  };

  const handleBuyBall = (ball: FootballBallItem, useRupees: boolean) => {
    if (useRupees) {
      if (walletRupees < ball.priceRupees) {
        SoundEngine.playWhistle('foul');
        return;
      }
      if (onSpendRupees(ball.priceRupees, `Unlocked ${ball.name}`)) {
        onUnlockBall(ball.id, true);
        SoundEngine.playUIClick();
      }
    } else {
      if (coins < ball.priceCoins) {
        SoundEngine.playWhistle('foul');
        return;
      }
      if (onSpendCoins(ball.priceCoins, `Unlocked ${ball.name}`)) {
        onUnlockBall(ball.id, false);
        SoundEngine.playUIClick();
      }
    }
  };

  const handleBuyJersey = (jersey: OriginalJerseyItem, useRupees: boolean) => {
    if (useRupees) {
      if (walletRupees < jersey.priceRupees) {
        SoundEngine.playWhistle('foul');
        return;
      }
      if (onSpendRupees(jersey.priceRupees, `Unlocked ${jersey.name}`)) {
        onUnlockJersey(jersey.id, true);
        SoundEngine.playUIClick();
      }
    } else {
      if (coins < jersey.priceCoins) {
        SoundEngine.playWhistle('foul');
        return;
      }
      if (onSpendCoins(jersey.priceCoins, `Unlocked ${jersey.name}`)) {
        onUnlockJersey(jersey.id, false);
        SoundEngine.playUIClick();
      }
    }
  };

  const handleBuyBoots = (boots: PlayerBootsItem, useRupees: boolean) => {
    if (useRupees) {
      if (walletRupees < boots.priceRupees) {
        SoundEngine.playWhistle('foul');
        return;
      }
      if (onSpendRupees(boots.priceRupees, `Unlocked ${boots.name}`)) {
        onUnlockBoots(boots.id, true);
        SoundEngine.playUIClick();
      }
    } else {
      if (coins < boots.priceCoins) {
        SoundEngine.playWhistle('foul');
        return;
      }
      if (onSpendCoins(boots.priceCoins, `Unlocked ${boots.name}`)) {
        onUnlockBoots(boots.id, false);
        SoundEngine.playUIClick();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-black text-xl">
              ₹
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-wider uppercase text-white font-mono">
                  Wallet & Equipment Locker
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  AUTO-CREDIT ON
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Earn ₹5,00,000 every completed match · Customize match balls, jerseys, boots & celebrations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Wallet & Coins Pill */}
            <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5">
              <div className="flex items-center gap-1.5 pr-2 border-r border-slate-800">
                <span className="w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[11px] font-black flex items-center justify-center">
                  ₹
                </span>
                <span className="font-mono font-black text-sm text-emerald-400">
                  {formatRupees(walletRupees)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 pl-1">
                <Coins className="w-4 h-4 text-amber-400" />
                <span className="font-mono font-black text-sm text-amber-300">
                  {coins.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                SoundEngine.playUIClick();
                onClose();
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-4 gap-1 overflow-x-auto scrollbar-none">
          <button
            onClick={() => {
              SoundEngine.playUIClick();
              setActiveTab('wallet');
            }}
            className={`flex items-center gap-2 px-4 py-3 font-mono font-bold text-xs uppercase tracking-wider border-b-2 transition-all shrink-0 ${
              activeTab === 'wallet'
                ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-sm">₹</span>
            In-Game Wallet ({formatRupees(walletRupees)})
          </button>

          <button
            onClick={() => {
              SoundEngine.playUIClick();
              setActiveTab('balls');
            }}
            className={`flex items-center gap-2 px-4 py-3 font-mono font-bold text-xs uppercase tracking-wider border-b-2 transition-all shrink-0 ${
              activeTab === 'balls'
                ? 'border-sky-500 text-sky-400 bg-sky-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-sm">⚽</span>
            Match Balls ({unlockedBallIds.length}/{MATCH_BALLS.length})
          </button>

          <button
            onClick={() => {
              SoundEngine.playUIClick();
              setActiveTab('jerseys');
            }}
            className={`flex items-center gap-2 px-4 py-3 font-mono font-bold text-xs uppercase tracking-wider border-b-2 transition-all shrink-0 ${
              activeTab === 'jerseys'
                ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-sm">👕</span>
            Original Jerseys ({unlockedJerseyIds.length}/{ORIGINAL_JERSEYS.length})
          </button>

          <button
            onClick={() => {
              SoundEngine.playUIClick();
              setActiveTab('boots');
            }}
            className={`flex items-center gap-2 px-4 py-3 font-mono font-bold text-xs uppercase tracking-wider border-b-2 transition-all shrink-0 ${
              activeTab === 'boots'
                ? 'border-amber-500 text-amber-400 bg-amber-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-sm">👟</span>
            Pro Boots ({unlockedBootsIds.length}/{PLAYER_BOOTS.length})
          </button>

          <button
            onClick={() => {
              SoundEngine.playUIClick();
              setActiveTab('celebrations');
            }}
            className={`flex items-center gap-2 px-4 py-3 font-mono font-bold text-xs uppercase tracking-wider border-b-2 transition-all shrink-0 ${
              activeTab === 'celebrations'
                ? 'border-purple-500 text-purple-400 bg-purple-500/10'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-sm">🕺</span>
            Signature Celebrations
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: WALLET OVERVIEW */}
          {activeTab === 'wallet' && (
            <div className="space-y-6">
              {/* Giant Balance Hero Card */}
              <div className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 border border-emerald-500/30 shadow-2xl">
                <div className="absolute top-0 right-0 p-8 text-emerald-500/10 font-black text-8xl select-none pointer-events-none">
                  ₹
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 text-xs font-black uppercase rounded-lg bg-emerald-500 text-slate-950">
                      Virtual In-Game Currency
                    </span>
                    <span className="text-xs text-emerald-400/80 font-mono">
                      Permanent Cloud & IndexedDB Storage
                    </span>
                  </div>

                  <div>
                    <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                      Total Wallet Balance
                    </span>
                    <div className="flex items-baseline gap-3 mt-1">
                      <span className="text-4xl sm:text-5xl font-black font-mono text-emerald-400 tracking-tight">
                        {formatRupees(walletRupees)}
                      </span>
                      <span className="text-sm text-emerald-300 font-mono">
                        + {coins.toLocaleString()} Coins
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Gift className="w-4 h-4" />
                    </div>
                    <div className="text-xs text-slate-300 space-y-1">
                      <div className="font-bold text-white">
                        Guaranteed ₹5,00,000 Reward Every Match
                      </div>
                      <p className="text-slate-400 leading-relaxed">
                        Every time you complete a match in any mode (Tournament, World Cup, Quick Match, Online 1v1, or 11v11), ₹5,00,000 is automatically credited to your in-game wallet. Spend this virtual currency freely on authentic footballs, official jerseys, boots, and transfers.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                      <div className="text-[11px] font-mono text-slate-400 uppercase">Per Completed Match</div>
                      <div className="text-lg font-black text-emerald-400 font-mono">+₹5,00,000</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                      <div className="text-[11px] font-mono text-slate-400 uppercase">Unlocked Balls</div>
                      <div className="text-lg font-black text-sky-400 font-mono">
                        {unlockedBallIds.length} / {MATCH_BALLS.length}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                      <div className="text-[11px] font-mono text-slate-400 uppercase">Original Jerseys</div>
                      <div className="text-lg font-black text-indigo-400 font-mono">
                        {unlockedJerseyIds.length} / {ORIGINAL_JERSEYS.length}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800">
                      <div className="text-[11px] font-mono text-slate-400 uppercase">Pro Cleats</div>
                      <div className="text-lg font-black text-amber-400 font-mono">
                        {unlockedBootsIds.length} / {PLAYER_BOOTS.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Equipment Shortcuts */}
              <div>
                <h3 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase mb-3">
                  Quick Locker Customization
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => {
                      SoundEngine.playUIClick();
                      setActiveTab('balls');
                    }}
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-sky-500/50 text-left transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">⚽</span>
                      <span className="text-xs font-mono text-sky-400 font-bold group-hover:underline">
                        Change Ball &rarr;
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white mt-2">Match Ball Selection</div>
                    <div className="text-xs text-slate-400">Telstar, UCL Starball, 24K Gold, Hi-Vis</div>
                  </button>

                  <button
                    onClick={() => {
                      SoundEngine.playUIClick();
                      setActiveTab('jerseys');
                    }}
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-indigo-500/50 text-left transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">👕</span>
                      <span className="text-xs font-mono text-indigo-400 font-bold group-hover:underline">
                        Change Kit &rarr;
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white mt-2">Original Jerseys</div>
                    <div className="text-xs text-slate-400">Real Madrid, Barça, City, Argentina, Brazil</div>
                  </button>

                  <button
                    onClick={() => {
                      SoundEngine.playUIClick();
                      setActiveTab('celebrations');
                    }}
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-purple-500/50 text-left transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">🕺</span>
                      <span className="text-xs font-mono text-purple-400 font-bold group-hover:underline">
                        Explore Celebrations &rarr;
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white mt-2">Signature Celebrations</div>
                    <div className="text-xs text-slate-400">SIUUU, Lotus Zen, Cold Shiver, Skyward Point</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MATCH BALLS */}
          {activeTab === 'balls' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-mono font-bold uppercase text-white tracking-wider">
                    Official Match Balls Collection
                  </h3>
                  <p className="text-xs text-slate-400">
                    Equipped match ball will be rendered with full 3D physics and visual aerodynamics in every match.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MATCH_BALLS.map((ball) => {
                  const isUnlocked = unlockedBallIds.includes(ball.id) || ball.unlockedByDefault;
                  const isEquipped = activeBallId === ball.id;

                  return (
                    <div
                      key={ball.id}
                      className={`relative rounded-2xl p-4 flex flex-col justify-between border transition-all ${
                        isEquipped
                          ? 'bg-sky-950/40 border-sky-400 shadow-lg shadow-sky-500/10'
                          : isUnlocked
                          ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                          : 'bg-slate-950/40 border-slate-800/60 opacity-90'
                      }`}
                    >
                      {isEquipped && (
                        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-black font-mono bg-sky-500 text-slate-950 flex items-center gap-1 shadow-md">
                          <Check className="w-3 h-3" /> EQUIPPED
                        </div>
                      )}

                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          {/* Visual Ball Swatch */}
                          <div
                            className="w-12 h-12 rounded-full border-2 border-white/20 shadow-inner flex items-center justify-center text-xl shrink-0"
                            style={{
                              backgroundColor: ball.primaryColor,
                              boxShadow: `inset 0 0 12px ${ball.secondaryColor}`,
                            }}
                          >
                            ⚽
                          </div>
                          <div>
                            <div className="text-xs font-mono text-sky-400 font-bold uppercase">
                              {ball.brand}
                            </div>
                            <div className="font-bold text-white text-sm">{ball.name}</div>
                          </div>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed">{ball.tagline}</p>

                        <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
                          <div>
                            <span className="text-slate-500">Aerodynamics:</span>{' '}
                            <span className="text-emerald-400 font-bold">{ball.aerodynamics}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Curve:</span>{' '}
                            <span className="text-sky-400 font-bold">{ball.curveAssist}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-800/80 mt-4">
                        {isEquipped ? (
                          <button
                            disabled
                            className="w-full py-2 rounded-xl bg-sky-500/20 text-sky-300 font-mono font-bold text-xs uppercase cursor-default border border-sky-500/30"
                          >
                            Active Match Ball
                          </button>
                        ) : isUnlocked ? (
                          <button
                            onClick={() => {
                              SoundEngine.playUIClick();
                              onSelectBall(ball.id);
                            }}
                            className="w-full py-2 rounded-xl bg-slate-800 hover:bg-sky-600 text-white font-mono font-bold text-xs uppercase transition-colors"
                          >
                            Equip Match Ball
                          </button>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => handleBuyBall(ball, true)}
                              disabled={walletRupees < ball.priceRupees}
                              className={`py-2 px-2 rounded-xl font-mono font-bold text-[11px] uppercase transition-all flex items-center justify-center gap-1 ${
                                walletRupees >= ball.priceRupees
                                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                              }`}
                            >
                              <span>₹</span> {formatRupees(ball.priceRupees)}
                            </button>

                            <button
                              onClick={() => handleBuyBall(ball, false)}
                              disabled={coins < ball.priceCoins}
                              className={`py-2 px-2 rounded-xl font-mono font-bold text-[11px] uppercase transition-all flex items-center justify-center gap-1 ${
                                coins >= ball.priceCoins
                                  ? 'bg-amber-600 hover:bg-amber-500 text-white'
                                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                              }`}
                            >
                              <Coins className="w-3 h-3" /> {ball.priceCoins.toLocaleString()}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: ORIGINAL CLUB & NATIONAL JERSEYS */}
          {activeTab === 'jerseys' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-mono font-bold uppercase text-white tracking-wider">
                    Original Club & National Team Kits
                  </h3>
                  <p className="text-xs text-slate-400">
                    Give your starting XI authentic original jerseys with official stripes, team badges, chest sponsors, and numbers.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ORIGINAL_JERSEYS.map((jersey) => {
                  const isUnlocked = unlockedJerseyIds.includes(jersey.id) || jersey.unlockedByDefault;
                  const isEquipped = activeJerseyId === jersey.id;

                  return (
                    <div
                      key={jersey.id}
                      className={`relative rounded-2xl p-4 flex flex-col justify-between border transition-all ${
                        isEquipped
                          ? 'bg-indigo-950/40 border-indigo-400 shadow-lg shadow-indigo-500/10'
                          : isUnlocked
                          ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                          : 'bg-slate-950/40 border-slate-800/60 opacity-90'
                      }`}
                    >
                      {isEquipped && (
                        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-black font-mono bg-indigo-500 text-white flex items-center gap-1 shadow-md">
                          <Check className="w-3 h-3" /> EQUIPPED
                        </div>
                      )}

                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          {/* Mini Kit Swatch Preview */}
                          <div
                            className="w-12 h-14 rounded-lg border-2 border-white/20 shadow-md flex flex-col justify-between p-1 shrink-0 overflow-hidden"
                            style={{
                              backgroundColor: jersey.primaryColor,
                            }}
                          >
                            <div
                              className="h-2 w-full rounded"
                              style={{ backgroundColor: jersey.secondaryColor }}
                            />
                            <div
                              className="h-1.5 w-1/2 mx-auto rounded"
                              style={{ backgroundColor: jersey.accentColor }}
                            />
                            <div
                              className="h-2 w-full rounded"
                              style={{ backgroundColor: jersey.shortsColor }}
                            />
                          </div>

                          <div>
                            <div className="text-[10px] font-mono text-indigo-400 font-bold uppercase">
                              {jersey.leagueOrNation} · {jersey.season}
                            </div>
                            <div className="font-bold text-white text-sm">{jersey.name}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono uppercase">
                            {jersey.stripeStyle.replace('_', ' ')}
                          </span>
                          {jersey.sponsorText && (
                            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono uppercase text-amber-300">
                              {jersey.sponsorText}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-800/80 mt-4">
                        {isEquipped ? (
                          <button
                            disabled
                            className="w-full py-2 rounded-xl bg-indigo-500/20 text-indigo-300 font-mono font-bold text-xs uppercase cursor-default border border-indigo-500/30"
                          >
                            Active Match Kit
                          </button>
                        ) : isUnlocked ? (
                          <button
                            onClick={() => {
                              SoundEngine.playUIClick();
                              onSelectJersey(jersey.id);
                            }}
                            className="w-full py-2 rounded-xl bg-slate-800 hover:bg-indigo-600 text-white font-mono font-bold text-xs uppercase transition-colors"
                          >
                            Equip Original Jersey
                          </button>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => handleBuyJersey(jersey, true)}
                              disabled={walletRupees < jersey.priceRupees}
                              className={`py-2 px-2 rounded-xl font-mono font-bold text-[11px] uppercase transition-all flex items-center justify-center gap-1 ${
                                walletRupees >= jersey.priceRupees
                                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                              }`}
                            >
                              <span>₹</span> {formatRupees(jersey.priceRupees)}
                            </button>

                            <button
                              onClick={() => handleBuyJersey(jersey, false)}
                              disabled={coins < jersey.priceCoins}
                              className={`py-2 px-2 rounded-xl font-mono font-bold text-[11px] uppercase transition-all flex items-center justify-center gap-1 ${
                                coins >= jersey.priceCoins
                                  ? 'bg-amber-600 hover:bg-amber-500 text-white'
                                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                              }`}
                            >
                              <Coins className="w-3 h-3" /> {jersey.priceCoins.toLocaleString()}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: PRO BOOTS */}
          {activeTab === 'boots' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-mono font-bold uppercase text-white tracking-wider">
                    Pro Cleats & Boots Collection
                  </h3>
                  <p className="text-xs text-slate-400">
                    High-performance elite boots enhancing running sprint acceleration and shot venom.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PLAYER_BOOTS.map((boots) => {
                  const isUnlocked = unlockedBootsIds.includes(boots.id) || boots.unlockedByDefault;
                  const isEquipped = activeBootsId === boots.id;

                  return (
                    <div
                      key={boots.id}
                      className={`relative rounded-2xl p-4 flex flex-col justify-between border transition-all ${
                        isEquipped
                          ? 'bg-amber-950/40 border-amber-400 shadow-lg shadow-amber-500/10'
                          : isUnlocked
                          ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                          : 'bg-slate-950/40 border-slate-800/60 opacity-90'
                      }`}
                    >
                      {isEquipped && (
                        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-black font-mono bg-amber-500 text-slate-950 flex items-center gap-1 shadow-md">
                          <Check className="w-3 h-3" /> EQUIPPED
                        </div>
                      )}

                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-12 h-12 rounded-xl border-2 border-white/20 shadow-md flex items-center justify-center text-xl shrink-0"
                            style={{ backgroundColor: boots.primaryColor }}
                          >
                            👟
                          </div>
                          <div>
                            <div className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                              {boots.brand} · {boots.studType}
                            </div>
                            <div className="font-bold text-white text-sm">{boots.name}</div>
                          </div>
                        </div>

                        <p className="text-xs text-slate-400">{boots.model}</p>

                        <div className="flex items-center gap-4 text-xs font-mono">
                          <div className="text-emerald-400 font-bold">
                            + {boots.paceBonus} Sprint Pace
                          </div>
                          <div className="text-amber-400 font-bold">
                            + {boots.shotPowerBonus} Shot Power
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-800/80 mt-4">
                        {isEquipped ? (
                          <button
                            disabled
                            className="w-full py-2 rounded-xl bg-amber-500/20 text-amber-300 font-mono font-bold text-xs uppercase cursor-default border border-amber-500/30"
                          >
                            Active Boots
                          </button>
                        ) : isUnlocked ? (
                          <button
                            onClick={() => {
                              SoundEngine.playUIClick();
                              onSelectBoots(boots.id);
                            }}
                            className="w-full py-2 rounded-xl bg-slate-800 hover:bg-amber-600 text-white font-mono font-bold text-xs uppercase transition-colors"
                          >
                            Equip Boots
                          </button>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => handleBuyBoots(boots, true)}
                              disabled={walletRupees < boots.priceRupees}
                              className={`py-2 px-2 rounded-xl font-mono font-bold text-[11px] uppercase transition-all flex items-center justify-center gap-1 ${
                                walletRupees >= boots.priceRupees
                                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                              }`}
                            >
                              <span>₹</span> {formatRupees(boots.priceRupees)}
                            </button>

                            <button
                              onClick={() => handleBuyBoots(boots, false)}
                              disabled={coins < boots.priceCoins}
                              className={`py-2 px-2 rounded-xl font-mono font-bold text-[11px] uppercase transition-all flex items-center justify-center gap-1 ${
                                coins >= boots.priceCoins
                                  ? 'bg-amber-600 hover:bg-amber-500 text-white'
                                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                              }`}
                            >
                              <Coins className="w-3 h-3" /> {boots.priceCoins.toLocaleString()}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: SIGNATURE CELEBRATIONS */}
          {activeTab === 'celebrations' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-mono font-bold uppercase text-white tracking-wider">
                    Authentic Player Signature Celebrations
                  </h3>
                  <p className="text-xs text-slate-400">
                    Whenever a star or legend scores, their authentic iconic goal celebration triggers automatically with cinematic broadcast camera angles.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.values(SIGNATURE_CELEBRATIONS).map((celeb) => {
                  return (
                    <div
                      key={celeb.id}
                      className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-purple-500/50 transition-all flex flex-col justify-between space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl p-2 rounded-lg bg-slate-900 border border-slate-800">
                          {celeb.icon}
                        </span>
                        <div>
                          <div className="font-bold text-white text-sm">{celeb.name}</div>
                          <div className="text-[11px] text-purple-400 font-mono font-bold">
                            {celeb.callout}
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">{celeb.description}</p>

                      <div className="flex items-center justify-between text-[11px] font-mono pt-2 border-t border-slate-800 text-slate-400">
                        <span>Camera: <strong className="text-slate-200 capitalize">{celeb.cameraStyle.replace('_', ' ')}</strong></span>
                        <span className="text-emerald-400 font-bold">✓ AUTO-MATCHED</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Wallet Auto-Save is Active (IndexedDB ACID Database)</span>
          </div>

          <button
            onClick={() => {
              SoundEngine.playUIClick();
              onClose();
            }}
            className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black font-mono text-xs uppercase transition-colors"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
