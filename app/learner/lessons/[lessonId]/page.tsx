'use client'
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Mock lesson data (replace with actual data fetching later)
const mockLesson = {
  id: "1",
  title: "Introduction to React Hooks",
  videoUrl: "https://www.youtube.com/embed/dpw9EHDh2bM", // Example YouTube embed URL
  documentUrl: "/sample-document.pdf", // Example document URL
  description: "Learn the basics of React Hooks, including useState and useEffect."
};

interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  documentUrl: string;
  description: string;
}

export default function LessonDetailPage() {
  const params = useParams();
  const lessonId = params.lessonId as string;
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching lesson data
    if (lessonId === mockLesson.id) {
      setLesson(mockLesson);
    }
    setLoading(false);
  }, [lessonId]);

  if (loading) {
    return <div>Loading lesson...</div>;
  }

  if (!lesson) {
    return <div>Lesson not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">{lesson.title}</h1>
      <p className="text-gray-700 mb-6">{lesson.description}</p>
      
      <div className="aspect-video mb-8">
        <iframe 
          width="100%" 
          height="100%" 
          src={lesson.videoUrl} 
          title={lesson.title} 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Associated Materials</h2>
        {lesson.documentUrl ? (
          <a 
            href={lesson.documentUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:underline"
          >
            Download/View Document
          </a>
        ) : (
          <p>No associated materials for this lesson.</p>
        )}
      </div>
    </div>
  );
} 