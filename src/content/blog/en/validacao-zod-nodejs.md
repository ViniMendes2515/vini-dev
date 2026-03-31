---
title: "Data Validation in Node.js with Zod — Why It Matters"
slug: "validacao-zod-nodejs"
date: "2025-02-10"
description: "How Zod changed the way I validate data in Node.js APIs, replacing verbose manual checks with declarative, type-safe schemas."
tags: ["Node.js", "TypeScript", "Zod", "Backend"]
readingTime: "6 min"
lang: "en"
---

## The Problem with Manual Validation

Before Zod, validating API input looked like this:

```typescript
function createUser(body: any) {
  if (!body.email || typeof body.email !== 'string') {
    throw new Error('invalid email')
  }
  if (!body.name || body.name.length < 2) {
    throw new Error('name too short')
  }
  if (body.age && typeof body.age !== 'number') {
    throw new Error('age must be a number')
  }
  // ... 30 lines of if/else for a simple object
}
```

Verbose, fragile, and without real type safety.

## With Zod

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
  // Throws ZodError with detailed messages when invalid
}
```

## Why Zod?

1. **Automatic type inference** — TypeScript types come directly from the schema
2. **Readable error messages** — great for returning clear API errors
3. **Composable schemas** — easy to combine, extend, and transform
4. **Zero dependencies** — lightweight and fast

## Real Case: AI WhatsApp Agent

In my WhatsApp agent with Claude API, I use Zod to validate structured AI responses before business logic runs:

```typescript
const AIResponseSchema = z.object({
  intent: z.enum(['purchase', 'info', 'support', 'unknown']),
  product_id: z.string().optional(),
  confidence: z.number().min(0).max(1),
})

const parsed = AIResponseSchema.parse(JSON.parse(aiOutput))
// If AI returns unexpected output, it fails here — not in business logic
```

## Conclusion

Zod is one of the few libraries I installed and never looked back. For any Node.js + TypeScript project dealing with external data (APIs, forms, AI), it is an automatic choice.
