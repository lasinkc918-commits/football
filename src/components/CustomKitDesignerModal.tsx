/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shirt, Palette, Check, X, Sparkles, Layers, Sliders } from 'lucide-react';

export interface CustomKitConfig {
  id: string;
  name: string;
  pattern: 'solid' | 'stripes' | 'hoops' | 'sash' | 'chevron' | 'hexagons';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  shortsColor: string;
  socksColor: string;
  collarType: 'round' | 'v-neck' | 'polo';
  sponsorText: string;
  numberColor: string;
}

interface CustomKitDesignerModalProps {
  onClose: () => void;
  onSaveKit: (kit: CustomKitConfig) => void;
  activeKitId?: string;
}

const COLOR_PALETTE = [
  '#FFFFFF', '#0A0A0A', '#DC2626', '#1E40AF', '#059669',
  '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16',
  '#F97316', '#64748B', '#B91C1C', '#1D4ED8', '#047857',
];

export const CustomKitDesignerModal: React.FC<CustomKitDesignerModalProps> = ({
  onClose,
  onSaveKit,
}) => {
  const [kit, setKit] = useState<CustomKitConfig>(() => {
    try {
      const saved = localStorage.getItem('fe_custom_designed_kit_v1');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      id: 'custom_kit_player_1',
      name: 'Custom Strike Elite Kit',
      pattern: 'stripes',
      primaryColor: '#1E40AF',
      secondaryColor: '#DC2626',
      accentColor: '#F59E0B',
      shortsColor: '#0A0A0A',
      socksColor: '#1E40AF',
      collarType: 'v-neck',
      sponsorText: 'FLY EMIRATES',
      numberColor: '#FFFFFF',
    };
  });

  const handleSave = () => {
    localStorage.setItem('fe_custom_designed_kit_v1', JSON.stringify(kit));
    onSaveKit(kit);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0B0F17] border-2 border-slate-700/80 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-slate-900/90 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <Shirt className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block">
                ATELIER & COUTURE STUDIO
              </span>
              <h2 className="text-2xl font-['Chakra_Petch'] font-bold text-white">
                CUSTOM KIT DESIGNER
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

        {/* Studio Workspace */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: 2D Interactive Kit Preview Model */}
          <div className="flex flex-col items-center justify-center bg-slate-950/80 p-6 rounded-3xl border border-slate-800 relative shadow-inner">
            <span className="absolute top-4 left-4 text-xs font-mono text-slate-500">LIVE RENDER PREVIEW</span>

            <div className="relative w-56 h-72 flex flex-col items-center justify-center">
              {/* Jersey Body */}
              <div
                className="w-44 h-48 rounded-t-3xl relative overflow-hidden shadow-2xl border-2 border-white/20 transition-all duration-300"
                style={{ backgroundColor: kit.primaryColor }}
              >
                {/* Patterns */}
                {kit.pattern === 'stripes' && (
                  <div
                    className="absolute inset-0 opacity-80"
                    style={{
                      backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 18px, ${kit.secondaryColor} 18px, ${kit.secondaryColor} 36px)`,
                    }}
                  />
                )}
                {kit.pattern === 'hoops' && (
                  <div
                    className="absolute inset-0 opacity-80"
                    style={{
                      backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, ${kit.secondaryColor} 20px, ${kit.secondaryColor} 40px)`,
                    }}
                  />
                )}
                {kit.pattern === 'sash' && (
                  <div
                    className="absolute inset-0 opacity-85"
                    style={{
                      backgroundImage: `linear-gradient(135deg, transparent 40%, ${kit.secondaryColor} 40%, ${kit.secondaryColor} 60%, transparent 60%)`,
                    }}
                  />
                )}
                {kit.pattern === 'chevron' && (
                  <div
                    className="absolute inset-0 opacity-80"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 0, ${kit.secondaryColor} 45%, transparent 46%)`,
                    }}
                  />
                )}

                {/* Collar */}
                <div
                  className="w-16 h-8 mx-auto rounded-b-full border-b-4 border-x-2 transition-all duration-300"
                  style={{
                    backgroundColor: kit.collarType === 'polo' ? kit.accentColor : 'transparent',
                    borderColor: kit.accentColor,
                  }}
                />

                {/* Sponsor */}
                <div className="absolute top-24 inset-x-0 text-center">
                  <span
                    className="text-xs font-['Chakra_Petch'] font-black tracking-widest px-2 py-0.5 rounded shadow"
                    style={{ color: kit.numberColor, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                  >
                    {kit.sponsorText}
                  </span>
                </div>

                {/* Number */}
                <div className="absolute top-32 inset-x-0 text-center">
                  <span
                    className="text-3xl font-['Chakra_Petch'] font-black tracking-wider"
                    style={{ color: kit.numberColor }}
                  >
                    10
                  </span>
                </div>
              </div>

              {/* Shorts */}
              <div
                className="w-36 h-20 rounded-b-2xl mt-1 shadow-lg border-x-2 border-b-2 border-white/20 transition-all duration-300 flex justify-between px-3"
                style={{ backgroundColor: kit.shortsColor }}
              >
                <div className="w-1.5 h-full opacity-60" style={{ backgroundColor: kit.accentColor }} />
                <div className="w-1.5 h-full opacity-60" style={{ backgroundColor: kit.accentColor }} />
              </div>

              {/* Socks */}
              <div className="w-32 flex justify-between mt-1 px-4">
                <div className="w-6 h-10 rounded-b-lg border border-white/10" style={{ backgroundColor: kit.socksColor }} />
                <div className="w-6 h-10 rounded-b-lg border border-white/10" style={{ backgroundColor: kit.socksColor }} />
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className="text-white font-bold text-sm">{kit.name}</span>
              <p className="text-slate-400 text-xs font-mono mt-0.5">Custom Pattern • {kit.collarType.toUpperCase()} Collar</p>
            </div>
          </div>

          {/* Right: Customization Controls */}
          <div className="space-y-5">
            {/* Pattern Selector */}
            <div>
              <label className="text-xs font-mono text-slate-300 font-bold block mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                JERSEY PATTERN STYLE
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['solid', 'stripes', 'hoops', 'sash', 'chevron', 'hexagons'] as const).map((pat) => (
                  <button
                    key={pat}
                    onClick={() => setKit({ ...kit, pattern: pat })}
                    className={`py-2 px-3 rounded-xl border text-xs font-mono capitalize transition-all cursor-pointer ${
                      kit.pattern === pat
                        ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {pat}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary & Secondary Color Palettes */}
            <div>
              <label className="text-xs font-mono text-slate-300 font-bold block mb-2 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-cyan-400" />
                PRIMARY COLOR (BASE TURF)
              </label>
              <div className="flex flex-wrap gap-2">
                {COLOR_PALETTE.map((col) => (
                  <button
                    key={col}
                    onClick={() => setKit({ ...kit, primaryColor: col })}
                    className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                      kit.primaryColor === col ? 'scale-110 border-white shadow-lg' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: col }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-slate-300 font-bold block mb-2">
                SECONDARY COLOR (STRIPES / ACCENTS)
              </label>
              <div className="flex flex-wrap gap-2">
                {COLOR_PALETTE.map((col) => (
                  <button
                    key={col}
                    onClick={() => setKit({ ...kit, secondaryColor: col })}
                    className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                      kit.secondaryColor === col ? 'scale-110 border-white shadow-lg' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: col }}
                  />
                ))}
              </div>
            </div>

            {/* Shorts & Socks Color */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-300 font-bold block mb-2">SHORTS COLOR</label>
                <div className="flex flex-wrap gap-1.5">
                  {COLOR_PALETTE.slice(0, 8).map((col) => (
                    <button
                      key={col}
                      onClick={() => setKit({ ...kit, shortsColor: col })}
                      className={`w-5 h-5 rounded-md border ${
                        kit.shortsColor === col ? 'border-white scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: col }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-mono text-slate-300 font-bold block mb-2">SOCKS COLOR</label>
                <div className="flex flex-wrap gap-1.5">
                  {COLOR_PALETTE.slice(0, 8).map((col) => (
                    <button
                      key={col}
                      onClick={() => setKit({ ...kit, socksColor: col })}
                      className={`w-5 h-5 rounded-md border ${
                        kit.socksColor === col ? 'border-white scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: col }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Sponsor Text Input */}
            <div>
              <label className="text-xs font-mono text-slate-300 font-bold block mb-1">
                SPONSOR CHEST BRANDING
              </label>
              <input
                type="text"
                value={kit.sponsorText}
                onChange={(e) => setKit({ ...kit, sponsorText: e.target.value.toUpperCase() })}
                maxLength={18}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono text-xs focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-900 border-t border-slate-800 flex justify-between items-center">
          <span className="text-xs font-mono text-slate-400">
            Kit will be saved permanently and available to equip on any match mode.
          </span>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono font-bold hover:bg-slate-700 cursor-pointer"
            >
              CANCEL
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 text-slate-950 font-bold font-['Chakra_Petch'] tracking-wider shadow-lg cursor-pointer"
            >
              <Check className="w-4 h-4" />
              SAVE & EQUIP KIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
