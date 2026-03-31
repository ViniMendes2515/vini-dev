import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { ProjectCardComponent, Project } from '../../components/project-card/project-card.component';

@Component({
  standalone: true,
  imports: [TranslateModule, FadeInDirective, ProjectCardComponent],
  templateUrl: './projects.page.html',
})
export default class ProjectsPageComponent {
  private meta = inject(Meta);
  private titleService = inject(Title);

  constructor() {
    this.titleService.setTitle('Projetos — Vinicius Mendes');
    this.meta.updateTag({ name: 'description', content: 'Projetos de Vinicius Mendes: Mitsu (ticketing em Go), AI WhatsApp Agent e mais.' });
  }

  projects: Project[] = [
    {
      name: 'Mitsu',
      descriptionKey: 'projects.items.mitsu.description',
      tags: ['Go', 'Angular', 'Redis', 'TypeScript', 'PostgreSQL'],
      isPrivate: true,
    },
    {
      name: 'AI WhatsApp Agent',
      descriptionKey: 'projects.items.ai_whatsapp.description',
      tags: ['Node.js', 'TypeScript', 'Claude API', 'Zod'],
      github: 'https://github.com/ViniMendes2515',
    },
    {
      name: 'AD Architecture',
      descriptionKey: 'projects.items.ad_architecture.description',
      tags: ['Windows Server', 'Active Directory', 'GPO', 'Networking'],
      github: 'https://github.com/ViniMendes2515',
    },
    {
      name: 'Portfolio',
      descriptionKey: 'projects.items.portfolio.description',
      tags: ['Angular', 'Analog.js', 'Tailwind CSS', 'TypeScript'],
      github: 'https://github.com/ViniMendes2515/portfolio',
      demo: 'https://vinimendes.vercel.app',
    },
  ];
}
