import { Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { FadeInDirective } from '../../directives/fade-in.directive';

export type BookStatus = 'read' | 'reading' | 'queue';

export interface Book {
  title: string;
  author: string;
  isbn: string;
  rating: number;
  status: BookStatus;
  description: string;
}

@Component({
  standalone: true,
  imports: [TranslateModule, FadeInDirective],
  templateUrl: './books.page.html',
  styleUrl: './books.page.css',
})
export default class BooksPageComponent {
  private meta = inject(Meta);
  private titleService = inject(Title);

  constructor() {
    this.titleService.setTitle('Livros — Vinicius Mendes');
    this.meta.updateTag({
      name: 'description',
      content: 'Livros que li, estou lendo e quero ler — técnicos e não-técnicos que moldaram minha visão como desenvolvedor.',
    });
  }

  technical: Book[] = [
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '9780132350884',
      rating: 5,
      status: 'read',
      description: 'O livro que muda a forma como você enxerga código. Essencial para qualquer dev que se importa com qualidade e legibilidade.',
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt & David Thomas',
      isbn: '9780135957059',
      rating: 5,
      status: 'read',
      description: 'Filosofia e prática de desenvolvimento. Conselhos que continuam relevantes décadas depois — DRY, automação, adaptabilidade.',
    },
    {
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      isbn: '9781449373320',
      rating: 5,
      status: 'reading',
      description: 'A bíblia de sistemas distribuídos modernos. Essencial para entender bancos, streams e escalabilidade com profundidade real.',
    },
    {
      title: 'Clean Architecture',
      author: 'Robert C. Martin',
      isbn: '9780134494166',
      rating: 4,
      status: 'read',
      description: 'Princípios de arquitetura que transcendem linguagens e frameworks. Separação de responsabilidades aplicada na prática.',
    },
    {
      title: 'Go in Action',
      author: 'William Kennedy',
      isbn: '9781617291784',
      rating: 4,
      status: 'read',
      description: 'A melhor introdução prática ao Go. Cobre goroutines, channels e padrões de concorrência com exemplos do mundo real.',
    },
    {
      title: 'Node.js Design Patterns',
      author: 'Mario Casciaro',
      isbn: '9781839214110',
      rating: 4,
      status: 'read',
      description: 'Padrões avançados para Node.js — streams, promises e design patterns aplicados ao ecossistema JavaScript.',
    },
    {
      title: 'You Don\'t Know JS',
      author: 'Kyle Simpson',
      isbn: '',
      rating: 4,
      status: 'read',
      description: 'Série que desmonta os fundamentos do JavaScript. Imprescindível para qualquer dev que usa JS e quer ir além do superficial.',
    },
    {
      title: 'System Design Interview',
      author: 'Alex Xu',
      isbn: '9798664653403',
      rating: 4,
      status: 'queue',
      description: 'Guia prático para projetar sistemas em escala. Excelente estrutura para pensar em trade-offs arquiteturais.',
    },
  ];

  nonTechnical: Book[] = [
    {
      title: 'Atomic Habits',
      author: 'James Clear',
      isbn: '9780735211292',
      rating: 5,
      status: 'read',
      description: 'Sistema prático para construir bons hábitos. Transformou minha rotina de estudo e consistência como desenvolvedor.',
    },
    {
      title: 'Deep Work',
      author: 'Cal Newport',
      isbn: '9781455586691',
      rating: 5,
      status: 'read',
      description: 'Foco como superpoder competitivo. Indispensável para devs que trabalham com tarefas cognitivas complexas.',
    },
    {
      title: 'Zero to One',
      author: 'Peter Thiel',
      isbn: '9780804139021',
      rating: 4,
      status: 'read',
      description: 'Como criar algo genuinamente novo. Uma perspectiva radical e provocadora sobre inovação e startups.',
    },
    {
      title: 'Rework',
      author: 'Jason Fried & DHH',
      isbn: '9780307463746',
      rating: 4,
      status: 'read',
      description: 'Manifesto pragmático da Basecamp sobre como construir produtos sem burocracia e com foco no que importa.',
    },
    {
      title: 'O Poder do Hábito',
      author: 'Charles Duhigg',
      isbn: '9780812981605',
      rating: 4,
      status: 'read',
      description: 'A ciência por trás dos hábitos e como usar isso a seu favor no trabalho e na vida pessoal.',
    },
    {
      title: 'The Lean Startup',
      author: 'Eric Ries',
      isbn: '9780307887894',
      rating: 4,
      status: 'reading',
      description: 'Como construir empresas de forma iterativa, reduzindo desperdício e validando hipóteses rapidamente.',
    },
    {
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      isbn: '9780062316097',
      rating: 5,
      status: 'queue',
      description: 'Uma história da humanidade que muda a forma como você enxerga o mundo, as sociedades e o futuro.',
    },
    {
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      isbn: '9780374533557',
      rating: 4,
      status: 'queue',
      description: 'Psicologia do pensamento e tomada de decisão. Essencial para entender nossos próprios vieses cognitivos.',
    },
  ];

  get readCount(): number {
    return [...this.technical, ...this.nonTechnical].filter(b => b.status === 'read').length;
  }

  get readingCount(): number {
    return [...this.technical, ...this.nonTechnical].filter(b => b.status === 'reading').length;
  }

  get queueCount(): number {
    return [...this.technical, ...this.nonTechnical].filter(b => b.status === 'queue').length;
  }

  getStars(rating: number): ('full' | 'empty')[] {
    return Array.from({ length: 5 }, (_, i) => (i < rating ? 'full' : 'empty'));
  }

  getCoverUrl(isbn: string): string {
    if (!isbn) return '';
    return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
  }

  getBuyUrl(book: Book): string {
    const query = book.isbn || `${book.title} ${book.author}`;
    return `https://www.amazon.com.br/s?k=${encodeURIComponent(query)}`;
  }

  getInitials(title: string): string {
    return title.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  }
}
