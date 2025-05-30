import CourseDetailClient from './course-detail-client';

// Mock course data - replace with actual data fetching
const allCoursesData: any = {
  "1": {
    id: "1",
    title: "Introduction to Next.js",
    description: "Learn the basics of Next.js and build modern web applications. This course covers pages, routing, data fetching, and more. Perfect for beginners looking to get started with Next.js.",
    thumbnail: "/placeholder-image.jpg",
    price: 49.99,
    lessons: [
      { id: "lesson1-1", title: "Getting Started with Next.js" },
      { id: "lesson1-2", title: "Understanding File-based Routing" },
      { id: "lesson1-3", title: "Fetching Data in Next.js" },
    ]
  },
  "2": {
    id: "2",
    title: "Advanced Tailwind CSS",
    description: "Master Tailwind CSS and create beautiful, responsive designs. Explore advanced concepts like customization, plugins, and utility-first workflows.",
    thumbnail: "/placeholder-image.jpg",
    price: 79.99,
    lessons: [
      { id: "lesson2-1", title: "Customizing Tailwind Theme" },
      { id: "lesson2-2", title: "Building Complex Components" },
    ]
  },
  "3": {
    id: "3",
    title: "Full-Stack Web Development with MERN",
    description: "Become a full-stack developer with MongoDB, Express, React, and Node.js. This comprehensive course will guide you through building a complete MERN stack application.",
    thumbnail: "/placeholder-image.jpg",
    price: 149.99,
    lessons: [
      { id: "lesson3-1", title: "Setting up the MERN Environment" },
      { id: "lesson3-2", title: "Building the Backend API with Express" },
      { id: "lesson3-3", title: "Creating the Frontend with React" },
    ]
  }
};

export async function generateStaticParams() {
  return Object.keys(allCoursesData).map((courseId) => ({
    courseId: courseId,
  }));
}

// Define Course interface, can be moved to a types file
interface Lesson {
  id: string;
  title: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  lessons: Lesson[];
}

export default function CourseDetailPage() {
  // Data fetching or other server-side logic can go here
  // For this example, we're passing the mock data directly
  return <CourseDetailClient allCoursesData={allCoursesData} />;
}
