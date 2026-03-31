import {
  Component,
  inject,
  signal,
  HostListener,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../../services/theme.service';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  group,
} from '@angular/animations';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslateModule, RouterLink, RouterLinkActive],
  styleUrl: './navbar.component.css',
  templateUrl: './navbar.component.html',
  animations: [
    trigger('menuAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        query('.mobile-nav-link', [style({ opacity: 0, transform: 'translateX(-14px)' })], { optional: true }),
        group([
          animate('300ms cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1, transform: 'translateY(0)' })),
          query(
            '.mobile-nav-link',
            stagger(55, [
              animate('240ms cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1, transform: 'translateX(0)' })),
            ]),
            { optional: true }
          ),
        ]),
      ]),
      transition(':leave', [
        animate(
          '190ms cubic-bezier(0.4, 0, 1, 1)',
          style({ opacity: 0, transform: 'translateY(-8px)' })
        ),
      ]),
    ]),
  ],
})
export class NavbarComponent {
  themeService = inject(ThemeService);
  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);

  scrolled = signal(false);
  mobileOpen = signal(false);
  currentLang = signal('pt');

  links = [
    { path: '/', key: 'nav.home', exact: true },
    { path: '/about', key: 'nav.about' },
    { path: '/projects', key: 'nav.projects' },
    { path: '/books', key: 'nav.books' },
    { path: '/blog', key: 'nav.blog' },
    { path: '/contact', key: 'nav.contact' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.scrolled.set(window.scrollY > 20);
    }
  }

  toggleLang(): void {
    const next = this.currentLang() === 'pt' ? 'en' : 'pt';
    this.currentLang.set(next);
    this.translate.use(next);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', next);
    }
  }
}
