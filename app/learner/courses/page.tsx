'use client'
import { useAuth } from "@/app/context/AuthContext";
import { CourseCard } from "@/components/learner/CourseCard";
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default function CoursesPage() {
  const { user, loading } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  useEffect(() => {
    if (!loading && user?.role !== 'learner') {
      redirect('/login');
    }
  }, [user, loading]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/data/course.json');
        const data = await response.json();

        const transformedCourses = data.map((course: any) => ({
          id: course.id,
          title: course.title,
          description: course.description,
          thumbnail: "/placeholder-image.jpg",
          // thumbnail: course.videoIntroUrl,
          price: 49.99
        }));

        setCourses(transformedCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Fallback to empty array if fetch fails
        setCourses([]);
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  if (coursesLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading courses...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">Available Courses</h1>
        <Link href="/learner/courses/purchased">
          <Button variant="outline">
            <ShoppingBag className="h-4 w-4 mr-2" />
            My Purchased Courses
          </Button>
        </Link>
      </div>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">No courses available at the moment.</div>
          <p className="text-sm text-gray-400">Please check back later for new courses.</p>
        </div>
      )}
    </div>
  );
}
