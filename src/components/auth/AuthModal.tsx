import { useState } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../../lib/supabase'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [view, setView] = useState<'sign_in' | 'sign_up'>('sign_in')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {view === 'sign_in' ? 'ログイン' : '新規登録'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <Auth
          supabaseClient={supabase}
          view={view}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#7c3aed',
                  brandAccent: '#6d28d9',
                }
              }
            }
          }}
          localization={{
            variables: {
              sign_in: {
                email_label: 'メールアドレス',
                password_label: 'パスワード',
                button_label: 'ログイン',
                loading_button_label: 'ログイン中...',
                social_provider_text: '{{provider}}でログイン',
                link_text: 'アカウントをお持ちの方はこちら'
              },
              sign_up: {
                email_label: 'メールアドレス',
                password_label: 'パスワード',
                button_label: '新規登録',
                loading_button_label: '登録中...',
                social_provider_text: '{{provider}}で登録',
                link_text: 'アカウントをお持ちでない方はこちら'
              }
            }
          }}
          providers={['google']}
          redirectTo={`${window.location.origin}/auth/callback`}
          onlyThirdPartyProviders={false}
        />

        <div className="mt-4 text-center">
          <button
            onClick={() => setView(view === 'sign_in' ? 'sign_up' : 'sign_in')}
            className="text-purple-600 hover:text-purple-800 text-sm"
          >
            {view === 'sign_in' 
              ? 'アカウントをお持ちでない方はこちら' 
              : 'アカウントをお持ちの方はこちら'
            }
          </button>
        </div>
      </div>
    </div>
  )
}