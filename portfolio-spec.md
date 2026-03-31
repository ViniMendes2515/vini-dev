# Spec — Portfólio Pessoal: Vinicius Mendes
> Documento de especificação para uso no Claude Code

---

## 1. Visão Geral

Site pessoal / portfólio de um desenvolvedor Full Stack com ~3 anos de experiência profissional. Objetivo principal: **presença profissional sólida** e **atração de oportunidades CLT/PJ**. Design minimalista e clean, com blog integrado, suporte a PT/EN e todas as boas práticas de SEO e performance.

**Referência visual principal:** https://www.augustogalego.com  
— tipografia clara, hierarquia forte, métricas de credibilidade em destaque, blog como centro de autoridade.

---

## 2. Stack Técnica

| Camada | Tecnologia |
|---|---|
| Framework | Angular 17+ (standalone components) |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS |
| Blog / conteúdo | Analog.js (SSG/SSR para Angular) + posts em Markdown (.md) |
| i18n | @ngx-translate/core (PT-BR default, EN alternativo) |
| Animações | Angular Animations + CSS transitions suaves |
| Dark/Light mode | Tailwind `dark:` classes + signal de tema no Angular |
| SEO | Analog.js file-based routing + Angular Meta/Title service + sitemap automático |
| Analytics | Vercel Analytics (script leve, sem cookies) |
| Deploy | Vercel (recomendado para Analog.js — suporte SSR/SSG nativo) |
| Ícones | Lucide Angular ou Heroicons |

> **Por que Analog.js?**  
> É o meta-framework Angular equivalente ao Next.js para React. Permite SSG (geração estática) para o blog e SSR para o restante, o que é essencial para SEO. Posts em Markdown são compilados em build time — sem CMS externo necessário, mas fácil de evoluir para um headless CMS no futuro.

---

## 3. Arquitetura de Pastas

```
portfolio/
├── src/
│   ├── app/
│   │   ├── components/          # Componentes reutilizáveis (Navbar, Footer, ThemeToggle...)
│   │   ├── pages/               # Rotas (Analog file-based routing)
│   │   │   ├── index.page.ts    # Home
│   │   │   ├── about.page.ts    # Sobre
│   │   │   ├── projects.page.ts # Projetos
│   │   │   ├── blog/
│   │   │   │   ├── index.page.ts        # Listagem de posts
│   │   │   │   └── [slug].page.ts       # Post individual
│   │   │   └── contact.page.ts  # Contato
│   │   └── services/
│   │       ├── theme.service.ts     # Dark/Light mode
│   │       └── translate.service.ts # i18n wrapper
│   ├── content/
│   │   └── blog/                # Posts em .md (frontmatter + conteúdo)
│   │       └── exemplo-post.md
│   └── assets/
│       ├── i18n/
│       │   ├── pt.json          # Strings em PT-BR
│       │   └── en.json          # Strings em EN
│       ├── images/
│       └── cv/
│           ├── curriculo-pt.pdf
│           └── resume-en.pdf
├── analog.config.ts
├── tailwind.config.ts
└── vite.config.ts
```

---

## 4. Seções e Conteúdo

### 4.1 Navbar
- Logo / nome clicável (volta para Home)
- Links: Home · Projetos · Blog · Contato
- Toggle de idioma: `PT | EN`
- Toggle de tema: ícone sol/lua
- Comportamento: fixa no topo com blur de fundo ao scrollar (`backdrop-blur`)
- Mobile: menu hambúrguer com drawer lateral

---

### 4.2 Home (Hero)

**Objetivo:** causar impacto imediato e comunicar valor em 5 segundos.

Estrutura:
```
[Foto ou avatar minimalista]

Olá, sou Vinicius Mendes 👋
Desenvolvedor Full Stack · Minas Gerais, Brasil

Breve tagline: "Construo sistemas que escalam — do backend ao browser."

[Botão primário: Ver Projetos]   [Botão secundário: Download CV]

— Métricas de credibilidade —
3 anos de experiência | Full Stack | Node · Angular · Go
```

**Métricas sugeridas para destacar** (com base no seu perfil):
- 3+ anos de experiência profissional
- Plataforma de ticketing ao vivo (Mitsu) em produção
- Eventos reais processados pelo Mitsu
- Stack: 6+ tecnologias dominadas

> Referência direta ao estilo do Galego: números concretos geram credibilidade imediata.

---

### 4.3 Sobre (About)

Página dedicada com:
- Foto profissional
- Bio em 2-3 parágrafos:
  - Quem é, onde está, o que faz
  - Trajetória na Bravo Serviços Logísticos (estágio → assistente → analista)
  - O projeto Mitsu como prova de iniciativa
