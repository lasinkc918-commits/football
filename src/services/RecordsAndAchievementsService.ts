/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HallOfFameRecord {
  id: string;
  title: string;
  description: string;
  currentHolder: string;
  valueDisplay: string;
  numericValue: number;
  dateAchieved: string;
  icon: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  category: 'gameplay' | 'mastery' | 'modes' | 'career';
  icon: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  rewardCoins: number;
  rewardRupees: number;
  claimed: boolean;
}

export interface TrophyRecord {
  id: string;
  name: string;
  category: 'international' | 'continental' | 'league' | 'street' | 'individual';
  description: string;
  tier: 'Diamond' | 'Gold' | 'Silver' | 'Bronze';
  unlocked: boolean;
  unlockedAt?: string;
  details?: {
    opponent?: string;
    score?: string;
    mvp?: string;
    tournamentName?: string;
  };
}

const RECORDS_STORAGE_KEY = 'fe_hall_of_fame_records_v1';
const ACHIEVEMENTS_STORAGE_KEY = 'fe_achievement_badges_v1';
const TROPHIES_STORAGE_KEY = 'fe_trophy_cabinet_v1';

export class RecordsAndAchievementsService {
  private static instance: RecordsAndAchievementsService;

  private records: Record<string, HallOfFameRecord> = {};
  private achievements: AchievementBadge[] = [];
  private trophies: TrophyRecord[] = [];

  private constructor() {
    this.initDefaults();
    this.loadFromStorage();
  }

  public static getInstance(): RecordsAndAchievementsService {
    if (!RecordsAndAchievementsService.instance) {
      RecordsAndAchievementsService.instance = new RecordsAndAchievementsService();
    }
    return RecordsAndAchievementsService.instance;
  }

