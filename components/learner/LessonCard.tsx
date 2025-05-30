'use client'
    import Link from 'next/link'
    import { Button } from '@/components/ui/button'

    type Lesson = {
      id: string
      title: string
      description: string
      videoUrl: string
      documentUrl: string
    }

    export function LessonCard({ lesson }: { lesson: Lesson }) {
      return (
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="text-xl font-semibold">{lesson.title}</h3>
          <p className="mt-2 text-gray-600">{lesson.description}</p>
          <div className="mt-4 flex space-x-4">
            <Link href={`/learner/lessons/${lesson.id}`}>
              <Button>Watch Video</Button>
            </Link>
            <a
              href={lesson.documentUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">View Materials</Button>
            </a>
          </div>
        </div>
      )
    }