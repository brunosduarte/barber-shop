# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 barbershop booking application built with React 19, TypeScript, and Prisma ORM. The app uses PostgreSQL as the database with Prisma Accelerate for connection pooling. It features a component-based architecture with shadcn/ui components and Tailwind CSS for styling.

## Development Commands

- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality
- `npx prisma generate` - Generate Prisma client after schema changes
- `npx prisma db push` - Push schema changes to database
- `npx prisma db seed` - Seed database with sample barbershops and services
- `npx prisma migrate dev` - Create and apply new migration
- `npx prisma studio` - Open Prisma Studio database browser

## Architecture

### Database Layer
- **Prisma ORM** with PostgreSQL database
- **Custom Prisma Client Path**: Generated client located in `generated/prisma/` (not default location)
- **Prisma Accelerate**: Connection pooling and caching via `@prisma/extension-accelerate`
- **Database Access**: Use `db` export from `app/_lib/prisma.ts`, not direct PrismaClient

### Core Models
- `User`: User accounts with bookings relationship
- `BarberShop`: Barbershop locations with services
- `BarbershopService`: Services offered by barbershops (pricing in Decimal format)
- `Booking`: User bookings connecting users, barbershops, and services

### Frontend Structure
- **App Router**: Next.js 15 app directory structure
- **UI Components**: shadcn/ui components in `app/_components/ui/`
- **Shared Components**: Custom components in `app/_components/`
- **Styling**: Tailwind CSS with dark mode enabled by default
- **Fonts**: Geist and Geist Mono from next/font/google

### Code Quality
- **ESLint**: Next.js ESLint configuration
- **Prettier**: Code formatting with Tailwind CSS plugin
- **Husky**: Git hooks for code quality
- **lint-staged**: Pre-commit linting and formatting

## Database Setup

1. Ensure PostgreSQL is running (docker-compose.yml available)
2. Set `DATABASE_URL` environment variable
3. Run `npx prisma generate` to generate client
4. Run `npx prisma db push` to create tables
5. Run `npx prisma db seed` to populate with sample data

## Important Notes

- Prisma client is generated to `generated/prisma/` directory, not the default location
- Always import database access from `app/_lib/prisma.ts` as `db`
- The app uses dark mode by default (className="dark" in layout)
- Phone numbers are stored as string arrays in BarberShop model
- Service prices use Decimal type for precision
- All IDs use UUID format with @default(uuid())