  private initDefaults() {
    // 1. Hall of Fame Records
    this.records = {
      fastest_goal: {
        id: 'fastest_goal',
        title: 'Fastest Goal in Match',
        description: 'Least seconds elapsed before scoring the opening goal',
        currentHolder: 'Erling Haaland',
        valueDisplay: '06.8 seconds',
        numericValue: 6.8,
        dateAchieved: '2026-05-12',
        icon: '⚡',
      },
      longest_goal: {
        id: 'longest_goal',
        title: 'Longest Range Goal',
        description: 'Greatest distance from goal line when strike was unleashed',
        currentHolder: 'Cristiano Ronaldo',
        valueDisplay: '41.5 meters',
        numericValue: 41.5,
        dateAchieved: '2026-06-18',
        icon: '🎯',
      },
      highest_scoring_match: {
        id: 'highest_scoring_match',
        title: 'Highest Scoring Match',
        description: 'Most total goals scored in a single competitive match',
        currentHolder: 'Your Squad',
        valueDisplay: '7 Goals',
        numericValue: 7,
        dateAchieved: '2026-07-02',
        icon: '🔥',
      },
      winning_streak: {
        id: 'winning_streak',
        title: 'Longest Winning Streak',
        description: 'Consecutive victories without drawing or losing',
        currentHolder: 'Your Squad',
        valueDisplay: '5 Wins',
        numericValue: 5,
        dateAchieved: '2026-08-20',
        icon: '👑',
      },
      most_clean_sheets: {
        id: 'most_clean_sheets',
        title: 'Clean Sheet Fortress',
        description: 'Career matches completed without conceding a single goal',
        currentHolder: 'Oliver Kahn',
        valueDisplay: '8 Matches',
        numericValue: 8,
        dateAchieved: '2026-09-14',
        icon: '🧤',
      },
      top_scorer_single_game: {
        id: 'top_scorer_single_game',
        title: 'Single Match Goal Record',
        description: 'Most goals scored by a single player in 90 minutes',
        currentHolder: 'Lionel Messi',
        valueDisplay: '4 Goals',
        numericValue: 4,
        dateAchieved: '2026-10-05',
        icon: '⚽',
      },
    };

    // 2. Collectible Achievement Badges
    this.achievements = [
      {
        id: 'hat_trick_hero',
        title: 'Hat-Trick Hero',
        description: 'Score 3 or more goals with a single player in one match',
        category: 'gameplay',
        icon: '🎩',
        progress: 1,
        maxProgress: 1,
        unlocked: true,
        rewardCoins: 50000,
        rewardRupees: 500000,
        claimed: false,
      },
      {
        id: 'free_kick_wizard',
        title: 'Free Kick Wizard',
        description: 'Score a direct curled free kick using the curve system',
        category: 'gameplay',
        icon: '🌀',
        progress: 1,
        maxProgress: 1,
        unlocked: true,
        rewardCoins: 75000,
        rewardRupees: 500000,
        claimed: false,
      },
      {
        id: 'var_survivor',
        title: 'VAR Survivor',
        description: 'Have a controversial referee decision verified by VAR review',
        category: 'gameplay',
        icon: '📺',
        progress: 1,
        maxProgress: 1,
        unlocked: true,
        rewardCoins: 40000,
        rewardRupees: 500000,
        claimed: false,
      },
      {
        id: 'street_king',
        title: 'Street Football King',
        description: 'Win a high-octane 5v5 Street Football cage match',
        category: 'modes',
        icon: '⛓️',
        progress: 0,
        maxProgress: 1,
        unlocked: false,
        rewardCoins: 60000,
        rewardRupees: 500000,
        claimed: false,
      },
      {
        id: 'futsal_maestro',
        title: 'Futsal Maestro',
        description: 'Win an official 5v5 indoor Futsal tournament game',
        category: 'modes',
        icon: '👟',
        progress: 0,
        maxProgress: 1,
        unlocked: false,
        rewardCoins: 60000,
        rewardRupees: 500000,
        claimed: false,
      },
      {
        id: 'clean_sheet_fortress',
        title: 'Iron Defense',
        description: 'Keep a clean sheet against a Professional difficulty club',
        category: 'mastery',
        icon: '🛡️',
        progress: 1,
        maxProgress: 1,
        unlocked: true,
        rewardCoins: 80000,
        rewardRupees: 500000,
        claimed: false,
      },
      {
        id: 'century_scorer',
        title: 'Century Goal Club',
        description: 'Score 25 cumulative goals across all game modes',
        category: 'career',
        icon: '💯',
        progress: 18,
        maxProgress: 25,
        unlocked: false,
        rewardCoins: 120000,
        rewardRupees: 1000000,
        claimed: false,
      },
      {
        id: 'transfer_negotiator',
        title: 'Master Negotiator',
        description: 'Successfully complete a negotiated transfer deal',
        category: 'career',
        icon: '💼',
        progress: 1,
        maxProgress: 1,
        unlocked: true,
        rewardCoins: 50000,
        rewardRupees: 500000,
        claimed: false,
      },
      {
        id: 'kit_couture',
        title: 'Haute Couture Designer',
        description: 'Design and equip a personalized custom jersey kit',
        category: 'mastery',
        icon: '🎨',
        progress: 1,
        maxProgress: 1,
        unlocked: true,
        rewardCoins: 35000,
        rewardRupees: 500000,
        claimed: false,
      },
      {
        id: 'skills_master',
        title: 'Skill Academy Graduate',
        description: 'Achieve 3 stars on any Training Skill Challenge drill',
        category: 'mastery',
        icon: '⭐',
        progress: 1,
        maxProgress: 1,
        unlocked: true,
        rewardCoins: 45000,
        rewardRupees: 500000,
        claimed: false,
      },
      {
        id: 'panenka_audacity',
        title: 'Panenka Audacity',
        description: 'Chip a penalty kick straight down the center under mind games',
        category: 'gameplay',
        icon: '🪄',
        progress: 0,
        maxProgress: 1,
        unlocked: false,
        rewardCoins: 65000,
        rewardRupees: 500000,
        claimed: false,
      },
      {
        id: 'championship_hero',
        title: 'World Cup Champion',
        description: 'Win the World Cup Final and celebrate with fireworks & trophy',
        category: 'career',
        icon: '🏆',
        progress: 1,
        maxProgress: 1,
        unlocked: true,
        rewardCoins: 250000,
        rewardRupees: 2000000,
        claimed: false,
      },
    ];

    // 3. Trophy Room Cabinet
    this.trophies = [
      {
        id: 'trophy_world_cup',
        name: 'FIFA World Cup Trophy',
        category: 'international',
        description: 'The most prestigious prize in world football, sculpted in 18-carat solid gold.',
        tier: 'Diamond',
        unlocked: true,
        unlockedAt: '2026-07-19',
        details: {
          tournamentName: 'FIFA World Cup 2026',
          opponent: 'France',
          score: '3 - 2',
          mvp: 'Lionel Messi',
        },
      },
      {
        id: 'trophy_champions_league',
        name: 'European Champions Cup',
        category: 'continental',
        description: 'The iconic silverware with the famous large handles, awarded to European champions.',
        tier: 'Diamond',
        unlocked: true,
        unlockedAt: '2026-05-28',
        details: {
          tournamentName: 'UEFA Champions Tournament',
          opponent: 'Bayern Munich',
          score: '2 - 1',
          mvp: 'Kylian Mbappé',
        },
      },
      {
        id: 'trophy_premier_crown',
        name: 'Premier Division Shield',
        category: 'league',
        description: 'Engraved silver trophy crowned with a roaring golden lion.',
        tier: 'Gold',
        unlocked: true,
        unlockedAt: '2026-05-18',
        details: {
          tournamentName: 'Premier Championship',
          opponent: 'Manchester City',
          score: '3 - 1',
          mvp: 'Erling Haaland',
        },
      },
      {
        id: 'trophy_street_king',
        name: 'Urban Street King Chain & Cup',
        category: 'street',
        description: 'Heavy brass cage championship cup awarded to the masters of the asphalt.',
        tier: 'Gold',
        unlocked: false,
        unlockedAt: undefined,
        details: {
          tournamentName: 'Underground Street Cage 5v5',
          opponent: 'Favela All-Stars',
          score: '6 - 4',
          mvp: 'Neymar Jr',
        },
      },
      {
        id: 'trophy_futsal_globe',
        name: 'World Futsal Golden Globe',
        category: 'league',
        description: 'Sleek geometric globe celebrating technical indoor 5v5 wizardry.',
        tier: 'Gold',
        unlocked: false,
        unlockedAt: undefined,
        details: {
          tournamentName: 'International Futsal Cup',
          opponent: 'Portugal Futsal',
          score: '5 - 3',
          mvp: 'Ricardinho',
        },
      },
      {
        id: 'trophy_ballon_dor',
        name: 'Super Ballon d’Or Trophy',
        category: 'individual',
        description: 'Gleaming golden globe placed on a pyrite rock base, celebrating player perfection.',
        tier: 'Diamond',
        unlocked: true,
        unlockedAt: '2026-10-24',
        details: {
          tournamentName: 'Player of the Year Gala',
          mvp: 'Cristiano Ronaldo',
        },
      },
    ];
  }

