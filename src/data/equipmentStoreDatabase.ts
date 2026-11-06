/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FootballBallItem {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  priceRupees: number;
  priceCoins: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  patternStyle: 'pentagon' | 'stars' | 'gold_trophy' | 'cyber_neon' | 'hivis_pl' | 'efootball_spec' | 'fire_blaze' | 'aurora_wave';
  aerodynamics: number; // 1-100
  curveAssist: number;
  unlockedByDefault?: boolean;
}

export interface OriginalJerseyItem {
  id: string;
  name: string;
  teamType: 'club' | 'national';
  leagueOrNation: string;
  season: string;
  priceRupees: number;
  priceCoins: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  shortsColor: string;
  socksColor: string;
  stripeStyle: 'solid' | 'vertical_stripes' | 'white_sleeves' | 'central_sash' | 'diamonds' | 'albiceleste' | 'canarinho' | 'tricolor_sleeves';
  badgeSymbol: 'crown' | 'senyera' | 'ship' | 'cannon' | 'liverbird' | 'bavaria' | 'eiffel' | 'zebra' | 'star2' | 'star3' | 'cbf' | 'quinas' | 'rooster' | 'three_lions' | 'eagle';
  sponsorText?: string;
  unlockedByDefault?: boolean;
}

export interface PlayerBootsItem {
  id: string;
  name: string;
  brand: string;
  model: string;
  priceRupees: number;
  priceCoins: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  studType: 'FG Pro Studs' | 'SG Pro Hybrid' | 'AG Elite Spec';
  paceBonus: number;
  shotPowerBonus: number;
  unlockedByDefault?: boolean;
}

export const MATCH_BALLS: FootballBallItem[] = [
  {
    id: 'ball_efootball_elite',
    name: 'eFootball Pro Spec Ball',
    brand: 'eFootball Official',
    tagline: 'High-visibility esports tournament match ball with micro-texture dimples.',
    priceRupees: 0,
    priceCoins: 0,
    primaryColor: '#ffffff',
    secondaryColor: '#0284c7',
    accentColor: '#facc15',
    patternStyle: 'efootball_spec',
    aerodynamics: 96,
    curveAssist: 95,
    unlockedByDefault: true,
  },
  {
    id: 'ball_classic_telstar',
    name: 'Classic 1970 Telstar',
    brand: 'Adidas Originals',
    tagline: 'The timeless 32-panel black pentagon and white hexagon football icon.',
    priceRupees: 250000,
    priceCoins: 80000,
    primaryColor: '#f8fafc',
    secondaryColor: '#090d16',
    accentColor: '#334155',
    patternStyle: 'pentagon',
    aerodynamics: 90,
    curveAssist: 88,
  },
  {
    id: 'ball_ucl_stars',
    name: 'UEFA Champions League Starball',
    brand: 'UEFA Official',
    tagline: 'Iconic interlocking star panels in Midnight Royal Blue and Metallic Silver.',
    priceRupees: 500000,
    priceCoins: 150000,
    primaryColor: '#0a192f',
    secondaryColor: '#e2e8f0',
    accentColor: '#38bdf8',
    patternStyle: 'stars',
    aerodynamics: 98,
    curveAssist: 97,
  },
  {
    id: 'ball_worldcup_gold',
    name: 'World Cup 24K Gold Trophy Ball',
    brand: 'FIFA Heritage',
    tagline: '24-Karat pure gold finish with obsidian grooves celebrating world champions.',
    priceRupees: 1000000,
    priceCoins: 300000,
    primaryColor: '#f59e0b',
    secondaryColor: '#d97706',
    accentColor: '#171717',
    patternStyle: 'gold_trophy',
    aerodynamics: 99,
    curveAssist: 99,
  },
  {
    id: 'ball_pl_hivis',
    name: 'Premier League Hi-Vis Aerow',
    brand: 'Nike Football',
    tagline: 'Winter fluorescent optic yellow with laser crimson aerodynamic flight grooves.',
    priceRupees: 450000,
    priceCoins: 130000,
    primaryColor: '#facc15',
    secondaryColor: '#581c87',
    accentColor: '#f43f5e',
    patternStyle: 'hivis_pl',
    aerodynamics: 97,
    curveAssist: 94,
  },
  {
    id: 'ball_cyber_neon',
    name: 'Cyberpunk Neon Pulse',
    brand: 'HyperSpeed Labs',
    tagline: 'Glow-in-the-dark neon lime and electric magenta speed trail ball.',
    priceRupees: 600000,
    priceCoins: 180000,
    primaryColor: '#10b981',
    secondaryColor: '#ec4899',
    accentColor: '#06b6d4',
    patternStyle: 'cyber_neon',
    aerodynamics: 95,
    curveAssist: 96,
  },
  {
    id: 'ball_fire_blaze',
    name: 'Solar Flare Lava Ball',
    brand: 'Ignite Pro',
    tagline: 'Molten magma aerodynamic flame graphics with red heat shimmer.',
    priceRupees: 750000,
    priceCoins: 220000,
    primaryColor: '#ef4444',
    secondaryColor: '#f97316',
    accentColor: '#fef08a',
    patternStyle: 'fire_blaze',
    aerodynamics: 98,
    curveAssist: 98,
  },
  {
    id: 'ball_aurora_copa',
    name: 'Copa América Aurora Iridescent',
    brand: 'CONMEBOL Elite',
    tagline: 'Pearlescent iridescent color-shifting surface with emerald and sky accents.',
    priceRupees: 850000,
    priceCoins: 250000,
    primaryColor: '#f1f5f9',
    secondaryColor: '#059669',
    accentColor: '#0ea5e9',
    patternStyle: 'aurora_wave',
    aerodynamics: 97,
    curveAssist: 97,
  },
];

