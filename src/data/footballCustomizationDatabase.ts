/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FootballBallItem {
  id: string;
  name: string;
  year: string;
  price: number; // in virtual ₹
  description: string;
  tier: 'Standard' | 'Iconic' | 'Legendary' | 'Ballon d\'Or';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  patternType: 'telstar' | 'fevernova' | 'tango' | 'vortex' | 'jabulani' | 'brazuca' | 'starball' | 'gold_strike';
  previewBadge: string;
}

export interface ClubJerseyItem {
  id: string;
  name: string;
  team: string;
  leagueOrNation: string;
  isNational: boolean;
  price: number; // in virtual ₹
  primaryColor: string;
  secondaryColor: string;
  trimColor: string;
  pattern: 'stripes' | 'solid' | 'hoops' | 'sash' | 'quarters' | 'chevron' | 'tri-color';
  badgeIcon: string;
  description: string;
  sponsorText: string;
}

export interface FootballBootItem {
  id: string;
  name: string;
  brand: string;
  price: number; // in virtual ₹
  primaryColor: string;
  accentColor: string;
  soleColor: string;
  statBonusText: string;
  description: string;
}

export interface FootballEquipmentItem {
  id: string;
  name: string;
  category: 'gloves' | 'armband' | 'socks' | 'accessory';
  price: number; // in virtual ₹
  color: string;
  badge: string;
  description: string;
}

export interface SignatureCelebrationInfo {
  id: string;
  name: string;
  playerTriggerNames: string[];
  callout: string;
  motionType:
    | 'siuuu_jump'
    | 'skyward_point'
    | 'arms_crossed_slide'
    | 'zen_lotus'
    | 'bellingham_arms'
    | 'samba_dance'
    | 'corner_flag_lean'
    | 'air_punch_leap'
    | 'camera_roar'
    | 'airplane_slide'
    | 'camera_snap'
    | 'sujood_prayer'
    | 'temple_focus'
    | 'fist_pump';
  description: string;
}

export const FOOTBALL_BALLS_DATABASE: FootballBallItem[] = [
  {
    id: 'ball_classic_telstar',
    name: 'Telstar 1970 Vintage',
    year: '1970',
    price: 0, // Default Free
    description: 'The legendary 32-panel black and white truncated icosahedron design that defined football worldwide.',
    tier: 'Standard',
    primaryColor: '#ffffff',
    secondaryColor: '#111827',
    accentColor: '#374151',
    patternType: 'telstar',
    previewBadge: '⚽ Classic',
  },
  {
    id: 'ball_fevernova_gold',
    name: 'Fevernova 2002 Gold',
    year: '2002',
    price: 150000,
    description: 'Iconic trigonal gold and red Asian tournament styling with micro-cellular foam responsiveness.',
    tier: 'Iconic',
    primaryColor: '#faf5e4',
    secondaryColor: '#d97706',
    accentColor: '#dc2626',
    patternType: 'fevernova',
    previewBadge: '🔥 Gold Trigon',
  },
  {
    id: 'ball_tango_white_black',
    name: 'Tango España 1982',
    year: '1982',
    price: 200000,
    description: 'Timeless triad pattern creating 12 identical circles across the sphere. Pure World Cup nostalgia.',
    tier: 'Iconic',
    primaryColor: '#f8fafc',
    secondaryColor: '#0f172a',
    accentColor: '#475569',
    patternType: 'tango',
    previewBadge: '🏆 Triad Icon',
  },
  {
    id: 'ball_neon_vortex',
    name: 'Neon Cyber Vortex',
    year: '2026',
    price: 250000,
    description: 'High-visibility electronic luminescent panels in electric cyan, ultraviolet, and neon lime glow.',
    tier: 'Legendary',
    primaryColor: '#090d16',
    secondaryColor: '#06b6d4',
    accentColor: '#a855f7',
    patternType: 'vortex',
    previewBadge: '⚡ Cyber Glow',
  },
  {
    id: 'ball_jabulani_speed',
    name: 'Jabulani Aerodynamic 2010',
    year: '2010',
    price: 300000,
    description: 'Grip\'n\'Groove aerodynamics with South African tribal 11-colour prism accents and extreme knuckleball spin.',
    tier: 'Legendary',
    primaryColor: '#f1f5f9',
    secondaryColor: '#eab308',
    accentColor: '#ef4444',
    patternType: 'jabulani',
    previewBadge: '🌪️ Knuckleball',
  },
  {
    id: 'ball_brazuca_samba',
    name: 'Brazuca Rio Samba 2014',
    year: '2014',
    price: 350000,
    description: 'Revolutionary 6 symmetrical interlocking curved ribbon panels inspired by Brazilian carnival bands.',
    tier: 'Legendary',
    primaryColor: '#ffffff',
    secondaryColor: '#2563eb',
    accentColor: '#16a34a',
    patternType: 'brazuca',
    previewBadge: '🇧🇷 Rio Samba',
  },
  {
    id: 'ball_ucl_starball',
    name: 'Champions Starball Finale',
    year: '2026',
    price: 400000,
    description: 'Midnight navy textured sphere adorned with interlocking luminous starry champions emblems.',
    tier: 'Legendary',
    primaryColor: '#0a192f',
    secondaryColor: '#ffffff',
    accentColor: '#38bdf8',
    patternType: 'starball',
    previewBadge: '⭐ UCL Starball',
  },
  {
    id: 'ball_golden_strike',
    name: 'Ballon d\'Or 24K Pure Gold',
    year: 'Special Edition',
    price: 500000,
    description: 'Crafted from lustrous 24K mirror gold panels with hand-chiseled obsidian fissures for elite champions.',
    tier: 'Ballon d\'Or',
    primaryColor: '#eab308',
    secondaryColor: '#fef08a',
    accentColor: '#ca8a04',
    patternType: 'gold_strike',
    previewBadge: '👑 24K Pure Gold',
  },
];