- **Linha do tempo** visual da carreira (componente timeline simples)
- Link para download do CV (PT e EN)

---

### 4.4 Projetos

Grade de cards responsiva (2 colunas desktop, 1 mobile).

**Card de projeto contém:**
- Nome do projeto
- Descrição curta (2 linhas)
- Tags de tecnologia (ex: `Go` · `Angular` · `Redis`)
- Links: [Ver demo] [GitHub] (quando disponível)
- Imagem ou screenshot (opcional, com fallback de cor sólida)

**Projetos iniciais sugeridos:**
| Projeto | Descrição | Stack |
|---|---|---|
| **Mitsu** | Plataforma de ticketing ao vivo com eventos reais e receita em produção | Go, TypeScript, Angular, Redis |
| **AI WhatsApp Agent** | Agente de IA para atendimento de loja via WhatsApp | Node.js, TypeScript, Claude API, Zod |
| **AD Architecture** | Projeto acadêmico de arquitetura Active Directory para empresa fictícia | Windows Server, AD, GPO |
| **Portfolio** | Este próprio site | Angular, Analog.js, Tailwind |

> Repositórios privados (NDA): mencionar no card com badge "Código privado · NDA" e descrever o impacto/contexto.

**Filtro por tecnologia** (opcional, fase 2): botões de filtro acima da grade.

---

### 4.5 Stack / Habilidades

Seção visual com ícones organizados por categoria:

```
Backend          Frontend         DevOps / Infra       Banco de Dados
Node.js          Angular          Git / GitHub         Oracle
TypeScript       TypeScript       Docker (básico)      MySQL
Python / FastAPI HTML / CSS       Linux                Redis
Go               Tailwind CSS     Active Directory

Ferramentas
VS Code · Insomnia · Postman · Claude API · Zod
```

Design: grid de ícones com nome abaixo, sem barras de progresso (evitar "90% JavaScript" — é considerado antipadrão em portfólios técnicos).

---

### 4.6 Blog

**Estratégia de conteúdo sugerida** (para atrair recrutadores e gerar autoridade):
- Posts técnicos curtos (5-10 min de leitura)
- Temas iniciais sugeridos:
  - "Como construí uma plataforma de ticketing com Go e Redis"
  - "Validação de dados em Node.js com Zod — por que usar"
  - "Active Directory na prática — o que aprendi implementando do zero"
  - "Agente de IA no WhatsApp com a API do Claude"

**Estrutura da listagem:**
- Cards com: título, data, tempo de leitura, categoria/tag, resumo de 2 linhas

**Página do post:**
- Título, data, tempo de leitura estimado
- Markdown renderizado com highlight de código (Shiki ou Prism)
- Navegação: post anterior / próximo
- Botão "Compartilhar no LinkedIn / X"

**Frontmatter de cada post (.md):**
```yaml
---
title: "Título do post"
date: "2025-01-15"
description: "Resumo curto para SEO e card."
tags: ["Go", "Redis", "Backend"]
readingTime: "7 min"
lang: "pt"
---
```

---

### 4.7 Contato

Formulário simples + links sociais:

**Formulário:**
- Nome
- E-mail
- Mensagem
- Botão enviar (integração: Resend ou Formspree para MVP; sem backend próprio necessário)

**Links diretos:**
- LinkedIn → linkedin.com/in/...
- GitHub → github.com/ViniMendes2515
- E-mail direto

**Download do CV:**
- Dois botões: `📄 Currículo (PT)` e `📄 Resume (EN)`
- Arquivos em `/assets/cv/`

---

## 5. Design System

### Paleta de Cores (Minimalista)

```
Light Mode:
  Background:   #FFFFFF / #F9FAFB
  Surface:      #F3F4F6
  Text primary: #111827
  Text muted:   #6B7280
  Accent:       #2563EB  (azul — profissional, tech)
  Border:       #E5E7EB

Dark Mode:
  Background:   #0F172A
  Surface:      #1E293B
  Text primary: #F1F5F9
  Text muted:   #94A3B8
  Accent:       #3B82F6
  Border:       #334155
```

### Tipografia

```
Font principal: Inter (Google Fonts)
  Headings:  font-bold, tracking-tight
  Body:      font-normal, leading-relaxed
  Code:      JetBrains Mono ou Fira Code
```

### Animações

- Fade-in suave ao entrar no viewport (Intersection Observer)
- Hover nos cards: `scale(1.02)` + sombra suave
- Transição de tema (dark/light): 200ms ease
- Navbar blur ao scrollar: `backdrop-filter: blur(12px)`
- Sem animações pesadas ou excessivas — minimalismo

---

