# 🪄 BsD Barber - Barbershop Booking System

A modern, full-stack barbershop booking application built with Next.js 15, featuring Google authentication, real-time booking management, rating system, and responsive design.

🌐 **Live Demo:** [https://bsd-barbershop.vercel.app](https://bsd-barbershop.vercel.app)

![BsD Barber](./public/banner-01.png)

## ✨ Features

### 🔐 Authentication & User Management
- **Google OAuth Integration** - Secure login with Google accounts
- **Session Management** - Persistent user sessions with NextAuth.js
- **User Profiles** - Personalized experience with user avatars and names

### 💺 Booking System
- **Service Booking** - Book appointments for various barbershop services
- **Real-time Availability** - Check and book available time slots
- **Booking Management** - View, manage and cancel upcoming appointments
- **Booking History** - Track completed appointments

### ⭐ Rating & Review System
- **5-Star Rating System** - Rate barbershops and services after appointments
- **Review Comments** - Leave detailed feedback for other users
- **Average Ratings** - Dynamic calculation of barbershop ratings
- **Rating Display** - Visual star ratings throughout the application

### 🏪 Barbershop Management
- **Barbershop Listings** - Browse available barbershops with ratings
- **Service Catalog** - View services offered by each barbershop
- **Contact Information** - Phone numbers and addresses for each location
- **Image Gallery** - High-quality images of barbershops and services

### 🔍 Search & Discovery
- **Quick Search** - Fast search by service type (Hair, Beard, Eyebrows, etc.)
- **Advanced Search** - Search barbershops by name or location
- **Recommendations** - Curated list of top-rated barbershops
- **Popular Listings** - Trending barbershops based on user activity

### 📱 User Experience
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Dark Mode** - Modern dark theme throughout the application
- **Touch-Friendly** - Swipe containers for mobile navigation
- **Real-time Notifications** - Toast notifications for user actions
- **Intuitive UI** - Clean, modern interface with smooth animations

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features and concurrent rendering
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives (shadcn/ui)
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form management with validation
- **Sonner** - Toast notifications
- **React Day Picker** - Calendar component for date selection

### Backend & Database
- **PostgreSQL** - Primary database
- **Prisma ORM** - Database toolkit with type safety
- **Prisma Accelerate** - Connection pooling and caching
- **NextAuth.js** - Authentication solution
- **Zod** - Schema validation

### DevOps & Tools
- **Docker** - Containerized PostgreSQL database
- **ESLint** - Code linting with Next.js configuration
- **Prettier** - Code formatting with Tailwind CSS plugin
- **Husky** - Git hooks for code quality
- **lint-staged** - Pre-commit linting and formatting

## 🚀 Getting Started

### Prerequisites

Before running the application, ensure you have:

- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **Docker** (for PostgreSQL database)
- **Google OAuth credentials** (for authentication)

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd barbershop
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Copy the environment example file and configure your variables:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/barbershop"

# Google OAuth (required for authentication)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# NextAuth
NEXT_AUTH_SECRET="your-nextauth-secret-key"
```

#### Getting Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure the OAuth consent screen
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://{your_domain}/api/auth/callback/google` (production)

### 4. Database Setup

Start the PostgreSQL database using Docker:

```bash
docker-compose up -d
```

Run database setup commands:

```bash
# Generate Prisma client (custom location: generated/prisma/)
npx prisma generate

# Push schema to database
npx prisma db push

# Seed the database with sample data
npx prisma db seed
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 📊 Database Schema

The application uses a PostgreSQL database with the following main entities:

### Core Tables
- **Users** - User accounts with Google OAuth integration
- **Barbershops** - Barbershop information, ratings, and contact details
- **BarbershopServices** - Services offered by barbershops with pricing
- **Bookings** - Appointment bookings between users and services
- **Ratings** - User reviews and ratings for barbershops

### Authentication Tables (NextAuth.js)
- **Accounts** - OAuth account linking
- **Sessions** - User session management
- **VerificationTokens** - Email verification tokens

### Important Database Notes
- **Custom Prisma Client Location**: Generated in `generated/prisma/` directory
- **Prisma Accelerate**: Used for connection pooling and caching
- **Database Access**: Always import `db` from `app/_lib/prisma.ts`
- **Decimal Precision**: Service prices use Decimal type for currency accuracy
- **UUID IDs**: All models use UUID format for primary keys

## 🔧 Available Scripts

### Development
- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality

### Database Commands
- `npx prisma generate` - Generate Prisma client after schema changes
- `npx prisma db push` - Push schema changes to database
- `npx prisma migrate dev` - Create and apply new migration
- `npx prisma db seed` - Seed database with sample barbershops and services
- `npx prisma studio` - Open Prisma Studio database browser

### Code Quality
- `npm run prepare` - Setup Husky git hooks
- Pre-commit hooks automatically run linting and formatting

## 📁 Project Structure

```
barbershop/
├── app/                        # Next.js App Router
│   ├── _actions/              # Server actions
│   │   ├── create-booking.ts  # Booking creation logic
│   │   ├── create-rating.ts   # Rating submission
│   │   ├── delete-booking.ts  # Booking cancellation
│   │   ├── get-bookings.ts    # Booking queries
│   │   └── get-ratings.ts     # Rating queries
│   ├── _components/           # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── barbershop-item.tsx
│   │   ├── booking-item.tsx
│   │   ├── rating-dialog.tsx
│   │   ├── rating-list.tsx
│   │   ├── quick-search.tsx
│   │   ├── swipe-container.tsx
│   │   └── ...
│   ├── _constants/           # Application constants
│   │   ├── booking.ts        # Booking-related constants
│   │   └── search.ts         # Search options
│   ├── _data/               # Data fetching functions
│   │   ├── get-concluded-bookings.ts
│   │   └── get-confirmed-bookings.ts
│   ├── _lib/                # Utility functions
│   │   ├── auth.ts          # NextAuth configuration
│   │   ├── prisma.ts        # Database client setup
│   │   ├── rating.ts        # Rating utilities
│   │   ├── decimal.ts       # Decimal handling
│   │   └── utils.ts         # General utilities
│   ├── _providers/          # React context providers
│   │   └── auth-provider.tsx
│   ├── _types/              # TypeScript type definitions
│   │   ├── booking.ts
│   │   └── rating.ts
│   ├── api/                 # API routes
│   │   └── auth/[...nextauth]/ # NextAuth configuration
│   ├── barbershops/         # Barbershop pages
│   │   ├── [id]/page.tsx   # Individual barbershop page
│   │   └── page.tsx        # Barbershops listing
│   ├── bookings/           # Booking management pages
│   │   └── page.tsx
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── prisma/                 # Database schema & migrations
│   ├── schema.prisma       # Database schema
│   ├── migrations/         # Database migrations
│   └── seed.ts             # Database seeding script
├── public/                 # Static assets
│   ├── banner-01.png
│   ├── logo.png
│   └── service-icons/      # SVG icons for services
├── components.json         # shadcn/ui configuration
├── docker-compose.yml      # PostgreSQL container
├── next.config.ts          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🔒 Security Features

- **OAuth 2.0** - Secure Google authentication
- **CSRF Protection** - Built-in with NextAuth.js
- **SQL Injection Prevention** - Prisma ORM with parameterized queries
- **Input Validation** - Zod schema validation on forms
- **Session Security** - Secure HTTP-only cookies
- **Environment Variables** - Sensitive data protection
- **Type Safety** - TypeScript for compile-time error checking

## 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark Theme** - Modern dark color scheme (default)
- **Smooth Animations** - CSS transitions and hover effects
- **Touch Gestures** - Swipe navigation for mobile devices
- **Accessibility** - ARIA labels and keyboard navigation
- **Loading States** - Skeleton loaders and spinners
- **Toast Notifications** - User feedback with Sonner
- **Form Validation** - Real-time validation with React Hook Form

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab
2. Connect your repository to [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard
4. Set up a production database (e.g., Supabase, PlanetScale, Neon)
5. Update the `DATABASE_URL` environment variable

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXT_AUTH_SECRET="your-production-secret-key"
NEXT_AUTH_URL="https://yourdomain.com"
```

### Build Process

The application automatically:
1. Generates Prisma client during build (`prisma generate`)
2. Optimizes images and assets
3. Type-checks the entire codebase
4. Runs ESLint for code quality

## 🧪 Development Tips

### Database Development
- Always use the `db` export from `app/_lib/prisma.ts`
- Prisma client is generated to `generated/prisma/` (custom location)
- Use `npx prisma studio` to browse and edit database contents
- Remember to run `npx prisma generate` after schema changes

### Code Quality
- Pre-commit hooks automatically format code with Prettier
- ESLint rules enforce Next.js and React best practices
- TypeScript provides compile-time type checking
- Use absolute imports from `@/` for better organization

### UI Development
- All UI components are based on shadcn/ui and Radix UI
- Dark mode is enabled by default in the layout
- Use the custom `SwipeContainer` for horizontal scrolling lists
- Tailwind CSS classes are automatically sorted by Prettier

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the existing code style
4. Ensure tests pass and code is properly formatted
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style Guidelines
- Use TypeScript for all new code
- Follow the existing component structure
- Use Tailwind CSS for styling
- Implement proper error handling
- Add proper TypeScript types
- Write descriptive commit messages

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

Built by BSysDev