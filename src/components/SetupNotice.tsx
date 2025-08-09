interface SetupNoticeProps {
  onSetupClick: () => void;
}

export function SetupNotice({ onSetupClick }: SetupNoticeProps) {
  return (
    <div className="bg-yellow-50 border-b border-yellow-200 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-800">
                <strong>Database Setup Required:</strong> Please set up your Supabase database to enable full functionality. Currently showing demo content.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <button
              onClick={onSetupClick}
              className="bg-yellow-600 text-white text-sm px-3 py-1 rounded hover:bg-yellow-700"
            >
              Setup Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}