---
title: "How I Built a Live Ticketing Platform with Go and Redis"
slug: "construindo-mitsu-go-redis"
date: "2025-03-01"
description: "The journey of building Mitsu — from choosing Go for the backend to designing a Redis queue architecture and an Angular frontend."
tags: ["Go", "Redis", "Angular", "Backend"]
readingTime: "8 min"
lang: "en"
---

## The Problem

Live events need fast and reliable ticket sales without race conditions. Existing solutions were expensive or hard to customize for specific needs.

## Why Go?

Go provides native concurrency with goroutines, single-binary deployment, and performance close to C. For a high-concurrency ticketing system, it is a natural fit.

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

## Redis for Atomic Stock Control

Redis guarantees atomicity with `DECR` — a single-threaded operation that removes race conditions without complex distributed locking. When stock goes below zero, rollback keeps data consistent.

## Angular Frontend

The dashboard uses Angular with WebSockets for real-time updates. Organizers can see ticket availability changing live during sales.

## Result

Mitsu is in production processing real events. Average reservation latency stays below 50ms even under load.
