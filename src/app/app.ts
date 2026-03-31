import { DestroyRef, Component, inject, OnDestroy, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ThemeService } from './services/theme.service';
import { EtheralShadowComponent } from './components/ui/etheral-shadow/etheral-shadow.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, EtheralShadowComponent],
  templateUrl: './app.html',
})
export class App implements OnInit, OnDestroy {
  private translate = inject(TranslateService);
  private themeService = inject(ThemeService);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  readonly backgroundAnimation = undefined;
  readonly backgroundNoise = { opacity: 0.34, scale: 1.08 };
  readonly routeChanging = signal(false);
  readonly routeEntering = signal(false);
  private routeEnterTimeout: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.translate.setFallbackLang('pt');
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('lang');
      this.translate.use(saved ?? 'pt');
    }

    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.routeChanging.set(true);
          return;
        }

        if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.routeChanging.set(false);

          if (event instanceof NavigationEnd) {
            this.triggerRouteEnter();
          }
        }
      });
  }

  ngOnDestroy(): void {
    if (this.routeEnterTimeout) {
      clearTimeout(this.routeEnterTimeout);
      this.routeEnterTimeout = null;
    }
  }

  private triggerRouteEnter(): void {
    this.routeEntering.set(false);

    queueMicrotask(() => {
      this.routeEntering.set(true);

      if (this.routeEnterTimeout) {
        clearTimeout(this.routeEnterTimeout);
      }

      this.routeEnterTimeout = setTimeout(() => {
        this.routeEntering.set(false);
        this.routeEnterTimeout = null;
      }, 340);
    });
  }
}
