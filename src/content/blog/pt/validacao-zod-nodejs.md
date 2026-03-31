---
title: "Validacao de dados em Node.js com Zod — por que usar"
slug: "validacao-zod-nodejs"
date: "2025-02-10"
description: "Como o Zod transformou a forma que valido dados em APIs Node.js, substituindo validacoes manuais verbosas por schemas declarativos e type-safe."
tags: ["Node.js", "TypeScript", "Zod", "Backend"]
readingTime: "6 min"
lang: "pt"
---

## O problema com validacao manual

Antes do Zod, validar dados de entrada em APIs era assim:

```typescript
function createUser(body: any) {
  if (!body.email || typeof body.email !== 'string') {
    throw new Error('email invalido')
  }
  if (!body.name || body.name.length < 2) {
    throw new Error('nome muito curto')
  }
  if (body.age && typeof body.age !== 'number') {
    throw new Error('age deve ser numero')
  }
  // ... 30 linhas de if/else para um objeto simples
}
```

Verboso, fragil, sem type safety real.

## Com Zod

```typescript
import { z } from 'zod'

const CreateUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  age: z.number().int().positive().optional(),
})

type CreateUserInput = z.infer<typeof CreateUserSchema>

function createUser(body: unknown): CreateUserInput {
  return CreateUserSchema.parse(body)
  // Lanca ZodError com mensagens detalhadas se invalido
}
```

## Por que Zod?

1. **Type inference automatica** — o tipo TypeScript e derivado do schema, sem duplicacao
2. **Mensagens de erro legiveis** — ideais para retornar diretamente ao cliente da API
3. **Composicao** — schemas podem ser combinados, estendidos e transformados
4. **Zero dependencias** — leve e sem overhead

## Caso real: AI WhatsApp Agent

No meu agente de WhatsApp com Claude API, uso Zod para validar as respostas estruturadas da IA antes de processa-las:

```typescript
const AIResponseSchema = z.object({
  intent: z.enum(['purchase', 'info', 'support', 'unknown']),
  product_id: z.string().optional(),
  confidence: z.number().min(0).max(1),
})

const parsed = AIResponseSchema.parse(JSON.parse(aiOutput))
// Se a IA retornou algo inesperado, falha aqui — nao na logica de negocio
```

## Conclusao

Zod e uma das poucas bibliotecas que instalei e nunca mais questionei. Para qualquer projeto Node.js com TypeScript que lide com dados externos (APIs, formularios, IA), e decisao automatica.
