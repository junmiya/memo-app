import { useState } from 'react'
import { useAuth } from './AuthProvider'
import { AuthModal } from './AuthModal'
import { UserMenu } from './UserMenu'

export function AuthButton() {
  const { user, loading } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
      </div>
    )
  }

  if (user) {
    return <UserMenu />
  }

  return (
    <>
      <button
        onClick={() => setShowAuthModal(true)}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>
        <span>ログイン</span>
      </button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  )
}