export const OFFICIAL_JERSEYS_DATABASE: ClubJerseyItem[] = [
  {
    id: 'kit_real_madrid',
    name: 'Real Madrid 2026 Royal White',
    team: 'Real Madrid',
    leagueOrNation: 'La Liga',
    isNational: false,
    price: 250000,
    primaryColor: '#ffffff',
    secondaryColor: '#eab308',
    trimColor: '#1e1b4b',
    pattern: 'solid',
    badgeIcon: '👑',
    description: 'Immaculate royal white featuring iridescent gold accents and deep navy sleeve piping.',
    sponsorText: 'Emirates',
  },
  {
    id: 'kit_barcelona',
    name: 'FC Barcelona 2026 Blaugrana',
    team: 'FC Barcelona',
    leagueOrNation: 'La Liga',
    isNational: false,
    price: 250000,
    primaryColor: '#1e3a8a',
    secondaryColor: '#831843',
    trimColor: '#eab308',
    pattern: 'stripes',
    badgeIcon: '🔵🔴',
    description: 'Timeless vertical Blaugrana bands with subtle Catalan senyera neck motif.',
    sponsorText: 'Spotify',
  },
  {
    id: 'kit_man_city',
    name: 'Manchester City 2026 Sky Blue',
    team: 'Manchester City',
    leagueOrNation: 'Premier League',
    isNational: false,
    price: 250000,
    primaryColor: '#38bdf8',
    secondaryColor: '#0f172a',
    trimColor: '#ffffff',
    pattern: 'solid',
    badgeIcon: '⛵',
    description: 'Crisp Etihad Sky Blue with obsidian trim and breathable jacquard diamond mesh.',
    sponsorText: 'Etihad',
  },
  {
    id: 'kit_arsenal',
    name: 'Arsenal 2026 Highbury Cannon',
    team: 'Arsenal FC',
    leagueOrNation: 'Premier League',
    isNational: false,
    price: 250000,
    primaryColor: '#dc2626',
    secondaryColor: '#ffffff',
    trimColor: '#eab308',
    pattern: 'solid',
    badgeIcon: '💣',
    description: 'Vibrant scarlet red body with pure white raglan sleeves and golden cannon insignia.',
    sponsorText: 'Fly Emirates',
  },
  {
    id: 'kit_bayern',
    name: 'Bayern Munich Triple Red',
    team: 'FC Bayern',
    leagueOrNation: 'Bundesliga',
    isNational: false,
    price: 250000,
    primaryColor: '#b91c1c',
    secondaryColor: '#ffffff',
    trimColor: '#991b1b',
    pattern: 'solid',
    badgeIcon: '🛡️',
    description: 'Bavarian ruby red with sharp diamond watermark weave and 5 golden championship stars.',
    sponsorText: 'T-Mobile',
  },
  {
    id: 'kit_psg',
    name: 'Paris Saint-Germain Midnight',
    team: 'Paris Saint-Germain',
    leagueOrNation: 'Ligue 1',
    isNational: false,
    price: 250000,
    primaryColor: '#0f172a',
    secondaryColor: '#dc2626',
    trimColor: '#ffffff',
    pattern: 'sash',
    badgeIcon: '🗼',
    description: 'Deep Parisian midnight navy with central red and white Hechter brushstroke band.',
    sponsorText: 'Qatar Airways',
  },
  {
    id: 'kit_argentina',
    name: 'Argentina 3-Stars Albiceleste',
    team: 'Argentina',
    leagueOrNation: 'National Team',
    isNational: true,
    price: 300000,
    primaryColor: '#7dd3fc',
    secondaryColor: '#ffffff',
    trimColor: '#eab308',
    pattern: 'stripes',
    badgeIcon: '⭐🇦🇷',
    description: 'The world champions jersey with legendary sky blue & white stripes and 3 golden stars.',
    sponsorText: 'AFA',
  },
  {
    id: 'kit_brazil',
    name: 'Brazil Canarinho Pentacampeão',
    team: 'Brazil',
    leagueOrNation: 'National Team',
    isNational: true,
    price: 300000,
    primaryColor: '#facc15',
    secondaryColor: '#16a34a',
    trimColor: '#1d4ed8',
    pattern: 'solid',
    badgeIcon: '⭐🇧🇷',
    description: 'The definitive yellow Canarinho shirt with green accents and 5 world championship stars.',
    sponsorText: 'CBF',
  },
  {
    id: 'kit_france',
    name: 'France Les Bleus Tricolore',
    team: 'France',
    leagueOrNation: 'National Team',
    isNational: true,
    price: 300000,
    primaryColor: '#1e3a8a',
    secondaryColor: '#ffffff',
    trimColor: '#dc2626',
    pattern: 'solid',
    badgeIcon: '🐓🇫🇷',
    description: 'Regal navy blue with the oversized golden French Cockerel crest and tricolour collar.',
    sponsorText: 'FFF',
  },
  {
    id: 'kit_portugal',
    name: 'Portugal Quinas Rubro',
    team: 'Portugal',
    leagueOrNation: 'National Team',
    isNational: true,
    price: 300000,
    primaryColor: '#991b1b',
    secondaryColor: '#15803d',
    trimColor: '#eab308',
    pattern: 'solid',
    badgeIcon: '🛡️🇵🇹',
    description: 'Deep Lusitanian pepper red with forest green trim and gold Quinas shield.',
    sponsorText: 'FPF',
  },
];

