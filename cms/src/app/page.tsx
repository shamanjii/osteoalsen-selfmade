'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to admin login
    router.replace('/admin/login')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Osteoalsen CMS
        </h1>
        <p className="text-gray-600">
          Weiterleitung zum Admin-Bereich...
        </p>
      </div>
    </div>
  )
}