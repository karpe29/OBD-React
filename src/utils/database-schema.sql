-- ONE BLUE DOT Portfolio Database Schema
-- Run this script in your Supabase SQL Editor to set up the database

-- Drop existing tables if they exist (for fresh setup or migration)
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS homepage_settings CASCADE;

-- Create projects table with new simplified schema
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  year TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed',
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  cover_image TEXT,
  gallery_images JSONB DEFAULT '[]'
);

-- Create homepage_settings table
CREATE TABLE homepage_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  featured_projects JSONB DEFAULT '[]',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default homepage settings
INSERT INTO homepage_settings (id, featured_projects, updated_at) 
VALUES (1, '[]', NOW())
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for projects table
CREATE POLICY "Projects are viewable by everyone" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert projects" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update projects" ON projects
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete projects" ON projects
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for homepage_settings table
CREATE POLICY "Settings are viewable by everyone" ON homepage_settings
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can update settings" ON homepage_settings
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert settings" ON homepage_settings
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Insert default projects data
INSERT INTO projects (id, title, category, location, year, status, tagline, description, cover_image, gallery_images) VALUES
('komorebi-house', 'Komorebi House', 'architecture', 'Bangalore, India', '2024', 'completed', 'Capturing the essence of filtered light in modern living spaces.', 'Modern Japanese-inspired architecture with filtered light creating serene living spaces. This project explores the concept of komorebi - the interplay of light and shadows through leaves.', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80', '["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"]'),

('urban-sanctuary', 'Urban Sanctuary', 'interior', 'Mumbai, India', '2024', 'completed', 'Creating tranquil spaces within the urban chaos.', 'Luxury high-rise apartment with panoramic city views and sustainable design principles. This interior design project focuses on creating a peaceful retreat in the heart of the city.', 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80', '["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"]'),

('zen-garden', 'Zen Garden', 'landscape', 'Goa, India', '2024', 'completed', 'Where nature and design find perfect harmony.', 'Minimalist coastal landscape design with clean lines and seamless integration with the natural environment. This project emphasizes sustainable landscaping and water conservation.', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', '["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80"]')

ON CONFLICT (id) DO NOTHING;

-- Set default featured projects
UPDATE homepage_settings 
SET featured_projects = '["komorebi-house", "urban-sanctuary", "zen-garden"]'
WHERE id = 1;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_year ON projects(year);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);

-- Refresh schema cache
NOTIFY pgrst, 'reload schema';