export const OFFICIAL_BOOTS_DATABASE: FootballBootItem[] = [
  {
    id: 'boot_mercurial_gold',
    name: 'Mercurial Vapor Superfly Gold',
    brand: 'Nike',
    price: 180000,
    primaryColor: '#eab308',
    accentColor: '#111827',
    soleColor: '#ca8a04',
    statBonusText: '+Pace & Ball Grip Control',
    description: 'Ultra-lightweight micro-textured Flyknit upper with explosive three-star stud configuration.',
  },
  {
    id: 'boot_predator_ruby',
    name: 'Predator Elite Ruby Precision',
    brand: 'Adidas',
    price: 220000,
    primaryColor: '#dc2626',
    accentColor: '#ffffff',
    soleColor: '#000000',
    statBonusText: '+Shooting Curve & Power',
    description: 'Foldover tongue with iconic Strikeskin rubber fins for swerving curl and pinpoint strikes.',
  },
  {
    id: 'boot_f50_cyan',
    name: 'F50 Fast Reborn Electric Cyan',
    brand: 'Adidas',
    price: 220000,
    primaryColor: '#06b6d4',
    accentColor: '#10b981',
    soleColor: '#0891b2',
    statBonusText: '+Rapid Sprint & Acceleration',
    description: 'Aerocage skeleton with Sprintframe 360 outsole built for lightning-fast wingers and strikers.',
  },
  {
    id: 'boot_tiempo_platinum',
    name: 'Tiempo Legend Platinum Elite',
    brand: 'Nike',
    price: 200000,
    primaryColor: '#e2e8f0',
    accentColor: '#3b82f6',
    soleColor: '#94a3b8',
    statBonusText: '+Passing & First-Touch Cushion',
    description: 'Engineered FlyTouch Plus leather softer than natural kangaroo leather with all-weather control.',
  },
  {
    id: 'boot_future_pink',
    name: 'Future 7 Ultimate Neon Pink',
    brand: 'Puma',
    price: 190000,
    primaryColor: '#ec4899',
    accentColor: '#6366f1',
    soleColor: '#be185d',
    statBonusText: '+Skill Moves & Quick Agility',
    description: 'FUZIONFIT360 dual-mesh upper with PWRTAPE lockdown for unmatched freedom in 1v1 dribbling.',
  },
];

