import { Component, inject } from '@angular/core';
import { injectContent, MarkdownComponent } from '@analogjs/content';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';
import { combineLatest, merge, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { TechIconService } from '../../services/tech-icon.service';

export interface PostAttributes {
  title: string;
  slug: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
  lang: string;
}

@Component({
  standalone: true,
  imports: [MarkdownComponent, AsyncPipe, DatePipe, RouterLink, TranslateModule],
  templateUrl: './[slug].page.html',
})
export default class BlogPostPageComponent {
  techIconService = inject(TechIconService);
  private meta = inject(Meta);
  private titleService = inject(Title);
  private translate = inject(TranslateService);

  readonly ptPost$ = injectContent<PostAttributes>({
    param: 'slug',
    subdirectory: 'blog/pt',
  });

  readonly enPost$ = injectContent<PostAttributes>({
    param: 'slug',
    subdirectory: 'blog/en',
  });

  private readonly currentLang$ = merge(
    of(this.normalizeLang(this.translate.getCurrentLang())),
    this.translate.onLangChange.pipe(map((event) => this.normalizeLang(event.lang)))
  ).pipe(distinctUntilChanged());

  readonly post$ = combineLatest([this.ptPost$, this.enPost$, this.currentLang$]).pipe(
    map(([ptPost, enPost, lang]) => {
      const preferredPost = lang === 'en' ? enPost : ptPost;
      const fallbackPost = lang === 'en' ? ptPost : enPost;
      return preferredPost.attributes?.title ? preferredPost : fallbackPost;
    }),
    tap((post) => {
      this.titleService.setTitle(`${post.attributes.title} — Vinicius Mendes`);
      this.meta.updateTag({ name: 'description', content: post.attributes.description });
      this.meta.updateTag({ property: 'og:title', content: post.attributes.title });
      this.meta.updateTag({ property: 'og:description', content: post.attributes.description });
    })
  );

  private normalizeLang(lang: string | undefined): 'pt' | 'en' {
    return lang?.toLowerCase().startsWith('en') ? 'en' : 'pt';
  }

  linkedinUrl(title: string): string {
    const url = encodeURIComponent('https://vinimendes.vercel.app/blog');
    const text = encodeURIComponent(title);
    return `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`;
  }

  xUrl(title: string): string {
    const text = encodeURIComponent(`${title} — @ViniMendes`);
    const url = encodeURIComponent('https://vinimendes.vercel.app/blog');
    return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  }
}
