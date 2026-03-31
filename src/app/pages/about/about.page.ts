import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';
import { FadeInDirective } from '../../directives/fade-in.directive';

interface TimelineItem {
  year: string;
  roleKey: string;
  company: string;
  descriptionKey: string;
}

@Component({
  standalone: true,
  imports: [TranslateModule, FadeInDirective],
  templateUrl: './about.page.html',
})
export default class AboutPageComponent {
  private meta = inject(Meta);
  private titleService = inject(Title);

  constructor() {
    this.titleService.setTitle('Sobre — Vinicius Mendes');
    this.meta.updateTag({ name: 'description', content: 'Conheça Vinicius Mendes — desenvolvedor Full Stack baseado em Minas Gerais, Brasil.' });
  }

  timeline: TimelineItem[] = [
    {
      year: '2025 - 2026',
      roleKey: 'about.timeline.items.2025.role',
      company: 'Bravo Serviços Logísticos',
      descriptionKey: 'about.timeline.items.2025.description',
    },
    {
      year: '2024',
      roleKey: 'about.timeline.items.2024.role',
      company: 'Bravo Serviços Logísticos',
      descriptionKey: 'about.timeline.items.2024.description',
    },
    {
      year: '2023',
      roleKey: 'about.timeline.items.2023.role',
      company: 'Bravo Serviços Logísticos',
      descriptionKey: 'about.timeline.items.2023.description',
    },
    {
      year: '2022',
      roleKey: 'about.timeline.items.2022.role',
      company: 'Uniube / Estudos Independentes',
      descriptionKey: 'about.timeline.items.2022.description',
    },
  ];
}
