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

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslateModule, RouterLink, RouterLinkActive],
  styleUrl: './navbar.component.css',
  templateUrl: './navbar.component.html',
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
