import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TechIconService } from '../../services/tech-icon.service';

export interface BlogCardData {
  title: string;
  slug: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
  lang: string;
}

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [RouterLink, DatePipe, TranslateModule],
  templateUrl: './blog-card.component.html',
})
export class BlogCardComponent {
  @Input({ required: true }) post!: BlogCardData;
  techIconService = inject(TechIconService);
}