export const ORIGINAL_JERSEYS: OriginalJerseyItem[] = [
  {
    id: 'jersey_real_madrid_2425',
    name: 'Real Madrid 2024/25 Home',
    teamType: 'club',
    leagueOrNation: 'La Liga EA Sports · Spain',
    season: '2024/25',
    priceRupees: 500000,
    priceCoins: 150000,
    primaryColor: '#ffffff',
    secondaryColor: '#1e293b',
    accentColor: '#f59e0b', // Gold trim
    shortsColor: '#ffffff',
    socksColor: '#ffffff',
    stripeStyle: 'solid',
    badgeSymbol: 'crown',
    sponsorText: 'EMIRATES',
    unlockedByDefault: true,
  },
  {
    id: 'jersey_barcelona_2425',
    name: 'FC Barcelona 2024/25 125th Anniv.',
    teamType: 'club',
    leagueOrNation: 'La Liga EA Sports · Spain',
    season: '2024/25',
    priceRupees: 500000,
    priceCoins: 150000,
    primaryColor: '#1d4ed8', // Deep Blau
    secondaryColor: '#991b1b', // Deep Grana
    accentColor: '#facc15', // Gold Senyera
    shortsColor: '#1e1b4b',
    socksColor: '#1e1b4b',
    stripeStyle: 'vertical_stripes',
    badgeSymbol: 'senyera',
    sponsorText: 'SPOTIFY',
  },
  {
    id: 'jersey_mancity_2425',
    name: 'Manchester City 2024/25 Home',
    teamType: 'club',
    leagueOrNation: 'Premier League · England',
    season: '2024/25',
    priceRupees: 500000,
    priceCoins: 150000,
    primaryColor: '#67e8f9', // Sky Blue
    secondaryColor: '#ffffff',
    accentColor: '#0f172a',
    shortsColor: '#ffffff',
    socksColor: '#67e8f9',
    stripeStyle: 'solid',
    badgeSymbol: 'ship',
    sponsorText: 'ETIHAD',
  },
  {
    id: 'jersey_arsenal_2425',
    name: 'Arsenal FC 2024/25 Home',
    teamType: 'club',
    leagueOrNation: 'Premier League · England',
    season: '2024/25',
    priceRupees: 500000,
    priceCoins: 150000,
    primaryColor: '#dc2626', // Crimson Red Body
    secondaryColor: '#ffffff', // Clean White Sleeves
    accentColor: '#1e293b',
    shortsColor: '#ffffff',
    socksColor: '#dc2626',
    stripeStyle: 'white_sleeves',
    badgeSymbol: 'cannon',
    sponsorText: 'EMIRATES',
  },
  {
    id: 'jersey_liverpool_2425',
    name: 'Liverpool FC 2024/25 Home',
    teamType: 'club',
    leagueOrNation: 'Premier League · England',
    season: '2024/25',
    priceRupees: 500000,
    priceCoins: 150000,
    primaryColor: '#b91c1c', // Deep Carmine Red
    secondaryColor: '#facc15', // Yellow pinstripes
    accentColor: '#ffffff',
    shortsColor: '#b91c1c',
    socksColor: '#b91c1c',
    stripeStyle: 'solid',
    badgeSymbol: 'liverbird',
    sponsorText: 'STANDARD CHARTERED',
  },
  {
    id: 'jersey_bayern_2425',
    name: 'Bayern München 2024/25 Home',
    teamType: 'club',
    leagueOrNation: 'Bundesliga · Germany',
    season: '2024/25',
    priceRupees: 500000,
    priceCoins: 150000,
    primaryColor: '#991b1b', // Triple Red
    secondaryColor: '#450a0a',
    accentColor: '#ef4444',
    shortsColor: '#991b1b',
    socksColor: '#991b1b',
    stripeStyle: 'diamonds',
    badgeSymbol: 'bavaria',
    sponsorText: 'TELEKOM',
  },
  {
    id: 'jersey_psg_2425',
    name: 'Paris Saint-Germain 2024/25 Home',
    teamType: 'club',
    leagueOrNation: 'Ligue 1 · France',
    season: '2024/25',
    priceRupees: 500000,
    priceCoins: 150000,
    primaryColor: '#0f172a', // Midnight Navy
    secondaryColor: '#ef4444', // Red central brushstroke
    accentColor: '#ffffff',
    shortsColor: '#0f172a',
    socksColor: '#0f172a',
    stripeStyle: 'central_sash',
    badgeSymbol: 'eiffel',
    sponsorText: 'QATAR AIRWAYS',
  },
  {
    id: 'jersey_juventus_2425',
    name: 'Juventus 2024/25 Home',
    teamType: 'club',
    leagueOrNation: 'Serie A · Italy',
    season: '2024/25',
    priceRupees: 500000,
    priceCoins: 150000,
    primaryColor: '#ffffff',
    secondaryColor: '#090d16',
    accentColor: '#facc15',
    shortsColor: '#090d16',
    socksColor: '#ffffff',
    stripeStyle: 'vertical_stripes',
    badgeSymbol: 'zebra',
  },
  {
    id: 'jersey_inter_2425',
    name: 'Inter Milan 2024/25 Two-Star Home',
    teamType: 'club',
    leagueOrNation: 'Serie A · Italy',
    season: '2024/25',
    priceRupees: 500000,
    priceCoins: 150000,
    primaryColor: '#1d4ed8', // Nerazzurri Blue
    secondaryColor: '#090d16', // Black stripes
    accentColor: '#facc15', // Two Gold Stars
    shortsColor: '#090d16',
    socksColor: '#1d4ed8',
    stripeStyle: 'vertical_stripes',
    badgeSymbol: 'star2',
  },
  {
    id: 'jersey_argentina_2024',
    name: 'Argentina 2024 Copa / World Champions',
    teamType: 'national',
    leagueOrNation: 'South America · AFA',
    season: '2024',
    priceRupees: 750000,
    priceCoins: 250000,
    primaryColor: '#38bdf8', // Albiceleste Sky Blue
    secondaryColor: '#ffffff', // Clean White vertical stripes
    accentColor: '#facc15', // Gold Sun of May & 3 Stars
    shortsColor: '#090d16',
    socksColor: '#ffffff',
    stripeStyle: 'albiceleste',
    badgeSymbol: 'star3',
  },
  {
    id: 'jersey_brazil_2024',
    name: 'Brazil 2024 Canarinho Authentic',
    teamType: 'national',
    leagueOrNation: 'South America · CBF',
    season: '2024',
    priceRupees: 750000,
    priceCoins: 250000,
    primaryColor: '#facc15', // Canarinho Vibrant Yellow
    secondaryColor: '#15803d', // Pine Green Collar
    accentColor: '#1d4ed8', // Cobalt Blue Shorts
    shortsColor: '#1d4ed8',
    socksColor: '#ffffff',
    stripeStyle: 'canarinho',
    badgeSymbol: 'cbf',
  },
  {
    id: 'jersey_portugal_2024',
    name: 'Portugal 2024 Euro National',
    teamType: 'national',
    leagueOrNation: 'Europe · FPF',
    season: '2024',
    priceRupees: 750000,
    priceCoins: 250000,
    primaryColor: '#dc2626', // Rich Crimson Red
    secondaryColor: '#059669', // Jade Green Collar
    accentColor: '#facc15', // Gold Quinas
    shortsColor: '#059669',
    socksColor: '#dc2626',
    stripeStyle: 'solid',
    badgeSymbol: 'quinas',
  },
  {
    id: 'jersey_france_2024',
    name: 'France 2024 Euro National',
    teamType: 'national',
    leagueOrNation: 'Europe · FFF',
    season: '2024',
    priceRupees: 750000,
    priceCoins: 250000,
    primaryColor: '#1e3a8a', // Bleu Royal
    secondaryColor: '#ffffff',
    accentColor: '#dc2626',
    shortsColor: '#ffffff',
    socksColor: '#dc2626',
    stripeStyle: 'solid',
    badgeSymbol: 'rooster',
  },
  {
    id: 'jersey_england_2024',
    name: 'England 2024 Euro National',
    teamType: 'national',
    leagueOrNation: 'Europe · FA',
    season: '2024',
    priceRupees: 750000,
    priceCoins: 250000,
    primaryColor: '#f8fafc', // Clean White
    secondaryColor: '#0f172a', // Navy trim
    accentColor: '#dc2626', // St. George Cross
    shortsColor: '#0f172a',
    socksColor: '#ffffff',
    stripeStyle: 'solid',
    badgeSymbol: 'three_lions',
  },
  {
    id: 'jersey_germany_2024',
    name: 'Germany 2024 DFB National',
    teamType: 'national',
    leagueOrNation: 'Europe · DFB',
    season: '2024',
    priceRupees: 750000,
    priceCoins: 250000,
    primaryColor: '#ffffff',
    secondaryColor: '#090d16',
    accentColor: '#ea580c', // Black-Red-Gold eagle wing gradient
    shortsColor: '#090d16',
    socksColor: '#ffffff',
    stripeStyle: 'tricolor_sleeves',
    badgeSymbol: 'eagle',
  },
];

