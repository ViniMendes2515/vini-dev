import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';
import { FadeInDirective } from '../../directives/fade-in.directive';

type Status = 'idle' | 'sending' | 'success' | 'error';

@Component({
  standalone: true,
  imports: [FormsModule, TranslateModule, FadeInDirective],
  templateUrl: './contact.page.html',
})
export default class ContactPageComponent {
  private http = inject(HttpClient);
  private meta = inject(Meta);
  private titleService = inject(Title);

  status = signal<Status>('idle');
  formData = { name: '', email: '', message: '' };

  constructor() {
    this.titleService.setTitle('Contato — Vinicius Mendes');
    this.meta.updateTag({ name: 'description', content: 'Entre em contato com Vinicius Mendes — desenvolvedor Full Stack.' });
  }

  onSubmit(): void {
    this.status.set('sending');
    this.http
      .post('https://formspree.io/f/YOUR_FORMSPREE_ID', this.formData)
      .subscribe({
        next: () => {
          this.status.set('success');
          this.formData = { name: '', email: '', message: '' };
        },
        error: () => this.status.set('error'),
      });
  }
}
