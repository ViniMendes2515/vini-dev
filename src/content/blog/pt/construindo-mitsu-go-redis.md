---
title: "Como construi uma plataforma de ticketing com Go e Redis"
slug: "construindo-mitsu-go-redis"
date: "2025-03-01"
description: "A jornada de criar o Mitsu — desde a escolha do Go para o backend ate a arquitetura de filas com Redis e o frontend em Angular."
tags: ["Go", "Redis", "Angular", "Backend"]
readingTime: "8 min"
lang: "pt"
---

## O problema

Eventos ao vivo precisam de venda de ingressos rapida, confiavel e sem race conditions. Solucoes existentes eram caras ou dificeis de customizar para necessidades especificas.

## Por que Go?

Go oferece concorrencia nativa com goroutines, binarios unicos sem dependencias externas e performance muito proxima de C. Para um sistema de ticketing com alta concorrencia, e a escolha natural.

```go
func (s *TicketService) Reserve(ctx context.Context, eventID, userID string) (*Ticket, error) {
    key := fmt.Sprintf("event:%s:stock", eventID)

    remaining, err := s.redis.Decr(ctx, key).Result()
    if err != nil {
        return nil, err
    }
    if remaining < 0 {
        s.redis.Incr(ctx, key) // rollback
        return nil, ErrSoldOut
    }

    ticket := &Ticket{
        ID:      uuid.New().String(),
        EventID: eventID,
        UserID:  userID,
        Status:  "reserved",
    }

    return ticket, s.db.Create(ticket).Error
}
```

## Redis como controle de estoque atomico

O Redis garante atomicidade com `DECR` — operacao single-threaded que elimina race conditions sem necessidade de locks distribuidos complexos. Quando o estoque chega a zero, a operacao de rollback garante consistencia.

## Frontend Angular

O dashboard usa Angular com WebSockets para atualizacoes em tempo real. Os organizadores podem ver quantidades disponiveis mudando ao vivo durante a venda.

## Resultado

O Mitsu esta em producao processando eventos reais. A latencia media de reserva fica abaixo de 50ms mesmo sob carga.
