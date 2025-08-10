"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AuthCallback() {
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Completing authentication...')

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the current session
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error during auth callback:', error)
          setStatus('error')
          setMessage('Authentication failed. Please try again.')
          setTimeout(() => router.push('/login?error=auth_callback_error'), 3000)
          return
        }

        if (session) {
          setStatus('success')
          setMessage('Authentication successful! Redirecting to dashboard...')
          
          // Wait a moment for the session to be fully established
          setTimeout(() => {
            router.push('/dashboard')
          }, 1500)
        } else {
          // No session found, try to get user from URL hash
          const hash = window.location.hash
          console.log('URL hash found:', hash)
          
          if (hash && hash.includes('access_token')) {
            // Parse the hash to extract tokens
            const params = new URLSearchParams(hash.substring(1))
            const accessToken = params.get('access_token')
            const refreshToken = params.get('refresh_token')
            
            console.log('Access token found:', !!accessToken)
            console.log('Refresh token found:', !!refreshToken)
            
            if (accessToken && refreshToken) {
              // Set the session manually
              const { error: setSessionError } = await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken
              })
              
              if (setSessionError) {
                console.error('Error setting session:', setSessionError)
                setStatus('error')
                setMessage('Failed to complete authentication. Please try again.')
                setTimeout(() => router.push('/login?error=session_error'), 3000)
                return
              }
              
              setStatus('success')
              setMessage('Email confirmed! Redirecting to dashboard...')
              setTimeout(() => router.push('/dashboard'), 1500)
            } else {
              setStatus('error')
              setMessage('Invalid authentication data. Please try again.')
              setTimeout(() => router.push('/login?error=invalid_token'), 3000)
            }
          } else {
            console.log('No access_token found in hash')
            setStatus('error')
            setMessage('No authentication data found. Please try again.')
            setTimeout(() => router.push('/login?error=no_data'), 3000)
          }
        }
      } catch (error) {
        console.error('Unexpected error during auth callback:', error)
        setStatus('error')
        setMessage('An unexpected error occurred. Please try again.')
        setTimeout(() => router.push('/login?error=unexpected'), 3000)
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {status === 'loading' && (
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto"></div>
        )}
        {status === 'success' && (
          <div className="text-green-500">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
        {status === 'error' && (
          <div className="text-red-500">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}
        <p className={`mt-4 ${status === 'success' ? 'text-green-600' : status === 'error' ? 'text-red-600' : 'text-muted-foreground'}`}>
          {message}
        </p>
        {status === 'error' && (
          <button 
            onClick={() => router.push('/login')}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Go to Login
          </button>
        )}
      </div>
    </div>
  )
}
