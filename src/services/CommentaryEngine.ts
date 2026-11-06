/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CommentaryLine {
  id: string;
  speaker: 'Peter Drury' | 'Gary Neville' | 'System';
  text: string;
  timestamp: number;
  type: 'kickoff' | 'goal' | 'save' | 'foul' | 'card' | 'var' | 'injury' | 'miss' | 'tackle' | 'general';
}

export class CommentaryService {
  private static instance: CommentaryService;
  private synth: SpeechSynthesis | null = null;
  private voice: SpeechSynthesisVoice | null = null;
  private enabled: boolean = true;
  private lastSpokenTime: number = 0;
  private listeners: Set<(line: CommentaryLine) => void> = new Set();
  private recentLines: CommentaryLine[] = [];

  private constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoice();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoice();
      }
    }
  }

  public static getInstance(): CommentaryService {
    if (!CommentaryService.instance) {
      CommentaryService.instance = new CommentaryService();
    }
    return CommentaryService.instance;
  }

  private initVoice() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prefer British English or energetic English voices
    const britishVoice = voices.find(
      (v) => (v.lang === 'en-GB' || v.lang.includes('GB')) && !v.name.includes('Google')
    ) || voices.find((v) => v.lang.includes('en-GB')) || voices.find((v) => v.lang.startsWith('en'));
    if (britishVoice) {
      this.voice = britishVoice;
    }
  }

  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled && this.synth) {
      this.synth.cancel();
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public subscribe(cb: (line: CommentaryLine) => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  public getRecentLines(): CommentaryLine[] {
    return [...this.recentLines];
  }

  public speak(
    text: string,
    speaker: 'Peter Drury' | 'Gary Neville' = 'Peter Drury',
    type: CommentaryLine['type'] = 'general',
    force: boolean = false
  ) {
    const line: CommentaryLine = {
      id: `comm_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      speaker,
      text,
      timestamp: Date.now(),
      type,
    };

    this.recentLines = [line, ...this.recentLines.slice(0, 19)];
    this.listeners.forEach((cb) => cb(line));

    const now = Date.now();
    // Avoid speech overlap unless forced
    if (!this.enabled || !this.synth) return;
    if (!force && now - this.lastSpokenTime < 3200) return;

    try {
      this.synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      if (this.voice) {
        utterance.voice = this.voice;
      }
      utterance.rate = speaker === 'Peter Drury' ? 1.08 : 1.0;
      utterance.pitch = speaker === 'Peter Drury' ? 1.04 : 0.96;
      utterance.volume = 0.88;
      this.lastSpokenTime = now;
      this.synth.speak(utterance);
    } catch {
      // Audio speech synthesis fallback silent
    }
  }

  // Pre-formatted commentary triggers
  public triggerKickoff(home: string, away: string) {
    const lines = [
      `Welcome to this colossal showdown! ${home} versus ${away}, the atmosphere is electric!`,
      `The whistle blows and we are underway! ${home} locking horns with ${away}!`,
      `A magnificent stage set for football greatness. ${home} against ${away}, here we go!`,
    ];
    this.speak(lines[Math.floor(Math.random() * lines.length)], 'Peter Drury', 'kickoff', true);
  }

  public triggerGoal(scorer: string, team: string, isLate: boolean = false) {
    const druryLines = [
      `GOOOOOAL! ${scorer.toUpperCase()}! SENSATIONAL, ABSOLUTE PERFECTION!`,
      `HE HAS DONE IT! ${scorer} explodes with pure venom into the top corner!`,
      `WHAT A STRIKE! ${scorer} writes his name in glory for ${team}!`,
      `UNBELIEVABLE! ${scorer} with ice in his veins! What a majestic goal!`,
    ];
    if (isLate) {
      druryLines.push(`A DRAMATIC LATE WINNER! ${scorer} HAS SENT THE STADIUM INTO DELIRIUM!`);
    }
    const chosen = druryLines[Math.floor(Math.random() * druryLines.length)];
    this.speak(chosen, 'Peter Drury', 'goal', true);

    setTimeout(() => {
      const nevilleLines = [
        `You cannot defend against that. Look at the technique, Gary!`,
        `That is world class. Goalkeeper had absolutely no chance!`,
        `Sensational balance and lethal finish. That's why he is the talisman!`,
      ];
      this.speak(nevilleLines[Math.floor(Math.random() * nevilleLines.length)], 'Gary Neville', 'goal', false);
    }, 2800);
  }

  public triggerSave(keeper: string) {
    const lines = [
      `WHAT A SAVE by ${keeper}! Fingertip brilliance to deny a certain goal!`,
      `Incredible reflexes from ${keeper}! Standing tall like a colossus!`,
      `Denied! ${keeper} with a miraculous reaction stop!`,
    ];
    this.speak(lines[Math.floor(Math.random() * lines.length)], 'Peter Drury', 'save');
  }

  public triggerNearMiss(player: string) {
    const lines = [
      `Agonizingly close from ${player}! It shaves the outside of the post!`,
      `Inches wide! ${player} had the keeper beaten all ends up!`,
      `Off the crossbar! The woodwork comes to the rescue!`,
    ];
    this.speak(lines[Math.floor(Math.random() * lines.length)], 'Peter Drury', 'miss');
  }

  public triggerTackle(defender: string) {
    const lines = [
      `Superb sliding challenge by ${defender}! Timed to absolute perfection!`,
      `Crucial interception from ${defender}! Clears the danger cleanly!`,
      `A crunching tackle! Strong, robust and completely fair!`,
    ];
    this.speak(lines[Math.floor(Math.random() * lines.length)], 'Gary Neville', 'tackle');
  }

  public triggerFoul(fouler: string, card?: 'yellow' | 'red') {
    if (card === 'red') {
      this.speak(`RED CARD! ${fouler} is sent off for an utterly reckless tackle!`, 'Peter Drury', 'card', true);
    } else if (card === 'yellow') {
      this.speak(`The referee brandishes a yellow card for ${fouler}. He's walking a tightrope now!`, 'Gary Neville', 'card', true);
    } else {
      this.speak(`Whistle blown! A sharp foul committed by ${fouler}.`, 'Gary Neville', 'foul');
    }
  }

  public triggerAdvantage() {
    this.speak(`Referee waves play on! Good advantage given in an attacking position!`, 'Peter Drury', 'general');
  }

  public triggerVAR(reason: string) {
    this.speak(`Hold everything! The referee pauses play - VAR is officially reviewing ${reason}!`, 'Peter Drury', 'var', true);
  }

  public triggerVARVerdict(verdict: string) {
    this.speak(`The VAR decision is in: ${verdict}!`, 'Peter Drury', 'var', true);
  }

  public triggerInjury(player: string, isSevere: boolean) {
    if (isSevere) {
      this.speak(`Oh no, ${player} is down and in severe distress! The stretcher is being called, he cannot continue!`, 'Gary Neville', 'injury', true);
    } else {
      this.speak(`${player} has picked up a heavy knock here. He's struggling with his mobility.`, 'Gary Neville', 'injury');
    }
  }

  public triggerWeatherChange(weather: string) {
    this.speak(`Noticeable shift in conditions! We now have ${weather} rolling across the pitch, impacting the ball speed!`, 'Peter Drury', 'general');
  }
}

export const Commentary = CommentaryService.getInstance();
