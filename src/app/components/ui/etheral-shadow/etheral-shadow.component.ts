import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

interface AnimationConfig {
  scale: number;
  speed: number;
}

interface NoiseConfig {
  opacity: number;
  scale: number;
}

function mapRange(
  value: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number
): number {
  if (fromLow === fromHigh) {
    return toLow;
  }

  const percentage = (value - fromLow) / (fromHigh - fromLow);
  return toLow + percentage * (toHigh - toLow);
}

let instanceCounter = 0;

@Component({
  selector: 'app-etheral-shadow',
  standalone: true,
  templateUrl: './etheral-shadow.component.html',
  styleUrl: './etheral-shadow.component.css',
})
export class EtheralShadowComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() sizing: 'fill' | 'stretch' = 'fill';
  @Input() color = 'rgba(128, 128, 128, 1)';
  @Input() animation?: AnimationConfig;
  @Input() noise?: NoiseConfig;

  @ViewChild('hueRotateNode')
  hueRotateNode?: ElementRef<SVGFEColorMatrixElement>;

  readonly filterId = `shadowoverlay-${++instanceCounter}`;

  private rafId: number | null = null;
  private startTimestamp = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  get animationEnabled(): boolean {
    return !!this.animation && this.animation.scale > 0;
  }

  get reducedMotionEnabled(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  get displacementScale(): number {
    if (!this.animation) {
      return 0;
    }

    return mapRange(this.animation.scale, 1, 100, 20, 100);
  }

  get baseFrequency(): string {
    if (!this.animation) {
      return '0.001,0.004';
    }

    const freqX = mapRange(this.animation.scale, 0, 100, 0.001, 0.0005);
    const freqY = mapRange(this.animation.scale, 0, 100, 0.004, 0.002);
    return `${freqX},${freqY}`;
  }

  get noiseScale(): number {
    if (!this.noise) {
      return 200;
    }

    return this.noise.scale * 200;
  }

  get noiseOpacity(): number {
    if (!this.noise) {
      return 0;
    }

    return this.noise.opacity / 2;
  }

  ngAfterViewInit(): void {
    this.resetAnimation();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['animation']) {
      this.resetAnimation();
    }
  }

  ngOnDestroy(): void {
    this.stopAnimation();
  }

  private resetAnimation(): void {
    this.stopAnimation();

    if (!this.animationEnabled || this.reducedMotionEnabled) {
      return;
    }

    if (!isPlatformBrowser(this.platformId) || !this.hueRotateNode) {
      return;
    }

    this.startTimestamp = performance.now();

    const loop = (timestamp: number) => {
      if (!this.hueRotateNode) {
        return;
      }

      const durationMs = mapRange(this.animation!.speed, 1, 100, 1000, 50) * 40;
      const elapsed = timestamp - this.startTimestamp;
      const progress = (elapsed % durationMs) / durationMs;
      const hue = Math.round(progress * 360);
      this.hueRotateNode.nativeElement.setAttribute('values', String(hue));

      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  private stopAnimation(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}