export const OFFICIAL_EQUIPMENT_DATABASE: FootballEquipmentItem[] = [
  {
    id: 'gear_pro_latex_gloves',
    name: 'Pro Latex Negative-Cut Gloves',
    category: 'gloves',
    price: 100000,
    color: '#3b82f6',
    badge: '🧤 Elite Grip',
    description: '4mm German Contact Latex foam palms with removable fingersave spines for clean catches.',
  },
  {
    id: 'gear_gold_captain_armband',
    name: 'Ballon d\'Or Captain Band',
    category: 'armband',
    price: 80000,
    color: '#eab308',
    badge: '👑 Leader',
    description: 'High-visibility golden stretch elastic with embossed C insignia and silicone anti-slip lining.',
  },
  {
    id: 'gear_pro_grip_socks',
    name: 'Anti-Slip Compression Grip Socks',
    category: 'socks',
    price: 50000,
    color: '#ffffff',
    badge: '🧦 Pure Stability',
    description: 'Hexagonal silicone pads beneath the foot that lock seamlessly inside your boots to prevent blisters.',
  },
  {
    id: 'gear_protective_face_mask',
    name: 'Carbon Fiber Protective Mask',
    category: 'accessory',
    price: 120000,
    color: '#1e293b',
    badge: '🎭 Gladiator',
    description: 'Ultra-durable lightweight carbon fiber contour mask worn by elite forwards for maximum match focus.',
  },
];

