import { useState } from 'react'
import { supabase } from '../utils/supabase/client'
import { projectId, publicAnonKey } from '../utils/supabase/info'
import { SetupGuide } from './SetupGuide'

interface AdminLoginProps {
  onLogin: (user: any, accessToken: string) => void
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [serverStatus, setServerStatus] = useState<'unknown' | 'online' | 'offline' | 'setup-required'>('unknown')
  const [showSetupGuide, setShowSetupGuide] = useState(false)

  const testServerConnection = async () => {
    try {
      setLoading(true)
      setError('')
      
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2a3badc1/health`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        
        if (data.database?.isSetup === false) {
          setServerStatus('setup-required')
          setError('Database setup required. Please run the SQL schema in your Supabase dashboard.')
        } else {
          setServerStatus('online')
          setError('')
        }
        
        console.log('Server connection successful:', data)
        return true
      } else {
        setServerStatus('offline')
        setError(`Server responded with status ${response.status}. The admin panel may not be fully functional.`)
        return false
      }
    } catch (err: any) {
      setServerStatus('offline')
      setError('Cannot connect to server. Using demo mode with limited functionality.')
      console.error('Server connection failed:', err)
      return false
    } finally {
      setLoading(false)
    }
  }

  const handleDemoMode = () => {
    // Create a demo user for offline mode
    const demoUser = {
      id: 'demo-user',
      email: 'demo@oneblue.dot',
      user_metadata: { name: 'Demo Admin', role: 'admin' }
    }
    const demoToken = 'demo-token'
    onLogin(demoUser, demoToken)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // First test server connection
    const serverOnline = await testServerConnection()
    
    if (!serverOnline) {
      setLoading(false)
      return
    }

    try {
      if (isLogin) {
        // Sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        if (data.session?.access_token && data.user) {
          onLogin(data.user, data.session.access_token)
        }
      } else {
        // Sign up - call our admin signup endpoint
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2a3badc1/admin/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({ email, password, name })
        })

        const result = await response.json()
        
        if (!response.ok) {
          throw new Error(result.error || 'Signup failed')
        }

        // After successful signup, sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        if (data.session?.access_token && data.user) {
          onLogin(data.user, data.session.access_token)
        }
      }
    } catch (err: any) {
      console.error('Auth error:', err)
      setError(err.message || 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  if (showSetupGuide) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">Database Setup Required</h2>
            <button
              onClick={() => setShowSetupGuide(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          <div className="p-6">
            <SetupGuide />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg">
        <h2 className="text-2xl mb-6 text-center">
          {isLogin ? 'Admin Login' : 'Create Admin Account'}
        </h2>
        
        {/* Server Status */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Server Status:</span>
            <span className={`text-sm px-2 py-1 rounded ${
              serverStatus === 'online' ? 'bg-green-100 text-green-700' :
              serverStatus === 'setup-required' ? 'bg-yellow-100 text-yellow-700' :
              serverStatus === 'offline' ? 'bg-red-100 text-red-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {serverStatus === 'online' ? '● Online' :
               serverStatus === 'setup-required' ? '● Setup Required' :
               serverStatus === 'offline' ? '● Offline' :
               '○ Unknown'}
            </span>
          </div>
          <button
            type="button"
            onClick={testServerConnection}
            disabled={loading}
            className="w-full text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Connection'}
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Demo Mode and Setup Options */}
        {(serverStatus === 'offline' || serverStatus === 'setup-required') && (
          <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
            <h3 className="text-sm font-medium text-yellow-800 mb-2">
              {serverStatus === 'offline' ? 'Server Offline' : 'Database Setup Required'}
            </h3>
            <p className="text-xs text-yellow-700 mb-3">
              {serverStatus === 'offline' 
                ? 'The server is offline. You can try demo mode or set up the database.'
                : 'The database tables need to be created. You can use demo mode or set up the database.'
              }
            </p>
            <div className="space-y-2">
              <button
                onClick={handleDemoMode}
                className="w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 text-sm"
              >
                Enter Demo Mode
              </button>
              <button
                onClick={() => setShowSetupGuide(true)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm"
              >
                View Setup Guide
              </button>
            </div>
          </div>
        )}

        {/* Login Form - only show if server is online or unknown */}
        {(serverStatus === 'online' || serverStatus === 'unknown') && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Loading...' : (isLogin ? 'Login' : 'Create Account')}
              </button>
              <button
                type="button"
                onClick={() => window.location.href = '/'}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Back to Site
              </button>
            </div>
          </form>
        )}

        {/* Toggle Login/Signup - only show if server is online */}
        {serverStatus === 'online' && (
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:underline text-sm"
            >
              {isLogin ? 'Need to create an admin account?' : 'Already have an account?'}
            </button>
          </div>
        )}

        {/* Helper Information */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
          {serverStatus === 'online' ? (
            isLogin ? (
              <p className="text-blue-700">
                <strong>Server Online:</strong> You can now log in with your admin credentials.
              </p>
            ) : (
              <p className="text-blue-700">
                <strong>Server Online:</strong> Create your admin account with a valid email and password (minimum 6 characters).
              </p>
            )
          ) : serverStatus === 'setup-required' ? (
            <p className="text-blue-700">
              <strong>Setup Required:</strong> The server is running but database tables need to be created. Please follow the setup guide.
            </p>
          ) : serverStatus === 'offline' ? (
            <p className="text-blue-700">
              <strong>Server Offline:</strong> The backend is not accessible. Try demo mode or contact support.
            </p>
          ) : (
            <p className="text-blue-700">
              <strong>Getting Started:</strong> Test the server connection first, then create your admin account.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}