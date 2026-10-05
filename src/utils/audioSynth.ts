// Gentle romantic piano & chime arpeggiator using Web Audio API

class RomanticAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private step = 0;
  private gainNode: GainNode | null = null;

  // Gentle romantic progression (Fmaj9 -> Am7 -> Bbmaj7 -> C9sus)
  private readonly chordNotes: number[][] = [
    // Fmaj9: F3, C4, E4, G4, A4
    [174.61, 261.63, 329.63, 392.0, 440.0],
    // Dm9: D3, A3, C4, E4, F4
    [146.83, 220.0, 261.63, 329.63, 349.23],
    // Bbmaj7: Bb2, F3, A3, D4, F4
    [116.54, 174.61, 220.0, 293.66, 349.23],
    // C6/9: C3, G3, B3, D4, E4
    [130.81, 196.0, 246.94, 293.66, 329.63],
  ];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play() {
    this.init();
    if (!this.ctx || this.isPlaying) return;
    this.isPlaying = true;
    this.step = 0;
    this.scheduleNextNote();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private scheduleNextNote() {
    if (!this.isPlaying || !this.ctx) return;

    const chordIndex = Math.floor(this.step / 8) % this.chordNotes.length;
    const chord = this.chordNotes[chordIndex];
    // Gentle arpeggio pattern: 0, 1, 2, 3, 4, 3, 2, 1
    const notePattern = [0, 1, 2, 3, 4, 3, 2, 1];
    const noteIndex = notePattern[this.step % 8];
    const freq = chord[noteIndex % chord.length];

    this.playTone(freq, 0.9, (this.step % 4 === 0) ? 0.22 : 0.12);

    this.step++;
    // Tempo around 72 BPM arpeggio
    this.timerId = window.setTimeout(() => {
      this.scheduleNextNote();
    }, 420);
  }

  private playTone(freq: number, duration: number, gainLevel: number) {
    if (!this.ctx || !this.gainNode) return;

    try {
      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Warm, bell-like sine/triangle combination for acoustic music box / soft piano timbre
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(freq * 2, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      // Soft attack & long decay
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.exponentialRampToValueAtTime(gainLevel, now + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(gainLevel * 0.4, now + 0.3);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(noteGain);
      oscHarmonic.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(now);
      oscHarmonic.start(now);
      osc.stop(now + duration + 0.1);
      oscHarmonic.stop(now + duration + 0.1);
    } catch {
      // Audio context might be restricted before user gesture
    }
  }
}

export const romanticAudio = new RomanticAudioPlayer();
