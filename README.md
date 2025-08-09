# One Blue Dot - React Portfolio with Supabase Backend

This is a React TypeScript application with a Supabase backend for managing portfolio projects.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🔧 Supabase Setup

### 1. Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

### 2. Update Supabase Configuration
Update the Supabase credentials in `src/utils/supabase/info.tsx`:
```typescript
export const projectId = "your-project-id"
export const publicAnonKey = "your-anon-key"
```

### 3. Database Schema
Run the following SQL in your Supabase SQL editor:

```sql
-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  location TEXT,
  year TEXT,
  status TEXT,
  tagline TEXT,
  description TEXT,
  cover_image TEXT,
  gallery_images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create homepage_settings table
CREATE TABLE homepage_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  featured_projects TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default homepage settings
INSERT INTO homepage_settings (featured_projects) VALUES ('{}');

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read access" ON homepage_settings FOR SELECT USING (true);

-- Create policies for authenticated users
CREATE POLICY "Authenticated users can insert" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete" ON projects FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update settings" ON homepage_settings FOR UPDATE USING (auth.role() = 'authenticated');
```

### 4. Storage Setup
1. Go to Storage in your Supabase dashboard
2. Create a bucket named `project-images`
3. Set the bucket to public

### 5. Edge Functions (Optional)
For full functionality, deploy the edge functions to Supabase:

1. Install Supabase CLI
2. Link your project: `supabase link --project-ref your-project-ref`
3. Deploy functions: `supabase functions deploy`

## 🎨 Features

- **Portfolio Management**: Add, edit, and delete projects
- **Image Upload**: Upload project images to Supabase storage
- **Admin Panel**: Secure admin interface for content management
- **Responsive Design**: Mobile-friendly interface
- **Demo Mode**: Test functionality without backend

## 🔐 Admin Access

1. Click the "ADMIN" button in the header
2. Create an admin account or log in
3. Manage projects and homepage settings

## 🛠️ Development

### Available Scripts
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

### Project Structure
```
src/
├── components/          # React components
│   ├── ui/            # UI components (shadcn/ui)
│   └── ...            # Feature components
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
│   └── supabase/      # Supabase configuration
└── styles/            # Global styles
```

## 🐛 Troubleshooting

### Common Issues

1. **TypeScript Errors**: The UI components may have import issues. These are mostly cosmetic and won't affect functionality.

2. **Supabase Connection**: Ensure your project URL and keys are correct in `src/utils/supabase/info.tsx`

3. **Image Upload**: Make sure your Supabase storage bucket is properly configured

4. **Admin Access**: If you can't create an admin account, check that your Supabase project is properly set up

### Demo Mode
If the backend is not available, the app will automatically switch to demo mode with limited functionality.

## 📝 License

This project is for educational purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Note**: This is a fresh React project with copied files from Figma Make. Some UI components may have import issues that don't affect core functionality.
