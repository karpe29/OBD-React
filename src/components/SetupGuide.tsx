import { useState } from 'react';

export function SetupGuide() {
  const [copyFeedback, setCopyFeedback] = useState('');

  const sqlSchema = `-- ONE BLUE DOT Portfolio Database Schema
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

('urban-sanctuary', 'Urban Sanctuary', 'interior', 'Mumbai, India', '2024', 'completed', 'Creating tranquil spaces within the urban chaos.', 'Luxury high-rise apartment with panoramic city views and sustainable design principles. This interior design project focuses on creating a peaceful retreat in the heart of the city.', 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80', '["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"]'),

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
NOTIFY pgrst, 'reload schema';`;

  const copyToClipboard = async (text: string) => {
    try {
      // First try the modern Clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setCopyFeedback('SQL schema copied to clipboard!');
        setTimeout(() => setCopyFeedback(''), 3000);
        return;
      }
      
      // Fallback to older method if Clipboard API is not available
      fallbackCopyTextToClipboard(text);
    } catch (err) {
      console.error('Clipboard API failed, trying fallback:', err);
      // If clipboard API fails, try the fallback method
      fallbackCopyTextToClipboard(text);
    }
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    try {
      // Create a temporary textarea element
      const textArea = document.createElement('textarea');
      textArea.value = text;
      
      // Make it invisible
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      // Try to copy using the older execCommand method
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        setCopyFeedback('SQL schema copied to clipboard!');
        setTimeout(() => setCopyFeedback(''), 3000);
      } else {
        setCopyFeedback('Copy failed. Please manually select and copy the SQL text above.');
        setTimeout(() => setCopyFeedback(''), 5000);
      }
    } catch (err) {
      console.error('Fallback copy failed:', err);
      setCopyFeedback('Copy not supported. Please manually select and copy the SQL text above.');
      setTimeout(() => setCopyFeedback(''), 5000);
    }
  };

  const selectAllText = () => {
    const sqlElement = document.getElementById('sql-schema');
    if (sqlElement) {
      const range = document.createRange();
      range.selectNodeContents(sqlElement);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        setCopyFeedback('SQL text selected. Use Ctrl+C (or Cmd+C) to copy.');
        setTimeout(() => setCopyFeedback(''), 5000);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">ONE BLUE DOT Setup Guide</h1>
      
      <div className="space-y-8">
        {/* Database Setup */}
        <div>
          <h2 className="text-xl font-semibold mb-4">1. Database Schema Update Required</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-yellow-800 text-sm">
                <strong>Important:</strong> The database schema has been updated. You need to run the new SQL schema to fix the current errors.
              </p>
            </div>
            
            <p className="mb-4 text-gray-700">
              Run the following SQL commands in your Supabase SQL Editor to update the database schema:
            </p>
            
            <div className="relative">
              <pre 
                id="sql-schema"
                className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto max-h-96"
              >
                {sqlSchema}
              </pre>
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => copyToClipboard(sqlSchema)}
                  className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                >
                  Copy SQL
                </button>
                <button
                  onClick={selectAllText}
                  className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
                >
                  Select All
                </button>
              </div>
              
              {/* Copy feedback message */}
              {copyFeedback && (
                <div className={`mt-2 p-2 rounded text-sm ${
                  copyFeedback.includes('failed') || copyFeedback.includes('not supported') 
                    ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
                    : 'bg-green-100 text-green-800 border border-green-200'
                }`}>
                  {copyFeedback}
                </div>
              )}
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-blue-800 text-sm">
                <strong>Steps:</strong>
                <br />1. Go to your Supabase project dashboard
                <br />2. Navigate to "SQL Editor"
                <br />3. Copy the SQL code above (use Copy SQL or Select All button)
                <br />4. Paste it into the SQL Editor
                <br />5. Click "Run" to execute the commands
                <br />6. Refresh this page to verify the fix
              </p>
            </div>
          </div>
        </div>

        {/* Storage Setup */}
        <div>
          <h2 className="text-xl font-semibold mb-4">2. Storage Setup</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="mb-4 text-gray-700">
              Ensure the storage bucket exists for project images:
            </p>
            
            <div className="space-y-3">
              <div className="p-3 bg-white border rounded">
                <strong>Bucket Name:</strong> <code className="bg-gray-200 px-2 py-1 rounded">make-2a3badc1-project-images</code>
              </div>
              
              <div className="p-3 bg-white border rounded">
                <strong>Settings:</strong>
                <ul className="mt-2 ml-4 space-y-1 text-sm">
                  <li>• Public: <strong>No</strong> (Private bucket)</li>
                  <li>• File size limit: <strong>10 MB</strong></li>
                  <li>• Allowed MIME types: <strong>image/jpeg, image/png, image/webp</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div>
          <h2 className="text-xl font-semibold mb-4">3. Current Error Solutions</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-3">
              <div className="p-3 bg-white border rounded">
                <strong className="text-red-600">Error:</strong> "column projects.year does not exist"
                <br />
                <strong>Solution:</strong> The database schema has been updated. Run the SQL above to fix this error.
              </div>
              
              <div className="p-3 bg-white border rounded">
                <strong className="text-red-600">Error:</strong> "Failed to fetch projects"
                <br />
                <strong>Solution:</strong> This will be resolved after running the database schema update.
              </div>
              
              <div className="p-3 bg-white border rounded">
                <strong className="text-red-600">Warning:</strong> "Received NaN for children"
                <br />
                <strong>Solution:</strong> This React warning will disappear once the database returns valid project data.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}