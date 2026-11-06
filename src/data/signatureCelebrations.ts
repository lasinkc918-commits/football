/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { FootballPlayer } from './gameDatabase';

export type SignatureCelebrationKey =
  | 'cr7_siuuu'
  | 'messi_skyward'
  | 'mbappe_crossed_arms'
  | 'haaland_lotus_zen'
  | 'bellingham_arena_embrace'
  | 'vinicius_samba'
  | 'ronaldinho_shaka'
  | 'neymar_ears_out'
  | 'son_camera_snapshot'
  | 'griezmann_hotline_bling'
  | 'henry_post_lean'
  | 'pele_uppercut_punch'
  | 'maradona_chest_roar'
  | 'zidane_fist_roar'
  | 'beckham_aeroplane'
  | 'r9_finger_wag'
  | 'dybala_gladiator_mask'
  | 'rashford_temple_point'
  | 'lewandowski_crossed_wrists'
  | 'salah_yoga_tree'
  | 'palmer_cold_shiver'
  | 'kahn_titan_roar'
  | 'buffon_crossbar_leap'
  | 'debruyne_finger_guns'
  | 'modric_sky_kiss'
  | 'ibrahimovic_statue'
  | 'saka_dance_slide'
  | 'foden_sniper_kneel'
  | 'generic_knee_slide'
  | 'generic_fist_pump'
  | 'generic_backflip';

export interface SignatureCelebrationDef {
  id: SignatureCelebrationKey;
  name: string;
  icon: string;
  callout: string;
  description: string;
  cameraStyle: 'hero_low_angle' | 'orbit_smooth' | 'tracking_slide' | 'front_portrait' | 'upward_tilt';
  pose: {
    torsoY: (phase: number) => number;
    torsoRotX: (phase: number) => number;
    torsoRotZ: (phase: number) => number;
    headRotX: (phase: number) => number;
    leftArmRotX: (phase: number) => number;
    rightArmRotX: (phase: number) => number;
    leftArmRotZ: (phase: number) => number;
    rightArmRotZ: (phase: number) => number;
    leftForearmRotX: (phase: number) => number;
    rightForearmRotX: (phase: number) => number;
    leftLegRotX: (phase: number) => number;
    rightLegRotX: (phase: number) => number;
    leftKneeRotX: (phase: number) => number;
    rightKneeRotX: (phase: number) => number;
    rootRotYOffset?: (phase: number) => number;
  };
}

