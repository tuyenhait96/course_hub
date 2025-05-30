'use client'
import { useAuth } from '@/app/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function LearnerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== 'learner')) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading || !user || user.role !== 'learner') {
    return <div>Loading or unauthorized...</div> // Or a proper loading/unauthorized component
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/learner/courses" className="text-xl font-semibold text-gray-700">
            LearnHub
          </Link>
          <div>
            <Link href="/learner/my-courses" className="text-gray-700 mx-2">
              My Courses
            </Link>
            <Button variant="ghost" onClick={logout} className="text-gray-700">
              Logout
            </Button>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
} 