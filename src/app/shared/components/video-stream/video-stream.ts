import {
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  AfterViewInit,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-stream',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-stream.html',
  styleUrl: './video-stream.scss',
})
export class VideoStream implements AfterViewInit, OnDestroy {
  @ViewChild('player', { static: true }) player!: ElementRef<HTMLDivElement>;
  isFullscreen = signal(false);
  isMuted = signal(false);
  showMiniPlayer = signal(false);
  quality = signal('720p');
  qualities = ['480p', '720p', '1080p'];
  private observer?: IntersectionObserver;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      this.showMiniPlayer.set(!entry.isIntersecting);
    });
    this.observer.observe(this.player.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  toggleFullscreen() {
    this.isFullscreen.set(!this.isFullscreen());
  }

  toggleMute() {
    this.isMuted.set(!this.isMuted());
  }

  setQuality(value: string) {
    this.quality.set(value);
  }

  closeMiniPlayer() {
    this.showMiniPlayer.set(false);
  }

  expandMiniPlayer() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.showMiniPlayer.set(false);
  }
}