export const PLAYER_BOOTS: PlayerBootsItem[] = [
  {
    id: 'boot_predator_elite',
    name: 'Predator Elite FT',
    brand: 'Adidas',
    model: 'Strikeskin Foldover Tongue',
    priceRupees: 350000,
    priceCoins: 100000,
    primaryColor: '#ef4444',
    secondaryColor: '#090d16',
    accentColor: '#ffffff',
    studType: 'FG Pro Studs',
    paceBonus: 2,
    shotPowerBonus: 4,
    unlockedByDefault: true,
  },
  {
    id: 'boot_mercurial_vapor',
    name: 'Mercurial Vapor 16 Elite',
    brand: 'Nike',
    model: 'Air Zoom 3/4 Length Articulated',
    priceRupees: 400000,
    priceCoins: 120000,
    primaryColor: '#86efac',
    secondaryColor: '#090d16',
    accentColor: '#f59e0b',
    studType: 'FG Pro Studs',
    paceBonus: 5,
    shotPowerBonus: 2,
  },
  {
    id: 'boot_copa_pure',
    name: 'Copa Pure 2 Prime',
    brand: 'Adidas',
    model: 'Fushionskin Quilted Leather',
    priceRupees: 300000,
    priceCoins: 90000,
    primaryColor: '#090d16',
    secondaryColor: '#f59e0b',
    accentColor: '#ffffff',
    studType: 'SG Pro Hybrid',
    paceBonus: 1,
    shotPowerBonus: 3,
  },
  {
    id: 'boot_gold_ballon_dor',
    name: 'Ballon d’Or 24K Gold Cleats',
    brand: 'Custom Elite Spec',
    model: 'Pure Gold Leaf Mirror Chrome Plate',
    priceRupees: 1000000,
    priceCoins: 350000,
    primaryColor: '#f59e0b',
    secondaryColor: '#b45309',
    accentColor: '#171717',
    studType: 'FG Pro Studs',
    paceBonus: 5,
    shotPowerBonus: 5,
  },
];

