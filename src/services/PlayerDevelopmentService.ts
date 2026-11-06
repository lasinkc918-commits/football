/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FootballPlayer } from '../data/gameDatabase';

export interface PlayerTrainingProfile {
  playerId: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  statBoosts: {
    pace: number;
    shooting: number;
    passing: number;
    dribbling: number;
    defending: number;
    stamina: number;
  };
  totalDrillsCompleted: number;
}

const DEV_STORAGE_KEY = 'fe_player_development_profiles_v1';

export class PlayerDevelopmentService {
  private static instance: PlayerDevelopmentService;
  private profiles: Record<string, PlayerTrainingProfile> = {};

  private constructor() {
    this.load();
  }

  public static getInstance(): PlayerDevelopmentService {
    if (!PlayerDevelopmentService.instance) {
      PlayerDevelopmentService.instance = new PlayerDevelopmentService();
    }
    return PlayerDevelopmentService.instance;
  }

  private load() {
    try {
      const raw = localStorage.getItem(DEV_STORAGE_KEY);
      if (raw) {
        this.profiles = JSON.parse(raw);
      }
    } catch {}
  }

  private save() {
    try {
      localStorage.setItem(DEV_STORAGE_KEY, JSON.stringify(this.profiles));
    } catch {}
  }

  public getProfile(playerId: string): PlayerTrainingProfile {
    if (!this.profiles[playerId]) {
      this.profiles[playerId] = {
        playerId,
        level: 1,
        xp: 0,
        xpToNextLevel: 1000,
        statBoosts: {
          pace: 0,
          shooting: 0,
          passing: 0,
          dribbling: 0,
          defending: 0,
          stamina: 0,
        },
        totalDrillsCompleted: 0,
      };
      this.save();
    }
    return this.profiles[playerId];
  }

  public trainAttribute(
    playerId: string,
    stat: keyof PlayerTrainingProfile['statBoosts'],
    pointsToAdd: number = 1
  ): { success: boolean; newBoost: number; costCoins: number } {
    const prof = this.getProfile(playerId);
    const currentVal = prof.statBoosts[stat] || 0;
    if (currentVal >= 15) {
      return { success: false, newBoost: currentVal, costCoins: 0 };
    }

    const costCoins = (currentVal + 1) * 15000;
    prof.statBoosts[stat] = Math.min(15, currentVal + pointsToAdd);
    prof.xp += 250 * pointsToAdd;
    prof.totalDrillsCompleted += 1;

    // Check level up
    while (prof.xp >= prof.xpToNextLevel) {
      prof.xp -= prof.xpToNextLevel;
      prof.level += 1;
      prof.xpToNextLevel = Math.round(prof.xpToNextLevel * 1.35);
    }

    this.save();
    return { success: true, newBoost: prof.statBoosts[stat], costCoins };
  }

  public applyBoostsToPlayer(player: FootballPlayer): FootballPlayer {
    const prof = this.profiles[player.id];
    if (!prof) return player;

    const b = prof.statBoosts;
    const boostSum = b.pace + b.shooting + b.passing + b.dribbling + b.defending + b.stamina;
    const ratingBoost = Math.floor(boostSum / 6);

    return {
      ...player,
      rating: Math.min(99, player.rating + ratingBoost),
      attributes: {
        ...player.attributes,
        pace: Math.min(99, player.attributes.pace + b.pace),
        shooting: Math.min(99, player.attributes.shooting + b.shooting),
        passing: Math.min(99, player.attributes.passing + b.passing),
        dribbling: Math.min(99, player.attributes.dribbling + b.dribbling),
        defending: Math.min(99, player.attributes.defending + b.defending),
        physical: Math.min(99, player.attributes.physical + b.stamina),
        stamina: Math.min(99, (player.attributes.stamina || 80) + b.stamina),
      },
    };
  }
}

export const PlayerDevelopment = PlayerDevelopmentService.getInstance();
