"use client"

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface AuthWrapperProps {
  children: React.ReactNode
}

// Pages that don't require authentication
const publicPages = ['/login']

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      // If we're on a public page, no need to check auth
      if (publicPages.includes(pathname)) {
        setIsAuthenticated(true)
        return
      }

      try {
        // Check session by making a request to a protected endpoint
        const response = await fetch(process.env.NEXT_PUBLIC_API_BUDGET_ACTIVE_URL!, {
          credentials: 'include',
        })
        
        if (response.status === 401 || response.status === 403) {
          // Session expired or unauthorized
          router.push('/login')
          return
        }
        
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          // Other errors, redirect to login
          router.push('/login')
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/login')
      }
    }

    checkAuth()
  }, [pathname, router])

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // If not authenticated and not on a public page, don't render anything
  // (the redirect will handle this)
  if (!isAuthenticated && !publicPages.includes(pathname)) {
    return null
  }

  return <>{children}</>
}