export function getMatchBallById(id: string): FootballBallItem {
  return MATCH_BALLS.find((b) => b.id === id) || MATCH_BALLS[0];
}

export function getJerseyById(id: string): OriginalJerseyItem {
  return ORIGINAL_JERSEYS.find((j) => j.id === id) || ORIGINAL_JERSEYS[0];
}

export function getBootsById(id: string): PlayerBootsItem {
  return PLAYER_BOOTS.find((b) => b.id === id) || PLAYER_BOOTS[0];
}

export function getJerseyForTeam(teamId: string, teamName?: string): OriginalJerseyItem | undefined {
  const normId = (teamId || '').toLowerCase();
  const normName = (teamName || '').toLowerCase();

  if (normId.includes('madrid') || normName.includes('real madrid')) {
    return getJerseyById('jersey_real_madrid_2425');
  }
  if (normId.includes('barca') || normId.includes('barcelona') || normName.includes('barcelona')) {
    return getJerseyById('jersey_barcelona_2425');
  }
  if (normId.includes('city') || normName.includes('manchester city')) {
    return getJerseyById('jersey_mancity_2425');
  }
  if (normId.includes('arsenal') || normName.includes('arsenal')) {
    return getJerseyById('jersey_arsenal_2425');
  }
  if (normId.includes('liverpool') || normName.includes('liverpool')) {
    return getJerseyById('jersey_liverpool_2425');
  }
  if (normId.includes('bayern') || normName.includes('bayern')) {
    return getJerseyById('jersey_bayern_2425');
  }
  if (normId.includes('psg') || normName.includes('paris')) {
    return getJerseyById('jersey_psg_2425');
  }
  if (normId.includes('juve') || normName.includes('juventus')) {
    return getJerseyById('jersey_juventus_2425');
  }
  if (normId.includes('inter') || normName.includes('inter')) {
    return getJerseyById('jersey_inter_2425');
  }
  if (normId.includes('arg') || normName.includes('argentina')) {
    return getJerseyById('jersey_argentina_2024');
  }
  if (normId.includes('bra') || normName.includes('brazil') || normName.includes('brasil')) {
    return getJerseyById('jersey_brazil_2024');
  }
  if (normId.includes('por') || normName.includes('portugal')) {
    return getJerseyById('jersey_portugal_2024');
  }
  if (normId.includes('fra') || normName.includes('france')) {
    return getJerseyById('jersey_france_2024');
  }
  if (normId.includes('eng') || normName.includes('england')) {
    return getJerseyById('jersey_england_2024');
  }
  if (normId.includes('ger') || normName.includes('germany')) {
    return getJerseyById('jersey_germany_2024');
  }
  return undefined;
}

