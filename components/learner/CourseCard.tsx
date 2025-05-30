'use client'
    import Link from 'next/link'
    import { Button } from '@/components/ui/button'
    import Image from 'next/image'

    type Course = {
      id: string
      title: string
      description: string
      thumbnail: string
      price: number
    }

    export function CourseCard({ course }: { course: Course }) {
      return (
        <div className="overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
          <div className="relative h-48 w-full">
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p className="mt-2 text-gray-600">{course.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-bold">${course.price}</span>
              <Link href={`/learner/courses/${course.id}`}>
                <Button>View Course</Button>
              </Link>
            </div>
          </div>
        </div>
      )
    }