## 6. SEO

- `<title>` e `<meta description>` únicos por página via Angular Meta service
- Open Graph tags (para preview ao compartilhar no LinkedIn)
- `sitemap.xml` gerado automaticamente pelo Analog.js
- `robots.txt` configurado
- URLs limpas e semânticas: `/blog/meu-post`, `/projects`, `/about`
- Imagem OG padrão (1200x630px) com nome e título

---

## 7. Performance

- SSG para Home, About, Projects, Blog posts (geração estática = carregamento instantâneo)
- Imagens otimizadas (WebP, lazy loading)
- Fontes carregadas com `font-display: swap`
- Bundle splitting por rota (lazy loading de módulos Angular)
- Score Lighthouse alvo: ≥90 em Performance, Acessibilidade e SEO

---

## 8. i18n — Internacionalização

- Idioma padrão: **PT-BR**
- Idioma alternativo: **EN**
- Controle via `@ngx-translate/core`
- Preferência salva no `localStorage`
- URLs sem prefixo de idioma na URL (toggle visual, não rota separada)
- Arquivos: `src/assets/i18n/pt.json` e `en.json`
- Posts do blog: podem ter versão PT e EN com `lang` no frontmatter

---

## 9. Deploy — Recomendação

**Vercel** (gratuito para projetos pessoais):
- Suporte nativo a Analog.js / SSR
- Deploy automático a cada push na `main`
- Vercel Analytics já integrado (basta habilitar no dashboard)
- Domínio customizado gratuito: `vinimendes.vercel.app` ou domínio próprio

Alternativa: **Netlify** (comportamento similar).

---

## 10. Fases de Desenvolvimento

### Fase 1 — MVP (prioridade)
- [ ] Setup Angular + Analog.js + Tailwind
- [ ] Navbar + Footer + ThemeToggle
- [ ] Página Home (Hero + métricas)
- [ ] Página Projetos (cards estáticos)
- [ ] Página Contato (form + links)
- [ ] i18n PT/EN básico
- [ ] Deploy na Vercel

### Fase 2 — Conteúdo
- [ ] Seção Stack / Habilidades
- [ ] Página Sobre com timeline
- [ ] Blog (primeiros 2-3 posts)
- [ ] Download CV (PT + EN)
- [ ] SEO completo + sitemap

### Fase 3 — Polimento
- [ ] Animações de scroll (Intersection Observer)
- [ ] Open Graph / preview social
- [ ] Analytics
- [ ] Filtro de projetos por tecnologia
- [ ] Performance audit (Lighthouse ≥ 90)

---

## 11. Prompt de Inicialização para o Claude Code

Cole isto no Claude Code para iniciar:

```
Crie um portfólio pessoal de desenvolvedor usando Angular 17+ com Analog.js, Tailwind CSS e TypeScript.

Contexto:
- Dono: Vinicius Mendes, Desenvolvedor Full Stack, Minas Gerais, Brasil
- Stack profissional: Node.js, TypeScript, Angular, Python/FastAPI, Go, Oracle, MySQL, Redis
- Projetos principais: Mitsu (plataforma de ticketing em Go/Angular/Redis) e AI WhatsApp Agent (Node.js/Claude API)
- GitHub: ViniMendes2515

Requisitos obrigatórios:
1. Analog.js para SSG/SSR e file-based routing
2. Tailwind CSS com dark mode (class strategy)
3. i18n com @ngx-translate/core (PT-BR default, EN alternativo)
4. Blog com posts em Markdown (frontmatter com title, date, description, tags, readingTime)
5. Animações suaves com Intersection Observer (fade-in no scroll)
6. SEO: Meta tags, Open Graph, sitemap.xml
7. Vercel Analytics

Páginas:
- / (Home): hero com nome, tagline, métricas de credibilidade, botões "Ver Projetos" e "Download CV"
- /about: bio, foto, timeline de carreira, download CV PT e EN
- /projects: grade de cards com projetos, tags de tech, links GitHub/demo
- /blog: listagem de posts + página individual com Markdown renderizado
- /contact: formulário (Formspree) + links LinkedIn/GitHub

Design:
- Minimalista e clean (referência: augustogalego.com)
- Paleta: fundo #FFFFFF light / #0F172A dark, accent #2563EB, fonte Inter
- Sem barras de progresso de habilidades
- Cards com hover sutil (scale + sombra)
- Navbar fixa com backdrop-blur ao scrollar

Comece pelo setup do projeto, configuração do Tailwind com dark mode, e estrutura de pastas conforme a spec.
```

---

*Spec gerada em: Março 2026*  
*Autor: Vinicius Mendes · github.com/ViniMendes2515*