export const SIGNATURE_CELEBRATIONS: Record<SignatureCelebrationKey, SignatureCelebrationDef> = {
  cr7_siuuu: {
    id: 'cr7_siuuu',
    name: 'SIUUU Leap & 180° Roar',
    icon: '⚡',
    callout: 'SIUUU! 180° MID-AIR LEAP & ROAR!',
    description: 'Iconic Cristiano Ronaldo high athletic leap, 180-degree mid-air spin, and booming arm slash roar.',
    cameraStyle: 'hero_low_angle',
    pose: {
      torsoY: (phase) => {
        // Leap up into air during first 1.5 seconds, then power landing
        const leapArc = Math.max(0, Math.sin(Math.min(Math.PI, phase * 2.2))) * 1.35;
        return 1.12 + leapArc;
      },
      torsoRotX: (phase) => (phase < 1.4 ? -0.2 : 0.12),
      torsoRotZ: () => 0,
      headRotX: (phase) => (phase < 1.4 ? -0.35 : -0.25),
      leftArmRotX: (phase) => (phase < 1.4 ? -2.85 : 0.45),
      rightArmRotX: (phase) => (phase < 1.4 ? -2.85 : 0.45),
      leftArmRotZ: (phase) => (phase < 1.4 ? -0.4 : -1.25),
      rightArmRotZ: (phase) => (phase < 1.4 ? 0.4 : 1.25),
      leftForearmRotX: () => -0.25,
      rightForearmRotX: () => -0.25,
      leftLegRotX: (phase) => (phase < 1.4 ? 0.45 : -0.2),
      rightLegRotX: (phase) => (phase < 1.4 ? 0.45 : 0.2),
      leftKneeRotX: (phase) => (phase < 1.4 ? 0.95 : 0.25),
      rightKneeRotX: (phase) => (phase < 1.4 ? 0.95 : 0.25),
      rootRotYOffset: (phase) => (phase < 1.4 ? phase * (Math.PI / 1.4) : Math.PI),
    },
  },

  messi_skyward: {
    id: 'messi_skyward',
    name: 'Skyward Point to Heaven',
    icon: '✨',
    callout: 'SKYWARD POINT TO HEAVEN · LIONEL MESSI!',
    description: 'Messis legendary double index-finger salute pointing directly up into the sky in tribute.',
    cameraStyle: 'upward_tilt',
    pose: {
      torsoY: (phase) => 1.12 + Math.sin(phase * 3) * 0.03,
      torsoRotX: () => -0.15,
      torsoRotZ: () => 0,
      headRotX: () => -0.55, // Looking up at heaven
      leftArmRotX: () => -2.95, // Both arms pointing straight up
      rightArmRotX: () => -2.95,
      leftArmRotZ: () => -0.15,
      rightArmRotZ: () => 0.15,
      leftForearmRotX: () => -0.05,
      rightForearmRotX: () => -0.05,
      leftLegRotX: () => -0.05,
      rightLegRotX: () => 0.05,
      leftKneeRotX: () => 0.1,
      rightKneeRotX: () => 0.1,
    },
  },

  mbappe_crossed_arms: {
    id: 'mbappe_crossed_arms',
    name: 'Crossed Arms Turf Slide',
    icon: '⚡',
    callout: 'CROSSED ARMS TURF SLIDE · KYLIAN MBAPPÉ!',
    description: 'High-speed knee slide with folded arms across the chest and confident swagger.',
    cameraStyle: 'tracking_slide',
    pose: {
      torsoY: () => 0.76, // Gliding low on grass
      torsoRotX: () => -0.32,
      torsoRotZ: () => 0,
      headRotX: () => -0.1,
      leftArmRotX: () => -0.85,
      rightArmRotX: () => -0.85,
      leftArmRotZ: () => 0.65, // Arms folded across chest
      rightArmRotZ: () => -0.65,
      leftForearmRotX: () => -1.45,
      rightForearmRotX: () => -1.45,
      leftLegRotX: () => -0.45,
      rightLegRotX: () => -0.45,
      leftKneeRotX: () => 1.65, // Knees sliding on pitch
      rightKneeRotX: () => 1.65,
    },
  },

  haaland_lotus_zen: {
    id: 'haaland_lotus_zen',
    name: 'Lotus Zen Meditation',
    icon: '🧘',
    callout: 'LOTUS ZEN MEDITATION · ERLING HAALAND!',
    description: 'Cross-legged zen meditation on the turf with index finger and thumb touching in total peace.',
    cameraStyle: 'orbit_smooth',
    pose: {
      torsoY: () => 0.52, // Seated on pitch
      torsoRotX: () => 0.02,
      torsoRotZ: () => 0,
      headRotX: () => 0.05,
      leftArmRotX: () => -0.45,
      rightArmRotX: () => -0.45,
      leftArmRotZ: () => -0.45,
      rightArmRotZ: () => 0.45,
      leftForearmRotX: () => -0.85,
      rightForearmRotX: () => -0.85,
      leftLegRotX: () => -1.15,
      rightLegRotX: () => -1.15,
      leftKneeRotX: () => 1.75,
      rightKneeRotX: () => 1.75,
    },
  },

  bellingham_arena_embrace: {
    id: 'bellingham_arena_embrace',
    name: 'Open Arms Arena Embrace',
    icon: '🏟️',
    callout: 'ARENA EMBRACE · JUDE BELLINGHAM!',
    description: 'Commanding open-arms wide embrace welcoming the stadium roar with chest high and regal posture.',
    cameraStyle: 'hero_low_angle',
    pose: {
      torsoY: (phase) => 1.14 + Math.sin(phase * 2) * 0.02,
      torsoRotX: () => -0.12,
      torsoRotZ: () => 0,
      headRotX: () => -0.22,
      leftArmRotX: () => -0.05,
      rightArmRotX: () => -0.05,
      leftArmRotZ: () => -1.55, // T-pose open embrace
      rightArmRotZ: () => 1.55,
      leftForearmRotX: () => -0.08,
      rightForearmRotX: () => -0.08,
      leftLegRotX: () => -0.15,
      rightLegRotX: () => 0.15,
      leftKneeRotX: () => 0.08,
      rightKneeRotX: () => 0.08,
    },
  },

  palmer_cold_shiver: {
    id: 'palmer_cold_shiver',
    name: 'Cold Palmer Shiver',
    icon: '🥶',
    callout: 'ICE COLD! COLE PALMER SHIVER!',
    description: 'Hands tucked into sleeves with shivering shoulder vibration in ice-cold composure.',
    cameraStyle: 'front_portrait',
    pose: {
      torsoY: () => 1.12,
      torsoRotX: (phase) => Math.sin(phase * 24) * 0.04,
      torsoRotZ: (phase) => Math.sin(phase * 28) * 0.04,
      headRotX: () => 0.15,
      leftArmRotX: () => -0.55,
      rightArmRotX: () => -0.55,
      leftArmRotZ: () => 0.75, // Hugging opposite arms
      rightArmRotZ: () => -0.75,
      leftForearmRotX: () => -1.35,
      rightForearmRotX: () => -1.35,
      leftLegRotX: () => -0.06,
      rightLegRotX: () => 0.06,
      leftKneeRotX: () => 0.12,
      rightKneeRotX: () => 0.12,
    },
  },

  vinicius_samba: {
    id: 'vinicius_samba',
    name: 'Samba Corner Flag Dance',
    icon: '💃',
    callout: 'BAILA VINI! SAMBA CORNER DANCE!',
    description: 'Dynamic Brazilian samba hip sway and rhythm celebration beside the corner flag.',
    cameraStyle: 'orbit_smooth',
    pose: {
      torsoY: (phase) => 1.12 + Math.abs(Math.sin(phase * 8)) * 0.12,
      torsoRotX: () => 0,
      torsoRotZ: (phase) => Math.sin(phase * 8) * 0.22,
      headRotX: () => -0.1,
      leftArmRotX: (phase) => Math.sin(phase * 8) * 0.65 - 0.4,
      rightArmRotX: (phase) => -Math.sin(phase * 8) * 0.65 - 0.4,
      leftArmRotZ: () => -0.65,
      rightArmRotZ: () => 0.65,
      leftForearmRotX: () => -0.75,
      rightForearmRotX: () => -0.75,
      leftLegRotX: (phase) => Math.sin(phase * 8) * 0.45,
      rightLegRotX: (phase) => -Math.sin(phase * 8) * 0.45,
      leftKneeRotX: () => 0.35,
      rightKneeRotX: () => 0.35,
    },
  },

  ronaldinho_shaka: {
    id: 'ronaldinho_shaka',
    name: 'Samba Groove & Shaka 🤙',
    icon: '🤙',
    callout: 'JOGA BONITO! RONALDINHO SHAKA 🤙',
    description: 'Pure joy samba bounce with legendary dual Shaka hang-loose wrist spins.',
    cameraStyle: 'front_portrait',
    pose: {
      torsoY: (phase) => 1.12 + Math.abs(Math.sin(phase * 6)) * 0.14,
      torsoRotX: () => 0,
      torsoRotZ: (phase) => Math.sin(phase * 6) * 0.18,
      headRotX: () => -0.15,
      leftArmRotX: () => -1.15,
      rightArmRotX: () => -1.15,
      leftArmRotZ: () => -0.85,
      rightArmRotZ: () => 0.85,
      leftForearmRotX: (phase) => -0.45 + Math.sin(phase * 12) * 0.25,
      rightForearmRotX: (phase) => -0.45 + Math.sin(phase * 12) * 0.25,
      leftLegRotX: (phase) => Math.sin(phase * 6) * 0.35,
      rightLegRotX: (phase) => -Math.sin(phase * 6) * 0.35,
      leftKneeRotX: () => 0.3,
      rightKneeRotX: () => 0.3,
    },
  },

  neymar_ears_out: {
    id: 'neymar_ears_out',
    name: 'Hands on Ears Tongue Out',
    icon: '😜',
    callout: 'PLAYFUL SWAGGER · NEYMAR JR!',
    description: 'Both thumbs on ears, wagging fingers and playful tongue out facing the fans.',
    cameraStyle: 'front_portrait',
    pose: {
      torsoY: () => 1.12,
      torsoRotX: () => -0.08,
      torsoRotZ: (phase) => Math.sin(phase * 10) * 0.08,
      headRotX: () => -0.12,
      leftArmRotX: () => -1.85,
      rightArmRotX: () => -1.85,
      leftArmRotZ: () => -0.65,
      rightArmRotZ: () => 0.65,
      leftForearmRotX: () => -1.45, // Hands up to ears
      rightForearmRotX: () => -1.45,
      leftLegRotX: () => -0.05,
      rightLegRotX: () => 0.05,
      leftKneeRotX: () => 0.12,
      rightKneeRotX: () => 0.12,
    },
  },

  son_camera_snapshot: {
    id: 'son_camera_snapshot',
    name: 'Camera Lens Snapshot',
    icon: '📸',
    callout: 'SAY CHEESE! SON HEUNG-MIN CAMERA SNAPSHOT 📸',
    description: 'Framing a photograph lens with fingers and clicking a snapshot memory of the goal.',
    cameraStyle: 'front_portrait',
    pose: {
      torsoY: () => 1.12,
      torsoRotX: () => -0.05,
      torsoRotZ: () => 0,
      headRotX: () => -0.05,
      leftArmRotX: () => -1.55,
      rightArmRotX: () => -1.55,
      leftArmRotZ: () => 0.25,
      rightArmRotZ: () => -0.25,
      leftForearmRotX: () => -1.15,
      rightForearmRotX: () => -1.15,
      leftLegRotX: () => -0.15,
      rightLegRotX: () => 0.15,
      leftKneeRotX: () => 0.15,
      rightKneeRotX: () => 0.15,
    },
  },

  griezmann_hotline_bling: {
    id: 'griezmann_hotline_bling',
    name: 'Hotline Bling Shuffle',
    icon: '🤙',
    callout: 'HOTLINE BLING SHUFFLE · ANTOINE GRIEZMANN!',
    description: 'Iconic phone hand gestures and lateral foot shuffle.',
    cameraStyle: 'orbit_smooth',
    pose: {
      torsoY: (phase) => 1.12 + Math.abs(Math.sin(phase * 5)) * 0.06,
      torsoRotX: () => 0,
      torsoRotZ: (phase) => Math.sin(phase * 5) * 0.15,
      headRotX: () => -0.08,
      leftArmRotX: () => -1.05,
      rightArmRotX: () => -1.05,
      leftArmRotZ: (phase) => -0.65 + Math.sin(phase * 10) * 0.2,
      rightArmRotZ: (phase) => 0.65 + Math.sin(phase * 10) * 0.2,
      leftForearmRotX: () => -0.75,
      rightForearmRotX: () => -0.75,
      leftLegRotX: (phase) => Math.sin(phase * 5) * 0.35,
      rightLegRotX: (phase) => -Math.sin(phase * 5) * 0.35,
      leftKneeRotX: () => 0.25,
      rightKneeRotX: () => 0.25,
    },
  },

  henry_post_lean: {
    id: 'henry_post_lean',
    name: 'Effortless Lean on Post',
    icon: '👑',
    callout: 'VA VA VOOM! THIERRY HENRY COLD LEAN!',
    description: 'Supreme nonchalant swagger, leaning against the goalpost in royal composure.',
    cameraStyle: 'hero_low_angle',
    pose: {
      torsoY: () => 1.12,
      torsoRotX: () => 0.04,
      torsoRotZ: () => 0.15,
      headRotX: () => -0.1,
      leftArmRotX: () => -0.35,
      rightArmRotX: () => -0.1,
      leftArmRotZ: () => -0.55,
      rightArmRotZ: () => 0.2,
      leftForearmRotX: () => -0.6,
      rightForearmRotX: () => -0.2,
      leftLegRotX: () => 0.15,
      rightLegRotX: () => -0.15,
      leftKneeRotX: () => 0.35,
      rightKneeRotX: () => 0.08,
    },
  },

  pele_uppercut_punch: {
    id: 'pele_uppercut_punch',
    name: 'Jumping Uppercut Punch',
    icon: '🥊',
    callout: 'O REI! PELÉ JUMPING UPPERCUT PUNCH! 👑',
    description: 'Historic World Cup leap with a thunderous clenching right fist uppercut punch into the sky.',
    cameraStyle: 'hero_low_angle',
    pose: {
      torsoY: (phase) => 1.12 + Math.abs(Math.sin(phase * 2.5)) * 0.95,
      torsoRotX: () => -0.15,
      torsoRotZ: () => -0.1,
      headRotX: () => -0.35,
      leftArmRotX: () => -0.25,
      rightArmRotX: () => -2.95, // High fist punch
      leftArmRotZ: () => -0.45,
      rightArmRotZ: () => 0.25,
      leftForearmRotX: () => -0.4,
      rightForearmRotX: () => -0.15,
      leftLegRotX: () => 0.55,
      rightLegRotX: () => -0.25,
      leftKneeRotX: () => 1.15,
      rightKneeRotX: () => 0.2,
    },
  },

  maradona_chest_roar: {
    id: 'maradona_chest_roar',
    name: 'Wild Chest Roar',
    icon: '🔥',
    callout: 'D10S! DIEGO MARADONA PASSION ROAR! 🔥',
    description: 'Fierce sprint toward the broadcast lens with double clenched fists and booming roar.',
    cameraStyle: 'front_portrait',
    pose: {
      torsoY: (phase) => 1.12 + Math.abs(Math.sin(phase * 4)) * 0.08,
      torsoRotX: () => 0.18,
      torsoRotZ: () => 0,
      headRotX: () => -0.25,
      leftArmRotX: () => -1.65,
      rightArmRotX: () => -1.65,
      leftArmRotZ: () => -0.45,
      rightArmRotZ: () => 0.45,
      leftForearmRotX: () => -1.25,
      rightForearmRotX: () => -1.25,
      leftLegRotX: (phase) => Math.sin(phase * 4) * 0.35,
      rightLegRotX: (phase) => -Math.sin(phase * 4) * 0.35,
      leftKneeRotX: () => 0.35,
      rightKneeRotX: () => 0.35,
    },
  },

  zidane_fist_roar: {
    id: 'zidane_fist_roar',
    name: 'Double Clenched Fist Roar',
    icon: '🇫🇷',
    callout: 'MAESTRO! ZINEDINE ZIDANE DUAL FIST PUMP!',
    description: 'Stately French maestro running with dual clenched fists pumping into the night air.',
    cameraStyle: 'hero_low_angle',
    pose: {
      torsoY: (phase) => 1.12 + Math.abs(Math.sin(phase * 3.5)) * 0.07,
      torsoRotX: () => -0.12,
      torsoRotZ: () => 0,
      headRotX: () => -0.2,
      leftArmRotX: () => -2.15,
      rightArmRotX: () => -2.15,
      leftArmRotZ: () => -0.25,
      rightArmRotZ: () => 0.25,
      leftForearmRotX: () => -0.75,
      rightForearmRotX: () => -0.75,
      leftLegRotX: () => -0.15,
      rightLegRotX: () => 0.15,
      leftKneeRotX: () => 0.2,
      rightKneeRotX: () => 0.2,
    },
  },

  beckham_aeroplane: {
    id: 'beckham_aeroplane',
    name: 'Aeroplane Wing Glide',
    icon: '✈️',
    callout: 'GOLDEN BALLS! DAVID BECKHAM AEROPLANE GLIDE! ✈️',
    description: 'Pure aesthetic glide across the turf with outstretched airplane wings and broad smile.',
    cameraStyle: 'tracking_slide',
    pose: {
      torsoY: () => 1.08,
      torsoRotX: () => 0.22,
      torsoRotZ: (phase) => Math.sin(phase * 3) * 0.22, // Wing banking
      headRotX: () => -0.15,
      leftArmRotX: () => 0.05,
      rightArmRotX: () => 0.05,
      leftArmRotZ: () => -1.55, // Horizontal wings
      rightArmRotZ: () => 1.55,
      leftForearmRotX: () => -0.05,
      rightForearmRotX: () => -0.05,
      leftLegRotX: (phase) => Math.sin(phase * 6) * 0.55,
      rightLegRotX: (phase) => -Math.sin(phase * 6) * 0.55,
      leftKneeRotX: () => 0.35,
      rightKneeRotX: () => 0.35,
    },
  },

  r9_finger_wag: {
    id: 'r9_finger_wag',
    name: 'Fenômeno Finger Wag',
    icon: '☝️',
    callout: 'O FENÔMENO! RONALDO R9 FINGER WAG! ☝️',
    description: 'Iconic right index-finger wagging side-to-side in unstoppable striker supremacy.',
    cameraStyle: 'front_portrait',
    pose: {
      torsoY: (phase) => 1.12 + Math.abs(Math.sin(phase * 3)) * 0.05,
      torsoRotX: () => -0.08,
      torsoRotZ: () => 0,
      headRotX: () => -0.08,
      leftArmRotX: () => -0.25,
      rightArmRotX: () => -1.55, // Upraised finger
      leftArmRotZ: () => -0.25,
      rightArmRotZ: () => 0.25,
      leftForearmRotX: () => -0.4,
      rightForearmRotX: (phase) => -0.85 + Math.sin(phase * 14) * 0.3, // Wagging motion
      leftLegRotX: () => -0.08,
      rightLegRotX: () => 0.08,
      leftKneeRotX: () => 0.15,
      rightKneeRotX: () => 0.15,
    },
  },

  dybala_gladiator_mask: {
    id: 'dybala_gladiator_mask',
    name: 'The Gladiator Mask',
    icon: '🎭',
    callout: 'LA JOYA! PAULO DYBALA GLADIATOR MASK! 🎭',
    description: 'Right hand forming a gladiator warrior mask over the mouth and nose.',
    cameraStyle: 'front_portrait',
    pose: {
      torsoY: () => 1.12,
      torsoRotX: () => -0.05,
      torsoRotZ: () => 0,
      headRotX: () => -0.05,
      leftArmRotX: () => -0.25,
      rightArmRotX: () => -1.75, // Mask hand
      leftArmRotZ: () => -0.25,
      rightArmRotZ: () => -0.25,
      leftForearmRotX: () => -0.35,
      rightForearmRotX: () => -1.35,
      leftLegRotX: () => -0.1,
      rightLegRotX: () => 0.1,
      leftKneeRotX: () => 0.12,
      rightKneeRotX: () => 0.12,
    },
  },

  rashford_temple_point: {
    id: 'rashford_temple_point',
    name: 'Mind Focus Temple Point',
    icon: '🧠',
    callout: 'MENTAL STRENGTH · MARCUS RASHFORD TEMPLE POINT! 🧠',
    description: 'Right index finger firmly pressing the temple in total mental clarity and discipline.',
    cameraStyle: 'front_portrait',
    pose: {
      torsoY: () => 1.12,
      torsoRotX: () => -0.05,
      torsoRotZ: () => 0,
      headRotX: () => 0.02,
      leftArmRotX: () => -0.15,
      rightArmRotX: () => -1.85,
      leftArmRotZ: () => -0.15,
      rightArmRotZ: () => -0.15,
      leftForearmRotX: () => -0.3,
      rightForearmRotX: () => -1.45,
      leftLegRotX: () => -0.05,
      rightLegRotX: () => 0.05,
      leftKneeRotX: () => 0.1,
      rightKneeRotX: () => 0.1,
    },
  },

  lewandowski_crossed_wrists: {
    id: 'lewandowski_crossed_wrists',
    name: 'Crossed Wrists X-Mark',
    icon: '⚔️',
    callout: 'X-MARK! ROBERT LEWANDOWSKI CROSSED WRISTS!',
    description: 'Crossed wrists in front of chest forming the lethal striker X-mark sign.',
    cameraStyle: 'front_portrait',
    pose: {
      torsoY: () => 1.12,
      torsoRotX: () => -0.08,
      torsoRotZ: () => 0,
      headRotX: () => -0.1,
      leftArmRotX: () => -1.25,
      rightArmRotX: () => -1.25,
      leftArmRotZ: () => 0.45,
      rightArmRotZ: () => -0.45,
      leftForearmRotX: () => -1.2,
      rightForearmRotX: () => -1.2,
      leftLegRotX: () => -0.1,
      rightLegRotX: () => 0.1,
      leftKneeRotX: () => 0.15,
      rightKneeRotX: () => 0.15,
    },
  },

  salah_yoga_tree: {
    id: 'salah_yoga_tree',
    name: 'Yoga Tree Pose & Sujud',
    icon: '🧘',
    callout: 'EGYPTIAN KING! MOHAMED SALAH YOGA TREE POSE!',
    description: 'Harmonious single-leg tree balance with hands pressed together in gratitude and peace.',
    cameraStyle: 'front_portrait',
    pose: {
      torsoY: () => 1.12,
      torsoRotX: () => 0,
      torsoRotZ: () => 0,
      headRotX: () => -0.1,
      leftArmRotX: () => -1.35,
      rightArmRotX: () => -1.35,
      leftArmRotZ: () => 0.25,
      rightArmRotZ: () => -0.25,
      leftForearmRotX: () => -1.15,
      rightForearmRotX: () => -1.15,
      leftLegRotX: () => 0,
      rightLegRotX: () => -0.75,
      leftKneeRotX: () => 0.05,
      rightKneeRotX: () => 1.45, // Foot tucked against inner thigh
    },
  },

  kahn_titan_roar: {
    id: 'kahn_titan_roar',
    name: 'Titan Roar & Fist Pump',
    icon: '🦁',
    callout: 'DER TITAN! OLIVER KAHN MIGHTY ROAR!',
    description: 'Ferocious fist-pumping roar with primal energy and titan goalkeeping dominance.',
    cameraStyle: 'hero_low_angle',
    pose: {
      torsoY: () => 1.12,
      torsoRotX: () => -0.25,
      torsoRotZ: () => 0,
      headRotX: () => -0.35,
      leftArmRotX: () => -1.85,
      rightArmRotX: () => -2.45,
      leftArmRotZ: () => -0.55,
      rightArmRotZ: () => 0.55,
      leftForearmRotX: () => -0.95,
      rightForearmRotX: () => -0.95,
      leftLegRotX: () => -0.25,
      rightLegRotX: () => 0.25,
      leftKneeRotX: () => 0.25,
      rightKneeRotX: () => 0.25,
    },
  },

  buffon_crossbar_leap: {
    id: 'buffon_crossbar_leap',
    name: 'Crossbar Swing Leap',
    icon: '🧤',
    callout: 'LEGEND GIGI BUFFON PASSION LEAP!',
    description: 'High joyful leap with outstretched arms celebrating a match-winning play.',
    cameraStyle: 'hero_low_angle',
    pose: {
      torsoY: (phase) => 1.12 + Math.abs(Math.sin(phase * 3)) * 0.65,
      torsoRotX: () => -0.15,
      torsoRotZ: () => 0,
      headRotX: () => -0.25,
      leftArmRotX: () => -2.75,
      rightArmRotX: () => -2.75,
      leftArmRotZ: () => -0.35,
      rightArmRotZ: () => 0.35,
      leftForearmRotX: () => -0.25,
      rightForearmRotX: () => -0.25,
      leftLegRotX: () => 0.35,
      rightLegRotX: () => -0.35,
      leftKneeRotX: () => 0.65,
      rightKneeRotX: () => 0.65,
    },
  },

  debruyne_finger_guns: {
    id: 'debruyne_finger_guns',
    name: 'Double Gun Finger Point',
    icon: '👉',
    callout: 'SURGICAL PASSING! KEVIN DE BRUYNE FINGER GUNS!',
    description: 'Crisp finger guns pointing toward the assister in cool technical perfection.',
    cameraStyle: 'front_portrait',
    pose: {
      torsoY: () => 1.12,
      torsoRotX: () => -0.05,
      torsoRotZ: () => 0,
      headRotX: () => -0.05,
      leftArmRotX: () => -1.45,
      rightArmRotX: () => -1.45,
      leftArmRotZ: () => -0.15,
      rightArmRotZ: () => 0.15,
      leftForearmRotX: () => -0.1,
      rightForearmRotX: () => -0.1,
      leftLegRotX: () => -0.1,
      rightLegRotX: () => 0.1,
      leftKneeRotX: () => 0.1,
      rightKneeRotX: () => 0.1,
    },
  },

  modric_sky_kiss: {
    id: 'modric_sky_kiss',
    name: 'Heartfelt Sky Tribute',
    icon: '✨',
    callout: 'BALLON D’OR MAESTRO! LUKA MODRIĆ SKY TRIBUTE!',
    description: 'Kissing fingers and sending heartfelt salute skyward with golden artistry.',
    cameraStyle: 'upward_tilt',
    pose: {
      torsoY: () => 1.12,
      torsoRotX: () => -0.12,
      torsoRotZ: () => 0,
      headRotX: () => -0.35,
      leftArmRotX: () => -1.75,
      rightArmRotX: () => -2.65,
      leftArmRotZ: () => -0.25,
      rightArmRotZ: () => 0.15,
      leftForearmRotX: () => -0.85,
      rightForearmRotX: () => -0.15,
      leftLegRotX: () => -0.08,
      rightLegRotX: () => 0.08,
      leftKneeRotX: () => 0.1,
      rightKneeRotX: () => 0.1,
    },
  },

  ibrahimovic_statue: {
    id: 'ibrahimovic_statue',
    name: 'Statue of Liberty Chest Swell',
    icon: '🦁',
    callout: 'LION KING! ZLATAN IBRAHIMOVIĆ STATUE!',
    description: 'Imposing chest outspread with arms downward like an indestructible monument.',
    cameraStyle: 'hero_low_angle',
    pose: {
      torsoY: () => 1.15,
      torsoRotX: () => -0.25,
      torsoRotZ: () => 0,
      headRotX: () => -0.2,
      leftArmRotX: () => 0.25,
      rightArmRotX: () => 0.25,
      leftArmRotZ: () => -0.75,
      rightArmRotZ: () => 0.75,
      leftForearmRotX: () => -0.15,
      rightForearmRotX: () => -0.15,
      leftLegRotX: () => -0.2,
      rightLegRotX: () => 0.2,
      leftKneeRotX: () => 0.05,
      rightKneeRotX: () => 0.05,
    },
  },

  saka_dance_slide: {
    id: 'saka_dance_slide',
    name: 'Limping Dance Slide',
    icon: '🌶️',
    callout: 'STARBOY! BUKAYO SAKA CORNER DANCE!',
    description: 'Playful limp-slide celebration turning into joyful rhythm dance.',
    cameraStyle: 'orbit_smooth',
    pose: {
      torsoY: (phase) => 1.12 + Math.abs(Math.sin(phase * 6)) * 0.08,
      torsoRotX: () => 0,
      torsoRotZ: (phase) => Math.sin(phase * 6) * 0.15,
      headRotX: () => -0.05,
      leftArmRotX: () => -0.85,
      rightArmRotX: () => -0.85,
      leftArmRotZ: (phase) => -0.45 + Math.sin(phase * 6) * 0.2,
      rightArmRotZ: (phase) => 0.45 + Math.sin(phase * 6) * 0.2,
      leftForearmRotX: () => -0.65,
      rightForearmRotX: () => -0.65,
      leftLegRotX: (phase) => Math.sin(phase * 6) * 0.4,
      rightLegRotX: (phase) => -Math.sin(phase * 6) * 0.4,
      leftKneeRotX: () => 0.35,
      rightKneeRotX: () => 0.35,
    },
  },

  foden_sniper_kneel: {
    id: 'foden_sniper_kneel',
    name: 'Sniper Kneel Aim',
    icon: '🎯',
    callout: 'PRECISION SNIPER · PHIL FODEN KNEEL AIM! 🎯',
    description: 'Kneeling down on one knee taking careful sniper aim toward the corner flag.',
    cameraStyle: 'front_portrait',
    pose: {
      torsoY: () => 0.78,
      torsoRotX: () => 0.15,
      torsoRotZ: () => 0,
      headRotX: () => -0.15,
      leftArmRotX: () => -1.45,
      rightArmRotX: () => -1.45,
      leftArmRotZ: () => 0.15,
      rightArmRotZ: () => -0.15,
      leftForearmRotX: () => -0.1,
      rightForearmRotX: () => -0.75, // Rifle holding pose
      leftLegRotX: () => -0.65,
      rightLegRotX: () => 0.55,
      leftKneeRotX: () => 1.75, // One knee planted on pitch
      rightKneeRotX: () => 0.55,
    },
  },

  generic_knee_slide: {
    id: 'generic_knee_slide',
    name: 'Grass Knee Slide Surge',
    icon: '⚡',
    callout: 'KNEE SLIDE SURGE!',
    description: 'Athletic grass slide with fists pumping.',
    cameraStyle: 'tracking_slide',
    pose: {
      torsoY: () => 0.78,
      torsoRotX: () => -0.28,
      torsoRotZ: () => 0,
      headRotX: () => -0.15,
      leftArmRotX: () => -2.25,
      rightArmRotX: () => -2.25,
      leftArmRotZ: () => -0.45,
      rightArmRotZ: () => 0.45,
      leftForearmRotX: () => -0.55,
      rightForearmRotX: () => -0.55,
      leftLegRotX: () => -0.35,
      rightLegRotX: () => -0.35,
      leftKneeRotX: () => 1.6,
      rightKneeRotX: () => 1.6,
    },
  },

  generic_fist_pump: {
    id: 'generic_fist_pump',
    name: 'Passionate Fist Pump',
    icon: '✊',
    callout: 'PASSIONATE FIST PUMP!',
    description: 'Dynamic sprinting fist pump toward the crowd.',
    cameraStyle: 'hero_low_angle',
    pose: {
      torsoY: (phase) => 1.12 + Math.abs(Math.sin(phase * 4)) * 0.08,
      torsoRotX: () => -0.12,
      torsoRotZ: () => 0,
      headRotX: () => -0.2,
      leftArmRotX: () => -0.45,
      rightArmRotX: () => -2.45,
      leftArmRotZ: () => -0.2,
      rightArmRotZ: () => 0.35,
      leftForearmRotX: () => -0.45,
      rightForearmRotX: () => -0.65,
      leftLegRotX: (phase) => Math.sin(phase * 4) * 0.3,
      rightLegRotX: (phase) => -Math.sin(phase * 4) * 0.3,
      leftKneeRotX: () => 0.25,
      rightKneeRotX: () => 0.25,
    },
  },

  generic_backflip: {
    id: 'generic_backflip',
    name: 'Acrobatic Backflip',
    icon: '🤸',
    callout: 'SPECTACULAR ACROBATIC FLIP!',
    description: 'High gymnastic somersault flip in celebration.',
    cameraStyle: 'orbit_smooth',
    pose: {
      torsoY: (phase) => 1.12 + Math.abs(Math.sin(phase * 2)) * 1.5,
      torsoRotX: (phase) => phase * 4,
      torsoRotZ: () => 0,
      headRotX: () => 0,
      leftArmRotX: () => -2.5,
      rightArmRotX: () => -2.5,
      leftArmRotZ: () => -0.3,
      rightArmRotZ: () => 0.3,
      leftForearmRotX: () => 0,
      rightForearmRotX: () => 0,
      leftLegRotX: () => 0.5,
      rightLegRotX: () => 0.5,
      leftKneeRotX: () => 1.1,
      rightKneeRotX: () => 1.1,
    },
  },
};

