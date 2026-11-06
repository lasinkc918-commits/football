/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FootballPlayer } from '../data/gameDatabase';
import { PlayerDevelopment, PlayerTrainingProfile } from '../services/PlayerDevelopmentService';
import { Target, Zap, Shield, Sparkles, X, ChevronRight, Award, Dumbbell } from 'lucide-react';
import { PlayerPhotoAvatar } from './PlayerPhotoAvatar';

interface TrainingSkillGamesModalProps {
  squad: FootballPlayer[];
  coins: number;
  onSpendCoins: (amount: number) => boolean;
  onLaunchPracticeMode: (drillType: 'free_kick' | 'shooting' | 'dribbling' | 'gk_challenge') => void;
  onClose: () => void;
}

export const TrainingSkillGamesModal: React.FC<TrainingSkillGamesModalProps> = ({
  squad,
  coins,
  onSpendCoins,
  onLaunchPracticeMode,
  onClose,
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<FootballPlayer>(squad[0] || {} as FootballPlayer);
  const [profile, setProfile] = useState<PlayerTrainingProfile>(() =>
    PlayerDevelopment.getProfile(selectedPlayer.id)
  );

  const handleSelectPlayer = (p: FootballPlayer) => {
    setSelectedPlayer(p);
    setProfile(PlayerDevelopment.getProfile(p.id));
  };

  const handleTrainStat = (stat: keyof PlayerTrainingProfile['statBoosts']) => {
    const cost = ((profile.statBoosts[stat] || 0) + 1) * 15000;
    if (coins < cost) {
      alert(`Insufficient coins! Training this attribute requires ${cost.toLocaleString()} coins.`);
      return;
    }

    if (onSpendCoins(cost)) {
      const res = PlayerDevelopment.trainAttribute(selectedPlayer.id, stat, 1);
      if (res.success) {
        setProfile(PlayerDevelopment.getProfile(selectedPlayer.id));
      }
    }
  };

  const drills = [
    {
      id: 'free_kick',
      title: 'Free Kick Mastery',
      subtitle: 'Defensive Wall & Corner Targets',
      desc: 'Master the swerve curve system! Bend the ball around the 4-man wall into the top postage stamp.',
      icon: '🌀',
      statFocus: 'Curve & Shooting (+250 XP)',
    },
    {
      id: 'shooting',
      title: 'Precision Shooting Accuracy',
      subtitle: 'Dynamic Floating Targets',
      desc: 'Strike timed volleys and power drives through floating bullseye rings with high-score multiplier.',
      icon: '🎯',
      statFocus: 'Finishing & Shot Power (+250 XP)',
    },
    {
      id: 'dribbling',
      title: 'Slalom Dribbling Course',
      subtitle: 'High-Speed Agility Cones',
      desc: 'Sprint through a sequence of 12 slalom cones on the turf using rainbow flicks and body feints.',
      icon: '⚡',
      statFocus: 'Dribbling & Pace (+250 XP)',
    },
    {
      id: 'gk_challenge',
      title: 'Goalkeeper Reflex Wall',
      subtitle: 'Automated Ball Launcher Cannon',
      desc: 'Take direct manual control of the goalkeeper. Dive, punch, and parry rapid-fire supersonic shots.',
      icon: '🧤',
      statFocus: 'Reactions & Goalkeeping (+250 XP)',
    },
  ];

  return (
    <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0B0F17] border-2 border-slate-700/80 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-slate-900/90 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/40">
              <Dumbbell className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400 font-bold block">
                PERFORMANCE ACADEMY & DRILLS
              </span>
              <h2 className="text-2xl font-['Chakra_Petch'] font-bold text-white">
                TRAINING SKILL GAMES & DEVELOPMENT
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Skill Drills Pitch Launcher */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400">
              <span>PLAYABLE SKILL DRILL COURSES</span>
              <span className="text-teal-400 font-bold">INTERACTIVE 3D TURF PRACTICE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {drills.map((drill) => (
                <div
                  key={drill.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-3xl">{drill.icon}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-teal-400 border border-slate-800">
                        {drill.statFocus}
                      </span>
                    </div>
                    <h3 className="text-lg font-['Chakra_Petch'] font-bold text-white">
                      {drill.title}
                    </h3>
                    <span className="text-xs font-mono text-slate-400">{drill.subtitle}</span>
                    <p className="text-xs text-slate-300 mt-2 line-clamp-3">{drill.desc}</p>
                  </div>

                  <button
                    onClick={() => {
                      onLaunchPracticeMode(drill.id as any);
                      onClose();
                    }}
                    className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 text-slate-950 font-bold text-xs font-['Chakra_Petch'] tracking-wider shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>ENTER 3D DRILL</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Player Attribute Development Gym */}
          <div className="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-xs font-mono text-teal-400 font-bold uppercase tracking-wider">
                  SQUAD GYM & UPGRADES
                </span>
                <span className="text-[10px] font-mono text-amber-400 font-bold">
                  {coins.toLocaleString()} COINS
                </span>
              </div>

              {/* Player Selector Strip */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {squad.slice(0, 8).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPlayer(p)}
                    className={`p-1 rounded-xl border shrink-0 cursor-pointer transition-all ${
                      selectedPlayer.id === p.id
                        ? 'border-teal-400 bg-teal-500/20 scale-105'
                        : 'border-slate-800 bg-slate-950/60'
                    }`}
                  >
                    <PlayerPhotoAvatar player={p} size={36} className="rounded-lg" />
                  </button>
                ))}
              </div>

              {/* Active Player Card */}
              <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                <PlayerPhotoAvatar player={selectedPlayer} size={48} className="rounded-xl" />
                <div>
                  <h4 className="font-bold text-white text-sm">{selectedPlayer.name}</h4>
                  <div className="text-xs font-mono text-teal-400">
                    {selectedPlayer.position} • Level {profile.level} Academy Pro
                  </div>
                </div>
              </div>

              {/* XP Progress Bar */}
              <div>
                <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                  <span>ACADEMY XP</span>
                  <span className="text-white font-bold">{profile.xp} / {profile.xpToNextLevel}</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-400 transition-all"
                    style={{ width: `${Math.min(100, (profile.xp / profile.xpToNextLevel) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Attribute Boost Buttons */}
              <div className="space-y-2 pt-1">
                {(['pace', 'shooting', 'passing', 'dribbling', 'defending', 'stamina'] as const).map(
                  (stat) => {
                    const currentBoost = profile.statBoosts[stat] || 0;
                    const cost = (currentBoost + 1) * 15000;
                    return (
                      <div
                        key={stat}
                        className="flex items-center justify-between p-2 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs font-mono"
                      >
                        <div className="capitalize text-slate-300 font-bold">
                          {stat}: <span className="text-teal-400">+{currentBoost}</span>
                        </div>
                        <button
                          onClick={() => handleTrainStat(stat)}
                          disabled={currentBoost >= 15}
                          className="px-2.5 py-1 rounded-lg bg-teal-500 hover:bg-teal-400 disabled:bg-slate-800 text-slate-950 disabled:text-slate-500 font-bold text-[10px] cursor-pointer"
                        >
                          {currentBoost >= 15 ? 'MAXED' : `TRAIN (${(cost / 1000).toFixed(0)}k)`}
                        </button>
                      </div>
                    );
                  }
                )}
              </div>
            </div>

            <p className="text-[10px] font-mono text-slate-500 text-center mt-3">
              Upgrades apply permanently to player in all matches and online multiplayer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