  private loadFromStorage() {
    try {
      const recRaw = localStorage.getItem(RECORDS_STORAGE_KEY);
      if (recRaw) {
        const parsed = JSON.parse(recRaw);
        if (parsed && typeof parsed === 'object') {
          this.records = { ...this.records, ...parsed };
        }
      }
      const achRaw = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
      if (achRaw) {
        const parsed = JSON.parse(achRaw);
        if (Array.isArray(parsed)) {
          this.achievements = parsed;
        }
      }
      const troRaw = localStorage.getItem(TROPHIES_STORAGE_KEY);
      if (troRaw) {
        const parsed = JSON.parse(troRaw);
        if (Array.isArray(parsed)) {
          this.trophies = parsed;
        }
      }
    } catch {}
  }

  private saveToStorage() {
    try {
      localStorage.setItem(RECORDS_STORAGE_KEY, JSON.stringify(this.records));
      localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(this.achievements));
      localStorage.setItem(TROPHIES_STORAGE_KEY, JSON.stringify(this.trophies));
    } catch {}
  }

  public getRecords(): HallOfFameRecord[] {
    return Object.values(this.records);
  }

  public getAchievements(): AchievementBadge[] {
    return this.achievements;
  }

  public getTrophies(): TrophyRecord[] {
    return this.trophies;
  }

  public checkAndRegisterRecord(
    recordId: string,
    newValue: number,
    holderName: string,
    displayFormatter: (val: number) => string,
    isLowerBetter: boolean = false
  ): { broken: boolean; previousRecord?: HallOfFameRecord; newRecord?: HallOfFameRecord } {
    const existing = this.records[recordId];
    if (!existing) return { broken: false };

    const isRecordBroken = isLowerBetter
      ? newValue < existing.numericValue
      : newValue > existing.numericValue;

    if (isRecordBroken) {
      const prev = { ...existing };
      existing.numericValue = newValue;
      existing.valueDisplay = displayFormatter(newValue);
      existing.currentHolder = holderName;
      existing.dateAchieved = new Date().toISOString().split('T')[0];
      this.saveToStorage();
      return { broken: true, previousRecord: prev, newRecord: existing };
    }
    return { broken: false };
  }

  public updateAchievementProgress(
    achievementId: string,
    increment: number = 1
  ): { newlyUnlocked: boolean; achievement?: AchievementBadge } {
    const ach = this.achievements.find((a) => a.id === achievementId);
    if (!ach || ach.unlocked) return { newlyUnlocked: false };

    ach.progress = Math.min(ach.maxProgress, ach.progress + increment);
    if (ach.progress >= ach.maxProgress) {
      ach.unlocked = true;
      this.saveToStorage();
      return { newlyUnlocked: true, achievement: ach };
    }
    this.saveToStorage();
    return { newlyUnlocked: false, achievement: ach };
  }

  public claimAchievementReward(achievementId: string): { coins: number; rupees: number } | null {
    const ach = this.achievements.find((a) => a.id === achievementId);
    if (!ach || !ach.unlocked || ach.claimed) return null;

    ach.claimed = true;
    this.saveToStorage();
    return { coins: ach.rewardCoins, rupees: ach.rewardRupees };
  }

  public unlockTrophy(trophyId: string, details?: TrophyRecord['details']): TrophyRecord | null {
    const trophy = this.trophies.find((t) => t.id === trophyId);
    if (!trophy) return null;
    trophy.unlocked = true;
    trophy.unlockedAt = new Date().toISOString().split('T')[0];
    if (details) trophy.details = { ...trophy.details, ...details };
    this.saveToStorage();
    return trophy;
  }
}

export const RecordsManager = RecordsAndAchievementsService.getInstance();
