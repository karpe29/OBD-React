interface AdminTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  projectCount: number;
}

export function AdminTabs({ activeTab, onTabChange, projectCount }: AdminTabsProps) {
  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="flex space-x-8">
        <button
          onClick={() => onTabChange('projects')}
          className={`py-2 px-1 border-b-2 text-sm ${
            activeTab === 'projects'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Projects ({projectCount})
        </button>
        <button
          onClick={() => onTabChange('homepage')}
          className={`py-2 px-1 border-b-2 text-sm ${
            activeTab === 'homepage'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          Homepage Settings
        </button>
      </nav>
    </div>
  );
}