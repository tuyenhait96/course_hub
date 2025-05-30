'use client'
import { CourseCard } from "@/components/learner/CourseCard";
import { useAuth } from "@/app/context/AuthContext"; // Corrected import path
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

// Mock course data (replace with actual data fetching later)
const mockCourses = [
  {
    id: "1",
    title: "Introduction to Next.js",
    description: "Learn the basics of Next.js and build modern web applications.",
    thumbnail: "/placeholder-image.jpg", // Replace with actual image path
    price: 49.99,
  },
  {
    id: "2",
    title: "Advanced Tailwind CSS",
    description: "Master Tailwind CSS and create beautiful, responsive designs.",
    thumbnail: "/placeholder-image.jpg", // Replace with actual image path
    price: 79.99,
  },
  {
    id: "3",
    title: "Full-Stack Web Development with MERN",
    description: "Become a full-stack developer with MongoDB, Express, React, and Node.js.",
    thumbnail: "/placeholder-image.jpg", // Replace with actual image path
    price: 149.99,
  },
  // Add more mock courses as needed
];

export default function CoursesPage() {
  const { user, loading } = useAuth(); // Auth check

  useEffect(() => {
    if (!loading && user?.role !== 'learner') {
      redirect('/login'); // Redirect if not learner
    }
  }, [user, loading]);

  if (loading || !user) {
    return <div>Loading...</div>; // Loading state
  }

  // In a real application, you would fetch courses from an API
  const courses = mockCourses;

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-8">Available Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}