import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';
import { FadeInDirective } from '../../directives/fade-in.directive';

interface StackItem {
  name: string;
  iconUrl: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, TranslateModule, FadeInDirective],
  styleUrl: './home.page.css',
  templateUrl: './home.page.html',
})
export default class HomePageComponent {
  private meta = inject(Meta);
  private titleService = inject(Title);

  constructor() {
    this.titleService.setTitle('Vinicius Mendes — Full Stack Developer');
    this.meta.updateTag({ name: 'description', content: 'Desenvolvedor Full Stack com 3+ anos de experiência. Stack: Node.js, Angular, Go, TypeScript. Baseado em Minas Gerais, Brasil.' });
    this.meta.updateTag({ property: 'og:title', content: 'Vinicius Mendes — Full Stack Developer' });
  }
  stackItems: StackItem[] = [
    { name: 'Node.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'TypeScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Angular', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
    { name: 'Go', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
    { name: 'Python', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'FastAPI', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
    { name: 'Redis', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
    { name: 'MySQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'AWS', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
    { name: 'Bun', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bun/bun-original.svg' },
    { name: 'Docker', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Linux', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    { name: 'Arch', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/archlinux/archlinux-original.svg' },
    { name: 'PostgreSQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { name: 'Git', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Grafana', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/grafana/grafana-original.svg' },
    { name: 'SOAP', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xml/xml-original.svg' },
    { name: 'Nginx', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg' },
    { name: 'NATS', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nats/nats-original.svg' },
    { name: 'Supabase', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' }
  ];

  marqueeItems = [...this.stackItems, ...this.stackItems];

  marqueeItems2 = [
    ...this.stackItems.slice(10),
    ...this.stackItems.slice(0, 10),
    ...this.stackItems.slice(10),
    ...this.stackItems.slice(0, 10),
  ];
}

