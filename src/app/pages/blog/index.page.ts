import { Component, computed, inject, signal } from '@angular/core';
import { injectContentFiles } from '@analogjs/content';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { BlogCardComponent, BlogCardData } from '../../components/blog-card/blog-card.component';
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
  imports: [TranslateModule, FadeInDirective, BlogCardComponent],
  templateUrl: './index.page.html',
})
export default class BlogIndexPageComponent {
  private meta = inject(Meta);
  private titleService = inject(Title);
  private translate = inject(TranslateService);

  readonly rawPosts = injectContentFiles<PostAttributes>((f) => {
    const normalizedPath = f.filename.replaceAll('\\', '/');
    return normalizedPath.includes('src/content/blog/');
  });

  readonly activeCategory = signal('all');
  readonly searchQuery = signal('');
  readonly currentLang = signal<'pt' | 'en'>('pt');

  constructor() {
    this.titleService.setTitle('Blog — Vinicius Mendes');
    this.meta.updateTag({ name: 'description', content: 'Pensamentos de Vinicius Mendes sobre tecnologia, Go, Node.js, Angular e desenvolvimento.' });

    const initialLang = this.normalizeLang(this.translate.getCurrentLang());
    this.currentLang.set(initialLang);

    this.translate.onLangChange.subscribe((event) => {
      this.currentLang.set(this.normalizeLang(event.lang));
    });
  }

  readonly posts = computed(() => {
    return [...this.rawPosts]
      .filter((post) => post.attributes.lang === this.currentLang())
      .sort(
        (a, b) =>
          new Date(b.attributes.date).getTime() -
          new Date(a.attributes.date).getTime()
      );
  });

  readonly categories = computed(() => {
    const counters = new Map<string, number>();

    for (const post of this.posts()) {
      for (const tag of post.attributes.tags) {
        counters.set(tag, (counters.get(tag) ?? 0) + 1);
      }
    }

    const dynamicCategories = [...counters.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([name, count]) => ({ id: name, name, count }));

    return [{ id: 'all', name: '', count: this.posts().length }, ...dynamicCategories];
  });

  readonly filteredPosts = computed(() => {
    const category = this.activeCategory();
    const query = this.searchQuery().trim().toLowerCase();

    return this.posts().filter((post) => {
      const matchesCategory =
        category === 'all' ||
        post.attributes.tags.includes(category);

      const searchable = [
        post.attributes.title,
        post.attributes.description,
        post.attributes.tags.join(' '),
      ]
        .join(' ')
        .toLowerCase();

      const matchesQuery = query.length === 0 || searchable.includes(query);
      return matchesCategory && matchesQuery;
    });
  });

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.searchQuery.set(target?.value ?? '');
  }

  private normalizeLang(lang: string | undefined): 'pt' | 'en' {
    return lang?.toLowerCase().startsWith('en') ? 'en' : 'pt';
  }

  toCardData(post: (typeof this.rawPosts)[number]): BlogCardData {
    return {
      title: post.attributes.title,
      slug: post.attributes.slug,
      date: post.attributes.date,
      description: post.attributes.description,
      tags: post.attributes.tags,
      readingTime: post.attributes.readingTime,
      lang: post.attributes.lang,
    };
  }
}
