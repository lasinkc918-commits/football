/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FootballPlayer } from '../data/gameDatabase';
import { PlayerPhotoAvatar } from './PlayerPhotoAvatar';
import { Briefcase, ArrowRightLeft, DollarSign, Handshake, Check, X, AlertCircle } from 'lucide-react';

interface TransferNegotiationModalProps {
  player: FootballPlayer;
  isSellingMode?: boolean;
  userCoins: number;
  userRupees: number;
  onConfirmPurchase: (player: FootballPlayer, finalFeeCoins: number, finalFeeRupees: number) => void;
  onConfirmSale?: (player: FootballPlayer, saleEarningsCoins: number, saleEarningsRupees: number) => void;
  onClose: () => void;
}

export const TransferNegotiationModal: React.FC<TransferNegotiationModalProps> = ({
  player,
  isSellingMode = false,
  userCoins,
  userRupees,
  onConfirmPurchase,
  onConfirmSale,
  onClose,
}) => {
  const basePriceCoins = player.price;
  const basePriceRupees = Math.round(player.price * 2.5);

  // Negotiation offer slider
  const [offerDiscountPercent, setOfferDiscountPercent] = useState<number>(0); // -20% to +20%
  const [wageOfferTier, setWageOfferTier] = useState<'Standard' | 'Star' | 'Legendary'>('Standard');
  const [boardStatus, setBoardStatus] = useState<'pending' | 'counter' | 'accepted' | 'rejected'>('pending');
  const [counterFeeCoins, setCounterFeeCoins] = useState<number>(basePriceCoins);
  const [counterFeeRupees, setCounterFeeRupees] = useState<number>(basePriceRupees);

  const offeredCoins = Math.round(basePriceCoins * (1 + offerDiscountPercent / 100));
  const offeredRupees = Math.round(basePriceRupees * (1 + offerDiscountPercent / 100));

  const handleNegotiateOffer = () => {
    // If selling mode, buyer club makes an offer
    if (isSellingMode) {
      const buyerClubOffers = ['Bayern Munich', 'Real Madrid', 'Manchester City', 'Paris Saint-Germain'];
      const buyer = buyerClubOffers[Math.floor(Math.random() * buyerClubOffers.length)];
      setBoardStatus('accepted');
      return;
    }

    // Buying mode: AI Board evaluation
    if (offerDiscountPercent < -15) {
      // Too low, board counters or rejects
      if (Math.random() > 0.4) {
        setBoardStatus('counter');
        const counterPercent = -5;
        setCounterFeeCoins(Math.round(basePriceCoins * (1 + counterPercent / 100)));
        setCounterFeeRupees(Math.round(basePriceRupees * (1 + counterPercent / 100)));
      } else {
        setBoardStatus('rejected');
      }
    } else {
      // Accepted!
      setBoardStatus('accepted');
    }
  };

  const handleFinalizeDeal = () => {
    if (isSellingMode) {
      if (onConfirmSale) {
        onConfirmSale(player, offeredCoins, offeredRupees);
      }
    } else {
      const finalCoins = boardStatus === 'counter' ? counterFeeCoins : offeredCoins;
      const finalRupees = boardStatus === 'counter' ? counterFeeRupees : offeredRupees;
      onConfirmPurchase(player, finalCoins, finalRupees);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0B0F17] border-2 border-slate-700/80 rounded-3xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-slate-900/90 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold block">
                {isSellingMode ? 'SQUAD SALESROOM' : 'TRANSFER BOARD NEGOTIATION'}
              </span>
              <h2 className="text-2xl font-['Chakra_Petch'] font-bold text-white">
                {isSellingMode ? `Sell ${player.name}` : `Transfer Talks: ${player.name}`}
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
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Player Spotlight Card */}
          <div className="flex items-center gap-5 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <PlayerPhotoAvatar player={player} size={72} className="rounded-2xl border border-indigo-500/40" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[10px] font-mono font-bold">
                  {player.position}
                </span>
                <span className="text-xs font-mono text-slate-400">Club: {player.club}</span>
              </div>
              <h3 className="text-xl font-['Chakra_Petch'] font-bold text-white">{player.name}</h3>
              <div className="flex gap-4 text-xs font-mono text-slate-300">
                <span>Rating: <strong className="text-emerald-400">{player.rating}</strong></span>
                <span>Pace: <strong>{player.attributes.pace}</strong></span>
                <span>Shooting: <strong>{player.attributes.shooting}</strong></span>
                <span>Passing: <strong>{player.attributes.passing}</strong></span>
              </div>
            </div>
          </div>

          {/* Pricing & Offer Controls */}
          {boardStatus === 'pending' && (
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-slate-400">TRANSFER FEE BID ADJUSTMENT</span>
                  <span className={`font-bold ${offerDiscountPercent < 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {offerDiscountPercent > 0 ? `+${offerDiscountPercent}%` : `${offerDiscountPercent}%`}
                  </span>
                </div>
                <input
                  type="range"
                  min={-25}
                  max={25}
                  step={5}
                  value={offerDiscountPercent}
                  onChange={(e) => setOfferDiscountPercent(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>-25% Aggressive Bargain</span>
                  <span>Asking Price</span>
                  <span>+25% Guaranteed Sweetener</span>
                </div>
              </div>

              {/* Fee Breakdown Display */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-mono text-slate-400 block">OFFERED IN COINS</span>
                  <div className="text-2xl font-['Chakra_Petch'] font-black text-amber-400 mt-1">
                    {offeredCoins.toLocaleString()}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    Base: {basePriceCoins.toLocaleString()}
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-mono text-slate-400 block">OR IN RUPEES (₹)</span>
                  <div className="text-2xl font-['Chakra_Petch'] font-black text-emerald-400 mt-1">
                    ₹{offeredRupees.toLocaleString()}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">
                    Base: ₹{basePriceRupees.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Contract Package */}
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-2 font-bold">
                  PLAYER CONTRACT WAGE PACKAGE
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Standard', 'Star', 'Legendary'] as const).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setWageOfferTier(tier)}
                      className={`p-2.5 rounded-xl border text-xs font-mono cursor-pointer transition-all ${
                        wageOfferTier === tier
                          ? 'bg-indigo-500/20 border-indigo-400 text-white font-bold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {tier} Contract
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleNegotiateOffer}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 text-white font-bold font-['Chakra_Petch'] tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Handshake className="w-5 h-5" />
                SUBMIT FORMAL BID TO BOARD
              </button>
            </div>
          )}

          {boardStatus === 'counter' && (
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/40 space-y-4 animate-in zoom-in-95">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
                <AlertCircle className="w-4 h-4" />
                BOARD COUNTER-OFFER RECEIVED
              </div>
              <p className="text-slate-300 text-sm">
                The club board deemed your initial bid slightly low, but are willing to sanction the deal at the following compromised fee:
              </p>
              <div className="flex gap-4">
                <div className="flex-1 bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-400">COUNTER COINS</span>
                  <div className="text-xl font-black text-amber-400">{counterFeeCoins.toLocaleString()}</div>
                </div>
                <div className="flex-1 bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] font-mono text-slate-400">COUNTER RUPEES</span>
                  <div className="text-xl font-black text-emerald-400">₹{counterFeeRupees.toLocaleString()}</div>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setBoardStatus('pending')}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs font-bold cursor-pointer"
                >
                  REVISE OFFER
                </button>
                <button
                  onClick={handleFinalizeDeal}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-['Chakra_Petch'] text-xs cursor-pointer"
                >
                  ACCEPT COUNTER-OFFER
                </button>
              </div>
            </div>
          )}

          {boardStatus === 'accepted' && (
            <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-center space-y-3 animate-in zoom-in-95">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-['Chakra_Petch'] font-bold text-emerald-400">
                OFFER OFFICIALLY ACCEPTED!
              </h3>
              <p className="text-slate-300 text-sm">
                Personal terms agreed. Contract signed with medical clearance passed.
              </p>
              <button
                onClick={handleFinalizeDeal}
                className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 text-slate-950 font-bold font-['Chakra_Petch'] cursor-pointer shadow-lg"
              >
                {isSellingMode ? 'CONFIRM SALE & COLLECT FUNDS' : 'COMPLETE SIGNING & JOIN SQUAD'}
              </button>
            </div>
          )}

          {boardStatus === 'rejected' && (
            <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/40 text-center space-y-3 animate-in zoom-in-95">
              <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
                <X className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-['Chakra_Petch'] font-bold text-rose-400">
                BID REJECTED BY CLUB
              </h3>
              <p className="text-slate-300 text-sm">
                The board considered the offer insulting for a player of this caliber and walked away from negotiations.
              </p>
              <button
                onClick={() => setBoardStatus('pending')}
                className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs cursor-pointer"
              >
                RE-ENTER TALKS WITH HIGHER BID
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
