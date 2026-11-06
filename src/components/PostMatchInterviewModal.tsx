/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FootballPlayer, TeamData } from '../data/gameDatabase';
import { PlayerPhotoAvatar } from './PlayerPhotoAvatar';
import { Mic, Award, BarChart3, MessageSquare, CheckCircle, TrendingUp, Users } from 'lucide-react';

interface PostMatchInterviewModalProps {
  homeTeam: TeamData;
  awayTeam: TeamData;
  homeScore: number;
  awayScore: number;
  homeSquad: FootballPlayer[];
  stats: {
    homePossession: number;
    awayPossession: number;
    homeShots: number;
    awayShots: number;
    homeShotsOnTarget: number;
    awayShotsOnTarget: number;
    homePasses: number;
    awayPasses: number;
    homeTackles: number;
    awayTackles: number;
    homeFouls: number;
    awayFouls: number;
  };
  onClose: () => void;
}

interface InterviewQuestion {
  id: string;
  journalist: string;
  outlet: string;
  question: string;
  options: {
    text: string;
    tone: 'Confident' | 'Humble' | 'Tactical';
    moraleImpact: string;
  }[];
}

export const PostMatchInterviewModal: React.FC<PostMatchInterviewModalProps> = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  homeSquad,
  stats,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'interview' | 'ratings' | 'stats'>('interview');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [teamMorale, setTeamMorale] = useState<number>(85);
  const [fanHype, setFanHype] = useState<number>(88);

  const isWin = homeScore > awayScore;
  const isDraw = homeScore === awayScore;

  // Context-aware press questions
  const questions: InterviewQuestion[] = [
    {
      id: 'q1',
      journalist: 'Martin Tyler',
      outlet: 'Sky Sports World',
      question: isWin
        ? `Sensational performance from your squad today with a ${homeScore}-${awayScore} result! What was the pivotal tactical adjustment that unlocked ${awayTeam.name}?`
        : isDraw
        ? `A tense ${homeScore}-${awayScore} draw out there today. Do you feel two points were dropped or one point gained?`
        : `A challenging ${homeScore}-${awayScore} scoreline today against ${awayTeam.name}. Where do you feel the match slipped out of your grasp?`,
      options: [
        {
          text: isWin
            ? 'Our relentless high press and clinical finishing made all the difference. The players executed the game plan to perfection.'
            : 'We gave everything on the pitch. In football, fine margins decide games and we will bounce back stronger.',
          tone: 'Confident',
          moraleImpact: '+8% Team Morale',
        },
        {
          text: isWin
            ? 'Full credit to the entire collective. Everyone from the backline to the attackers fought for every inch.'
            : 'We need to analyze our defensive transitions and be sharper in both boxes before the next fixture.',
          tone: 'Humble',
          moraleImpact: '+5% Fan Respect',
        },
        {
          text: 'Tactically we exploited the wide channels and controlled the central tempo exactly as prepared on the training ground.',
          tone: 'Tactical',
          moraleImpact: '+6% Tactical IQ',
        },
      ],
    },
    {
      id: 'q2',
      journalist: 'Guillem Balague',
      outlet: 'Cadena SER',
      question: `There was immense intensity and several tight refereeing moments with VAR today. What was your perspective from the technical area?`,
      options: [
        {
          text: 'The referee and VAR had a difficult job today. Overall, technology ensures fairness and we respect the official calls.',
          tone: 'Humble',
          moraleImpact: '+7% Fair Play Rating',
        },
        {
          text: 'We focus strictly on what we can control on the ball. Our mentality is impervious to external decisions.',
          tone: 'Confident',
          moraleImpact: '+9% Squad Focus',
        },
        {
          text: 'Some decisions were questionable in critical moments, but my players maintained emotional discipline brilliantly.',
          tone: 'Tactical',
          moraleImpact: '+5% Authority',
        },
      ],
    },
    {
      id: 'q3',
      journalist: 'Fabrizio Romano',
      outlet: 'Sky Calcio Transfer News',
      question: `With the transfer window open and player development progressing so rapidly, will you be strengthening the squad further?`,
      options: [
        {
          text: 'I have 100% faith in this squad. Our academy and player development programs are producing world-class quality.',
          tone: 'Confident',
          moraleImpact: '+10% Dressing Room Harmony',
        },
        {
          text: 'We are always active in the market if the right opportunity arises, but chemistry remains our top priority.',
          tone: 'Tactical',
          moraleImpact: '+6% Market Value',
        },
        {
          text: 'Every player here is fighting for the badge. Any newcomer must match our relentless work ethic.',
          tone: 'Humble',
          moraleImpact: '+5% Fan Loyalty',
        },
      ],
    },
  ];

  const handleSelectAnswer = (qIdx: number, aIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: aIdx }));
    setTeamMorale((prev) => Math.min(100, prev + 5));
    setFanHype((prev) => Math.min(100, prev + 4));

    if (qIdx < questions.length - 1) {
      setTimeout(() => setCurrentQuestionIndex(qIdx + 1), 600);
    }
  };

  // Generate dynamic 1-10 player performance ratings
  const playerRatings = homeSquad.slice(0, 11).map((p, idx) => {
    let base = isWin ? 7.6 : isDraw ? 6.9 : 6.3;
    if (idx === 0) base += Math.min(1.5, stats.homeTackles * 0.1); // GK/DF
    if (idx >= 8) base += Math.min(2.0, homeScore * 0.7); // Forwards
    const rating = Math.min(9.9, Math.max(6.0, Number((base + (idx % 3) * 0.4).toFixed(1))));
    return {
      player: p,
      rating,
      isMOTM: false,
    };
  });
  // Highest rating is MOTM
  const sorted = [...playerRatings].sort((a, b) => b.rating - a.rating);
  if (sorted[0]) sorted[0].isMOTM = true;

  // Expected Goals (xG) calculation
  const homeXG = (stats.homeShotsOnTarget * 0.32 + (stats.homeShots - stats.homeShotsOnTarget) * 0.08).toFixed(2);
  const awayXG = (stats.awayShotsOnTarget * 0.28 + (stats.awayShots - stats.awayShotsOnTarget) * 0.06).toFixed(2);

  return (
    <div className="fixed inset-0 z-[125] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0B0F17] border-2 border-slate-700/80 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-slate-900/90 border-b border-slate-800 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                PRESS CONFERENCE & POST-MATCH AUDIT
              </span>
              <h2 className="text-xl md:text-2xl font-['Chakra_Petch'] font-bold text-white">
                {homeTeam.name} {homeScore} - {awayScore} {awayTeam.name}
              </h2>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-mono font-bold">
            <button
              onClick={() => setActiveTab('interview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'interview'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              PRESS INTERVIEW
            </button>
            <button
              onClick={() => setActiveTab('ratings')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'ratings'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              RATINGS
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'stats'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              ANALYTICS (xG)
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'interview' && (
            <div className="space-y-6">
              {/* Morale Meters */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800 flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-400">TEAM MORALE</span>
                      <span className="text-emerald-400 font-bold">{teamMorale}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${teamMorale}%` }} />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-2xl border border-slate-800 flex items-center gap-3">
                  <Users className="w-5 h-5 text-cyan-400" />
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-slate-400">FAN APPROVAL</span>
                      <span className="text-cyan-400 font-bold">{fanHype}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400" style={{ width: `${fanHype}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Question Box */}
              {questions[currentQuestionIndex] && (
                <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-[10px] font-mono rounded border border-amber-500/30">
                        {questions[currentQuestionIndex].outlet}
                      </span>
                      <span className="text-xs font-mono text-slate-300 font-bold">
                        {questions[currentQuestionIndex].journalist}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-500">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </span>
                  </div>

                  <p className="text-white font-['Plus_Jakarta_Sans'] font-medium text-base italic border-l-2 border-emerald-500 pl-3">
                    "{questions[currentQuestionIndex].question}"
                  </p>

                  {/* Options */}
                  <div className="space-y-2 pt-2">
                    {questions[currentQuestionIndex].options.map((opt, aIdx) => {
                      const isChosen = selectedAnswers[currentQuestionIndex] === aIdx;
                      return (
                        <button
                          key={aIdx}
                          onClick={() => handleSelectAnswer(currentQuestionIndex, aIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                            isChosen
                              ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-md'
                              : 'bg-slate-950/70 border-slate-800 hover:border-slate-600 text-slate-300'
                          }`}
                        >
                          <div className="space-y-1 pr-3">
                            <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 mr-2">
                              {opt.tone}
                            </span>
                            <span className="text-sm font-medium">{opt.text}</span>
                          </div>
                          <span className="text-[10px] font-mono font-bold text-emerald-400 shrink-0">
                            {opt.moraleImpact}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'ratings' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                <span>OFFICIAL PERFORMANCE EVALUATION (1.0 - 10.0 SCALE)</span>
                <span className="text-amber-400 font-bold">★ STARRED = MAN OF THE MATCH</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {playerRatings.map(({ player, rating, isMOTM }) => (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between p-3 rounded-2xl border ${
                      isMOTM
                        ? 'bg-amber-500/10 border-amber-500/50 shadow-md'
                        : 'bg-slate-900/60 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <PlayerPhotoAvatar player={player} size={40} className="rounded-xl" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-white">{player.name}</span>
                          {isMOTM && (
                            <span className="px-1.5 py-0.2 bg-amber-400 text-slate-950 rounded text-[9px] font-mono font-black">
                              MOTM
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-slate-400">
                          {player.position} • Base OVR {player.rating}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`font-['Chakra_Petch'] font-black text-xl px-2.5 py-1 rounded-xl ${
                        rating >= 8.5
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : rating >= 7.0
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {rating}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-6">
              {/* xG Big Header */}
              <div className="grid grid-cols-3 items-center text-center p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div>
                  <span className="text-3xl font-['Chakra_Petch'] font-black text-emerald-400">
                    {homeXG}
                  </span>
                  <span className="block text-xs font-mono text-slate-400 mt-1">{homeTeam.name} xG</span>
                </div>
                <div className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
                  EXPECTED GOALS (xG)
                </div>
                <div>
                  <span className="text-3xl font-['Chakra_Petch'] font-black text-cyan-400">
                    {awayXG}
                  </span>
                  <span className="block text-xs font-mono text-slate-400 mt-1">{awayTeam.name} xG</span>
                </div>
              </div>

              {/* Stat Comparison Bars */}
              <div className="space-y-4">
                {[
                  { label: 'POSSESSION', h: `${stats.homePossession}%`, a: `${stats.awayPossession}%`, hp: stats.homePossession },
                  { label: 'SHOTS (ON TARGET)', h: `${stats.homeShots} (${stats.homeShotsOnTarget})`, a: `${stats.awayShots} (${stats.awayShotsOnTarget})`, hp: (stats.homeShots / Math.max(1, stats.homeShots + stats.awayShots)) * 100 },
                  { label: 'PASSES COMPLETED', h: `${stats.homePasses}`, a: `${stats.awayPasses}`, hp: (stats.homePasses / Math.max(1, stats.homePasses + stats.awayPasses)) * 100 },
                  { label: 'TACKLES WON', h: `${stats.homeTackles}`, a: `${stats.awayTackles}`, hp: (stats.homeTackles / Math.max(1, stats.homeTackles + stats.awayTackles)) * 100 },
                  { label: 'FOULS CONCEDED', h: `${stats.homeFouls}`, a: `${stats.awayFouls}`, hp: 50 },
                ].map((row, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-emerald-400 font-bold">{row.h}</span>
                      <span className="text-slate-400">{row.label}</span>
                      <span className="text-cyan-400 font-bold">{row.a}</span>
                    </div>
                    <div className="flex h-2 rounded-full overflow-hidden bg-slate-800">
                      <div className="bg-emerald-500" style={{ width: `${row.hp}%` }} />
                      <div className="bg-cyan-400 flex-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 text-slate-950 font-bold font-['Chakra_Petch'] tracking-wider shadow-lg transition-all cursor-pointer"
          >
            <CheckCircle className="w-4 h-4" />
            CONCLUDE PRESS CONFERENCE
          </button>
        </div>
      </div>
    </div>
  );
};
