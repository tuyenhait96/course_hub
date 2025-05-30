import LessonDetailClient from './lesson-detail-client'

// Static params generation for static export
export async function generateStaticParams() {
  // Return all possible courseId/videoId combinations from the course data
  return [
    { courseId: 'course-1', videoId: 'vid-1' },
    { courseId: 'course-1', videoId: 'vid-2' },
    { courseId: 'course-2', videoId: 'vid-1' },
    { courseId: 'course-2', videoId: 'vid-2' },
  ]
}

interface LessonDetailPageProps {
  params: { courseId: string; videoId: string }
}

export default function LessonDetailPage({ params }: LessonDetailPageProps) {
  return <LessonDetailClient courseId={params.courseId} videoId={params.videoId} />
} 