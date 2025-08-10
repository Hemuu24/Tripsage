# TripSage Platform

A modern travel community platform built with Next.js, TypeScript, and Supabase.

## Features

- **User Authentication**: Secure login/signup with Supabase Auth
- **Travel Journal**: Share your travel experiences with photos and stories
- **Travel Forum**: Connect with fellow travelers and get advice
- **User Profiles**: Customizable profiles with travel preferences
- **Responsive Design**: Modern UI that works on all devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tripsage-platform
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database:
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Run the contents of `lib/supabase-setup.sql` to create the database structure
   - Run the contents of `lib/sample-data.sql` to add sample data

5. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

The platform uses Supabase as the backend. The database structure includes:

- **profiles**: User profile information
- **posts**: Journal entries and forum posts
- **post_likes**: Post like tracking
- **comments**: Post comments
- **trip_companions**: Trip companion requests

### Sample Data

After setting up the database structure, you can populate it with sample data by running the `lib/sample-data.sql` script. This will create:

- 3 sample user profiles
- 3 sample journal posts
- 3 sample forum posts
- Sample comments and likes

## Project Structure

```
tripsage-platform/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── forum/            # Forum functionality
│   ├── journal/          # Travel journal
│   └── ...               # Other pages
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── ...               # Feature components
├── lib/                   # Utility functions and configurations
│   ├── supabaseClient.ts # Supabase client setup
│   ├── post-helpers.ts   # Post management functions
│   └── ...               # Other utilities
└── hooks/                 # Custom React hooks
```

## Key Components

- **Navigation**: Responsive navigation with authentication state
- **Journal**: Travel story sharing with image support
- **Forum**: Community discussions and Q&A
- **User Profiles**: Customizable user profiles
- **Authentication**: Secure user authentication system

## Technologies Used

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **State Management**: React hooks and context
- **Icons**: Lucide React

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