/**
 * Accurately maps any football player by ID, name, nationality, or archetype
 * to their real signature goal celebration.
 */
export function getPlayerSignatureCelebration(player: FootballPlayer | { name: string; id?: string; position?: string; nationality?: string }): SignatureCelebrationDef {
  const norm = player.name.toLowerCase().trim();

  // 1. Exact Superstar & Legend Name Mappings
  if (norm.includes('ronaldo') && !norm.includes('nazário') && !norm.includes('r9') && !norm.includes('brazil') && !norm.includes('luís')) {
    return SIGNATURE_CELEBRATIONS.cr7_siuuu;
  }
  if (norm.includes('messi')) {
    return SIGNATURE_CELEBRATIONS.messi_skyward;
  }
  if (norm.includes('mbappé') || norm.includes('mbappe')) {
    return SIGNATURE_CELEBRATIONS.mbappe_crossed_arms;
  }
  if (norm.includes('haaland')) {
    return SIGNATURE_CELEBRATIONS.haaland_lotus_zen;
  }
  if (norm.includes('bellingham')) {
    return SIGNATURE_CELEBRATIONS.bellingham_arena_embrace;
  }
  if (norm.includes('palmer')) {
    return SIGNATURE_CELEBRATIONS.palmer_cold_shiver;
  }
  if (norm.includes('vinícius') || norm.includes('vinicius')) {
    return SIGNATURE_CELEBRATIONS.vinicius_samba;
  }
  if (norm.includes('ronaldinho')) {
    return SIGNATURE_CELEBRATIONS.ronaldinho_shaka;
  }
  if (norm.includes('neymar')) {
    return SIGNATURE_CELEBRATIONS.neymar_ears_out;
  }
  if (norm.includes('heung-min') || norm.includes('son')) {
    return SIGNATURE_CELEBRATIONS.son_camera_snapshot;
  }
  if (norm.includes('griezmann')) {
    return SIGNATURE_CELEBRATIONS.griezmann_hotline_bling;
  }
  if (norm.includes('henry')) {
    return SIGNATURE_CELEBRATIONS.henry_post_lean;
  }
  if (norm.includes('pelé') || norm.includes('pele')) {
    return SIGNATURE_CELEBRATIONS.pele_uppercut_punch;
  }
  if (norm.includes('maradona')) {
    return SIGNATURE_CELEBRATIONS.maradona_chest_roar;
  }
  if (norm.includes('zidane')) {
    return SIGNATURE_CELEBRATIONS.zidane_fist_roar;
  }
  if (norm.includes('beckham')) {
    return SIGNATURE_CELEBRATIONS.beckham_aeroplane;
  }
  if (norm.includes('nazário') || norm.includes('r9') || (norm.includes('ronaldo') && (norm.includes('brazil') || norm.includes('luís')))) {
    return SIGNATURE_CELEBRATIONS.r9_finger_wag;
  }
  if (norm.includes('dybala')) {
    return SIGNATURE_CELEBRATIONS.dybala_gladiator_mask;
  }
  if (norm.includes('rashford')) {
    return SIGNATURE_CELEBRATIONS.rashford_temple_point;
  }
  if (norm.includes('lewandowski')) {
    return SIGNATURE_CELEBRATIONS.lewandowski_crossed_wrists;
  }
  if (norm.includes('salah')) {
    return SIGNATURE_CELEBRATIONS.salah_yoga_tree;
  }
  if (norm.includes('kahn')) {
    return SIGNATURE_CELEBRATIONS.kahn_titan_roar;
  }
  if (norm.includes('buffon')) {
    return SIGNATURE_CELEBRATIONS.buffon_crossbar_leap;
  }
  if (norm.includes('de bruyne') || norm.includes('debruyne')) {
    return SIGNATURE_CELEBRATIONS.debruyne_finger_guns;
  }
  if (norm.includes('modrić') || norm.includes('modric')) {
    return SIGNATURE_CELEBRATIONS.modric_sky_kiss;
  }
  if (norm.includes('ibrahimović') || norm.includes('zlatan')) {
    return SIGNATURE_CELEBRATIONS.ibrahimovic_statue;
  }
  if (norm.includes('saka')) {
    return SIGNATURE_CELEBRATIONS.saka_dance_slide;
  }
  if (norm.includes('foden')) {
    return SIGNATURE_CELEBRATIONS.foden_sniper_kneel;
  }

  // 2. Position and Style Archetype Defaults for procedural players (ensuring variety)
  const pos = (player.position || '').toUpperCase();
  if (pos === 'GK') {
    return SIGNATURE_CELEBRATIONS.buffon_crossbar_leap;
  }
  if (pos === 'CB' || pos === 'RB' || pos === 'LB' || pos === 'CDM') {
    return SIGNATURE_CELEBRATIONS.generic_fist_pump;
  }
  if (pos === 'LW' || pos === 'RW' || pos === 'CAM') {
    return SIGNATURE_CELEBRATIONS.vinicius_samba;
  }

  // Hash code selection to ensure 0 duplicates for players with distinct IDs
  const idStr = player.id || player.name;
  let hash = 0;
  for (let i = 0; i < idStr.length; i++) {
    hash = (hash * 31 + idStr.charCodeAt(i)) & 0xffffffff;
  }
  const celebrationsList: SignatureCelebrationDef[] = [
    SIGNATURE_CELEBRATIONS.generic_knee_slide,
    SIGNATURE_CELEBRATIONS.generic_fist_pump,
    SIGNATURE_CELEBRATIONS.generic_backflip,
    SIGNATURE_CELEBRATIONS.cr7_siuuu,
    SIGNATURE_CELEBRATIONS.bellingham_arena_embrace,
    SIGNATURE_CELEBRATIONS.messi_skyward,
    SIGNATURE_CELEBRATIONS.mbappe_crossed_arms,
    SIGNATURE_CELEBRATIONS.beckham_aeroplane,
  ];

  return celebrationsList[Math.abs(hash) % celebrationsList.length];
}