export const SIGNATURE_CELEBRATIONS_DATABASE: SignatureCelebrationInfo[] = [
  {
    id: 'cr7_siu',
    name: 'SIUUU Jump & Pirouette',
    playerTriggerNames: ['Cristiano Ronaldo', 'Ronaldo', 'CR7'],
    callout: 'SIUUUUUU!',
    motionType: 'siuuu_jump',
    description: 'Sprints to corner, leaps into the air with 180° rotation, and lands with outstretched arms roaring SIUUU!',
  },
  {
    id: 'messi_sky',
    name: 'Skyward Dedication',
    playerTriggerNames: ['Lionel Messi', 'Messi', 'L. Messi'],
    callout: 'Points to the Heavens!',
    motionType: 'skyward_point',
    description: 'Walks with serene smile, pointing both index fingers high into the sky in tribute to his grandmother.',
  },
  {
    id: 'mbappe_cross',
    name: 'Folded Arms Knee Slide',
    playerTriggerNames: ['Kylian Mbappé', 'Mbappe', 'K. Mbappé'],
    callout: 'Too Fast, Too Good!',
    motionType: 'arms_crossed_slide',
    description: 'Sprint-slides along the turf and stands upright with arms crossed tucked under armpits, looking directly at the camera.',
  },
  {
    id: 'haaland_zen',
    name: 'Zen Lotus Meditation',
    playerTriggerNames: ['Erling Haaland', 'Haaland', 'E. Haaland'],
    callout: 'Pure Zen Focus!',
    motionType: 'zen_lotus',
    description: 'Sits cross-legged on the grass in a full lotus pose, fingers in Gyan Mudra meditation with eyes closed in absolute calm.',
  },
  {
    id: 'bellingham_arms',
    name: 'The Colosseum Open Arms',
    playerTriggerNames: ['Jude Bellingham', 'Bellingham', 'J. Bellingham'],
    callout: 'Hey Jude!',
    motionType: 'bellingham_arms',
    description: 'Stands totally still before the roaring crowd with head held high and both arms outstretched like a gladiator.',
  },
  {
    id: 'neymar_samba',
    name: 'Samba Groove & Shaka',
    playerTriggerNames: ['Neymar Jr', 'Neymar', 'Neymar Jr.'],
    callout: 'Ousadia e Alegria!',
    motionType: 'samba_dance',
    description: 'Dynamic Brazilian samba side-steps with rolling hips and trademark double shaka hand signs with tongue out.',
  },
  {
    id: 'vinicius_flag',
    name: 'Corner Flag Samba Rhythm',
    playerTriggerNames: ['Vinícius Jr.', 'Vinicius Jr', 'Vinícius', 'Vini Jr'],
    callout: 'Baila Vini!',
    motionType: 'samba_dance',
    description: 'Dances effortlessly near the corner flag, showing joyful carnival footwork in celebration of the beautiful game.',
  },
  {
    id: 'ronaldinho_shaka',
    name: 'Dual Shaka Juggling Smile',
    playerTriggerNames: ['Ronaldinho', 'Ronaldinho Gaúcho', 'R. Gaúcho'],
    callout: 'Pure Magic & Joy!',
    motionType: 'samba_dance',
    description: 'Unforgettable radiant smile, wagging both shaka hands side to side with boundless Brazilian happiness.',
  },
  {
    id: 'pele_punch',
    name: 'The Iconic Air Punch',
    playerTriggerNames: ['Pelé', 'Pele', 'Edson Arantes'],
    callout: 'The King O Rei!',
    motionType: 'air_punch_leap',
    description: 'The timeless 1970 World Cup leap high into the air with a clenched right fist punching the sky.',
  },
  {
    id: 'maradona_camera',
    name: 'Passionate Camera Roar',
    playerTriggerNames: ['Diego Maradona', 'Maradona', 'D. Maradona'],
    callout: 'D10S Viva Argentina!',
    motionType: 'camera_roar',
    description: 'Wild celebratory sprint straight towards the television lens, wide-eyed with passionate scream of pure glory.',
  },
  {
    id: 'henry_flag',
    name: 'Cool Corner Flag Lean',
    playerTriggerNames: ['Thierry Henry', 'Henry', 'T. Henry'],
    callout: 'Va-Va-Voom Elegance!',
    motionType: 'corner_flag_lean',
    description: 'Calmly walks over to the corner flag, places one hand against it, and leans back with effortless Parisian cool.',
  },
  {
    id: 'beckham_airplane',
    name: 'Airplane Wing Gliding Slide',
    playerTriggerNames: ['David Beckham', 'Beckham', 'D. Beckham'],
    callout: 'Bend It Like Beckham!',
    motionType: 'airplane_slide',
    description: 'Arms spread wide like wings, gliding gracefully across the damp pitch with an ecstatic smile to the fans.',
  },
  {
    id: 'son_camera',
    name: 'Camera Lens Shutter Frame',
    playerTriggerNames: ['Son Heung-min', 'Heung-min Son', 'Son'],
    callout: 'Picture Perfect!',
    motionType: 'camera_snap',
    description: 'Forms a rectangular camera viewfinder with thumbs and forefingers, clicking an imaginary snapshot of the moment.',
  },
  {
    id: 'salah_sujood',
    name: 'Sujood Prostration of Gratitude',
    playerTriggerNames: ['Mohamed Salah', 'Salah', 'M. Salah'],
    callout: 'The Egyptian King!',
    motionType: 'sujood_prayer',
    description: 'Drops down gently to his knees and touches his forehead to the grass in prayer, before kissing both hands to the sky.',
  },
  {
    id: 'kane_punch',
    name: 'Leaping Hook Punch',
    playerTriggerNames: ['Harry Kane', 'Kane', 'H. Kane'],
    callout: 'Kane Strikes Again!',
    motionType: 'air_punch_leap',
    description: 'Leaps with a powerful spin and delivers a crisp right-hand punch to the air before sliding to his knees.',
  },
  {
    id: 'rashford_temple',
    name: 'Finger to Temple Mentality',
    playerTriggerNames: ['Marcus Rashford', 'Rashford', 'M. Rashford'],
    callout: 'Elite Mentality!',
    motionType: 'temple_focus',
    description: 'Stands motionless with right index finger pointed firmly to his right temple, eyes focused on absolute self-belief.',
  },
];

/**
 * Resolve the signature celebration for a given player name
 */
export function getSignatureCelebrationForPlayer(playerName: string): SignatureCelebrationInfo {
  if (!playerName) {
    return {
      id: 'generic_fist',
      name: 'Victory Roar & Fist Pump',
      playerTriggerNames: [],
      callout: 'GOOOAAAL!',
      motionType: 'fist_pump',
      description: 'Raises fists in triumph towards teammates and supporters with an impassioned roar.',
    };
  }

  const clean = playerName.toLowerCase().trim();
  for (const celebration of SIGNATURE_CELEBRATIONS_DATABASE) {
    if (celebration.playerTriggerNames.some((alias) => clean.includes(alias.toLowerCase()) || alias.toLowerCase().includes(clean))) {
      return celebration;
    }
  }

  return {
    id: 'generic_fist',
    name: 'Victory Roar & Fist Pump',
    playerTriggerNames: [],
    callout: 'GOOOAAAL!',
    motionType: 'fist_pump',
    description: 'Raises fists in triumph towards teammates and supporters with an impassioned roar.',
  };
}
