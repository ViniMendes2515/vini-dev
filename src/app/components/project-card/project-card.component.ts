import { Component, Input, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TechIconService } from '../../services/tech-icon.service';

export interface Project {
  name: string;
  description?: string;
  descriptionKey?: string;
  tags: string[];
  github?: string;
  demo?: string;
  isPrivate?: boolean;
}

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './project-card.component.html',
})
export class ProjectCardComponent {
  @Input({ required: true }) project!: Project;
  techIconService = inject(TechIconService);
}
