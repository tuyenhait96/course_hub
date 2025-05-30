import { readFileSync } from 'fs';
import { join } from 'path';
import CourseDetailClient from './course-detail-client';

async function getCourseData() {
  try {
    const coursesPath = join(process.cwd(), 'public', 'data', 'course.json');
    const fileContents = readFileSync(coursesPath, 'utf8');
    const courses = JSON.parse(fileContents);

    const allCoursesData: any = {};
    courses.forEach((course: any) => {
      allCoursesData[course.id] = {
        id: course.id,
        title: course.title,
        description: course.description,
        thumbnail: "/placeholder-image.jpg",
        price: 49.99,
        lessons: course.videos.map((video: any) => ({
          id: video.id,
          title: video.title
        }))
      };
    });

    return allCoursesData;
  } catch (error) {
    console.error('Error reading course data:', error);
    return {};
  }
}

export async function generateStaticParams() {
  const allCoursesData = await getCourseData();
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

export default async function CourseDetailPage() {
  const allCoursesData = await getCourseData();
  return <CourseDetailClient allCoursesData={allCoursesData} />;
}
